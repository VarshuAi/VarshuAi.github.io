"use client";

import React, { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ExperimentNode {
  id: string;
  code: string;
  name: string;
  category: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  status: "ACTIVE" | "PROTOTYPE" | "QUEUED";
  connections: string[];
}

const NODES: ExperimentNode[] = [
  {
    id: "sorting",
    code: "EXP_01",
    name: "SORTING INVARIANTS",
    category: "DSA / ALGORITHMS",
    x: 42,
    y: 36,
    status: "ACTIVE",
    connections: ["audio", "graph"],
  },
  {
    id: "audio",
    code: "EXP_02",
    name: "AUDIO DSP PIPELINE",
    category: "DSP / STREAMING",
    x: 72,
    y: 22,
    status: "PROTOTYPE",
    connections: ["hls"],
  },
  {
    id: "graph",
    code: "EXP_03",
    name: "GRAPH REACHABILITY",
    category: "DATA STRUCTURES",
    x: 20,
    y: 64,
    status: "QUEUED",
    connections: ["spatial"],
  },
  {
    id: "spatial",
    code: "EXP_04",
    name: "SPATIAL INDEXING",
    category: "GEOMETRIC ALGORITHMS",
    x: 46,
    y: 78,
    status: "QUEUED",
    connections: ["sorting"],
  },
  {
    id: "hls",
    code: "EXP_05",
    name: "ADAPTIVE HLS BUFFER",
    category: "SYSTEMS ARCHITECTURE",
    x: 76,
    y: 62,
    status: "ACTIVE",
    connections: ["spatial"],
  },
];

export function LabCoordinateField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>("sorting");
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const normX = ((relX / rect.width) * 2 - 1).toFixed(2);
      const normY = (-(relY / rect.height) * 2 + 1).toFixed(2);
      setCoords({
        x: relX,
        y: relY,
        normX: parseFloat(normX),
        normY: parseFloat(normY),
      });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setCoords({ x: 0, y: 0, normX: 0, normY: 0 });
    setHoveredNode(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-xl bg-[#080808] border border-[rgba(245,240,232,0.1)] overflow-hidden select-none font-mono text-xs"
      aria-label="Interactive experiment node coordinate field"
    >
      {/* Background Cartesian Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245, 240, 232, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245, 240, 232, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Axis Crosshairs through Center */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(245,240,232,0.08)] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[rgba(245,240,232,0.08)] pointer-events-none" />

      {/* Dynamic Cursor Crosshair Tracker (Follows mouse subtly) */}
      {!reducedMotion && coords.x > 0 && (
        <>
          <div
            className="absolute top-0 bottom-0 w-px border-l border-dashed border-[#C8FF00]/25 pointer-events-none transition-all duration-75"
            style={{ left: `${coords.x}px` }}
          />
          <div
            className="absolute left-0 right-0 h-px border-t border-dashed border-[#C8FF00]/25 pointer-events-none transition-all duration-75"
            style={{ top: `${coords.y}px` }}
          />
        </>
      )}

      {/* SVG Connecting Hairline Vectors between Nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="vector-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8FF00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9E988F" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {NODES.map((node) =>
          node.connections.map((targetId) => {
            const target = NODES.find((n) => n.id === targetId);
            if (!target) return null;
            const isHighlighted = hoveredNode === node.id || hoveredNode === target.id;
            return (
              <line
                key={`${node.id}-${target.id}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isHighlighted ? "url(#vector-grad)" : "rgba(245, 240, 232, 0.12)"}
                strokeWidth={isHighlighted ? 1.5 : 1}
                strokeDasharray={node.status === "ACTIVE" ? undefined : "3 3"}
                className="transition-colors duration-200"
              />
            );
          })
        )}
      </svg>

      {/* Experiment Nodes Render */}
      {NODES.map((node) => {
        const isHovered = hoveredNode === node.id;
        const offsetMultiplier = reducedMotion ? 0 : 8;
        const offsetX = coords.normX * offsetMultiplier * (node.x > 50 ? 1 : -1);
        const offsetY = coords.normY * offsetMultiplier * (node.y > 50 ? 1 : -1);

        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
            }}
            className="absolute transition-transform duration-150 ease-out group cursor-pointer z-10"
          >
            {/* Center Node Dot & Pulsing Beacon */}
            <div className="relative flex items-center justify-center">
              {node.status === "ACTIVE" && (
                <span className="absolute w-6 h-6 rounded-full border border-[#C8FF00]/40 animate-ping pointer-events-none" />
              )}
              <span
                className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                  node.status === "ACTIVE"
                    ? "bg-[#C8FF00] border-[#C8FF00]"
                    : node.status === "PROTOTYPE"
                    ? "bg-[#F5F0E8] border-[rgba(245,240,232,0.4)]"
                    : "bg-[#202020] border-[rgba(245,240,232,0.2)]"
                } ${isHovered ? "scale-125 ring-2 ring-[#C8FF00]/50" : ""}`}
              />
            </div>

            {/* Node Identification Label Overlay */}
            <div
              className={`absolute ${
                node.x > 55 ? "right-4" : "left-4"
              } -top-2.5 whitespace-nowrap px-2 py-1 rounded bg-[#101010]/95 border transition-all duration-150 pointer-events-none ${
                isHovered
                  ? "border-[#C8FF00]/60 text-[#F5F0E8] shadow-lg shadow-black"
                  : "border-[rgba(245,240,232,0.08)] text-[#9E988F]"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className={node.status === "ACTIVE" ? "text-[#C8FF00] font-semibold" : "text-[#68635B]"}>
                  {node.code}
                </span>
                <span>•</span>
                <span className="text-[#F5F0E8] font-medium">{node.name}</span>
              </div>
              {isHovered && (
                <div className="text-[9px] text-[#68635B] pt-0.5 flex items-center justify-between gap-2">
                  <span>{node.category}</span>
                  <span
                    className={`font-semibold ${
                      node.status === "ACTIVE" ? "text-[#C8FF00]" : "text-[#9E988F]"
                    }`}
                  >
                    [{node.status}]
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Telemetry Header Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-[#68635B] border-b border-[rgba(245,240,232,0.06)] pb-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-[#C8FF00] font-semibold">GRID // EXP_COORDINATE_FIELD</span>
          <span>•</span>
          <span>SCALE: 1:1</span>
        </div>
        <div className="flex items-center gap-2">
          <span>NODES: {NODES.length}</span>
          <span>•</span>
          <span className="text-[#C8FF00] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] animate-pulse" />
            <span>DISPATCH LIVE</span>
          </span>
        </div>
      </div>

      {/* Bottom Live Coordinate Telemetry Strip */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[#68635B] border-t border-[rgba(245,240,232,0.06)] pt-2 pointer-events-none">
        <div className="flex items-center gap-3">
          <span>
            COORD_X:{" "}
            <span className="text-[#F5F0E8]">
              {coords.normX >= 0 ? `+${coords.normX.toFixed(2)}` : coords.normX.toFixed(2)}
            </span>
          </span>
          <span>
            COORD_Y:{" "}
            <span className="text-[#F5F0E8]">
              {coords.normY >= 0 ? `+${coords.normY.toFixed(2)}` : coords.normY.toFixed(2)}
            </span>
          </span>
        </div>
        <div className="hidden sm:block text-[#9E988F] text-[9px]">
          [POINTER REACTIVE PARALLAX]
        </div>
      </div>
    </div>
  );
}
