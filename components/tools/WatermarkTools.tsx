"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import {
  watermarkImage,
  WatermarkPosition,
} from "@/lib/api/services/watermark-images.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";
import {
  Upload,
  Image as ImageIcon,
  Type,
  Download,
  Settings2,
  Trash2,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Maximize2,
  Palette,
} from "lucide-react";

export default function WatermarkTools() {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  // File States
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configuration States
  const [wmType, setWmType] = useState<"text" | "image">("text");
  const [text, setText] = useState("Property of Snappy Fix");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [wmFile, setWmFile] = useState<File | null>(null);
  const [wmFilePreview, setWmFilePreview] = useState<string | null>(null);
  const [position, setPosition] = useState<WatermarkPosition>("bottom-right");
  const positions: Record<string, WatermarkPosition | null> = {
    "1-1": "top-left",
    "1-2": null,
    "1-3": "top-right",
    "2-1": null,
    "2-2": "center",
    "2-3": null,
    "3-1": "bottom-left",
    "3-2": null,
    "3-3": "bottom-right",
  };
  const [opacity, setOpacity] = useState(60);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(0.3);
  const [compression, setCompression] = useState<"low" | "medium" | "high">(
    "medium",
  );
  const downloadRef = useRef<HTMLDivElement | null>(null);

  const quickSwatches = [
    "#FFFFFF", // White
    "#000000", // Black
    "#FFD700", // Gold
    "#FF3B30", // Red
    "#007AFF", // Blue
    "#8E8E93", // Gray
    "#34C759", // Green
    "#FF9500", // Orange
    "#AF52DE", // Purple
    "#00C7BE", // Teal
    "#FF2D55", // Pink
    "#5856D6", // Indigo
    "#5AC8FA", // Light Blue
    "#FFCC00", // Yellow
    "#A2845E", // Bronze
    "#C7C7CC", // Light Gray
    "#1C1C1E", // Dark Gray
    "#3A3A3C", // Charcoal
    "#30B0C7", // Cyan
    "#FF6B6B", // Coral
  ];
  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setResultBlob(null);
    setFile(selectedFile);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleWmFile = (selectedFile: File) => {
    setWmFile(selectedFile);
    if (wmFilePreview) URL.revokeObjectURL(wmFilePreview);
    setWmFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleGenerate = async () => {
    if (!file) return;

    let currentProgress = 0;
    let processingInterval: NodeJS.Timeout | null = null;

    try {
      setError(null);
      setResultBlob(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = watermarkImage(
        file,
        { disposition: "attachment" },
        {
          watermark_type: wmType,
          text: wmType === "text" ? text : undefined,
          font_size: fontSize,
          color,
          watermark_file: wmType === "image" ? wmFile || undefined : undefined,
          position,
          opacity,
          rotation,
          scale,
          compression: compression as any,
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
      }, 150);

      const response = await responsePromise;

      if (processingInterval) clearInterval(processingInterval);
      dispatch(setProgress(100));
      setResultBlob(response.data);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      if (err.response?.data instanceof Blob) {
        try {
          const errorText = await err.response.data.text();
          const json = JSON.parse(errorText);
          setError(json.detail || "Failed to apply watermark.");
        } catch {
          setError("Failed to process image. Please check format.");
        }
      } else {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "An unexpected error occurred.",
        );
      }
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 600);
    }
  };

  useEffect(() => {
    if (resultBlob && !isGlobalLoading) {
      setTimeout(() => {
        downloadRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [resultBlob, isGlobalLoading]);
  return (
    <section className="max-w-6xl mx-auto space-y-8 p-1">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Preview Panel */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div
            className={`relative min-h-[500px] border-2 border-dashed rounded-[2.5rem] overflow-hidden transition-all duration-500 bg-slate-50 flex items-center justify-center ${!file ? "border-slate-200" : "border-transparent bg-slate-900 shadow-2xl"}`}
          >
            {!file ? (
              <div className="text-center p-12 group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleFile(e.target.files[0])
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 text-indigo-500 group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-700">
                  Protect your work
                </h3>
                <p className="text-slate-400 mt-2 max-w-xs mx-auto">
                  Drag and drop your base image here to start watermarking.
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <img
                  src={preview!}
                  className="max-h-[600px] w-full object-contain rounded-xl"
                  alt="Original Preview"
                />
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setResultBlob(null);
                  }}
                  className="absolute top-6 right-6 bg-white/10 hover:bg-red-500 text-white p-3 rounded-2xl backdrop-blur-xl transition-all"
                  aria-label="remove image"
                >
                  <Trash2 size={20} />
                </button>
                <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                    Source Loaded
                  </span>
                </div>
              </div>
            )}
          </div>

          {resultBlob && !isGlobalLoading && (
            <div
              ref={downloadRef}
              className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-200 animate-in slide-in-from-bottom-4"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-white/20 rounded-2xl">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-black">Export Ready</h4>
                  <p className="text-indigo-100 text-sm">
                    Watermark successfully layered onto your image.
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  downloadBlob(resultBlob, `protected-${Date.now()}`)
                }
                className="w-full md:w-auto bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={20} /> Download
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Controls Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 space-y-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Watermark Studio
            </h2>
            <p className="text-slate-400 text-sm">
              Customize your protection layer
            </p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setWmType("text")}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${wmType === "text" ? "bg-white shadow-md text-indigo-600" : "text-slate-500"}`}
              aria-label="text watermark"
            >
              <Type size={16} /> Text
            </button>
            <button
              onClick={() => setWmType("image")}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${wmType === "image" ? "bg-white shadow-md text-indigo-600" : "text-slate-500"}`}
              aria-label="image watermark"
            >
              <ImageIcon size={16} /> Logo
            </button>
          </div>

          <div className="space-y-6">
            {wmType === "text" ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Watermark Content
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter watermark text..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-indigo-500/10 transition-all font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Size ({fontSize}px)
                    </label>
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Palette size={10} /> Hex Color
                    </label>

                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      {/* Color Picker */}
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="h-12 w-full sm:w-14 sm:h-14 p-1 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer"
                      />

                      {/* Hex Input */}
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-1 w-full p-3 sm:p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-mono uppercase"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Palette Swatches */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Quick Swatches
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickSwatches.map((swatch) => (
                      <button
                        key={swatch}
                        onClick={() => setColor(swatch)}
                        className={`w-8 h-8 rounded-full border transition-all duration-200 hover:scale-110 shadow-sm
  ${color === swatch ? "ring-2 ring-[#5b32b4] ring-offset-2 shadow-md" : "border-transparent"}`}
                        style={{ backgroundColor: swatch }}
                        title={swatch}
                        aria-label={swatch}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Brand Logo (Transparent PNG)
                </label>
                <div className="relative h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 overflow-hidden hover:border-indigo-400 transition-colors group">
                  {wmFilePreview ? (
                    <div className="relative group w-full h-full flex items-center justify-center bg-slate-100">
                      <img
                        src={wmFilePreview}
                        className="h-20 object-contain drop-shadow-md"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="text-white" size={24} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={20} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Upload PNG
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && handleWmFile(e.target.files[0])
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Logo Scale</span>
                    <span>{Math.round(scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 tracking-widest flex items-center gap-2">
                <Maximize2 size={12} /> Grid Position
              </label>

              <div className="w-full h-48 mx-auto grid grid-cols-3 grid-rows-3 gap-2 p-3 bg-slate-50 border rounded-xl">
                {Object.entries(positions).map(([key, pos]) =>
                  pos ? (
                    <button
                      key={key}
                      onClick={() => setPosition(pos)}
                      className={`text-[10px] font-bold rounded-lg border transition-all
              ${
                position === pos
                  ? "border-[#5b32b4] bg-[#5b32b4]/10 text-[#5b32b4]"
                  : "border-slate-200 bg-white text-slate-400 hover:bg-slate-100"
              }`}
                      title={pos}
                      aria-label={pos}
                    >
                      {pos}
                    </button>
                  ) : (
                    <div key={key} />
                  ),
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Opacity</span>
                  <span>{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Rotation</span>
                  <span>{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Quality Preset
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["low", "medium", "high"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCompression(level as any)}
                    className={`py-2 rounded-lg text-[10px] font-bold capitalize border transition-all ${compression === level ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-100"}`}
                    aria-label={level}
                    title={level}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 animate-shake">
                <AlertCircle size={18} className="shrink-0" />
                <p className="text-xs font-bold">{error}</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={
                !file || isGlobalLoading || (wmType === "image" && !wmFile)
              }
              className="group relative w-full h-16 bg-slate-900 text-white font-black rounded-2xl overflow-hidden transition-all hover:bg-indigo-600 disabled:bg-slate-100 disabled:text-slate-400"
              aria-label="generate watermark"
            >
              {isGlobalLoading ? (
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <RefreshCw className="animate-spin" size={20} />
                  Processing {progress}%
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Secure Image <ShieldCheck size={20} />
                </span>
              )}
              {isGlobalLoading && (
                <div
                  className="absolute inset-0 bg-indigo-500/30 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
