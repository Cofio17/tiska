'use client';

import { useRef, useState } from 'react';

type Props = { onUpload: (img: ImageBitmap | null) => void };

export default function UploadControl({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dpi, setDpi] = useState<number | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      removeImage();
      return;
    }

    setFileName(file.name);

    const blob = await file.arrayBuffer();
    const typedBlob = new Blob([blob]);
    const imgEl = await createImageBitmap(typedBlob);

    // calculate DPI (assume 96 dpi for now, can improve with actual pixel/cm ratio if needed)
    const pxPerInch = 96;
    const imageDPI = Math.round((imgEl.width / (imgEl.width / pxPerInch)) || pxPerInch); 
    setDpi(imageDPI);

    onUpload(imgEl);
  }

  function removeImage() {
    setFileName(null);
    setDpi(null);
    onUpload(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  const getDpiColor = () => {
    if (!dpi) return 'text-gray-500';
    if (dpi >= 300) return 'text-green-600';
    if (dpi >= 150) return 'text-yellow-500';
    return 'text-red-600';
  };
  // TODO: Dodati Modal kad se otvori za biranje materijala, traziti od BE Endpoint za to
  return (
    <div className='p-4 rounded-2xl border border-gray-200'>
      <h2 className='font-semibold mb-2'>Upload Design</h2>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
      />

      {fileName && (
        <div className='mt-2 flex items-center justify-between'>
          <span className='text-sm'>{fileName}</span>
          <button
            onClick={removeImage}
            className='text-sm text-red-600 hover:underline'
          >
            Remove
          </button>
        </div>
      )}

      {dpi && (
        <div className={`text-sm mt-1 ${getDpiColor()}`}>
          DPI: {dpi}
        </div>
      )}
    </div>
  );
}
