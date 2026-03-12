"use client";

import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { base64ToImage } from "@/lib/api/services/base64-to-image.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";
import {
  Image as ImageIcon,
  FileCode,
  Download,
  RefreshCcw,
  AlertCircle,
  ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";

export default function Base64ToImageTools() {
  const dispatch = useDispatch();

  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [base64Input, setBase64Input] = useState("");
  const [optimizedBlob, setOptimizedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Clean the input to check if it's likely valid
  const isValidInput = useMemo(
    () => base64Input.trim().length > 10,
    [base64Input],
  );

  /* -------------------- Convert Logic -------------------- */

  const handleConvert = async () => {
    let input = base64Input.trim();
    if (!input) return;

    // 1. Clean the string
    const base64Data = input.replace(/^data:image\/\w+;base64,/, "");

    try {
      setError(null);
      setOptimizedBlob(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      // 2. CRITICAL FIX: Wrap base64Data in an object if your API expects JSON
      // Check your backend: does it expect { "base64_string": data } or just { "data": data }?
      const response = await base64ToImage(
        // { base64_string: base64Data }, // Changed from a raw string to an object
        base64Data,
        (progressEvent: AxiosProgressEvent) => {
          const uploadPercent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          dispatch(setProgress(Math.min(uploadPercent * 0.7, 70)));
        },
      );

      setOptimizedBlob(response.data);
      setPreviewUrl(URL.createObjectURL(response.data));
      dispatch(setProgress(100));
    } catch (err: any) {
      // 3. CRITICAL FIX: Handle the object error from the backend
      let msg = "Conversion failed.";

      if (err.response?.data) {
        const data = err.response.data;
        // If FastAPI returns a validation error, the message is usually in detail[0].msg
        if (Array.isArray(data.detail)) {
          msg = data.detail[0].msg;
        } else if (typeof data.detail === "string") {
          msg = data.detail;
        } else {
          msg = "Invalid Base64 format sent to server.";
        }
      }
      setError(msg); // Now 'msg' is a string, so React won't crash
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleReset = () => {
    setBase64Input("");
    setOptimizedBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
    dispatch(resetProgress());
  };

  return (
    <section className="max-w-3xl mx-auto relative bg-gradient-to-br from-white to-[#faf7ff] border border-[#e9e1ff] rounded-[2.5rem] p-8 md:p-12 shadow-[0_25px_70px_rgba(91,50,180,0.15)] space-y-10 transition-all">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#fb397d]/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#5b32b4]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <header className="text-center space-y-3 relative">
        <div className="w-16 h-16 bg-gradient-to-br from-[#f3ecff] to-white border border-[#e9e1ff] text-[#5b32b4] rounded-3xl flex items-center justify-center mx-auto shadow-[0_10px_30px_rgba(91,50,180,0.15)]">
          <FileCode size={30} />
        </div>

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#5b32b4] to-[#fb397d] bg-clip-text text-transparent">
          Base64 to Image
        </h2>

        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Paste your Base64 string below and instantly reconstruct the original
          image file.
        </p>
      </header>

      {/* Editor Area */}
      {!optimizedBlob && (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
          {/* Editor Wrapper */}
          <div className="relative group">
            <textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
              rows={10}
              disabled={isGlobalLoading}
              className="w-full p-6 rounded-[2rem] border border-[#e4dbff] bg-[#faf9ff] focus:bg-white focus:ring-4 focus:ring-[#5b32b4]/10 focus:border-[#5b32b4] outline-none text-[12px] font-mono transition-all resize-none shadow-inner group-hover:border-[#d6c7ef]"
            />

            {base64Input && (
              <button
                onClick={() => setBase64Input("")}
                className="absolute top-5 right-5 text-gray-400 hover:text-[#fb397d] transition-colors"
                aria-label="clear input"
              >
                <RefreshCcw size={18} />
              </button>
            )}
          </div>

          {/* Primary Action */}
          <button
            onClick={handleConvert}
            disabled={!isValidInput || isGlobalLoading}
            className="w-full h-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] text-white font-bold rounded-3xl hover:shadow-[0_15px_40px_rgba(251,57,125,0.35)] active:scale-[0.98] transition-all disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-center gap-2 text-lg"
            aria-label="generate image"
          >
            {isGlobalLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>Generate Image</>
            )}
          </button>
        </div>
      )}
      {/* Loading Bar */}
      {isGlobalLoading && (
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>{progress < 100 ? "Decoding" : "Rendering"}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#5b32b4] to-[#fb397d] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-3 animate-shake">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Results View */}
      {optimizedBlob && !isGlobalLoading && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">
              Preview
            </p>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Converted result"
                className="max-h-80 rounded-xl shadow-2xl border-4 border-white"
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                downloadBlob(optimizedBlob, `decoded-${Date.now()}.png`)
              }
              className="flex-[2] h-14 bg-[#5b32b4] text-white font-bold rounded-2xl hover:bg-[#4a2896] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
              aria-label="download image"
            >
              <Download size={20} />
              Download Image
            </button>

            <button
              onClick={handleReset}
              className="flex-1 h-14 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              aria-label="generate new image"
            >
              <RefreshCcw size={18} />
              New
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center pt-4">
        <Link
          href={"/tools/image-to-base64"}
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
            Image to Base64
          </span>
        </Link>
      </div>
    </section>
  );
}
