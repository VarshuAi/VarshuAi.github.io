"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  Zap,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import {
  AlgorithmId,
  ALGORITHM_METADATA,
  createSortGenerator,
  generateDeterministicArray,
  generateRandomArray,
  SortStep,
} from "./sortingEngine";

interface SortingVisualizerProps {
  initialSize?: number;
  initialSpeed?: number;
}

export function SortingVisualizer({
  initialSize = 25,
  initialSpeed = 35,
}: SortingVisualizerProps) {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>("quick");
  const [arraySize, setArraySize] = useState<number>(initialSize);
  const [speedDelay, setSpeedDelay] = useState<number>(initialSpeed);

  const [initialData] = useState(() => generateDeterministicArray(initialSize));
  const [array, setArray] = useState<number[]>(initialData);
  const [initialArray, setInitialArray] = useState<number[]>(initialData);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());

  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [status, setStatus] = useState<"IDLE" | "RUNNING" | "PAUSED" | "COMPLETE">("IDLE");

  const generatorRef = useRef<Generator<SortStep, void, unknown> | null>(null);
  const workingArrayRef = useRef<number[]>(initialData);
  const isRunningRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const executeStepRef = useRef<() => void>(() => {});

  const handleGenerate = useCallback((size = arraySize) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    isRunningRef.current = false;
    generatorRef.current = null;

    const newArr = generateRandomArray(size, 8, 100);
    setArray([...newArr]);
    setInitialArray([...newArr]);
    workingArrayRef.current = [...newArr];

    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices(new Set());
    setComparisons(0);
    setSwaps(0);
    setStatus("IDLE");
  }, [arraySize]);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  const executeStep = useCallback(() => {
    if (!isRunningRef.current || !generatorRef.current) {
      return;
    }

    const { value, done } = generatorRef.current.next();

    if (done) {
      isRunningRef.current = false;
      setStatus("COMPLETE");
      setComparingIndices([]);
      setSwappingIndices([]);
      setSortedIndices(new Set(Array.from({ length: workingArrayRef.current.length }, (_, i) => i)));
      return;
    }

    if (value) {
      const step = value as SortStep;

      if (step.type === "compare") {
        setComparingIndices(step.indices);
        setSwappingIndices([]);
        setComparisons((prev) => prev + 1);
      } else if (step.type === "swap" || step.type === "overwrite") {
        setSwappingIndices(step.indices);
        setComparingIndices([]);
        setSwaps((prev) => prev + 1);
        setArray([...workingArrayRef.current]);
      } else if (step.type === "sorted") {
        setSortedIndices((prev) => {
          const next = new Set(prev);
          step.indices.forEach((idx) => next.add(idx));
          return next;
        });
      }
    }

    timeoutIdRef.current = setTimeout(() => {
      executeStepRef.current();
    }, speedDelay);
  }, [speedDelay]);

  useEffect(() => {
    executeStepRef.current = executeStep;
  }, [executeStep]);

  const togglePlay = () => {
    if (status === "RUNNING") {
      isRunningRef.current = false;
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      setStatus("PAUSED");
      setComparingIndices([]);
      setSwappingIndices([]);
    } else if (status === "PAUSED") {
      isRunningRef.current = true;
      setStatus("RUNNING");
      executeStep();
    } else {
      const working = [...array];
      workingArrayRef.current = working;
      generatorRef.current = createSortGenerator(algorithm, working);
      isRunningRef.current = true;
      setStatus("RUNNING");
      executeStep();
    }
  };

  const handleReset = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    isRunningRef.current = false;
    generatorRef.current = null;

    setArray([...initialArray]);
    workingArrayRef.current = [...initialArray];
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices(new Set());
    setComparisons(0);
    setSwaps(0);
    setStatus("IDLE");
  };

  const handleAlgorithmChange = (newAlgo: AlgorithmId) => {
    if (newAlgo === algorithm) return;
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    isRunningRef.current = false;
    generatorRef.current = null;

    setAlgorithm(newAlgo);
    setArray([...initialArray]);
    workingArrayRef.current = [...initialArray];
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices(new Set());
    setComparisons(0);
    setSwaps(0);
    setStatus("IDLE");
  };

  const handleSizeChange = (newSize: number) => {
    setArraySize(newSize);
    handleGenerate(newSize);
  };

  const currentMetadata = ALGORITHM_METADATA[algorithm];

  return (
    <div className="w-full bg-[#0D0D0D] border border-[rgba(245,240,232,0.08)] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Bar & Telemetry */}
      <div className="p-4 sm:p-5 border-b border-[rgba(245,240,232,0.06)] bg-[#090909] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#141414] border border-[rgba(245,240,232,0.08)]">
            <span
              className={`w-2 h-2 rounded-full ${
                status === "RUNNING"
                  ? "bg-[#C8FF00] animate-pulse"
                  : status === "COMPLETE"
                  ? "bg-[#C8FF00]"
                  : status === "PAUSED"
                  ? "bg-[#FF3B30]"
                  : "bg-[#68635B]"
              }`}
            />
            <span className="font-semibold text-[#F5F0E8]">{status}</span>
          </div>
          <span className="text-[#68635B] hidden sm:inline">{'//'}</span>
          <span className="text-[#9E988F] hidden sm:inline uppercase">{currentMetadata.name}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#68635B] uppercase">COMPARE:</span>
            <span className="text-[#F5F0E8] font-bold min-w-[28px]">{comparisons}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#68635B] uppercase">SWAP/WRITE:</span>
            <span className="text-[#F5F0E8] font-bold min-w-[28px]">{swaps}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#68635B] uppercase">N:</span>
            <span className="text-[#C8FF00] font-bold">{array.length}</span>
          </div>
        </div>
      </div>

      {/* Algorithm Tabs */}
      <div className="px-4 py-3 bg-[#0B0B0B] border-b border-[rgba(245,240,232,0.06)] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {(Object.keys(ALGORITHM_METADATA) as AlgorithmId[]).map((algoKey) => {
            const meta = ALGORITHM_METADATA[algoKey];
            const isActive = algorithm === algoKey;
            return (
              <button
                key={algoKey}
                type="button"
                onClick={() => handleAlgorithmChange(algoKey)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1C1C1C] text-[#C8FF00] border border-[rgba(200,255,0,0.3)] shadow-sm font-semibold"
                    : "text-[#9E988F] hover:text-[#F5F0E8] hover:bg-[#141414] border border-transparent"
                }`}
              >
                {meta.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Array Bars Canvas */}
      <div
        className="relative w-full h-64 sm:h-80 md:h-96 px-4 sm:px-6 pt-8 pb-4 flex items-end justify-center gap-1 sm:gap-1.5 bg-[#080808]"
        role="region"
        aria-label="Sorting visualization array bars"
      >
        {array.map((val, idx) => {
          const isComparing = comparingIndices.includes(idx);
          const isSwapping = swappingIndices.includes(idx);
          const isSorted = sortedIndices.has(idx);

          let barBg = "bg-[#202020] border-[rgba(245,240,232,0.12)]";
          if (isComparing) {
            barBg = "bg-[#F5F0E8] border-[#FFFFFF] shadow-sm";
          } else if (isSwapping) {
            barBg = "bg-[#FF3B30] border-[#FF3B30] shadow-md";
          } else if (isSorted) {
            barBg = "bg-[#C8FF00] border-[#C8FF00]";
          }

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center h-full justify-end group transition-all duration-75"
            >
              <div
                style={{ height: `${val}%` }}
                className={`w-full rounded-t-sm border-t border-x transition-[height] duration-75 ${barBg}`}
                title={`Index ${idx}: ${val}`}
              />
              {array.length <= 30 && (
                <span className="font-mono text-[9px] text-[#68635B] mt-1 select-none hidden sm:inline">
                  {val}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls & Metrics */}
      <div className="p-4 sm:p-5 bg-[#0A0A0A] border-t border-[rgba(245,240,232,0.06)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center font-mono text-xs">
          {/* Array Size */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[#9E988F]">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#68635B]" />
                <span>ARRAY SIZE</span>
              </span>
              <span className="text-[#F5F0E8] font-bold">{arraySize}</span>
            </div>
            <input
              type="range"
              min={12}
              max={60}
              step={1}
              value={arraySize}
              disabled={status === "RUNNING"}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              aria-label="Adjust array size"
              className="w-full h-1.5 bg-[#1C1C1C] rounded-lg appearance-none cursor-pointer accent-[#C8FF00] disabled:opacity-40"
            />
          </div>

          {/* Speed Delay */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[#9E988F]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#68635B]" />
                <span>SPEED (DELAY)</span>
              </span>
              <span className="text-[#F5F0E8] font-bold">{speedDelay}ms</span>
            </div>
            <input
              type="range"
              min={5}
              max={120}
              step={5}
              value={speedDelay}
              onChange={(e) => setSpeedDelay(Number(e.target.value))}
              aria-label="Adjust sorting speed delay"
              className="w-full h-1.5 bg-[#1C1C1C] rounded-lg appearance-none cursor-pointer accent-[#C8FF00]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1 justify-end pt-1 sm:pt-0">
            <button
              type="button"
              onClick={() => handleGenerate(arraySize)}
              disabled={status === "RUNNING"}
              className="px-3.5 py-2.5 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8] inline-flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#9E988F]" />
              <span>Generate</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={status === "IDLE" && comparisons === 0}
              className="px-3.5 py-2.5 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[rgba(245,240,232,0.1)] text-[#9E988F] hover:text-[#F5F0E8] inline-flex items-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className={`px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF00] ${
                status === "RUNNING"
                  ? "bg-[#1F1F1F] text-[#FF3B30] border border-[rgba(255,59,48,0.3)] hover:bg-[#252525]"
                  : "bg-[#C8FF00] text-[#0A0A0A] hover:bg-[#D4FF33] font-bold shadow-md"
              }`}
            >
              {status === "RUNNING" ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : status === "PAUSED" ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume</span>
                </>
              ) : status === "COMPLETE" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sorted</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Sort</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Complexity & Specs Telemetry Box */}
        <div className="pt-3 border-t border-[rgba(245,240,232,0.06)] grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-[#111111] border border-[rgba(245,240,232,0.04)]">
            <div className="text-[10px] text-[#68635B] uppercase">TIME AVG</div>
            <div className="text-[#F5F0E8] font-bold mt-0.5">{currentMetadata.timeAverage}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111111] border border-[rgba(245,240,232,0.04)]">
            <div className="text-[10px] text-[#68635B] uppercase">TIME WORST</div>
            <div className="text-[#F5F0E8] font-bold mt-0.5">{currentMetadata.timeWorst}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111111] border border-[rgba(245,240,232,0.04)]">
            <div className="text-[10px] text-[#68635B] uppercase">SPACE</div>
            <div className="text-[#C8FF00] font-bold mt-0.5">{currentMetadata.space}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111111] border border-[rgba(245,240,232,0.04)]">
            <div className="text-[10px] text-[#68635B] uppercase">APPROACH</div>
            <div className="text-[#9E988F] truncate mt-0.5">{currentMetadata.summary.split(' ')[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
