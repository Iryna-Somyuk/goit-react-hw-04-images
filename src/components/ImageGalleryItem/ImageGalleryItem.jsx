import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

import {
  ItemImageGallery,
  ItemImageGalleryImg,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { webformatURL, tags, largeImageURL } = image;

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <ItemImageGallery>
        <ItemImageGalleryImg
          src={webformatURL}
          alt={tags}
          onClick={handleToggleModal}
        />
      </ItemImageGallery>
      {isModalOpen && <Modal url={largeImageURL} onClose={handleToggleModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
};
