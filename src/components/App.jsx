import { useState, useEffect, useCallback } from 'react';
import { getImagesBySearch } from '../api/images';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [imageModal, setImageModal] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getImagesBySearch(searchQuery, page);
      if (data.totalHits === 0) {
        alert('There are no images matching your request.');
        return;
      }
      const dataForState = data.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        }
      );
      setImages(prevImages => [...prevImages, ...dataForState]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImages();
  }, [fetchImages, searchQuery]);

  const fetchMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements.name.value.trim() === searchQuery) {
      return;
    }
    setSearchQuery(event.target.elements.name.value.trim());
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const toogleModal = (imageModal = null) => {
    setImageModal(imageModal);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} handleImgClick={toogleModal} />
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {images.length !== totalHits && !isLoading && (
        <Button handleLoadMore={fetchMoreImages} />
      )}
      {imageModal && <Modal image={imageModal} toogleModal={toogleModal} />}
    </>
  );
};

export default App;
