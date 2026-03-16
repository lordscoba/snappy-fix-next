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
  analyzeImage,
  ImageAnalysisResponse,
} from "@/lib/api/services/image-analyzer.service";
import { AxiosProgressEvent } from "axios";
import {
  Info as InfoIcon,
  Palette,
  Settings,
  Zap,
  Copy,
  Check,
  Maximize,
  FileText,
  Eye,
} from "lucide-react";

export default function ImageAnalyserTools() {
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
  const [analysis, setAnalysis] = useState<ImageAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setAnalysis(null);
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

  const handleAnalyze = async () => {
    if (!file) return;
    try {
      setError(null);
      setAnalysis(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      const response = await analyzeImage(file, (p: AxiosProgressEvent) => {
        const uploadPercent = Math.round((p.loaded * 100) / (p.total || 1));
        dispatch(setProgress(Math.min(uploadPercent * 0.7, 70)));
      });

      dispatch(setProgress(100));
      setAnalysis(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || err?.message || "Image analysis failed.",
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    setError(null);
    dispatch(resetProgress());
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const derivedInsights = useMemo(() => {
    if (!analysis) return null;

    const { width, height, file_size_kb } = analysis.basic_info;
    const { brightness_score, contrast_score } = analysis.visual_analysis;

    const resolutionLabel =
      width >= 3840
        ? "4K Ultra HD"
        : width >= 2560
          ? "2K / QHD"
          : width >= 1920
            ? "Full HD"
            : width >= 1280
              ? "HD"
              : "Standard";

    const brightnessLevel =
      brightness_score < 40
        ? "Very Dark"
        : brightness_score < 90
          ? "Dark"
          : brightness_score < 170
            ? "Balanced"
            : "Very Bright";

    const contrastLevel =
      contrast_score < 20
        ? "Low Contrast"
        : contrast_score < 50
          ? "Balanced Contrast"
          : "High Contrast";

    const sizeLevel =
      file_size_kb > 1500 ? "Heavy" : file_size_kb > 500 ? "Moderate" : "Light";

    return {
      resolutionLabel,
      brightnessLevel,
      contrastLevel,
      sizeLevel,
    };
  }, [analysis]);

  return (
    <section className="max-w-5xl mx-auto bg-gradient-to-br from-white to-[#faf7ff] border border-[#e9e1ff] rounded-[2.5rem] p-3 md:p-10 shadow-[0_25px_70px_rgba(91,50,180,0.15)] space-y-8">
      {/* 1. Upload Section */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-[2rem] p-8 text-center transition-all duration-300
        ${dragActive ? "border-[#fb397d] bg-pink-50 scale-[1.01]" : "border-[#d6c7ef] bg-[#faf9ff] hover:bg-white"}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isGlobalLoading}
        />

        {!preview ? (
          <div className="space-y-3">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-[#fb397d]">
              <Maximize size={32} />
            </div>
            <p className="text-lg font-bold text-[#2b1d3a]">
              Upload image for deep analysis
            </p>
          </div>
        ) : (
          <div className="relative inline-block group">
            <img
              src={preview}
              className="max-h-72 rounded-2xl shadow-xl border-4 border-white"
            />
            {!analysis && (
              <div className="absolute inset-0 bg-black/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-sm">
                Click to change
              </div>
            )}
          </div>
        )}
      </div>

      {!analysis && (
        <button
          onClick={handleAnalyze}
          disabled={!file || isGlobalLoading}
          className="w-full h-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          aria-label="analyze image"
        >
          {isGlobalLoading ? "Reading Pixels..." : "Start Full Analysis"}
        </button>
      )}

      {isGlobalLoading && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#fb397d] h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex gap-2">
          <InfoIcon size={18} /> {error}
        </div>
      )}

      {/* 2. Analysis Results */}
      {analysis && !isGlobalLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Left Column: Metrics & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                icon={<Maximize size={16} />}
                label="Resolution"
                value={`${analysis.basic_info.width} × ${analysis.basic_info.height}`}
                highlight={derivedInsights?.resolutionLabel}
              />
              <MetricCard
                icon={<FileText size={16} />}
                label="Aspect Ratio"
                value={analysis.basic_info.aspect_ratio.toFixed(2)}
                highlight={getAspectRatioLabel(
                  analysis.basic_info.width,
                  analysis.basic_info.height,
                )}
              />

              <MetricCard
                icon={<FileText size={16} />}
                label="Format"
                value={analysis.basic_info.format}
              />

              <MetricCard
                icon={<Settings size={16} />}
                label="Mode"
                value={analysis.basic_info.mode}
              />

              <MetricCard
                icon={<Zap size={16} />}
                label="File Size"
                value={`${analysis.basic_info.file_size_kb} KB`}
                severity={derivedInsights?.sizeLevel}
              />
            </div>

            {/* Visual Analysis */}
            <div className="bg-white border border-[#e9e1ff] rounded-[2rem] p-6 shadow-sm">
              <h3 className="font-bold text-[#5b32b4] mb-6 flex items-center gap-2">
                <Palette size={20} /> Visual DNA
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <ScoreMeter
                  label="Brightness"
                  score={analysis.visual_analysis.brightness_score}
                  max={255}
                  interpretation={derivedInsights?.brightnessLevel}
                />

                <ScoreMeter
                  label="Contrast"
                  score={analysis.visual_analysis.contrast_score}
                  max={100}
                  interpretation={derivedInsights?.contrastLevel}
                />
              </div>
              <div className="mb-6 bg-[#faf7ff] border border-[#e9e1ff] rounded-2xl p-5 flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl shadow-md border"
                  style={{
                    backgroundColor: analysis.visual_analysis.primary_color.hex,
                  }}
                />

                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Dominant Color
                  </p>
                  <p className="font-bold text-[#2b1d3a]">
                    {analysis.visual_analysis.primary_color.hex}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Color Palette (Click to Copy)
                </p>
                <div className="flex flex-wrap gap-3">
                  {analysis.visual_analysis.color_palette.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => copyToClipboard(color.hex)}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl border-2 border-white shadow-md transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                        {copiedHex === color.hex ? (
                          <Check size={10} className="text-green-500" />
                        ) : (
                          <Copy size={10} />
                        )}
                        {color.hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* EXIF Metadata (The "Hidden" Stuff) */}
            <div className="bg-white border border-[#e9e1ff] rounded-[2rem] p-6 shadow-sm">
              <h3 className="font-bold text-[#5b32b4] mb-4 flex items-center gap-2">
                <InfoIcon size={20} /> Advanced Metadata
              </h3>

              {analysis.metadata &&
              Object.keys(analysis.metadata).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                  {Object.entries(analysis.metadata).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between text-xs py-2 border-b border-slate-50"
                    >
                      <span className="text-gray-400">{key}</span>
                      <span className="text-slate-700 font-medium truncate ml-4">
                        {String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400 bg-[#faf9ff] border border-[#e9e1ff] rounded-xl p-4">
                  No EXIF metadata found. This image may have been compressed or
                  exported without camera information.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Recommendations & Reset */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-[#5b32b4] to-[#422485] text-white rounded-[2rem] p-8 shadow-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Zap size={20} className="text-yellow-400 fill-yellow-400" />
                Insights
              </h3>
              <ul className="space-y-4">
                {analysis.recommendations.length > 0 ? (
                  analysis.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-sm bg-white/10 p-3 rounded-xl border border-white/10 flex gap-2"
                    >
                      <span className="text-yellow-300">•</span> {rec}
                    </li>
                  ))
                ) : (
                  <li className="text-sm bg-white/10 p-3 rounded-xl border border-white/10">
                    Image looks optimized and web-ready.
                  </li>
                )}
              </ul>

              <button
                onClick={handleReset}
                className="w-full mt-8 h-12 bg-white text-[#5b32b4] font-bold rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw size={16} /> New Analysis
              </button>
            </div>

            {/* Simulated Preview Box */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Eye size={14} /> Social Preview
              </h3>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-200">
                  <img src={preview!} className="w-full h-full object-cover" />
                </div>
                <div className="mt-2 h-2 w-2/3 bg-slate-200 rounded" />
                <div className="mt-1 h-2 w-1/2 bg-slate-100 rounded" />
              </div>
              <p className="text-[10px] text-gray-400 mt-3 text-center italic">
                Example of how your image fits a 16:9 thumbnail ratio.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function getAspectRatioLabel(width: number, height: number) {
  const ratio = width / height;

  if (Math.abs(ratio - 1) < 0.05) return "1:1 Square";
  if (Math.abs(ratio - 16 / 9) < 0.1) return "16:9 Widescreen";
  if (Math.abs(ratio - 4 / 3) < 0.1) return "4:3 Classic";
  if (ratio > 2) return "Ultra Wide";
  if (ratio < 0.8) return "Portrait";
  return "Custom";
}

/* Helper Components */
function MetricCard({
  icon,
  label,
  value,
  highlight,
  severity,
}: {
  icon: any;
  label: string;
  value: string;
  highlight?: string;
  severity?: string;
}) {
  const severityColor =
    severity === "Heavy"
      ? "text-red-500"
      : severity === "Moderate"
        ? "text-yellow-500"
        : "text-green-500";

  return (
    <div className="bg-white border border-[#e9e1ff] p-5 rounded-2xl shadow-sm">
      <div className="flex items-center justify-center text-[#fb397d] mb-2">
        {icon}
      </div>

      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider text-center">
        {label}
      </p>

      <p className="text-xs font-bold text-[#2b1d3a] text-center truncate">
        {value}
      </p>

      {highlight && (
        <p className="text-[10px] text-[#5b32b4] text-center mt-1 font-semibold">
          {highlight}
        </p>
      )}

      {severity && (
        <p
          className={`text-[10px] text-center mt-1 font-semibold ${severityColor}`}
        >
          {severity}
        </p>
      )}
    </div>
  );
}

function ScoreMeter({
  label,
  score,
  max,
  interpretation,
}: {
  label: string;
  score: number;
  max: number;
  interpretation?: string;
}) {
  const percentage = Math.min((score / max) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-gray-500 uppercase">{label}</span>
        <span className="text-[#5b32b4]">{score}</span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#5b32b4] to-[#fb397d] h-full rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {interpretation && (
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
          {interpretation}
        </p>
      )}
    </div>
  );
}

function RefreshCcw(props: any) {
  return (
    <svg
      {...props}
      xmlns="https://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
