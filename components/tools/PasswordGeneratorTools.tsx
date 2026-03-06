"use client";

import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import {
  setProgress,
  resetProgress,
} from "@/store/slices/imageProcessingSlice";
import { RootState } from "@/store";
import { passwordGenerator } from "@/lib/api/services/password-generator.service";

export default function PasswordGeneratorTools() {
  const dispatch = useDispatch();

  const progress = useSelector(
    (state: RootState) => state.imageProcessing.progress,
  );

  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [excludeChars, setExcludeChars] = useState("");

  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- PASSWORD STRENGTH ---------------- */

  const strength = useMemo(() => {
    if (!password) return { label: "None", width: "0%", color: "bg-gray-200" };

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", width: "33%", color: "bg-red-500" };

    if (score === 3)
      return { label: "Fair", width: "55%", color: "bg-orange-500" };

    if (score === 4)
      return { label: "Good", width: "75%", color: "bg-blue-500" };

    return { label: "Strong", width: "100%", color: "bg-emerald-500" };
  }, [password]);

  /* ---------------- GENERATE PASSWORD ---------------- */

  const handleGenerate = async () => {
    let processingInterval: NodeJS.Timeout | null = null;
    let currentProgress = 0;

    try {
      setError(null);
      setPassword(null);

      dispatch(startLoading());
      dispatch(resetProgress());

      processingInterval = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += 5;
          dispatch(setProgress(currentProgress));
        }
      }, 120);

      const response = await passwordGenerator({
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        exclude_chars: excludeChars,
      });

      if (processingInterval) clearInterval(processingInterval);

      dispatch(setProgress(100));
      setPassword(response.data.password);
    } catch (err: any) {
      if (processingInterval) clearInterval(processingInterval);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Password generation failed.",
      );
    } finally {
      setTimeout(() => {
        dispatch(stopLoading());
        dispatch(resetProgress());
      }, 600);
    }
  };

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
  };

  const handleReset = () => {
    setPassword(null);
    setError(null);
    dispatch(resetProgress());
  };

  return (
    <section className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#f9f6ff] border border-[#e9e1ff] rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(91,50,180,0.15)] space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-[#5b32b4]">
          Secure Password Generator
        </h3>
        <p className="text-sm text-gray-500">
          Generate strong passwords for your accounts instantly
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Length + Exclude Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password Length
            </label>
            <input
              type="number"
              min={6}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#5b32b4]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Exclude Characters
            </label>
            <input
              type="text"
              placeholder="e.g. 0OIl"
              value={excludeChars}
              onChange={(e) => setExcludeChars(e.target.value)}
              className="w-full mt-2 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#fb397d]"
            />
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 text-sm font-medium">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />
            Uppercase Letters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
            Lowercase Letters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            Symbols
          </label>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGlobalLoading}
        className="h-[60px] w-full bg-[#fb397d] text-white font-bold rounded-2xl hover:bg-[#e02d6b] transition-all disabled:bg-gray-200 disabled:text-gray-400"
      >
        {isGlobalLoading ? "Generating..." : "Generate Password"}
      </button>

      {/* Progress */}
      {isGlobalLoading && (
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>PROCESSING...</span>
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

      {/* Result */}
      {password && !isGlobalLoading && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 font-mono text-lg break-all">
            {password}
          </div>

          {/* Strength Meter */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Password Strength</span>
              <span className="text-[#5b32b4]">{strength.label}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${strength.color} h-full transition-all duration-300`}
                style={{ width: strength.width }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 bg-[#5b32b4] text-white font-bold py-3 rounded-xl hover:bg-[#47239a]"
            >
              Copy Password
            </button>

            <button
              onClick={handleReset}
              className="flex-1 text-sm font-bold text-gray-400 hover:text-[#fb397d]"
            >
              Generate New
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
