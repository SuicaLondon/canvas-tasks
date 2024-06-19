"use client";
import { useCallback, useEffect, useRef } from "react";

const drawTimer = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  remainingSeconds: number
) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const time = remainingSeconds > 0 ? remainingSeconds : 0;
  const fontSize = 48;
  const fontFamily = "serif";
  const textColor = "#A5D115";
  const textMetrics = ctx.measureText(time.toString());
  const textWidth = textMetrics.width;
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(time.toString(), canvasWidth / 2, canvasHeight / 2);
};

const drawProgressBar = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  remainingSeconds: number
) => {
  const seconds = remainingSeconds > 15 ? 15 : remainingSeconds;
  if (seconds === 0) return;
  const radius = 58;
  const borderWidth = 10;
  const color = "#115DD1";
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = "#666";
  ctx.stroke();

  // Draw the progress arc
  const endAngle = (seconds / 15) * 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
};

export default function Task2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const remainingSecondsRef = useRef<number>(20);

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      remainingSeconds: number
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.fillStyle = "#333";
      drawTimer(ctx, canvas, remainingSeconds);
      drawProgressBar(ctx, canvas, remainingSeconds);
    },
    []
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | string | number | undefined | null = null;
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas?.getContext("2d");
      if (context) {
        timer = setInterval(() => {
          remainingSecondsRef.current--;
          render(context, canvas, remainingSecondsRef.current);
          if (remainingSecondsRef.current === 0) {
            clearInterval(timer!);
            timer = null;
          }
        }, 1000);
        render(context, canvas, remainingSecondsRef.current);
      }
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [render]);

  return <canvas ref={canvasRef} width={240} height={160} color="#ffffff" />;
}
