import { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ModalProps } from '@/types/ui';

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
                'p-0 rounded-lg w-full max-w-4xl border border-gray-200',
                'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
                'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0'
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
