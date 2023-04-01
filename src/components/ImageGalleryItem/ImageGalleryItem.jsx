import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';
const ImageGalleryItem = ({ image, getId }) => {
  return (
    <GalleryItem onClick={getId}>
      <img src={image} alt="" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  getId: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
