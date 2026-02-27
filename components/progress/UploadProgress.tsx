"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function UploadProgress() {
  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );

  if (progress <= 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-[#f3f0ff] z-50">
      <div
        className="h-full bg-gradient-to-r from-[#5b32b4] via-[#8e44ff] to-[#fb397d] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
