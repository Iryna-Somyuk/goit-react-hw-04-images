import { useState, useEffect } from 'react';
import { AppContainer } from './App.styled';
import { fetchImages } from 'Services/api.Services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { Notification } from './ErrorMessage/ErrorMessage';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const resp = await fetchImages(query, page);
        if (resp) {
          setImages(prev => page === 1 ? [...resp.hits] : [...prev, ...resp.hits]);
          setTotalImages(resp.totalHits);

          if (!resp.totalHits) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again!',
              {
                duration: 4000,
              }
            );
            return;
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (query) {
      fetchImage();
    }
  }, [query, page]);

  const handelSubmit = query => {
    console.log(query);
    setQuery(query);
    setIsLoading(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  const renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      !!images.length && images.length < totalImages && (
        <Button onLoadMore={handleLoadMore} />
      )
    );
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handelSubmit} />
      {error && <Notification />}
      <ImageGallery images={images} />
      {renderButtonOrLoader()}
      <Toaster position="top-center" reverseOrder={true} />
    </AppContainer>
  );
};
