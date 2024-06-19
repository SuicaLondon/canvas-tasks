"use client";
import { Canvas } from "@/components";
import React, { useCallback } from "react";

interface SpriteData {
  position: { x: number; y: number };
  size: { width: number; height: number };
  offset: { x: number; y: number };
  sourceSize: { width: number; height: number };
}

const drawImage = (
  ctx: CanvasRenderingContext2D,
  spritesheet: CanvasImageSource,
  spritesheetJsonObj: Record<string, SpriteData>
) => {
  console.log(spritesheet, spritesheetJsonObj);
  const imageA = spritesheetJsonObj["a"];
  const imageAX = 10;
  const imageAY = 50;

  ctx.drawImage(
    spritesheet,
    imageA.offset.x,
    imageA.offset.y,
    imageA.sourceSize.width,
    imageA.sourceSize.height,
    imageAX,
    imageAY,
    imageA.size.width,
    imageA.size.height
  );

  const imageB = spritesheetJsonObj["b"];
  const imageBX = imageAX + imageA.size.width + 3;
  const imageBY = imageAY + imageA.size.height / 2 - imageB.size.height / 2;

  ctx.drawImage(
    spritesheet,
    imageB.offset.x,
    imageB.offset.y,
    imageB.sourceSize.width,
    imageB.sourceSize.height,
    imageBX,
    imageBY,
    imageB.size.width,
    imageB.size.height
  );

  const imageC = spritesheetJsonObj["c"];
  const imageCX = imageAX + imageA.size.width / 2 - imageC.size.width / 2;
  const imageCY = imageAY + imageA.size.height;

  ctx.save();
  ctx.translate(
    imageCX + imageC.size.width / 2,
    imageCY + imageC.size.height / 2
  );
  ctx.rotate((30 * Math.PI) / 180);
  ctx.drawImage(
    spritesheet,
    imageC.position.x,
    imageC.position.y,
    imageC.sourceSize.width,
    imageC.sourceSize.height,
    -imageC.size.width / 2,
    -imageC.size.height / 2,
    imageC.size.width,
    imageC.size.height
  );
  ctx.restore();
};

export default function Task3() {
  const render = useCallback(async (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const spritesheet = new Image();
    spritesheet.src = "/spritesheet.png";

    const response = await fetch("/spritesheet.json");
    const spritesheetJsonObj: Record<string, SpriteData> =
      await response.json();
    console.log(spritesheetJsonObj);
    drawImage(ctx, spritesheet, spritesheetJsonObj);
  }, []);

  return <Canvas render={render} width={400} height={400} />;
}
