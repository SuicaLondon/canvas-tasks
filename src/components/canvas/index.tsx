"use client";
import React, { useEffect, useRef } from "react";

type CanvasProps = {
  width: number;
  height: number;
  render: (context: CanvasRenderingContext2D) => void;
};

export function Canvas({ render, width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas?.getContext("2d");
      if (context) render(context);
    }
  }, [render]);

  return (
    <canvas ref={canvasRef} width={width} height={height} color="#ffffff" />
  );
}
