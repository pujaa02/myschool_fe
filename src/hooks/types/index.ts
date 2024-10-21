// Modal Type
export type UserModalType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalData?: unknown;
  openModalWithData?: (data: unknown) => void;
};
