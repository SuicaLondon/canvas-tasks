export abstract class Drawable {
  abstract draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
  abstract getSize(): number;
}

export class Square extends Drawable {
  private size: number;

  constructor(size: number) {
    super();
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillRect(x, y, this.size, this.size);
  }

  getSize(): number {
    return this.size;
  }
}
export class Hexagon extends Drawable {
  private size: number;

  constructor(size: number) {
    super();
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const sideLength = this.size / 2;
    const centerX = x + sideLength;
    const centerY = y + sideLength;

    ctx.beginPath();
    ctx.lineTo(centerX - sideLength / 2, y);
    ctx.lineTo(centerX + sideLength / 2, y);
    ctx.lineTo(centerX + sideLength, centerY);
    ctx.lineTo(centerX + sideLength / 2, centerY + sideLength);
    ctx.lineTo(centerX - sideLength / 2, centerY + sideLength);
    ctx.lineTo(centerX - sideLength, centerY);
    ctx.lineTo(centerX - sideLength / 2, y);

    ctx.closePath();
    ctx.stroke();
  }

  getSize(): number {
    return this.size;
  }
}

export class Space {
  private size: number;

  constructor(size: number) {
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }
}

export class HorizontalLayout extends Drawable {
  private children: (Drawable | Space)[] = [];
  private size: number;

  constructor(size: number) {
    super();
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }

  add(child: Drawable | Space): void {
    this.children.push(child);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    let currentX = x;
    this.children.forEach((child, index) => {
      if (child instanceof Space) {
        currentX += child.getSize();
      } else {
        if (index > 0) {
          currentX += child.getSize();
        }
        console.log(currentX, y);
        child.draw(ctx, currentX, y);
      }
    });
  }
}

export class VerticalLayout extends Drawable {
  private children: (Drawable | Space)[] = [];
  private size: number;

  constructor(size: number) {
    super();
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }
  add(child: Drawable | Space): void {
    this.children.push(child);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    let currentY = y;
    this.children.forEach((child, index) => {
      if (child instanceof Space) {
        currentY += child.getSize();
      } else {
        if (index > 0) {
          currentY += child.getSize();
        }
        child.draw(ctx, x, currentY);
      }
    });
  }
}
