import { useState } from 'react';

// ** type **
import { UserModalType } from './types';

export const useModal = (isOpenProp?: boolean): UserModalType => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenProp ?? false);
  const [modalData, setModalData] = useState<unknown>();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModalWithData = (data: unknown) => {
    setModalData(data);
    setIsOpen(true);
  };
  return {
    isOpen,
    openModal,
    closeModal,
    openModalWithData,
    modalData,
  };
};
