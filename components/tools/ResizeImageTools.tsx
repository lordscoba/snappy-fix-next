"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { resizeImage } from "@/lib/api/services/resize-image.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";

const PRESET_SIZES = [
  {
    group: "Social Media Posts",
    items: [
      { label: "Instagram Square (1080×1080)", width: 1080, height: 1080 },
      { label: "Instagram Portrait (1080×1350)", width: 1080, height: 1350 },
      {
        label: "Instagram/TikTok Stories (1080×1920)",
        width: 1080,
        height: 1920,
      },
      { label: "Twitter/X Post (1200×675)", width: 1200, height: 675 },
      { label: "Facebook Post (1200×630)", width: 1200, height: 630 },
      { label: "LinkedIn Post (1200×627)", width: 1200, height: 627 },
    ],
  },
  {
    group: "Video & Thumbnails",
    items: [
      { label: "YouTube Thumbnail (1280×720)", width: 1280, height: 720 },
      { label: "YouTube HD Thumbnail (1920×1080)", width: 1920, height: 1080 },
      { label: "Twitch Offline Banner (1920×1080)", width: 1920, height: 1080 },
    ],
  },
  {
    group: "Banners & Headers",
    items: [
      { label: "Twitter Header (1500×500)", width: 1500, height: 500 },
      { label: "LinkedIn Banner (1584×396)", width: 1584, height: 396 },
      { label: "Facebook Cover (820×312)", width: 820, height: 312 },
      { label: "YouTube Channel Art (2560×1440)", width: 2560, height: 1440 },
    ],
  },
  {
    group: "Messaging & Engagement",
    items: [
      { label: "WhatsApp Status (1080×1920)", width: 1080, height: 1920 },
      { label: "Pinterest Pin (1000×1500)", width: 1000, height: 1500 },
      { label: "Snapchat Snap (1080×1920)", width: 1080, height: 1920 },
    ],
  },
  {
    group: "Web & Documents",
    items: [
      { label: "Email Header (600×200)", width: 600, height: 200 },
      { label: "Presentation 16:9 (1920×1080)", width: 1920, height: 1080 },
      { label: "A4 Document (2480×3508)", width: 2480, height: 3508 },
      { label: "US Letter (2550×3300)", width: 2550, height: 3300 },
    ],
  },
];

export default function ResizeImageTool() {
  const dispatch = useDispatch();

  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );

  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [optimizedBlob, setOptimizedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // NEW STATES (only added)
  const [width, setWidth] = useState<number | "">(1200);
  const [height, setHeight] = useState<number | "">(675);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  // NEW STATES
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);

    if (value === "custom") return;

    for (const group of PRESET_SIZES) {
      const preset = group.items.find((p) => p.label === value);
      if (preset) {
        setWidth(preset.width);
        setHeight(preset.height);
        setKeepAspect(false);
        break;
      }
    }
  };

  /* -------------------- File Handling -------------------- */

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError(null);
    setOptimizedBlob(null);
    setFile(selectedFile);
    setOriginalSize(selectedFile.size); // 👈 file size in bytes

    if (preview) URL.revokeObjectURL(preview);

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // 👇 Extract width & height
    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
    };
    img.src = objectUrl;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* -------------------- Resize Logic -------------------- */

  const handleOptimize = async () => {
    if (!file) return;

    if (!width || !height) {
      setError("Width and height are required (in pixels).");
      return;
    }

    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setOptimizedBlob(null);

      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = resizeImage(
        file,
        {
          width,
          height,
          keep_aspect: keepAspect,
        },
        (progressEvent: AxiosProgressEvent) => {
          const uploadPercent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );

          currentProgress = Math.min(uploadPercent * 0.7, 70);
          dispatch(setProgress(currentProgress));
        },
      );

      processingInterval = setInterval(() => {
        if (currentProgress < 95) {
          currentProgress += 1;
          dispatch(setProgress(currentProgress));
        }
      }, 120);

      const response = await responsePromise;

      if (processingInterval) clearInterval(processingInterval);

      dispatch(setProgress(100));
      setOptimizedBlob(response.data);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Resize failed. Please try again.",
      );
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 600);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setOptimizedBlob(null);
    setError(null);
    dispatch(resetProgress());
  };

  /* -------------------- UI -------------------- */

  return (
    <section className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.15)] space-y-8 transition-all">
      {/* Drag & Drop (UNCHANGED) */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300
        ${
          dragActive
            ? "border-[#fb397d] bg-pink-50 scale-[1.02]"
            : "border-[#d6c7ef] bg-[#faf9ff] hover:bg-white"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={isGlobalLoading}
        />

        {!preview ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-2xl">
              🖼️
            </div>
            <div>
              <p className="text-lg font-bold text-[#2b1d3a]">
                Drop your image for resizing
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Resize using preset or custom pixel dimensions
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-2xl shadow-lg border-4 border-white"
            />
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium truncate px-4">{file?.name}</p>

              {originalWidth && originalHeight && (
                <>
                  <p>
                    Size: {originalWidth}px × {originalHeight}px
                  </p>

                  <p>
                    Aspect Ratio: {(originalWidth / originalHeight).toFixed(2)}{" "}
                    : 1
                  </p>
                </>
              )}

              {originalSize && (
                <p>File Size: {(originalSize / 1024).toFixed(2)} KB</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ✅ NEW SIZE CONTROLS (Added, nothing removed) */}
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Standard Sizes
          </label>

          <select
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full mt-2 border rounded-xl p-3"
          >
            <option value="custom">Custom Size</option>

            {PRESET_SIZES.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.items.map((preset) => (
                  <option key={preset.label} value={preset.label}>
                    {preset.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Width (px)
            </label>
            <input
              type="number"
              value={width}
              placeholder="Input width"
              onChange={(e) => {
                const value = e.target.value;
                setWidth(value === "" ? "" : Number(value));
              }}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Height (px)
            </label>
            <input
              type="number"
              value={height}
              placeholder="Input height"
              onChange={(e) => {
                const value = e.target.value;
                setHeight(value === "" ? "" : Number(value));
              }}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={keepAspect}
            onChange={(e) => setKeepAspect(e.target.checked)}
          />
          <span className="text-sm text-gray-600">Maintain aspect ratio</span>
        </div>
      </div>

      {/* Everything below UNCHANGED (error, progress, download) */}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Optimize Button */}
      <button
        onClick={handleOptimize}
        disabled={!file || isGlobalLoading}
        className="h-[60px] w-full bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
        aria-label="optimize image"
      >
        {isGlobalLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            resizing...
          </>
        ) : (
          "Resize Image"
        )}
      </button>

      {/* Progress */}
      {isGlobalLoading && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>{progress < 100 ? "UPLOADING..." : "PROCESSING..."}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#5b32b4] to-[#fb397d] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {optimizedBlob && !isGlobalLoading && (
        <div className="flex flex-col gap-3 animate-in zoom-in-95 duration-300">
          <button
            onClick={() => downloadBlob(optimizedBlob, `resized-${Date.now()}`)}
            className="w-full bg-[#5b32b4] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            📥 Download resized Image
          </button>

          <button
            onClick={handleReset}
            className="text-sm font-bold text-gray-400 hover:text-[#fb397d] transition-colors"
          >
            Clear and start over
          </button>
        </div>
      )}
    </section>
  );
}
