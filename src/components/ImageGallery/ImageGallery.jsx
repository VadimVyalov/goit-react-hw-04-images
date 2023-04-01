import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';
const ImageGallery = ({ imageHits, getItemId }) => {
  return (
    <Gallery>
      {imageHits.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            image={item.webformatURL}
            getId={() => {
              getItemId(item.id);
            }}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  imageHits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  getItemId: PropTypes.func.isRequired,
};

export default ImageGallery;
