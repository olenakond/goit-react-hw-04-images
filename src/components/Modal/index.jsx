import { useEffect } from 'react';
import { Overlay, Container } from './Modal.styled';

const Modal = ({ image, toogleModal }) => {
  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        toogleModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [toogleModal]);

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
