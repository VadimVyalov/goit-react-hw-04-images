import { getHits } from 'tools/apiGet';
import Notiflix from 'notiflix';
import { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

export const App = () => {
  const [hitsImg, setHitsImg] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const totalUrlPages = useRef(0);
  const searhParams = useRef({
    searchUrlString: '',
    pageUrlNumber: 1,
    numUrlPerSearch: 12,
  });

  useEffect(() => {
    const getF = async () => {
      setIsLoaded(true);
      try {
        if (!searchString) throw new Error('Заповни поле пошуку');

        searhParams.current.searchUrlString = searchString;
        searhParams.current.pageUrlNumber = pageNumber;

        const hits = await getHits(searhParams.current);

        if (!hits.actualTotalHits) throw new Error(hits.message);

        const { actualTotalHits, hitsImg } = hits;

        if (pageNumber < 2) {
          totalUrlPages.current = Math.ceil(
            actualTotalHits / searhParams.current.numUrlPerSearch
          );
          Notiflix.Notify.info(`Картинок знайдено: ${actualTotalHits} `);
        }

        setHitsImg(prevHits => [...prevHits, ...hitsImg]);
      } catch (error) {
        setPageNumber(0);
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoaded(false);
      }
    };

    if (pageNumber) getF();
  }, [pageNumber, searchString]);

  const onSubmit = evt => {
    evt.preventDefault();

    const inputString = evt.currentTarget.elements.searchString;
    const inputValue = evt.currentTarget.elements.searchString.value.trim();
    if (!inputValue) {
      setPageNumber(0);
    } else if (searchString === inputValue) {
      Notiflix.Notify.info(`Вже шукали "${inputValue}" `);
      inputString.value = '';
      return;
    }

    setSearchString(inputValue);
    setPageNumber(1);
    setHitsImg([]);
    totalUrlPages.current = 0;
    inputString.value = '';
  };

  const loadMore = () => {
    setPageNumber(prevValue => prevValue + 1);
  };

  const getImgId = id => {
    const largeImageURLfromId = hitsImg.find(
      hit => hit.id === id
    ).largeImageURL;
    setLargeImageURL(largeImageURLfromId);
  };

  const closeModal = () => {
    setLargeImageURL('');
  };

  const showLoadMore = totalUrlPages.current > pageNumber;
  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {Boolean(pageNumber) && (
        <ImageGallery imageHits={hitsImg} getItemId={getImgId} />
      )}
      {isLoaded ? <Loader /> : showLoadMore && <Button loadMore={loadMore} />}
      {Boolean(largeImageURL) && (
        <Modal image={largeImageURL} closeModal={closeModal} />
      )}
    </>
  );
};
