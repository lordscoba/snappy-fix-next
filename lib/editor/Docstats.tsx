"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import React from "react";

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function readingTime(words: number): string {
  const mins = Math.ceil(words / 200);
  return mins < 1 ? "< 1 min read" : `${mins} min read`;
}

export function DocStats({ editor }: { editor: Editor }) {
  const stats = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return { words: 0, chars: 0, paragraphs: 0 };
      const text = e.state.doc.textContent;
      let paragraphs = 0;
      e.state.doc.forEach((node) => {
        if (node.type.name === "paragraph" && node.textContent.trim())
          paragraphs++;
      });
      return {
        words: countWords(text),
        chars: text.length,
        paragraphs,
      };
    },
  });

  const { words, chars, paragraphs } = stats ?? {
    words: 0,
    chars: 0,
    paragraphs: 0,
  };

  return (
    <div className="doc-stats">
      <span>{words.toLocaleString()} words</span>
      <span className="stats-dot">·</span>
      <span>{chars.toLocaleString()} characters</span>
      <span className="stats-dot">·</span>
      <span>
        {paragraphs} paragraph{paragraphs !== 1 ? "s" : ""}
      </span>
      <span className="stats-dot">·</span>
      <span>{readingTime(words)}</span>
    </div>
  );
}
