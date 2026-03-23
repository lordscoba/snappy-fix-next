"use client";

import { useState } from "react";
import { HiLink, HiCheckCircle } from "react-icons/hi2";
import {
  FaXTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";

type BlogShareBarProps = {
  title: string;
  slug: string;
};

export default function BlogShareBar({ title, slug }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://www.snappy-fix.com/blog/${slug}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "X (Twitter)",
      icon: <FaXTwitter size={14} />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-black hover:border-black",
    },
    {
      label: "Facebook",
      icon: <FaFacebook size={14} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    },
    {
      label: "LinkedIn",
      icon: <FaLinkedin size={14} />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp size={14} />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366] hover:border-[#25D366]",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mb-10 flex flex-wrap items-center gap-3">
      {/* Label */}
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f5a88] mr-1">
        Share
      </span>

      {/* Social links */}
      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.label}`}
          className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c4b5d9] ${s.color} hover:text-white hover:border-transparent transition-all duration-200 hover:scale-110 hover:shadow-lg`}
        >
          {s.icon}
        </a>
      ))}

      {/* Divider */}
      <div className="w-px h-5 bg-white/10" />

      {/* Copy link */}
      <button
        type="button"
        aria-label="Copy link"
        onClick={handleCopy}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
          copied
            ? "bg-[#5b32b4]/30 border-[#5b32b4] text-[#e0ccff]"
            : "bg-white/5 border-white/10 text-[#c4b5d9] hover:bg-[#5b32b4]/20 hover:border-[#5b32b4] hover:text-white"
        }`}
      >
        {copied ? (
          <>
            <HiCheckCircle size={14} className="text-[#fb397d]" />
            Copied!
          </>
        ) : (
          <>
            <HiLink size={14} />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
