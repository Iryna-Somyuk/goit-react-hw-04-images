import { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapePress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapePress);
  }

  onEscapePress = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { url, onClose } = this.props;

    return (
      <Overlay onClick={onClose}>
        <ModalImg>
          <img src={url} alt="IMG" />
        </ModalImg>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
