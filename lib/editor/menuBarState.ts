import type { Editor } from "@tiptap/core";
import type { EditorStateSnapshot } from "@tiptap/react";

const EMPTY_STATE = {
  // Inline marks
  isBold: false,
  canBold: false,
  isItalic: false,
  canItalic: false,
  isStrike: false,
  canStrike: false,
  isCode: false,
  canCode: false,
  canClearMarks: false,
  // Color / highlight
  currentColor: null as string | null,
  currentHighlight: null as string | null,
  // Block types
  isParagraph: false,
  isHeading1: false,
  isHeading2: false,
  isHeading3: false,
  isHeading4: false,
  isHeading5: false,
  isHeading6: false,
  isBulletList: false,
  isOrderedList: false,
  isCodeBlock: false,
  isBlockquote: false,
  // Align
  isAlignLeft: false,
  isAlignCenter: false,
  isAlignRight: false,
  isAlignJustify: false,
  // Table
  isInTable: false,
  // Link
  isLink: false,
  currentLink: null as string | null,
  // History
  canUndo: false,
  canRedo: false,
};

export type MenuBarState = typeof EMPTY_STATE;

export function menuBarStateSelector(
  ctx: EditorStateSnapshot<Editor | null>,
): MenuBarState {
  const { editor } = ctx;
  if (!editor) return EMPTY_STATE;

  return {
    // Inline marks
    isBold: editor.isActive("bold"),
    canBold: editor.can().chain().toggleBold().run(),
    isItalic: editor.isActive("italic"),
    canItalic: editor.can().chain().toggleItalic().run(),
    isStrike: editor.isActive("strike"),
    canStrike: editor.can().chain().toggleStrike().run(),
    isCode: editor.isActive("code"),
    canCode: editor.can().chain().toggleCode().run(),
    canClearMarks: editor.can().chain().unsetAllMarks().run(),
    // Color / highlight
    currentColor: editor.getAttributes("textStyle").color ?? null,
    currentHighlight: editor.getAttributes("highlight").color ?? null,
    // Block types
    isParagraph: editor.isActive("paragraph"),
    isHeading1: editor.isActive("heading", { level: 1 }),
    isHeading2: editor.isActive("heading", { level: 2 }),
    isHeading3: editor.isActive("heading", { level: 3 }),
    isHeading4: editor.isActive("heading", { level: 4 }),
    isHeading5: editor.isActive("heading", { level: 5 }),
    isHeading6: editor.isActive("heading", { level: 6 }),
    isBulletList: editor.isActive("bulletList"),
    isOrderedList: editor.isActive("orderedList"),
    isCodeBlock: editor.isActive("codeBlock"),
    isBlockquote: editor.isActive("blockquote"),
    // Align
    isAlignLeft: editor.isActive({ textAlign: "left" }),
    isAlignCenter: editor.isActive({ textAlign: "center" }),
    isAlignRight: editor.isActive({ textAlign: "right" }),
    isAlignJustify: editor.isActive({ textAlign: "justify" }),
    // Table
    isInTable: editor.isActive("table"),
    // Link
    isLink: editor.isActive("link"),
    currentLink: editor.getAttributes("link").href ?? null,
    // History
    canUndo: editor.can().chain().undo().run(),
    canRedo: editor.can().chain().redo().run(),
  };
}
