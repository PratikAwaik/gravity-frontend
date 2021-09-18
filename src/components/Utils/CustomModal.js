import React, { useImperativeHandle, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

const CustomModal = React.forwardRef(({ children }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  useImperativeHandle(ref, () => {
    return {
      openModal, 
      closeModal
    }
  });

  return (
    <ReactModal 
      isOpen={isModalOpen}
    >
      {children}
      <button type="button" onClick={closeModal}>
        <i className="ri-close-line text-base text-theme-orange"></i>
      </button>
    </ReactModal>
  );
});

export default CustomModal;