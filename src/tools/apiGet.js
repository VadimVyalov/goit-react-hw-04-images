import axios from 'axios';

export async function getFetch(url, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
  }, timeout);
  const response = await axios.get(url, {
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

export function makeURL(makeURLParams) {
  const { searchUrlString, pageUrlNumber, numUrlPerSearch } = makeURLParams;
  const params = new URLSearchParams({
    key: '32938330-25a7d9530d370aeaa9b179f57',
    q: searchUrlString,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageUrlNumber,
    per_page: numUrlPerSearch,
  });

  return `https://pixabay.com/api/?${params}`;
}

export async function getHits(makeImgParams) {
  const { numUrlPerSearch } = makeImgParams;
  const URL = makeURL(makeImgParams);

  try {
    const imagesData = await getFetch(URL, 2500);
    const { total, totalHits, hits } = imagesData.data;

    if (!totalHits) throw new Error('Нічого не знайшлось');

    const hitsImg = hits.map(hit => ({
      id: hit.id.toString(),
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
    }));

    const actualTotalHits =
      total >= totalHits + (totalHits % numUrlPerSearch)
        ? totalHits + (totalHits % numUrlPerSearch)
        : total;

    //const totalPages = Math.ceil(actualTotalHits / numPerSearch);

    return { actualTotalHits, hitsImg };
  } catch (error) {
    if (error.name === 'CanceledError') throw new Error('Час вичерпано');
    return error;
  }
}
