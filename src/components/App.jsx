import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { animateScroll } from 'react-scroll';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import PropTypes from 'prop-types';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from '../services/images-api';

export const App = () => {
  const [gallery, setGallery] = useState({});
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const handleLoad = () => {
    setPage(prev => prev + 1);
    animateScroll.scrollMore(650);
  };

  const handleFormSubmit = imageName => {
    setName(imageName);
    setImages(null);
    setPage(1);
  };

  useEffect(() => {
    if (name === '') {
      return;
    }

    setLoading(true);

    fetchImages(name, page)
      .then(imagesList => {
        setGallery(imagesList);
        setImages(prev => {
          if (prev) {
            return [...prev, ...imagesList.hits];
          }
          return [...imagesList.hits];
        });
      })
      .finally(() => setLoading(false));
  }, [name, page]);

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={images} />
      {loading && <Loader />}
      {images &&
        images.length !== 0 &&
        page < Math.ceil(gallery.totalHits / 12) && (
          <Button onLoad={handleLoad} />
        )}

      <ToastContainer autoClose={3000} />
    </Container>
  );
};

App.propTypes = {
  imageName: PropTypes.func,
};
