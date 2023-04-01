import PropTypes from 'prop-types';
import { ModalOverley } from './Modal.styled';
import { useEffect } from 'react';
const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    const onEscClose = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onEscClose);

    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  }, [closeModal]);

  const handleClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return (
    <ModalOverley onClick={handleClick}>
      <div>
        <img src={image} alt="" />
      </div>
    </ModalOverley>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
