"use client";
import { Canvas } from "@/components";
import {
  Hexagon,
  HorizontalLayout,
  Space,
  Square,
  VerticalLayout,
} from "@/utils";
import { useCallback } from "react";

export default function Task1() {
  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#333";
    const board = new VerticalLayout(40);
    const horizontalLayout1 = new HorizontalLayout(40);
    horizontalLayout1.add(new Hexagon(40));
    horizontalLayout1.add(new Hexagon(40));
    board.add(horizontalLayout1);
    const horizontalLayout2 = new HorizontalLayout(40);
    horizontalLayout2.add(new Hexagon(40));
    horizontalLayout2.add(new Hexagon(40));
    horizontalLayout2.add(new Hexagon(40));
    board.add(horizontalLayout2);
    const horizontalLayout3 = new HorizontalLayout(40);
    horizontalLayout3.add(new Hexagon(40));
    horizontalLayout3.add(new Hexagon(40));
    board.add(horizontalLayout3);
    board.draw(ctx, 0, 0);
  }, []);

  return <Canvas render={render} width={400} height={400} />;
}
