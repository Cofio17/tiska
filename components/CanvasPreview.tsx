'use client';

import { useEffect, useRef, useState } from 'react';
import { cmToPx, drawRulers, setupHiDPICanvas, tilePattern } from '@/utils/canvasUtils';
import { PatternSettings } from '@/utils/types';

type CanvasPreviewProps = {
    imageBitmap: ImageBitmap | null;
    widthCm: number;
    heightCm: number;
    settings: PatternSettings;
    showRulers?: boolean;
    id: string | number;
    zoom: number;
    setZoom: (v: any) => void;
};

export default function CanvasPreview({
    imageBitmap,
    widthCm,
    heightCm,
    settings,
    zoom,
    setZoom,
    showRulers = true,
}: CanvasPreviewProps) {
    const fabricRef = useRef<HTMLCanvasElement | null>(null);
    const rulerRef = useRef<HTMLCanvasElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 }); // small padding
    const [dragging, setDragging] = useState(false);
    const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const fabricCanvas = fabricRef.current;
        const rulerCanvas = rulerRef.current;
        if (!fabricCanvas) return;

        const pxPerCm = cmToPx(1);
        const fabricWidth = Math.round(widthCm * pxPerCm);
        const fabricHeight = Math.round(heightCm * pxPerCm);

        // --- Draw fabric ---
        // --- Draw fabric ---
        const { ctx } = setupHiDPICanvas(fabricCanvas, fabricCanvas.clientWidth, fabricCanvas.clientHeight);
        ctx.clearRect(0, 0, fabricCanvas.width, fabricCanvas.height);

        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.scale(zoom, zoom);

        // --- CLIP TO FABRIC SIZE ---
        ctx.beginPath();
        ctx.rect(0, 0, fabricWidth, fabricHeight); // only allow inside fabric
        ctx.clip();

        // white background inside fabric
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, fabricWidth, fabricHeight);

        // draw pattern tiles
        if (imageBitmap) {
            tilePattern(ctx, imageBitmap, {
                widthPx: fabricWidth,
                heightPx: fabricHeight,
                pxPerCm,
                settings,
            });
        }

        ctx.restore();

        // --- Draw rulers ---

        if (showRulers && rulerCanvas) {
            const { ctx: rCtx } = setupHiDPICanvas(rulerCanvas, rulerCanvas.clientWidth, rulerCanvas.clientHeight);
            rCtx.clearRect(0, 0, rulerCanvas.width, rulerCanvas.height);

            // Compute fabric top-left after transform
            const fabricX = offset.x;
            const fabricY = offset.y;
            const fabricW = fabricWidth * zoom;
            const fabricH = fabricHeight * zoom;

            drawRulers(rCtx, fabricW, fabricH, pxPerCm * zoom, {
                x: fabricX,
                y: fabricY,
            });
        }
    }, [imageBitmap, widthCm, heightCm, settings, zoom, offset, showRulers]);

    // mouse events for pan + zoom
    useEffect(() => {
        const canvas = fabricRef.current;
        if (!canvas) return;

        const handleMouseDown = (e: MouseEvent) => {
            setDragging(true);
            setLastPos({ x: e.clientX, y: e.clientY });
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging || !lastPos) return;
            const dx = e.clientX - lastPos.x;
            const dy = e.clientY - lastPos.y;
            setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
            setLastPos({ x: e.clientX, y: e.clientY });
        };
        const handleMouseUp = () => {
            setDragging(false);
            setLastPos(null);
        };
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
            setZoom((z: any) => Math.min(Math.max(0.2, z * zoomFactor), 5));
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('wheel', handleWheel);
        };
    }, [dragging, lastPos]);

    return (
        <div className='w-full h-full '>
            <div className='relative w-full h-full border border-gray-300 overflow-hidden'>
                {/* Fabric */}
                <canvas
                    ref={fabricRef}
                    width={Math.round(widthCm * cmToPx(1))}
                    height={Math.round(heightCm * cmToPx(1))}
                    className='absolute top-0 left-0 z-0'
                />
                {/* Rulers (overlay) */}
                {showRulers && (
                    <canvas
                        ref={rulerRef}
                        width={Math.round(widthCm * cmToPx(1))}
                        height={Math.round(heightCm * cmToPx(1))}
                        className='absolute top-0 left-0 z-10 pointer-events-none'
                    />
                )}
            </div>
            <div className='text-xs text-gray-500 mt-2'>
                Zoom: {zoom.toFixed(2)}x | Offset: {offset.x}, {offset.y}
            </div>
        </div>
    );
}
