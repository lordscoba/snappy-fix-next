"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import {
  imageColorEffect,
  ImageColorPreset,
  LutFilterType,
} from "@/lib/api/services/image-color-effect.service";
import { downloadBlob } from "@/lib/utils/download";
import { AxiosProgressEvent } from "axios";
import {
  Upload,
  Trash2,
  Download,
  Sparkles,
  Settings2,
  Sliders,
  Filter,
  RefreshCw,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

const PRESETS: ImageColorPreset[] = [
  "vintage",
  "cool",
  "warm",
  "dramatic",
  "noir",
  "cyberpunk",
  "faded",
];

const LUT_FILTERS: LutFilterType[] = [
  "clarendon",
  "lark",
  "gingham",
  "juno",
  "reyes",
  "teal_orange",
  "matrix",
  "film",
];

export default function ImageColorEffectTools() {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Manual Adjustments State
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [hue, setHue] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [activePreset, setActivePreset] = useState<
    ImageColorPreset | undefined
  >();
  const [activeLut, setActiveLut] = useState<LutFilterType | undefined>();
  const downloadRef = useRef<HTMLDivElement | null>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setFile(selectedFile);
    setResultBlob(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleApplyEffect = async () => {
    if (!file) return;
    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      dispatch(startLoading());
      dispatch(resetProgress());

      const responsePromise = imageColorEffect(
        file,
        {
          brightness,
          contrast,
          saturation,
          hue,
          exposure,
          temperature,
          preset: activePreset,
          lut_filter: activeLut,
          intensity: 1,
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

      setResultBlob(response.data);
      dispatch(setProgress(100));
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          setError(json.detail || "Failed to process image colors.");
        } catch {
          setError("Color grading failed. Please try again.");
        }
      } else {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Failed to apply color effects.",
        );
      }
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 600);
    }
  };

  const resetAdjustments = () => {
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setHue(0);
    setExposure(0);
    setTemperature(0);
    setActivePreset(undefined);
    setActiveLut(undefined);
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
    <section className="max-w-[1400px] mx-auto px-2 py-8 lg:py-12">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT: Workbench / Preview Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div
            className={`relative min-h-[400px] md:min-h-[600px] rounded-[3rem] overflow-hidden bg-slate-50 border-2 border-dashed transition-all duration-500 flex items-center justify-center ${!file ? "border-slate-200" : "border-transparent bg-slate-900 shadow-2xl"}`}
          >
            {!file ? (
              <div className="text-center p-12 group cursor-pointer relative z-20">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleFile(e.target.files[0])
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-8 text-indigo-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <ImageIcon size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  Drop your masterpiece
                </h3>
                <p className="text-slate-400 mt-2 font-medium">
                  Upload an image for professional grading
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full p-6 flex items-center justify-center group">
                <img
                  src={resultBlob ? URL.createObjectURL(resultBlob) : preview!}
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl transition-all duration-700"
                  alt="Workbench"
                />

                {/* Overlay Controls */}
                <div className="absolute top-8 right-8 flex gap-3 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setFile(null);
                      setResultBlob(null);
                      resetAdjustments();
                    }}
                    className="p-4 bg-white/10 hover:bg-red-500 text-white rounded-2xl backdrop-blur-xl transition-all"
                    aria-label="reset image"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Download Icon */}
                {resultBlob && !isGlobalLoading && (
                  <button
                    onClick={() =>
                      downloadBlob(resultBlob!, `snappy-grade-${Date.now()}`)
                    }
                    className="absolute bottom-8 right-8 p-4 bg-white/10 hover:bg-indigo-600 text-white rounded-2xl backdrop-blur-xl transition-all shadow-xl"
                    aria-label="download result"
                  >
                    <Download size={22} />
                  </button>
                )}

                {isGlobalLoading && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-8 animate-in fade-in duration-300">
                    <div className="relative w-24 h-24 mb-8">
                      <RefreshCw className="w-full h-full text-indigo-400 animate-spin-slow opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black">{progress}%</span>
                      </div>
                    </div>

                    <div className="w-64 bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-indigo-300">
                      Applying Color Science
                    </p>
                  </div>
                )}
              </div>
              // <div className="relative w-full h-full p-6 flex items-center justify-center group">
              //   <img
              //     src={resultBlob ? URL.createObjectURL(resultBlob) : preview!}
              //     className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl transition-all duration-700"
              //     alt="Workbench"
              //   />

              //   {/* Overlay Controls */}
              //   <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              //     <button
              //       onClick={() => {
              //         setFile(null);
              //         setResultBlob(null);
              //         resetAdjustments();
              //       }}
              //       className="p-4 bg-white/10 hover:bg-red-500 text-white rounded-2xl backdrop-blur-xl transition-all"
              //       aria-label="reset image"
              //     >
              //       <Trash2 size={20} />
              //     </button>
              //   </div>

              //   {isGlobalLoading && (
              //     <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-8 animate-in fade-in duration-300">
              //       <div className="relative w-24 h-24 mb-8">
              //         <RefreshCw className="w-full h-full text-indigo-400 animate-spin-slow opacity-20" />
              //         <div className="absolute inset-0 flex items-center justify-center">
              //           <span className="text-2xl font-black">{progress}%</span>
              //         </div>
              //       </div>
              //       <div className="w-64 bg-white/10 h-1.5 rounded-full overflow-hidden">
              //         <div
              //           className="bg-indigo-500 h-full transition-all duration-300 ease-out"
              //           style={{ width: `${progress}%` }}
              //         />
              //       </div>
              //       <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-indigo-300">
              //         Applying Color Science
              //       </p>
              //     </div>
              //   )}
              // </div>
            )}
          </div>

          {/* Preset & Filter Selection */}
          {file && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <Filter size={14} /> LUT Filter Library
                  </h4>
                  <span className="h-px flex-grow mx-4 bg-slate-100" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                  {LUT_FILTERS.map((lut) => (
                    <button
                      key={lut}
                      onClick={() => {
                        setActiveLut(lut);
                        setActivePreset(undefined);
                      }}
                      className={`px-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all border-2 ${activeLut === lut ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-slate-50 bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-200"}`}
                      aria-label={lut}
                    >
                      {lut.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <Sparkles size={14} /> Mood Presets
                  </h4>
                  <span className="h-px flex-grow mx-4 bg-slate-100" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setActivePreset(preset);
                        setActiveLut(undefined);
                      }}
                      className={`px-8 py-4 rounded-2xl text-xs font-black capitalize transition-all border-2 ${activePreset === preset ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100" : "border-slate-100 bg-white text-slate-500 hover:border-indigo-200"}`}
                      aria-label={preset}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 sticky top-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Adjustments
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  Fine-tune every channel
                </p>
              </div>
              <button
                onClick={resetAdjustments}
                className="p-3 text-slate-400 hover:text-indigo-600 transition-colors"
                aria-label="reset adjustments"
              >
                <RefreshCw size={20} />
              </button>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: "Brightness",
                  val: brightness,
                  set: setBrightness,
                  min: 0,
                  max: 2,
                  step: 0.1,
                  icon: <Sparkles size={12} />,
                },
                {
                  label: "Contrast",
                  val: contrast,
                  set: setContrast,
                  min: 0,
                  max: 2,
                  step: 0.1,
                  icon: <Sliders size={12} />,
                },
                {
                  label: "Saturation",
                  val: saturation,
                  set: setSaturation,
                  min: 0,
                  max: 2,
                  step: 0.1,
                  icon: <Filter size={12} />,
                },
                {
                  label: "Exposure",
                  val: exposure,
                  set: setExposure,
                  min: -2,
                  max: 2,
                  step: 0.1,
                  icon: <Sparkles size={12} />,
                },
                {
                  label: "Hue",
                  val: hue,
                  set: setHue,
                  min: -180,
                  max: 180,
                  step: 1,
                  icon: <RefreshCw size={12} />,
                },
                {
                  label: "Temperature",
                  val: temperature,
                  set: setTemperature,
                  min: -100,
                  max: 100,
                  step: 1,
                  icon: <Settings2 size={12} />,
                },
              ].map((ctrl) => (
                <div key={ctrl.label} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                      {ctrl.icon} {ctrl.label}
                    </label>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {ctrl.val}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    value={ctrl.val}
                    onChange={(e) => ctrl.set(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="pt-12 space-y-4">
              <button
                onClick={handleApplyEffect}
                disabled={!file || isGlobalLoading}
                className="w-full h-20 bg-slate-900 text-white font-black rounded-3xl shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:translate-y-[-2px] active:translate-y-0 transition-all duration-300 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none disabled:translate-y-0 group"
                aria-label="apply effect"
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  {isGlobalLoading ? "Processing Master..." : "Apply Grade"}
                  <Sparkles
                    size={20}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </span>
              </button>

              {resultBlob && !isGlobalLoading && (
                <button
                  onClick={() =>
                    downloadBlob(resultBlob!, `snappy-grade-${Date.now()}`)
                  }
                  className="w-full h-16 bg-white border-2 border-slate-900 text-slate-900 font-black rounded-3xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                  aria-label="download result"
                >
                  <Download size={20} /> Download Result
                </button>
              )}

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 animate-shake mt-4">
                  <AlertCircle size={18} className="shrink-0" />
                  <p className="text-xs font-bold">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
