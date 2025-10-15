export const PX_PER_CM = 37.7952755906; // 96 DPI theoretical

export function cmToPx(cm: number) {
  return cm * PX_PER_CM;
}

export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function setupHiDPICanvas(canvas: HTMLCanvasElement, widthPx: number, heightPx: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(widthPx * dpr);
  canvas.height = Math.floor(heightPx * dpr);
  canvas.style.width = `${widthPx}px`;
  canvas.style.height = `${heightPx}px`;
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // reset & scale for DPR
  return { ctx, dpr };
}

export function drawRulers(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pxPerCm: number,
  offset: { x: number; y: number } = { x: 0, y: 0 }
) {
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.font = "10px sans-serif";

  // top ruler
  for (let cm = 0; cm <= width / pxPerCm; cm++) {
    const x = offset.x + cm * pxPerCm;
    ctx.beginPath();
    ctx.moveTo(x, offset.y);
    ctx.lineTo(x, offset.y - 10);
    ctx.stroke();

    if (cm % 5 === 0) {
      ctx.fillText(cm.toString(), x + 2, offset.y - 12);
    }
  }

  // left ruler
  for (let cm = 0; cm <= height / pxPerCm; cm++) {
    const y = offset.y + cm * pxPerCm;
    ctx.beginPath();
    ctx.moveTo(offset.x, y);
    ctx.lineTo(offset.x - 10, y);
    ctx.stroke();

    if (cm % 5 === 0) {
      ctx.fillText(cm.toString(), offset.x - 25, y + 3);
    }
  }
}

export function drawSinglePattern(
  ctx: CanvasRenderingContext2D,
  image: ImageBitmap,
  opts: {
    widthPx: number;
    heightPx: number;
    settings: import('./types').PatternSettings;
  }
) {
  const { widthPx, heightPx, settings } = opts;

  // Skalirana veličina slike
  const scaledW = image.width * settings.tileScale;
  const scaledH = image.height * settings.tileScale;

  // X: centar platna - polovina slike  → horizontalno centrirano
  const centerX = widthPx / 2 - scaledW / 2;

  // Y: samo mali razmak od vrha (npr. 0 ili 10px)
  const topY = 0; // možeš staviti npr. 10 ako želiš padding

  ctx.save();

  // (opciono) rotacija slike oko svog centra
  if (settings.rotationDeg) {
    const angle = (settings.rotationDeg * Math.PI) / 180;
    const imageCenterX = centerX + scaledW / 2;
    const imageCenterY = topY + scaledH / 2;

    ctx.translate(imageCenterX, imageCenterY);
    ctx.rotate(angle);
    ctx.translate(-imageCenterX, -imageCenterY);
  }

  // Crtanje slike na vrhu, centrirano horizontalno
  ctx.drawImage(image, centerX, topY, scaledW, scaledH);

  ctx.restore();
}




// Core tiling engine
export function tilePattern(
  ctx: CanvasRenderingContext2D,
  image: ImageBitmap,
  opts: {
    widthPx: number;
    heightPx: number;
    pxPerCm: number;
    settings: import('./types').PatternSettings;
  }
) {
  const { widthPx, heightPx, pxPerCm, settings } = opts;
  const contentX = 0; // left ruler width
  const contentY = 0; // top ruler height
  const drawWidth = widthPx - contentX;
  const drawHeight = heightPx - contentY;

  // Draw a white background for content area
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(contentX, contentY, drawWidth, drawHeight);
  ctx.restore();

  // Effective tile size
  const baseTileW = image.width * settings.tileScale;
  const baseTileH = image.height * settings.tileScale;
  const gapPx = settings.tileGapCm * pxPerCm;
  const tileW = baseTileW + gapPx;
  const tileH = baseTileH + gapPx;
  const oddOffsetPx = settings.oddRowOffsetCm * pxPerCm; // shift up for odd rows
  const angle = degToRad(settings.rotationDeg);

  // Start tiling within content area
  for (let rowY = contentY; rowY < contentY + drawHeight + tileH; rowY += tileH) {
    const rowIndex = Math.floor((rowY - contentY) / tileH);
    const rowShiftY = rowIndex % 2 === 1 ? -oddOffsetPx : 0; // odd rows up

    for (let colX = contentX; colX < contentX + drawWidth + tileW; colX += tileW) {
      ctx.save();

      // Translate to tile origin
      ctx.translate(colX + baseTileW / 2, rowY + baseTileH / 2 + rowShiftY);

      // Apply mirroring
      const mirror = settings.mirrorMode === 'all' || (settings.mirrorMode === 'alternate' && rowIndex % 2 === 1);
      if (mirror) ctx.scale(-1, 1);

      // Apply rotation
      if (angle !== 0) ctx.rotate(angle);

      // Draw image centered at origin
      ctx.drawImage(image, -baseTileW / 2, -baseTileH / 2, baseTileW, baseTileH);

      ctx.restore();
    }
  }
}
