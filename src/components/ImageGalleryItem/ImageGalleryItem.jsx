import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

import {
  ItemImageGallery,
  ItemImageGalleryImg,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;

    return (
      <>
        <ItemImageGallery>
          <ItemImageGalleryImg
            src={webformatURL}
            alt={tags}
            onClick={this.handleToggleModal}
          />
        </ItemImageGallery>
        {this.state.isModalOpen && (
          <Modal url={largeImageURL} onClose={this.handleToggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
}

