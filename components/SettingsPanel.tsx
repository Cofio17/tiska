'use client';

import { MirrorMode, PatternSettings } from '@/utils/types';

interface SettingsPanelProps {
 widthCm: number;
 setWidthCm: (n: number) => void;
 heightCm: number;
 setHeightCm: (n: number) => void;
 settings: PatternSettings;
 setRotationDeg: (n: number) => void;
 setMirrorMode: (m: MirrorMode) => void;
 setOddRowOffsetCm: (n: number) => void;
 setTileScale: (n: number) => void;
 setTileGapCm: (n: number) => void;
}

export default function SettingsPanel(props: SettingsPanelProps) {
 const {
  widthCm,
  setWidthCm,
  heightCm,
  setHeightCm,
  settings,
  setRotationDeg,
  setMirrorMode,
  setOddRowOffsetCm,
  setTileScale,
  setTileGapCm,
 } = props;

 return (
  <div className=''>
   <h2 className='font-semibold'>Settings</h2>
   <div className='space-y-2'>
    <label className='text-sm font-medium'>Fabric Width (cm)</label>
    <div className='flex gap-2'>
     {[20, 50, 145].map((w) => (
      <button
       key={w}
       onClick={() => setWidthCm(w)}
       className={`px-3 py-1.5 rounded-xl border standard-transition-300 ${
        widthCm === w ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300'
       }`}
      >
       {w} cm
      </button>
     ))}
    </div>
   </div>
   <div className='space-y-2'>
    <label className='text-sm font-medium'>Fabric Length (cm)</label>
    <input
     type='number'
     value={heightCm}
     onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
     className='w-full rounded-xl border border-gray-300 px-3 py-2'
     min={10}
    />
   </div>

   <div className='grid grid-cols-1 gap-4'>
    <div>
     <label className='text-sm font-medium'>Rotation (°)</label>
     <input
      type='range'
      min={-180}
      max={180}
      value={settings.rotationDeg}
      onChange={(e) => setRotationDeg(Number(e.target.value))}
      className='w-full'
     />
     <div className='text-xs text-gray-600 mt-1'>{settings.rotationDeg}°</div>
    </div>

    <div>
     <label className='text-sm font-medium'>Mirror Mode</label>
     <select
      className='w-full rounded-xl border border-gray-300 px-3 py-2'
      value={settings.mirrorMode}
      onChange={(e) => setMirrorMode(e.target.value as MirrorMode)}
     >
      <option value='none'>None</option>
      <option value='alternate'>Alternate rows</option>
      <option value='all'>All rows</option>
     </select>
    </div>

    <div>
     <label className='text-sm font-medium'>Odd Row Offset (cm, up)</label>
     <input
      type='number'
      value={settings.oddRowOffsetCm}
      onChange={(e) => setOddRowOffsetCm(Number(e.target.value) || 0)}
      className='w-full rounded-xl border border-gray-300 px-3 py-2'
      step={0.1}
     />
    </div>

    <div>
     <label className='text-sm font-medium'>Tile Scale</label>
     <input
      type='range'
      min={0.1}
      max={5}
      step={0.1}
      value={settings.tileScale}
      onChange={(e) => setTileScale(Number(e.target.value))}
      className='w-full'
     />
     <div className='text-xs text-gray-600 mt-1'>×{settings.tileScale.toFixed(1)}</div>
    </div>

    <div>
     <label className='text-sm font-medium'>Tile Gap (cm)</label>
     <input
      type='number'
      value={settings.tileGapCm}
      onChange={(e) => setTileGapCm(Number(e.target.value) || 0)}
      className='w-full rounded-xl border border-gray-300 px-3 py-2'
      step={0.1}
     />
    </div>
   </div>
  </div>
 );
}
