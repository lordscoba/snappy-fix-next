"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React, { useState, useRef, useCallback } from "react";
import { menuBarStateSelector } from "./menuBarState";
import { ImageIcon } from "lucide-react";

// ─── Preset palettes ────────────────────────────────────────────────────────
const TEXT_COLORS = [
  "#000000",
  "#374151",
  "#6B7280",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];
const HIGHLIGHT_COLORS = [
  "#FEF08A",
  "#BBF7D0",
  "#BAE6FD",
  "#E9D5FF",
  "#FED7AA",
  "#FECACA",
  "#F0FDF4",
  "#F0F9FF",
];

// ─── Tiny helpers ────────────────────────────────────────────────────────────
const Divider = () => <div className="toolbar-divider" />;

function ToolButton({
  onClick,
  disabled,
  active,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`tool-btn ${active ? "is-active" : ""}`}
      title={title}
    >
      {children}
    </button>
  );
}

// ─── Color Picker Popover ────────────────────────────────────────────────────
function ColorPicker({
  label,
  colors,
  current,
  onSelect,
  onClear,
  icon,
}: {
  label: string;
  colors: string[];
  current: string | null;
  onSelect: (color: string) => void;
  onClear: () => void;
  icon: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="color-picker-wrap" ref={ref}>
      <button
        type="button"
        className={`tool-btn color-trigger ${current ? "is-active" : ""}`}
        title={label}
        onClick={() => setOpen((v) => !v)}
      >
        {icon}
        <span
          className="color-swatch"
          style={{ background: current ?? "transparent" }}
        />
      </button>
      {open && (
        <div className="color-popover" onMouseLeave={close}>
          <div className="color-grid">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-dot ${current === c ? "selected" : ""}`}
                style={{ background: c }}
                title={c}
                onClick={() => {
                  onSelect(c);
                  close();
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="color-clear"
            onClick={() => {
              onClear();
              close();
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Link Dialog ─────────────────────────────────────────────────────────────
function LinkDialog({
  editor,
  current,
  internalLinks,
}: {
  editor: Editor;
  current: string | null;
  internalLinks: { title: string; url: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(current ?? "");
  const [query, setQuery] = useState("");

  const filtered = internalLinks.filter((l) =>
    l.title.toLowerCase().includes(query.toLowerCase()),
  );

  const apply = () => {
    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    setOpen(false);
  };

  return (
    <div className="color-picker-wrap">
      <ToolButton
        onClick={() => {
          setUrl(current ?? "");
          setOpen((v) => !v);
        }}
        active={!!current}
        title="Insert / edit link"
      >
        🔗
      </ToolButton>
      {open && (
        <div className="link-popover">
          <p className="link-label">URL</p>
          <input
            className="link-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            onKeyDown={(e) => e.key === "Enter" && apply()}
            autoFocus
          />
          {internalLinks.length > 0 && (
            <>
              <p className="link-label" style={{ marginTop: "0.5rem" }}>
                Internal links
              </p>
              <input
                className="link-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts…"
              />
              <ul className="link-suggestions">
                {filtered.slice(0, 6).map((l) => (
                  <li key={l.url}>
                    <button
                      type="button"
                      onClick={() => {
                        setUrl(l.url);
                      }}
                    >
                      {l.title}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="link-actions">
            <button type="button" className="link-apply" onClick={apply}>
              Apply
            </button>
            {current && (
              <button
                type="button"
                className="link-remove"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setOpen(false);
                }}
              >
                Remove
              </button>
            )}
            <button
              type="button"
              className="link-cancel"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Table Menu ───────────────────────────────────────────────────────────────
function TableMenu({
  editor,
  isInTable,
}: {
  editor: Editor;
  isInTable: boolean;
}) {
  const [open, setOpen] = useState(false);

  const cmd = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  return (
    <div className="color-picker-wrap">
      <ToolButton
        onClick={() => setOpen((v) => !v)}
        active={isInTable}
        title="Table"
      >
        ⊞
      </ToolButton>
      {open && (
        <div className="table-popover" onMouseLeave={() => setOpen(false)}>
          {!isInTable ? (
            <button
              type="button"
              className="table-action"
              onClick={() =>
                cmd(() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run(),
                )
              }
            >
              + Insert table (3×3)
            </button>
          ) : (
            <>
              {[
                [
                  "Add row above",
                  () => editor.chain().focus().addRowBefore().run(),
                ],
                [
                  "Add row below",
                  () => editor.chain().focus().addRowAfter().run(),
                ],
                ["Delete row", () => editor.chain().focus().deleteRow().run()],
                [
                  "Add col before",
                  () => editor.chain().focus().addColumnBefore().run(),
                ],
                [
                  "Add col after",
                  () => editor.chain().focus().addColumnAfter().run(),
                ],
                [
                  "Delete col",
                  () => editor.chain().focus().deleteColumn().run(),
                ],
                [
                  "Toggle header row",
                  () => editor.chain().focus().toggleHeaderRow().run(),
                ],
                [
                  "Delete table",
                  () => editor.chain().focus().deleteTable().run(),
                ],
              ].map(([label, fn]) => (
                <button
                  key={label as string}
                  type="button"
                  className="table-action"
                  onClick={() => cmd(fn as () => void)}
                >
                  {label as string}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main MenuBar ─────────────────────────────────────────────────────────────
export const MenuBar = ({
  editor,
  internalLinks = [],
  onOpenImagePicker,
}: {
  editor: Editor | null;
  internalLinks?: { title: string; url: string }[];
  onOpenImagePicker: () => void;
}) => {
  const s = useEditorState({ editor, selector: menuBarStateSelector });

  if (!editor || !s) return null;

  return (
    <div className="control-group">
      <div className="button-group">
        {/* ── History ── */}
        <ToolButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!s.canUndo}
          title="Undo"
        >
          ↩
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!s.canRedo}
          title="Redo"
        >
          ↪
        </ToolButton>
        <Divider />
        {/* ── Block type ── */}
        <ToolButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={s.isParagraph}
          title="Paragraph"
        >
          ¶
        </ToolButton>
        {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
          <ToolButton
            key={lvl}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: lvl }).run()
            }
            active={s[`isHeading${lvl}` as keyof typeof s] as boolean}
            title={`Heading ${lvl}`}
          >
            H{lvl}
          </ToolButton>
        ))}
        <Divider />
        {/* ── Inline marks ── */}
        <ToolButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!s.canBold}
          active={s.isBold}
          title="Bold"
        >
          <b>B</b>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!s.canItalic}
          active={s.isItalic}
          title="Italic"
        >
          <i>I</i>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!s.canStrike}
          active={s.isStrike}
          title="Strike"
        >
          <s>S</s>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!s.canCode}
          active={s.isCode}
          title="Inline code"
        >
          {"`"}
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear marks"
        >
          ✕
        </ToolButton>
        <Divider />
        {/* ── Text color ── */}
        <ColorPicker
          label="Text color"
          colors={TEXT_COLORS}
          current={s.currentColor}
          onSelect={(c) => editor.chain().focus().setColor(c).run()}
          onClear={() => editor.chain().focus().unsetColor().run()}
          icon={<span style={{ fontWeight: 700, fontSize: "0.85rem" }}>A</span>}
        />
        {/* ── Highlight ── */}
        <ColorPicker
          label="Highlight color"
          colors={HIGHLIGHT_COLORS}
          current={s.currentHighlight}
          onSelect={(c) =>
            editor.chain().focus().setHighlight({ color: c }).run()
          }
          onClear={() => editor.chain().focus().unsetHighlight().run()}
          icon={<span style={{ fontSize: "0.85rem" }}>🖊</span>}
        />
        <Divider />
        {/* ── Align ── */}
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={s.isAlignLeft}
          title="Align left"
        >
          ⬅
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={s.isAlignCenter}
          title="Center"
        >
          ↔
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={s.isAlignRight}
          title="Align right"
        >
          ➡
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={s.isAlignJustify}
          title="Justify"
        >
          ≡
        </ToolButton>
        <Divider />
        {/* ── Lists ── */}
        <ToolButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={s.isBulletList}
          title="Bullet list"
        >
          • —
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={s.isOrderedList}
          title="Ordered list"
        >
          1.
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={s.isBlockquote}
          title="Blockquote"
        >
          "
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={s.isCodeBlock}
          title="Code block"
        >{`</>`}</ToolButton>
        <Divider />
        {/* ── Table ── */}
        <TableMenu editor={editor} isInTable={s.isInTable} />
        <Divider />
        {/* ── Link (with internal linking) ── */}
        <LinkDialog
          editor={editor}
          current={s.currentLink}
          internalLinks={internalLinks}
        />
        <Divider />

        <ToolButton onClick={onOpenImagePicker} title="Insert Image">
          <ImageIcon size={16} />
        </ToolButton>
        <Divider />
        {/* ── Misc ── */}
        <ToolButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          —
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="Hard break"
        >
          ↵
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().clearNodes().run()}
          title="Clear nodes"
        >
          ⊘
        </ToolButton>
      </div>
    </div>
  );
};
