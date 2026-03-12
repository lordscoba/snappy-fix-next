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

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const initialCrop = centerAspectCrop(width, height);
    setCrop(initialCrop);
    // Ensure completedCrop is set immediately for the API
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

  /* -------------------- Optimize Logic -------------------- */

  // const handleOptimize = async () => {
  //   if (!file || !completedCrop) {
  //     setError("Please select an image and define a crop area.");
  //     return;
  //   }

  //   let processingInterval: NodeJS.Timeout | null = null;
  //   let currentProgress = 0;

  //   try {
  //     setError(null);
  //     setOptimizedBlob(null);
  //     dispatch(startLoading());
  //     dispatch(resetProgress());

  //     const { x, y, width, height } = completedCrop;

  //     const response = await cropImage(
  //       file,
  //       {
  //         left: Math.round(x),
  //         top: Math.round(y),
  //         right: Math.round(x + width),
  //         bottom: Math.round(y + height),
  //       },
  //       (progressEvent: AxiosProgressEvent) => {
  //         const uploadPercent = Math.round(
  //           (progressEvent.loaded * 100) / (progressEvent.total || 1),
  //         );
  //         currentProgress = Math.min(uploadPercent * 0.7, 70);
  //         dispatch(setProgress(currentProgress));
  //       },
  //     );

  //     // Fake processing progress (70 → 95)
  //     processingInterval = setInterval(() => {
  //       if (currentProgress < 95) {
  //         currentProgress += 1;
  //         dispatch(setProgress(currentProgress));
  //       }
  //     }, 120);

  //     // Finalizing
  //     if (processingInterval) clearInterval(processingInterval);
  //     dispatch(setProgress(100));
  //     setOptimizedBlob(response.data);
  const handleOptimize = async () => {
    // 1. Validation
    if (!file || !completedCrop || !imgRef.current) {
      setError("Please select an image and define a crop area.");
      return;
    }

    const image = imgRef.current;

    // 2. Calculate Scaling Factors
    // We compare the image's actual size to its displayed size
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // 3. Scale the coordinates to match the original image
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

      // 4. Send the SCALED parameters to the API
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
      setTimeout(() => {
        dispatch(stopLoading());
      }, 600);
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
    <section className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.15)] space-y-8 transition-all">
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
          <div className="space-y-6 text-center">
            {/* Icon Container */}
            <div className="relative w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#f3ecff] to-white border border-[#e9e1ff] shadow-[0_8px_30px_rgba(91,50,180,0.15)] flex items-center justify-center">
              <span className="text-3xl">🖼️</span>

              {/* Subtle pulse ring */}
              <div className="absolute inset-0 rounded-3xl border border-[#5b32b4]/20 animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#2b1d3a]">
                Upload Image to Start Cropping
              </h3>

              <p className="text-sm text-gray-500">
                Drag & drop your image here or click to browse your files
              </p>
            </div>

            {/* Supported formats */}
            <div className="flex justify-center gap-2 flex-wrap text-xs text-gray-400">
              <span className="bg-gray-100 px-3 py-1 rounded-full">JPG</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">PNG</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">WEBP</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">SVG</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Editor Container */}
            <div className="relative rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6">
              {/* Editor Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                    Crop Editor
                  </h3>
                  <p className="text-xs text-gray-400">
                    Adjust the crop area to fit your needs
                  </p>
                </div>

                <span className="text-xs bg-[#f3ecff] text-[#5b32b4] px-3 py-1 rounded-full font-medium">
                  Interactive
                </span>
              </div>

              {/* Crop Area */}
              <div className="relative max-h-[500px] overflow-auto rounded-2xl bg-gray-100 p-4 flex justify-center items-center">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="rounded-xl overflow-hidden"
                >
                  <img
                    ref={imgRef}
                    src={preview}
                    alt="Crop Preview"
                    onLoad={onImageLoad}
                    className="max-w-full block mx-auto select-none"
                  />
                </ReactCrop>
              </div>

              {/* Instruction Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span className="italic">
                  Drag the corners to resize • Drag inside to move
                </span>

                {completedCrop?.width && completedCrop?.height && (
                  <span className="font-medium text-gray-600">
                    {Math.round(completedCrop.width)} ×{" "}
                    {Math.round(completedCrop.height)} px
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <button
        onClick={handleOptimize}
        disabled={!file || isGlobalLoading}
        className="h-[60px] w-full bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
        aria-label="optimize image"
      >
        {isGlobalLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Crop Image"
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
        <div className="flex flex-col gap-3 animate-in zoom-in-95 duration-300">
          <button
            onClick={() => downloadBlob(optimizedBlob, `cropped-${Date.now()}`)}
            className="w-full bg-[#5b32b4] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            aria-label="download cropped image"
          >
            📥 Download cropped Image
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
