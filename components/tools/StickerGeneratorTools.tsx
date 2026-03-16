"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import {
  videoToSticker,
  imageToSticker,
} from "@/lib/api/services/sticker-generator.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";
import {
  Settings2,
  Upload,
  Trash2,
  Zap,
  Download,
  RefreshCw,
  Clock,
  Layers,
  Share2,
  Send,
} from "lucide-react";

export default function StickerGeneratorTools() {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  // File & Type States
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  // Service Parameters
  const [fps, setFps] = useState(12);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [quality, setQuality] = useState<"hd" | "high" | "medium" | "low">(
    "medium",
  );
  const [reverse, setReverse] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selectedFile: File) => {
    const isVideo = selectedFile.type.startsWith("video/");
    const isImage = selectedFile.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setError("Please upload a valid image or video.");
      return;
    }

    setError(null);
    setResultBlob(null);
    setFile(selectedFile);
    setFileType(isVideo ? "video" : "image");

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleGenerate = async () => {
    if (!file) return;
    let currentProgress = 0;
    let processingInterval: NodeJS.Timeout | null = null;

    try {
      dispatch(startLoading());
      dispatch(resetProgress());

      const onProgress = (progressEvent: AxiosProgressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1),
        );
        currentProgress = Math.min(percent * 0.5, 50);
        dispatch(setProgress(currentProgress));
      };

      processingInterval = setInterval(() => {
        if (currentProgress < 95) {
          currentProgress += 0.5;
          dispatch(setProgress(Math.round(currentProgress)));
        }
      }, 200);

      const response =
        fileType === "video"
          ? await videoToSticker(
              file,
              {
                fps,
                start_time: startTime,
                end_time: endTime,
                quality,
                reverse,
              },
              onProgress,
            )
          : await imageToSticker(file, onProgress);

      if (processingInterval) clearInterval(processingInterval);
      dispatch(setProgress(100));
      setResultBlob(response.data);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 500);
    }
  };

  const handleShare = async () => {
    if (!resultBlob) return;
    const shareFile = new File([resultBlob], `sticker-${Date.now()}.webp`, {
      type: "image/webp",
    });

    if (navigator.share) {
      try {
        await navigator.share({
          files: [shareFile],
          title: "My Custom Sticker",
          text: "Check out this sticker I made!",
        });
      } catch (err) {
        console.error("Sharing failed", err);
      }
    } else {
      setError(
        "Sharing is not supported on this browser. Please download instead.",
      );
    }
  };

  const handleWhatsAppStatus = async () => {
    if (!resultBlob) return;

    const file = new File([resultBlob], "snappy-fix-sticker.webp", {
      type: "image/webp",
    });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "My Sticker",
          text: "Check out this sticker I created!",
        });
      } catch (error) {
        console.error("Sharing failed", error);
      }
    } else {
      alert("Sharing is only supported on mobile browsers.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResultBlob(null);
    setError(null);
    setStartTime(0);
    setEndTime(5);
  };

  return (
    <section className="max-w-5xl mx-auto bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/50">
      <div className="flex flex-col lg:flex-row min-h-[650px]">
        {/* Left Side: Preview & Upload */}
        <div className="lg:w-1/2 bg-slate-50 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`w-full aspect-square max-w-[400px] border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-8 transition-all cursor-pointer group relative ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50 scale-[0.98]"
                  : "border-slate-200 bg-white hover:border-indigo-400"
              }`}
            >
              <input
                type="file"
                accept="video/*,image/*"
                onChange={(e) =>
                  e.target.files && handleFile(e.target.files[0])
                }
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Drop your file here
              </h3>
              <p className="text-slate-500 text-center mt-2 text-sm leading-relaxed">
                MP4, WEBM, PNG, or JPG. Max 5s recommended.
              </p>
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden shadow-2xl ring-[12px] ring-white">
                {fileType === "video" ? (
                  <video
                    src={preview!}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview!}
                    className="w-full h-full object-contain p-6"
                    alt="Source"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                    {fileType}
                  </span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
                aria-label="start over"
              >
                <Trash2 size={16} /> Start Over
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Controls */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <Zap className="text-indigo-600 fill-indigo-600" size={32} />{" "}
              Studio
            </h2>
            <p className="text-slate-400 font-medium mt-1">
              Refine your sticker properties
            </p>
          </div>

          <div className="space-y-8">
            {fileType === "video" ? (
              <div className="space-y-6">
                {/* FPS Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Layers size={14} /> Motion Detail
                    </label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {fps} FPS
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Start/End Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Start Time
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                        size={14}
                      />
                      <input
                        type="number"
                        value={startTime}
                        onChange={(e) => setStartTime(Number(e.target.value))}
                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:ring-2 ring-indigo-500/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      End Time
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                        size={14}
                      />
                      <input
                        type="number"
                        value={endTime}
                        onChange={(e) => setEndTime(Number(e.target.value))}
                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:ring-2 ring-indigo-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Quality & Reverse Switch */}
                <div className="flex flex-col items-start gap-6 w-full">
                  {" "}
                  {/* QUALITY SELECTOR */}
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                      <span className="text-sm">⚙️</span> Quality Preset
                    </span>

                    <div className="flex bg-slate-100 p-1 rounded-2xl overflow-x-auto no-scrollbar scroll-smooth">
                      {[
                        { label: "Ultra HD", value: "hd", icon: "🖼️" },
                        { label: "High", value: "high", icon: "⭐" },
                        { label: "Balanced", value: "medium", icon: "⚖️" },
                        { label: "Small", value: "low", icon: "📦" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setQuality(option.value as any)}
                          className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-all flex-1 sm:flex-none
          ${
            quality === option.value
              ? "bg-white text-indigo-600 shadow-md ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
          }`}
                        >
                          <span className="text-base leading-none">
                            {option.icon}
                          </span>
                          <span
                            className={
                              quality === option.value
                                ? "opacity-100"
                                : "opacity-70"
                            }
                          >
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* REVERSE TOGGLE */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                      <span className="text-sm">🔄</span> Reverse
                    </span>

                    <button
                      onClick={() => setReverse(!reverse)}
                      className={`h-[46px] w-[7rem] rounded-2xl transition-all duration-300 flex items-center relative p-1 group overflow-hidden ${
                        reverse
                          ? "bg-indigo-600 shadow-lg shadow-indigo-200"
                          : "bg-slate-100 border border-slate-200"
                      }`}
                      aria-label="reverse switch"
                    >
                      {/* Background Text Labels */}
                      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                        <span
                          className={`text-[9px] font-black transition-opacity ${reverse ? "opacity-100 text-white" : "opacity-0"}`}
                        >
                          ON
                        </span>
                        <span
                          className={`text-[9px] font-black transition-opacity ${!reverse ? "opacity-100 text-slate-400" : "opacity-0"}`}
                        >
                          OFF
                        </span>
                      </div>

                      {/* Sliding Knob */}
                      <div
                        className={`z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ease-out shadow-sm ${
                          reverse
                            ? "translate-x-10 bg-white text-indigo-600 rotate-180"
                            : "translate-x-0 bg-white text-slate-400"
                        }`}
                      >
                        <RefreshCw
                          size={14}
                          className={
                            reverse
                              ? "animate-spin-slow"
                              : "group-hover:rotate-45 transition-transform"
                          }
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 flex items-center gap-5">
                <div className="p-4 bg-white rounded-2xl text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                  <Settings2 size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 uppercase tracking-tight">
                    Smart Engine
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Auto-scaling, transparency, and WEBP conversion enabled.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGlobalLoading || !file}
              className="group relative w-full h-16 bg-slate-900 text-white font-black rounded-2xl overflow-hidden transition-all hover:bg-indigo-600 disabled:bg-slate-200"
              aria-label="generate sticker"
            >
              {isGlobalLoading ? (
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span className="animate-spin text-xl">✨</span>
                  Rendering {progress}%
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  Generate Sticker <Zap size={18} fill="currentColor" />
                </span>
              )}
              {isGlobalLoading && (
                <div
                  className="absolute inset-0 bg-indigo-500/40 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          </div>
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>

      {/* Result Section */}
      {resultBlob && !isGlobalLoading && (
        <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12 border-t border-slate-800">
          <div className="relative">
            <div className="bg-[#0b141a] p-12 rounded-[3rem] shadow-2xl relative">
              <div className="bg-[#056162] p-3 rounded-2xl rounded-tl-none shadow-xl relative animate-in zoom-in duration-500">
                <img
                  src={URL.createObjectURL(resultBlob)}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain"
                  alt="Result"
                />
                <span className="text-[10px] text-white/40 block text-right mt-2 font-bold uppercase tracking-widest">
                  Delivered ✓✓
                </span>
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-6 text-center md:text-left">
            <div>
              <h4 className="text-3xl font-black tracking-tight">
                Boom! It's ready.
              </h4>
              <p className="text-slate-400 font-medium mt-1">
                Share it directly to your favorite apps.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={() =>
                  downloadBlob(resultBlob, `sticker-${Date.now()}`)
                }
                className="bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                <Download size={18} /> Download
              </button>

              <button
                onClick={handleShare}
                className="bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Share2 size={18} /> Send to App
              </button>

              <button
                onClick={handleWhatsAppStatus}
                className="sm:col-span-2 bg-[#25D366] text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> Share to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
