"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { convertImage } from "@/lib/api/services/image-converter.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";

const SUPPORTED_FORMATS: Record<string, string> = {
  png: "PNG",
  jpeg: "JPEG",
  webp: "WEBP",
  bmp: "BMP",
  tiff: "TIFF",
  tif: "TIFF",
  gif: "GIF",
  ico: "ICO",
  jpg: "JPEG",
  avif: "AVIF",
};

export default function ImageConverterTool() {
  const dispatch = useDispatch();

  // Selectors
  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<string>("png");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setConvertedBlob(null);
    setFile(selectedFile);
    // Cleanup old preview before setting new one
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

  const handleConvert = async () => {
    if (!file) return;

    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setConvertedBlob(null);

      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = convertImage(
        file,
        format,
        (progressEvent: AxiosProgressEvent) => {
          const uploadPercent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );

          // Upload uses 0–70%
          currentProgress = Math.min(uploadPercent * 0.7, 70);
          dispatch(setProgress(currentProgress));
        },
      );

      // Fake processing progress (70 → 95)
      processingInterval = setInterval(() => {
        if (currentProgress < 95) {
          currentProgress += 1;
          dispatch(setProgress(currentProgress));
        }
      }, 120);

      const response = await responsePromise;

      if (processingInterval) clearInterval(processingInterval);

      dispatch(setProgress(100));
      setConvertedBlob(response.data);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          setError(json.detail || "Conversion failed.");
        } catch {
          setError("Conversion failed. Please try again.");
        }
      } else {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Conversion failed. Please try again.",
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
    setConvertedBlob(null);
    setError(null);
    dispatch(resetProgress());
  };

  return (
    <section className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.15)] space-y-8 transition-all">
      {/* Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300
        ${dragActive ? "border-[#fb397d] bg-pink-50 scale-[1.02]" : "border-[#d6c7ef] bg-[#faf9ff] hover:bg-white"}`}
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
              📸
            </div>
            <div>
              <p className="text-lg font-bold text-[#2b1d3a]">
                Drop your image here
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, WebP up to 10MB
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
            <p className="text-sm font-medium text-gray-500 truncate px-4">
              {file?.name}
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-1">
            Output Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            disabled={isGlobalLoading}
            className="w-full border-2 border-[#eee] rounded-2xl p-4 bg-white focus:border-[#5b32b4] outline-none transition-colors appearance-none cursor-pointer"
          >
            {Object.entries(SUPPORTED_FORMATS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          disabled={!file || isGlobalLoading}
          className="h-[60px] bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
        >
          {isGlobalLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Convert Now"
          )}
        </button>
      </div>

      {/* Progress & Results */}
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

      {convertedBlob && !isGlobalLoading && (
        <div className="flex flex-col gap-3 animate-in zoom-in-95 duration-300">
          <button
            onClick={() =>
              downloadBlob(convertedBlob, `converted-${Date.now()}`)
            }
            className="w-full bg-[#5b32b4] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            📥 Download Ready File
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
