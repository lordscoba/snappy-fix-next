"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import {
  imageDpiChecker,
  ImageDpiCheckerResponse,
} from "@/lib/api/services/image-dpi-changer.services"; // Ensure correct path
import { AxiosProgressEvent } from "axios";

export default function ImageDPICheckerTools() {
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
  const [dpiData, setDpiData] = useState<ImageDpiCheckerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setDpiData(null);
    setFile(selectedFile);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleCheckDPI = async () => {
    if (!file) return;

    try {
      setError(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      const response = await imageDpiChecker(
        file,
        (progressEvent: AxiosProgressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );

          dispatch(setProgress(Math.min(percent, 90)));
        },
      );

      setDpiData(response.data);

      dispatch(setProgress(100));
    } catch (err: any) {
      setError("Analysis failed. The image may not contain DPI metadata.");
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 500);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setDpiData(null);
    setError(null);
  };

  const printWidth = dpiData?.dpi_x ? dpiData.width / dpiData.dpi_x : null;

  const printHeight = dpiData?.dpi_y ? dpiData.height / dpiData.dpi_y : null;

  return (
    <section className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white border border-[#e9e1ff] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.1)]">
        {!dpiData ? (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#2b1d3a]">
                DPI & Print Analyzer
              </h2>
              <p className="text-gray-500">
                Check if your image is high enough resolution for professional
                printing.
              </p>
            </div>

            {/* Drag & Drop */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files?.[0])
                  handleFile(e.dataTransfer.files[0]);
              }}
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-[#fb397d] bg-pink-50"
                  : "border-[#d6c7ef] bg-[#faf9ff]"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleFile(e.target.files[0])
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              {!preview ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-2xl">
                    📏
                  </div>
                  <p className="text-lg font-bold text-[#2b1d3a]">
                    Upload image to analyze
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports JPG, PNG, TIFF, and PSD
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={preview}
                    className="max-h-48 mx-auto rounded-xl shadow-md border-4 border-white"
                    alt="Preview"
                  />
                  <p className="text-sm font-medium text-gray-500">
                    {file?.name}
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100">
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleCheckDPI}
              disabled={!file || isGlobalLoading}
              className="h-16 w-full bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 flex items-center justify-center gap-2"
            >
              {isGlobalLoading
                ? `Analyzing Metadata ${progress}%...`
                : "Analyze DPI Quality"}
            </button>
          </div>
        ) : (
          /* Result Dashboard */
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h3 className="text-xl font-bold text-[#2b1d3a]">
                Analysis Results
              </h3>

              <button
                onClick={handleReset}
                className="text-sm font-bold text-[#fb397d] hover:underline"
              >
                Analyze another image
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* DPI */}
              <div className="p-6 bg-gray-50 rounded-3xl text-center space-y-2 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Current DPI
                </p>

                <p className="text-3xl font-black text-[#5b32b4]">
                  {dpiData.dpi_x ? Math.round(dpiData.dpi_x) : "N/A"}
                </p>

                <p className="text-[10px] text-gray-500">Dots Per Inch</p>
              </div>

              {/* Resolution */}
              <div className="p-6 bg-gray-50 rounded-3xl text-center space-y-2 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Resolution
                </p>

                <p className="text-xl font-bold text-[#2b1d3a]">
                  {dpiData.width} × {dpiData.height}
                </p>

                <p className="text-[10px] text-gray-500">Total Pixels</p>
              </div>

              {/* Print Size */}
              <div className="p-6 bg-gray-50 rounded-3xl text-center space-y-2 border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Print Size
                </p>

                <p className="text-xl font-bold text-[#2b1d3a]">
                  {printWidth
                    ? `${printWidth.toFixed(2)}" × ${printHeight?.toFixed(2)}"`
                    : "N/A"}
                </p>

                <p className="text-[10px] text-gray-500">at current DPI</p>
              </div>
            </div>

            {/* Quality Indicator */}

            <div
              className={`p-6 rounded-[2rem] flex items-center gap-6 ${
                dpiData.dpi_x && dpiData.dpi_x >= 300
                  ? "bg-green-50 border border-green-100"
                  : "bg-yellow-50 border border-yellow-100"
              }`}
            >
              <div className="text-3xl">
                {dpiData.dpi_x && dpiData.dpi_x >= 300 ? "✅" : "⚠️"}
              </div>

              <div>
                <p
                  className={`font-bold ${
                    dpiData.dpi_x && dpiData.dpi_x >= 300
                      ? "text-green-700"
                      : "text-yellow-700"
                  }`}
                >
                  {dpiData.dpi_x && dpiData.dpi_x >= 300
                    ? "Print-Ready (High Quality)"
                    : "Web Quality (Low DPI)"}
                </p>

                <p className="text-sm opacity-80">
                  {dpiData.dpi_x && dpiData.dpi_x >= 300
                    ? "This image exceeds the 300 DPI standard for professional printing."
                    : "For high-quality printing, 300 DPI is recommended."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Progress */}
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

      {/* Educational Block */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#f4edff] p-8 rounded-[2rem]">
          <h4 className="font-bold text-[#5b32b4] mb-2">What is DPI?</h4>
          <p className="text-sm text-[#5b32b4]/70 leading-relaxed">
            DPI (Dots Per Inch) describes the resolution of a printed image. The
            higher the DPI, the more detail is packed into every inch of the
            paper.
          </p>
        </div>
        <div className="bg-[#fff0f5] p-8 rounded-[2rem]">
          <h4 className="font-bold text-[#fb397d] mb-2">The 300 DPI Rule</h4>
          <p className="text-sm text-[#fb397d]/70 leading-relaxed">
            Standard magazines and brochures require 300 DPI. For billboards,
            lower DPI is often acceptable due to viewing distance.
          </p>
        </div>
      </div>
    </section>
  );
}
