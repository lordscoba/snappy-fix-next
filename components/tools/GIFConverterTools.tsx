"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";

import {
  videoToGif,
  imageToGif,
} from "@/lib/api/services/gif-converter.service";

import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";

export default function GifConverterTools() {
  const dispatch = useDispatch();

  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );

  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  // VIDEO SETTINGS
  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(480);
  const [quality, setQuality] = useState<"hd" | "high" | "medium" | "low">(
    "medium",
  );
  const [reverse, setReverse] = useState(false);

  // IMAGE SETTINGS
  const [duration, setDuration] = useState(500);

  // TRIM
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [videoDuration, setVideoDuration] = useState(0);

  // UI
  const [dragActive, setDragActive] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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

    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
  };

  const handleConvert = async () => {
    if (!file) return;

    if (fileType === "video") {
      if (startTime >= endTime) {
        setError("End time must be greater than start time.");
        return;
      }

      if (endTime - startTime > 15) {
        setError("Maximum GIF duration is 15 seconds.");
        return;
      }
    }

    let simulatedProgress = 0;
    let progressTimer: NodeJS.Timeout | null = null;

    try {
      dispatch(startLoading());
      dispatch(resetProgress());

      const onUploadProgress = (event: AxiosProgressEvent) => {
        if (!event.total) return;

        const percent = Math.round((event.loaded * 100) / event.total);
        simulatedProgress = Math.min(percent * 0.7, 70);

        dispatch(setProgress(simulatedProgress));
      };

      progressTimer = setInterval(() => {
        if (simulatedProgress < 95) {
          simulatedProgress += 1;
          dispatch(setProgress(simulatedProgress));
        }
      }, 150);

      let response;

      if (fileType === "video") {
        response = await videoToGif(
          file,
          {
            fps,
            width,
            start_time: startTime,
            end_time: endTime,
            quality,
            reverse,
          },
          onUploadProgress,
        );
      } else {
        response = await imageToGif(file, { duration }, onUploadProgress);
      }

      if (progressTimer) clearInterval(progressTimer);

      dispatch(setProgress(100));
      setResultBlob(response.data);
    } catch (err) {
      console.error(err);
      setError("GIF generation failed. Please try again.");
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 500);
    }
  };

  const handleShare = async () => {
    if (!resultBlob) return;

    const fileToShare = new File([resultBlob], "snappy-fix.gif", {
      type: "image/gif",
    });

    if (navigator.share) {
      await navigator.share({
        files: [fileToShare],
        title: "My GIF from Snappy Fix",
        text: "Check out this GIF I created!",
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto rounded-[2.5rem] p-8 md:p-10 shadow-xl space-y-10 bg-gradient-to-br from-[#f6f3ff] via-white to-[#ffeaf3] border border-[#e9e1ff]">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={`border-2 border-dashed rounded-3xl p-16 text-center transition ${
            dragActive
              ? "border-[#fb397d] bg-pink-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            type="file"
            accept="video/*,image/*"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="text-5xl mb-4">🎬</div>

          <h3 className="text-xl font-bold text-[#2b1d3a]">
            Upload Video or Image
          </h3>

          <p className="text-gray-500">
            Convert MP4/MOV videos to GIF or create GIF animations from photos
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* PREVIEW */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
              {fileType === "video" ? (
                <video
                  src={preview!}
                  controls
                  onLoadedMetadata={(e) =>
                    setVideoDuration(e.currentTarget.duration)
                  }
                  className="w-full"
                />
              ) : (
                <img src={preview!} className="object-contain max-h-full" />
              )}
            </div>

            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setResultBlob(null);
              }}
              className="text-sm font-semibold text-gray-400 hover:text-red-500"
              aria-label="remove file"
            >
              ✕ Remove file
            </button>
          </div>

          {/* SETTINGS */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#2b1d3a]">GIF Settings</h3>

            {fileType === "video" && (
              <>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Start Time ({startTime.toFixed(1)}s)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={videoDuration}
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    className="w-full accent-[#fb397d]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    End Time ({endTime.toFixed(1)}s)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={videoDuration}
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    className="w-full accent-[#5b32b4]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    FPS ({fps})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-full accent-[#fb397d]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Width ({width}px)
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-[#5b32b4]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Quality
                  </label>

                  <select
                    value={quality}
                    onChange={(e) =>
                      setQuality(
                        e.target.value as "hd" | "high" | "medium" | "low",
                      )
                    }
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="hd">HD</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={reverse}
                    onChange={(e) => setReverse(e.target.checked)}
                  />
                  Reverse GIF
                </label>
              </>
            )}

            {fileType === "image" && (
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">
                  Frame Duration ({duration}ms)
                </label>

                <input
                  type="range"
                  min="100"
                  max="30000"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-[#fb397d]"
                />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button
              onClick={handleConvert}
              disabled={isGlobalLoading}
              className="w-full h-14 bg-[#fb397d] text-white font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition"
              aria-label="generate gif"
            >
              {isGlobalLoading ? `Processing... ${progress}%` : "Generate GIF"}
            </button>
          </div>
        </div>
      )}
      {/* Progress */}
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

      {resultBlob && !isGlobalLoading && (
        <div className="pt-10 border-t border-gray-100 flex flex-col items-center gap-5">
          <p className="text-green-600 font-bold text-lg">
            ✨ Your GIF is ready!
          </p>

          <img
            src={URL.createObjectURL(resultBlob)}
            className="max-h-56 rounded-xl shadow-md border"
          />

          <div className="flex gap-4">
            <button
              onClick={() =>
                downloadBlob(resultBlob, `snappy-fix-${Date.now()}`)
              }
              className="bg-[#5b32b4] text-white px-6 py-3 rounded-xl font-bold"
            >
              Download
            </button>

            <button
              onClick={handleShare}
              className="bg-[#fb397d] text-white px-6 py-3 rounded-xl font-bold"
            >
              Share
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
