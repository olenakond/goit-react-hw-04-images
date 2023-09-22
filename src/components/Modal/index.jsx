import { useEffect } from 'react';
import { Overlay, Container } from './Modal.styled';

const Modal = ({ image, toogleModal }) => {
  const handleEscape = event => {
    if (event.code === 'Escape') {
      toogleModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      toogleModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container>
        <img src={image.largeImageURL} alt={image.tags} />
      </Container>
    </Overlay>
  );
};

export default Modal;
