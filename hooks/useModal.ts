import { useState, useCallback } from 'react';

type ModalState = {
 [id: string]: boolean;
};

export default function useModal() {
 const [modals, setModals] = useState<ModalState>({});

 const openModal = useCallback((id: string) => {
  setModals((prev) => ({ ...prev, [id]: true }));
 }, []);

 const closeModal = useCallback((id: string) => {
  setModals((prev) => ({ ...prev, [id]: false }));
 }, []);

 const isOpen = useCallback((id: string) => !!modals[id], [modals]);

 return { openModal, closeModal, isOpen };
}
