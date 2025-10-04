import { createContext } from 'react';
import type { typeLaunches } from '../types/typeLaunches';

export type ModalContextType = {
    openModal: (launch: typeLaunches) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);