"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { faviconGenerator } from "@/lib/api/services/favicon-generator.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";

export default function FaviconGeneratorTool() {
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

  // NEW STATES
  const [extension, setExtension] = useState("ico");
  const [backgroundOption, setBackgroundOption] = useState("transparent");
  const [customBackground, setCustomBackground] = useState("");
  const [padding, setPadding] = useState(0);

  const finalBackground =
    backgroundOption === "custom" ? customBackground : backgroundOption;

  /* -------------------- File Handling -------------------- */

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError(null);
    setOptimizedBlob(null);
    setFile(selectedFile);

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selectedFile));
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

  /* -------------------- Generate Logic -------------------- */

  const handleGenerate = async () => {
    if (!file) return;

    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setOptimizedBlob(null);

      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = faviconGenerator(
        file,
        {
          extension,
          background: finalBackground,
          padding,
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

      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          setError(json.detail || "Optimization failed.");
        } catch {
          setError("Optimization failed. Please try again.");
        }
      } else {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Optimization failed. Please try again.",
        );
      }
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

  return (
    <section className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[2rem] p-8 md:p-12 space-y-8">
      {/* Upload Area */}
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
            ? "border-[#fb397d] bg-pink-50"
            : "border-[#d6c7ef] bg-[#faf9ff]"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isGlobalLoading}
        />

        {!preview ? (
          <p className="font-semibold text-gray-600">
            Drop your image to generate favicon
            <br />
            or
            <br />
            <span className="text-[#fb397d]">Browse</span>
          </p>
        ) : (
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 mx-auto rounded-xl"
          />
        )}
      </div>

      {/* Parameters Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Extension */}
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Extension
          </label>
          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="w-full mt-2 border rounded-xl p-3"
          >
            <option value="ico">ICO</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>

        {/* Background */}
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Background
          </label>
          <select
            value={backgroundOption}
            onChange={(e) => setBackgroundOption(e.target.value)}
            className="w-full mt-2 border rounded-xl p-3"
          >
            <option value="transparent">Transparent</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="custom">Custom</option>
          </select>

          {backgroundOption === "custom" && (
            <input
              type="text"
              placeholder="#ffffff or red"
              value={customBackground}
              onChange={(e) => setCustomBackground(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3"
            />
          )}
        </div>

        {/* Padding */}
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Padding (0–200)
          </label>
          <input
            type="number"
            min={0}
            max={200}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={handleGenerate}
        disabled={!file || isGlobalLoading}
        className="h-[60px] w-full bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
      >
        {isGlobalLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Generate Favicon"
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
            onClick={() => downloadBlob(optimizedBlob, `favicon-${Date.now()}`)}
            className="w-full bg-[#5b32b4] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            📥 Download Favicon
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
