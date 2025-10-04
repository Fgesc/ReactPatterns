import { useState, type ReactNode } from 'react';
import { ModalContext } from '../context/ModalContext';
import {  type typeLaunches } from '../types/typeLaunches';
import { Modal } from '../ui/Modal/Modal';
import { ModalWrapper } from '../ui/ModalWrapper/ModalWrapper';
import { ModalPortal } from '../ui/ModalPortal/ModalPortal';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [selectedLaunch, setSelectedLaunch] = useState<typeLaunches | null>(null);

    const openModal = (launch: typeLaunches) => setSelectedLaunch(launch);
    const closeModal = () => setSelectedLaunch(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {selectedLaunch && (
                <ModalPortal>
                    <ModalWrapper onClose={closeModal}>
                        <Modal launch={selectedLaunch} />
                    </ModalWrapper>
                </ModalPortal>
            )}
        </ModalContext.Provider>
    );
};
