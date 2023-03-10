import { useState } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const openModal = image => {
    setIsModalOpen(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {images &&
        images.map(({ id, largeImageURL, webformatURL, tags }) => (
          <GalleryItem key={id} onClick={() => openModal(largeImageURL)}>
            <GalleryImage src={webformatURL} alt={tags} />
          </GalleryItem>
        ))}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImage} alt="something" />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};
