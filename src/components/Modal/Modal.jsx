import { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ url, onClose }) => {
  useEffect(() => {
    const onEscapePress = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscapePress);

    return () => {
      window.removeEventListener('keydown', onEscapePress);
    };
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <ModalImg>
        <img src={url} alt="IMG" />
      </ModalImg>
    </Overlay>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

