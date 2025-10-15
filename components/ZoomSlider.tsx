"use client";

export default function ZoomSlider({ zoom, onChange }: {
  zoom: number;
  onChange: (v: number) => void
}) {
  return (
    <div className="fixed w-full bottom-0 bg-white shadow-lg h-[50px] flex items-center gap-2 z-10">
      <span className="text-sm">{Math.round(zoom * 100)}%</span>
      <input
        type="range"
        min={0.1} max={5} step={0.1}
        value={zoom}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-40"
      />
    </div>
  );
}
