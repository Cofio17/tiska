"use client";

type Props = {
  onExtend: () => void;
  extendIncrement: number;
  onDownload: () => void;
};

export default function Toolbar({ onExtend, extendIncrement, onDownload }: Props) {
  return (
    <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow flex justify-center items-center gap-3">
      {/* <button
        onClick={onExtend}
        className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 standard-transition-300"
      >
        Extend +{extendIncrement}cm
      </button> */}
      <button
        onClick={onDownload}
        className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 standard-transition-300"
      >
        Download PNG
      </button>
    </div>
  );
}

