import { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

type ModalProps = {
 id: string;
 isOpen: boolean;
 onClose: () => void;
 children: ReactNode;
};

export default function Modal({ id, isOpen, onClose, children }: ModalProps) {
 const dialogRef = useRef<HTMLDialogElement>(null);

 useEffect(() => {
  const dialog = dialogRef.current;
  if (!dialog) return;

  if (isOpen) {
   dialog.showModal();
  } else {
   dialog.close();
  }

  const handleCancel = (e: Event) => {
   e.preventDefault();
   onClose();
  };

  dialog.addEventListener('cancel', handleCancel);

  return () => {
   dialog.removeEventListener('cancel', handleCancel);
  };
 }, [isOpen, onClose]);

 return (
  <dialog
   ref={dialogRef}
   id={id}
   className={clsx(
    'p-0 rounded-lg w-full max-w-lg',
    'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
    'border border-gray-200'
   )}
  >
   <div className='relative p-6'>
    <button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'>
     ✕
    </button>
    {children}
   </div>
  </dialog>
 );
}
