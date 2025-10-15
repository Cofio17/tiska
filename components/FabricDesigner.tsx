'use client';

import { useState, useMemo, useCallback } from 'react';
import UploadControl from './UploadControl';
import SettingsPanel from './SettingsPanel';
import CanvasPreview from './CanvasPreview';
import Toolbar from './Toolbar';
import { MirrorMode, PatternSettings } from '@/utils/types';
import ZoomSlider from './ZoomSlider';
import { cmToPx, setupHiDPICanvas, tilePattern } from '@/utils/canvasUtils';

const DEFAULT_WIDTH_CM = 145; // user can switch to 50 or 20
const START_LENGTH_CM = 100; // starting length

export default function FabricDesigner() {
    const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null);
    const [widthCm, setWidthCm] = useState<number>(DEFAULT_WIDTH_CM);
    const [heightCm, setHeightCm] = useState<number>(START_LENGTH_CM);
    // Zoom
    const [zoom, setZoom] = useState(0);
    // pattern controls
    const [rotationDeg, setRotationDeg] = useState<number>(0);
    const [mirrorMode, setMirrorMode] = useState<MirrorMode>('none');
    const [oddRowOffsetCm, setOddRowOffsetCm] = useState<number>(0); // move odd rows UP by this many cm
    const [tileScale, setTileScale] = useState<number>(0.1); // 1 = natural size
    const [tileGapCm, setTileGapCm] = useState<number>(0); // optional spacing between tiles in cm
    const [showRulers, setShowRulers] = useState(true);
    const settings: PatternSettings = useMemo(
        () => ({ rotationDeg, mirrorMode, oddRowOffsetCm, tileScale, tileGapCm }),
        [rotationDeg, mirrorMode, oddRowOffsetCm, tileScale, tileGapCm]
    );

    // Extend height: rule per spec → if width=145, +100cm; else +width cm
    const extendIncrement = widthCm === 145 ? 100 : widthCm;
    const onExtend = useCallback(() => setHeightCm((h) => h + extendIncrement), [extendIncrement]);

    const onDownload = useCallback(() => {
        if (!imageBitmap) return;

        const pxPerCm = cmToPx(1);
        const widthPx = Math.round(widthCm * pxPerCm);
        const heightPx = Math.round(heightCm * pxPerCm);

        const offCanvas = document.createElement('canvas');
        const { ctx } = setupHiDPICanvas(offCanvas, widthPx, heightPx);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, widthPx, heightPx);

        // draw pattern only, NO rulers
        tilePattern(ctx, imageBitmap, { widthPx, heightPx, pxPerCm, settings });

        const link = document.createElement('a');
        link.download = `tiska-fabric-${widthCm}x${heightCm}.png`;
        link.href = offCanvas.toDataURL('image/png');
        link.click();
    }, [imageBitmap, widthCm, heightCm, settings]);

    return (
        <div className='flex md:flex-row flex-col gap-4 h-dvh'>
            <div className='w-full overflow-auto h-full'>
                <CanvasPreview
                    id='fabric-canvas'
                    imageBitmap={imageBitmap}
                    widthCm={widthCm}
                    heightCm={heightCm}
                    settings={settings}
                    zoom={zoom}
                    setZoom={setZoom}
                    showRulers={showRulers}
                />
            </div>
            <div className='flex flex-col gap-4 h-full'>
                <UploadControl onUpload={setImageBitmap} />
                <SettingsPanel
                    widthCm={widthCm}
                    setWidthCm={setWidthCm}
                    heightCm={heightCm}
                    setHeightCm={setHeightCm}
                    settings={settings}
                    setRotationDeg={setRotationDeg}
                    setMirrorMode={setMirrorMode}
                    setOddRowOffsetCm={setOddRowOffsetCm}
                    setTileScale={setTileScale}
                    setTileGapCm={setTileGapCm}
                />
                <Toolbar onExtend={onExtend} extendIncrement={extendIncrement} onDownload={onDownload} />
            </div>
            <ZoomSlider zoom={zoom} onChange={setZoom} />
        </div>
    );

}
