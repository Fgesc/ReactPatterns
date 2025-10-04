import { useContext } from 'react';
import { ModalContext, type ModalContextType } from '../context/ModalContext';

export const useModal = (): ModalContextType => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal надо использовать внутри ModalProvider');
    return ctx;
};