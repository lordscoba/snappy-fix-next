"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import {
  imageToBase64,
  ImageToBase64Response,
} from "@/lib/api/services/image-to-base64.service";
import { AxiosProgressEvent } from "axios";
import {
  ArrowRightLeft,
  Check,
  Copy,
  Download,
  RefreshCcw,
  UploadCloud,
} from "lucide-react"; // Assuming lucide-react is installed
import Link from "next/link";

export default function ImageToBase64Tools() {
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
  const [result, setResult] = useState<ImageToBase64Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  /* -------------------- File Handling -------------------- */

  const handleFile = useCallback(
    (selectedFile: File) => {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      setError(null);
      setResult(null);
      setFile(selectedFile);

      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(selectedFile));
    },
    [preview],
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* -------------------- Logic -------------------- */

  const handleConvert = async () => {
    if (!file) return;
    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setResult(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = imageToBase64(
        file,
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

      if (!response.data.success) throw new Error("Conversion failed.");
      setResult(response.data);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);
      setError(
        err?.response?.data?.detail || err?.message || "Conversion failed.",
      );
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 600);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    dispatch(resetProgress());
  };

  return (
    <section className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 space-y-6 transition-all">
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Image to Base64</h2>
        <p className="text-slate-500 text-sm">
          Convert your images into data strings instantly
        </p>
      </header>

      {/* Upload Zone */}
      {!result && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all duration-300 group
          ${dragActive ? "border-[#fb397d] bg-pink-50/50 scale-[1.01]" : "border-slate-200 bg-slate-50 hover:bg-white hover:border-[#fb397d]/50"}`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            disabled={isGlobalLoading}
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 rounded-xl shadow-md border-2 border-white"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-xs">
                  Change Image
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#fb397d]">
                <UploadCloud size={32} />
              </div>
            )}
            <div className="text-center">
              <p className="font-semibold text-slate-700">
                {preview ? file?.name : "Click or drag image here"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PNG, JPG, WEBP
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3">
          <span className="shrink-0">⚠️</span> {error}
        </div>
      )}

      {!result && (
        <button
          onClick={handleConvert}
          disabled={!file || isGlobalLoading}
          className="w-full h-14 bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] active:scale-[0.98] transition-all disabled:bg-slate-100 disabled:text-slate-400 flex items-center justify-center gap-2"
        >
          {isGlobalLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Convert Now"
          )}
        </button>
      )}

      {/* Progress Bar */}
      {isGlobalLoading && (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Processing</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#fb397d] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && !isGlobalLoading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">
                Output Preview
              </label>
              <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4">
                <img
                  src={`data:image/${result.format};base64,${result.base64}`}
                  alt="Converted"
                  className="max-h-full rounded-lg shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-xs font-bold text-slate-400 uppercase">
                Base64 String
              </label>
              <div className="relative flex-grow">
                <textarea
                  value={result.base64}
                  readOnly
                  className="w-full h-full min-h-[150px] p-4 rounded-2xl border border-slate-200 bg-slate-50 text-[10px] font-mono break-all focus:outline-none focus:ring-2 ring-[#fb397d]/10"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className={`flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                ${copied ? "bg-green-500 text-white" : "bg-[#5b32b4] text-white hover:bg-[#4a2896]"}`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy String"}
            </button>
            <button
              onClick={handleReset}
              className="px-6 h-12 rounded-xl font-bold text-slate-400 hover:text-[#fb397d] hover:bg-pink-50 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Link
          href={"/tools/base64-to-image"}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-3xl 
        bg-gradient-to-r from-[#f3ecff] to-white 
        border border-[#e9e1ff] 
        text-[#5b32b4] font-semibold 
        hover:shadow-[0_10px_30px_rgba(91,50,180,0.2)] 
        hover:-translate-y-0.5 
        transition-all duration-300"
        >
          <ArrowRightLeft
            size={18}
            className="group-hover:rotate-180 transition-transform duration-500"
          />{" "}
          <span className="group-hover:translate-x-1 transition-transform duration-500">
            Base64 to Image
          </span>
        </Link>
      </div>
    </section>
  );
}
