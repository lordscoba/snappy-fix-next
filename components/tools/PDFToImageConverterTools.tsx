"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { pdfToImage } from "@/lib/api/services/image-to-pdf.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";

export default function PDFToImageConverterTools() {
  const dispatch = useDispatch();

  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );

  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [file, setFile] = useState<File | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [optimizedBlob, setOptimizedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "jpg">("png");

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setError(null);
    setOptimizedBlob(null);
    setFile(selectedFile);
    setPreviewName(selectedFile.name);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleConvert = async () => {
    if (!file) return;

    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setOptimizedBlob(null);

      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = pdfToImage(
        file,
        { format },
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
    setPreviewName(null);
    setOptimizedBlob(null);
    setError(null);
    dispatch(resetProgress());
  };

  return (
    <section className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.15)] space-y-8">
      {/* Format selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setFormat("png")}
          className={`px-5 py-2 rounded-xl font-bold ${
            format === "png"
              ? "bg-[#5b32b4] text-white"
              : "bg-gray-100 text-gray-500"
          }`}
          aria-label="png"
        >
          PNG
        </button>

        <button
          onClick={() => setFormat("jpg")}
          className={`px-5 py-2 rounded-xl font-bold ${
            format === "jpg"
              ? "bg-[#fb397d] text-white"
              : "bg-gray-100 text-gray-500"
          }`}
          aria-label="jpg"
        >
          JPG
        </button>
      </div>

      {/* Drag & Drop */}
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
          accept=".pdf"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={isGlobalLoading}
        />

        {!previewName ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-2xl">
              📄
            </div>
            <p className="text-lg font-bold text-[#2b1d3a]">
              Drop your PDF file
            </p>
            <p className="text-sm text-gray-400">Convert PDF pages to images</p>
          </div>
        ) : (
          <p className="text-sm font-medium text-gray-500 truncate px-4">
            {previewName}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm">
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleConvert}
        disabled={!file || isGlobalLoading}
        className="h-[60px] w-full bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 disabled:text-gray-400"
        aria-label="convert"
      >
        {isGlobalLoading ? "Converting..." : "Convert PDF to Image"}
      </button>

      {isGlobalLoading && (
        <div className="space-y-3">
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

      {optimizedBlob && !isGlobalLoading && (
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              downloadBlob(optimizedBlob, `pdf-page-${Date.now()}`)
            }
            className="w-full bg-[#5b32b4] text-white font-bold py-4 rounded-2xl"
          >
            📥 Download Image
          </button>

          <button
            onClick={handleReset}
            className="text-sm font-bold text-gray-400 hover:text-[#fb397d]"
          >
            Clear and start over
          </button>
        </div>
      )}
    </section>
  );
}
