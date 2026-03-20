"use client";

import "@/lib/editor/styles.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import { Link } from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Editor } from "@tiptap/core";
import { MenuBar } from "./MenuBar";
import { DocStats } from "./Docstats";
import { useCallback, useEffect, useState } from "react";
import { ImagePickerModal } from "./ImagePickerModal";
import { createImage } from "@/lib/api/services/admin.image.service";
import { Maximize, Monitor, Ruler, Smartphone, Trash2 } from "lucide-react";

interface EditorWrapperProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  internalLinks?: { title: string; url: string }[];
}

export function EditorWrapper({
  initialContent,
  onChange,
  internalLinks = [],
}: EditorWrapperProps) {
  const [isPickerOpen, setPickerOpen] = useState(false);

  // ── "live" editor attrs (source of truth from editor)
  const [appliedDimensions, setAppliedDimensions] = useState({
    width: "",
    height: "",
  });

  // ── "draft" input values — only committed to editor on blur / Enter
  const [draftWidth, setDraftWidth] = useState("");
  const [draftHeight, setDraftHeight] = useState("");

  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      onChange?.(editor.getHTML());
      console.log("DEBUG: Editor content is:", editor.getHTML());
    },
    [onChange],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "editor-image transition-all duration-300 rounded-2xl",
        },
      }).extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: "100%",
              parseHTML: (element) =>
                element.style.width || element.getAttribute("width") || "100%",
              renderHTML: (attributes) => {
                return { width: attributes.width };
              },
            },
            height: {
              default: "auto",
              parseHTML: (element) =>
                element.style.height ||
                element.getAttribute("height") ||
                "auto",
              renderHTML: (attributes) => {
                return { height: attributes.height };
              },
            },
          };
        },
        renderHTML({ HTMLAttributes }) {
          const { width, height, ...rest } = HTMLAttributes;
          return [
            "img",
            {
              ...rest,
              style: `
                width: ${width || "100%"};
                height: ${height || "auto"};
                display: inline-block;
                margin: 0.5rem;
                vertical-align: bottom;
              `,
            },
          ];
        },
      }),
      TextStyleKit,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
    ],
    content: initialContent ?? `<p>Start writing your article…</p>`,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap focus:outline-none min-h-[450px] p-8 ",
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.[0]) {
          uploadAndInsert(event.dataTransfer.files, view);
          return true;
        }
        return false;
      },
    },
    onUpdate: handleUpdate,
  });

  // ── Sync draft inputs when selection changes to a different image
  useEffect(() => {
    if (!editor) return;
    const syncFromEditor = () => {
      const attrs = editor.getAttributes("image");
      const w = attrs.width || "";
      const h = attrs.height || "";
      setAppliedDimensions({ width: w, height: h });
      // reset drafts to reflect the newly selected image
      setDraftWidth(w);
      setDraftHeight(h);
    };
    editor.on("selectionUpdate", syncFromEditor);
    return () => {
      editor.off("selectionUpdate", syncFromEditor);
    };
  }, [editor]);

  const uploadAndInsert = async (files: FileList, view: any) => {
    try {
      const res = await createImage({ images: Array.from(files) });

      let insertPos = view.state.selection.from; // ✅ track position across inserts

      res.data.data.images.forEach((img) => {
        const node = view.state.schema.nodes.image.create({
          src: img.url,
          width: "100%",
        });

        // ✅ use current tracked position, not stale view.state.selection.from
        const transaction = view.state.tr.insert(insertPos, node);
        view.dispatch(transaction);

        // ✅ advance position by the size of the inserted node so next image
        // goes after this one, not on top of it
        insertPos += node.nodeSize;
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Drop upload failed");
    }
  };

  const removeImage = () => {
    if (window.confirm("Delete this image from the article?")) {
      editor?.chain().focus().deleteSelection().run();
    }
  };

  // ── Sanitize before committing to editor
  const sanitizeDimension = (value: string): string => {
    if (!value || value === "auto") return value || "auto";
    const match = value.trim().match(/^(\d+)(px|%)?$/);
    if (!match) return appliedDimensions.width || "100%"; // fall back to last good value
    const num = Math.max(50, parseInt(match[1], 10));
    return `${num}${match[2] || "px"}`;
  };

  // ── Only writes to editor — called on blur / Enter
  const applyDimensions = (rawWidth: string, rawHeight: string) => {
    const width = sanitizeDimension(rawWidth) || "100%";
    const height =
      !rawHeight || rawHeight === "auto"
        ? "auto"
        : sanitizeDimension(rawHeight);

    editor?.chain().focus().updateAttributes("image", { width, height }).run();
    setAppliedDimensions({ width, height });
    // sync drafts back to sanitized values
    setDraftWidth(width);
    setDraftHeight(height);
  };

  // ── Preset buttons bypass drafts and apply immediately
  const applyPreset = (width: string, height: string) => {
    editor?.chain().focus().updateAttributes("image", { width, height }).run();
    setAppliedDimensions({ width, height });
    setDraftWidth(width);
    setDraftHeight(height);
  };

  if (!editor) return null;

  return (
    <section className="editor-shell overflow-hidden rounded-[2.5rem] border border-[#e7ddf2] bg-white shadow-sm relative">
      <MenuBar
        editor={editor}
        internalLinks={internalLinks}
        onOpenImagePicker={() => setPickerOpen(true)}
      />

      <BubbleMenu
        editor={editor}
        shouldShow={({ editor }: { editor: Editor }) =>
          editor.isActive("image")
        }
        options={{ placement: "bottom", offset: 8 }}
      >
        <div className="flex flex-col gap-2 bg-[#2b1d3a] p-2 rounded-2xl shadow-2xl border border-white/10 text-white min-w-[280px]">
          {/* ── Presets ── */}
          <div className="flex items-center gap-1 border-b border-white/10 pb-2">
            <button
              type="button"
              onClick={() => applyPreset("30%", "auto")}
              className="p-2 hover:bg-white/10 rounded-xl flex-1 text-[10px] font-bold"
              title="Small (30%)"
            >
              <Smartphone size={14} className="mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => applyPreset("60%", "auto")}
              className="p-2 hover:bg-white/10 rounded-xl flex-1 text-[10px] font-bold"
              title="Medium (60%)"
            >
              <Maximize size={14} className="mx-auto rotate-45" />
            </button>
            <button
              type="button"
              onClick={() => applyPreset("100%", "auto")}
              className="p-2 hover:bg-white/10 rounded-xl flex-1 text-[10px] font-bold"
              title="Full width (100%)"
            >
              <Monitor size={14} className="mx-auto" />
            </button>
            <div className="w-px h-4 bg-white/20 mx-1" />
            <button
              type="button"
              onClick={removeImage}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl"
              title="Remove image"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* ── Manual dimension inputs ── */}
          <div className="flex items-center gap-3 px-1 py-1">
            {/* Width */}
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1 flex-1">
              <span className="text-[10px] opacity-50 font-bold">W</span>
              <input
                type="text"
                value={draftWidth}
                onChange={(e) => setDraftWidth(e.target.value)} // ✅ only updates local draft
                onBlur={() => applyDimensions(draftWidth, draftHeight)} // ✅ commits on blur
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyDimensions(draftWidth, draftHeight); // ✅ commits on Enter
                    editor.commands.focus();
                  }
                  if (e.key === "Escape") {
                    // ✅ cancel — revert draft to last applied
                    setDraftWidth(appliedDimensions.width);
                    setDraftHeight(appliedDimensions.height);
                    editor.commands.focus();
                  }
                }}
                className="bg-transparent border-none outline-none text-[11px] w-full text-white"
                placeholder="e.g. 200px or 50%"
              />
            </div>

            {/* Height */}
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1 flex-1">
              <span className="text-[10px] opacity-50 font-bold">H</span>
              <input
                type="text"
                value={draftHeight}
                onChange={(e) => setDraftHeight(e.target.value)} // ✅ only updates local draft
                onBlur={() => applyDimensions(draftWidth, draftHeight)} // ✅ commits on blur
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyDimensions(draftWidth, draftHeight); // ✅ commits on Enter
                    editor.commands.focus();
                  }
                  if (e.key === "Escape") {
                    // ✅ cancel — revert draft to last applied
                    setDraftWidth(appliedDimensions.width);
                    setDraftHeight(appliedDimensions.height);
                    editor.commands.focus();
                  }
                }}
                className="bg-transparent border-none outline-none text-[11px] w-full text-white"
                placeholder="auto"
              />
            </div>

            <Ruler size={14} className="opacity-40" />
          </div>

          {/* ── Applied indicator ── */}
          {appliedDimensions.width && (
            <p className="text-[9px] opacity-30 px-1 pb-1 text-center tracking-wide">
              {appliedDimensions.width} × {appliedDimensions.height || "auto"}
            </p>
          )}
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />
      <DocStats editor={editor} />

      <ImagePickerModal
        isOpen={isPickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(items) => {
          // ✅ Changed: now receiving objects
          const view = editor.view;
          let insertPos = view.state.selection.from;

          items.forEach((item) => {
            // ✅ Changed: item is { url, id }
            const node = view.state.schema.nodes.image.create({
              src: item.url, // ✅ Changed: access the url property
              width: "100%",
            });

            const tr = view.state.tr.insert(insertPos, node);
            view.dispatch(tr);

            // Advance position so multiple images don't stack on top of each other
            insertPos += node.nodeSize;
          });
        }}
      />
    </section>
  );
}
