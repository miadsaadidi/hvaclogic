"use client";

import React, { useRef, useEffect } from "react";

interface DuctCanvasVisualizerProps {
  roundDiameter: number;
  width: number;
  height: number;
  velocityFpm: number;
  velocityCategory: "quiet" | "moderate" | "noisy";
}

export function DuctCanvasVisualizer({
  roundDiameter,
  width,
  height,
  velocityFpm,
  velocityCategory,
}: DuctCanvasVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background Grid
    ctx.strokeStyle = "rgba(46, 59, 82, 0.4)";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (roundDiameter <= 0) return;

    // Center coordinates
    const centerX = w / 2;
    const centerY = h / 2;

    // Scaling factor (fit up to 36" dimension in canvas)
    const maxDim = Math.max(roundDiameter, width, height, 12);
    const scale = (Math.min(w, h) * 0.65) / maxDim;

    // Velocity color theme
    let strokeColor = "#00d2ff"; // cyan
    let fillColor = "rgba(0, 210, 255, 0.08)";
    if (velocityCategory === "moderate") {
      strokeColor = "#38bdf8"; // sky
      fillColor = "rgba(56, 189, 248, 0.1)";
    } else if (velocityCategory === "noisy") {
      strokeColor = "#ff6b4a"; // amber/red
      fillColor = "rgba(255, 107, 74, 0.12)";
    }

    // 1. Draw Rectangular Duct
    const rectW = width * scale;
    const rectH = height * scale;
    const rectX = centerX - rectW / 2;
    const rectY = centerY - rectH / 2;

    ctx.fillStyle = fillColor;
    ctx.fillRect(rectX, rectY, rectW, rectH);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(rectX, rectY, rectW, rectH);

    // 2. Draw Equivalent Round Duct (dashed overlay)
    const radius = (roundDiameter * scale) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // 3. Dimension Callout Labels
    ctx.font = "700 12px var(--font-titillium), 'Titillium Web', -apple-system, sans-serif";
    ctx.fillStyle = "#f8fafc";
    ctx.textAlign = "center";

    // Top Width Label
    ctx.fillText(`${width}" Width`, centerX, Math.max(16, rectY - 8));

    // Side Height Label
    ctx.save();
    ctx.translate(Math.max(16, rectX - 12), centerY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${height}" Height`, 0, 0);
    ctx.restore();

    // Round Diameter Badge
    ctx.fillStyle = "rgba(17, 24, 39, 0.9)";
    ctx.fillRect(centerX - 50, centerY - 12, 100, 24);
    ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(centerX - 50, centerY - 12, 100, 24);

    ctx.fillStyle = "#00d2ff";
    ctx.font = "800 11px var(--font-titillium), 'Titillium Web', -apple-system, sans-serif";
    ctx.fillText(`Ø ${roundDiameter}" Round`, centerX, centerY + 4);
  }, [roundDiameter, width, height, velocityFpm, velocityCategory]);

  return (
    <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "0.75rem", overflow: "hidden", background: "var(--bg-primary)", border: "1px solid var(--border-subtle)" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-label={`2D Duct Cross-Section: ${width} inches by ${height} inches rectangular with ${roundDiameter} inches equivalent round diameter`}
      />
      <div style={{
        position: "absolute",
        bottom: "8px",
        right: "8px",
        fontSize: "0.7rem",
        fontWeight: 700,
        textTransform: "uppercase",
        padding: "0.2rem 0.5rem",
        borderRadius: "4px",
        background: velocityCategory === "quiet" ? "rgba(16, 185, 129, 0.2)" : velocityCategory === "moderate" ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)",
        color: velocityCategory === "quiet" ? "var(--accent-success)" : velocityCategory === "moderate" ? "var(--accent-warning)" : "var(--accent-danger)",
        border: "1px solid currentColor",
      }}>
        {velocityCategory === "quiet" ? "✓ Quiet (<700 FPM)" : velocityCategory === "moderate" ? "⚡ Moderate (700-1000 FPM)" : "⚠️ High Velocity (>1000 FPM)"}
      </div>
    </div>
  );
}
