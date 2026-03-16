"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { cropImage } from "@/lib/api/services/crop-image.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";

import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Helper to set initial crop area
function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, 1, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

export default function CropImageTools() {
  const dispatch = useDispatch();
  const imgRef = useRef<HTMLImageElement | null>(null);

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

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

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

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const initialCrop = centerAspectCrop(width, height);
    setCrop(initialCrop);
    setCompletedCrop({
      unit: "px",
      x: (initialCrop.x * width) / 100,
      y: (initialCrop.y * height) / 100,
      width: (initialCrop.width * width) / 100,
      height: (initialCrop.height * height) / 100,
    });
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

  const handleOptimize = async () => {
    if (!file || !completedCrop || !imgRef.current) {
      setError("Please select an image and define a crop area.");
      return;
    }

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const scaledParams = {
      left: Math.round(completedCrop.x * scaleX),
      top: Math.round(completedCrop.y * scaleY),
      right: Math.round((completedCrop.x + completedCrop.width) * scaleX),
      bottom: Math.round((completedCrop.y + completedCrop.height) * scaleY),
    };

    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setOptimizedBlob(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      const response = await cropImage(
        file,
        scaledParams,
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

      if (processingInterval) clearInterval(processingInterval);
      dispatch(setProgress(100));
      setOptimizedBlob(response.data);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      let errorMessage = "Optimization failed. Please try again.";
      if (err.response?.data instanceof Blob) {
        const text = await err.response.data.text();
        try {
          const json = JSON.parse(text);
          errorMessage = json.detail || errorMessage;
        } catch {
          /* use default */
        }
      } else {
        errorMessage =
          err?.response?.data?.detail || err?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setTimeout(() => dispatch(stopLoading()), 600);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setOptimizedBlob(null);
    setError(null);
    setCrop(undefined);
    setCompletedCrop(null);
    dispatch(resetProgress());
  };

  return (
    <section className="w-full max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.15)] space-y-6 transition-all">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl md:rounded-3xl p-3 md:p-10 text-center transition-all duration-300
        ${dragActive ? "border-[#fb397d] bg-pink-50 scale-[1.01]" : "border-[#d6c7ef] bg-[#faf9ff] hover:bg-white"}`}
      >
        {/* Input is only "inset-0" when no preview exists, otherwise it blocks the crop handles */}
        {!preview && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer z-20"
            disabled={isGlobalLoading}
          />
        )}

        {!preview ? (
          <div className="space-y-4 md:space-y-6 py-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-white border border-[#e9e1ff] shadow-sm flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🖼️</span>
              <div className="absolute inset-0 rounded-2xl border border-[#5b32b4]/10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-[#2b1d3a]">
                Upload Image to Start Cropping
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Drag & drop your image here or click to browse your files
              </p>
            </div>
            <div className="flex justify-center gap-2 text-[10px] md:text-xs font-medium text-gray-400">
              {["JPG", "PNG", "WEBP"].map((ext) => (
                <span key={ext} className="bg-gray-100 px-2 py-1 rounded-md">
                  {ext}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-xl md:rounded-2xl bg-white border border-gray-200 p-2 md:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-[10px] md:text-xs font-bold text-[#5b32b4] uppercase tracking-widest">
                  Crop Editor
                </h3>

                {completedCrop && (
                  <span className="text-[10px] font-mono text-gray-500 bg-gray-50 px-2 py-0.5 rounded border">
                    {Math.round(completedCrop.width)} ×{" "}
                    {Math.round(completedCrop.height)}px
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 p-2">
                Adjust the crop area to fit your needs
              </p>

              {/* CROP CONTAINER */}
              <div
                className="relative bg-gray-50 rounded-lg overflow-hidden flex justify-center items-center"
                style={{ maxHeight: "60vh" }}
              >
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="max-w-full"
                >
                  <img
                    ref={imgRef}
                    src={preview}
                    alt="Source"
                    onLoad={onImageLoad}
                    className="max-w-full block select-none"
                    style={{ maxHeight: "50vh", objectFit: "contain" }}
                  />
                </ReactCrop>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-xs md:text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleOptimize}
          disabled={!file || isGlobalLoading || !!optimizedBlob}
          className="h-[55px] md:h-[64px] w-full bg-[#fb397d] text-white font-bold rounded-xl md:rounded-2xl hover:bg-[#e02d6b] active:scale-[0.98] transition-all disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-center gap-2 shadow-lg shadow-[#fb397d]/10"
        >
          {isGlobalLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Apply Crop"
          )}
        </button>

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

        {optimizedBlob && !isGlobalLoading && (
          <div className="flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-500">
            <button
              onClick={() =>
                downloadBlob(optimizedBlob, `snappy-crop-${Date.now()}`)
              }
              className="w-full bg-[#5b32b4] text-white font-bold py-4 rounded-xl md:rounded-2xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              📥 Download Result
            </button>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-gray-400 hover:text-[#fb397d] transition-colors py-2 uppercase tracking-tighter"
            >
              Start New Crop
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
