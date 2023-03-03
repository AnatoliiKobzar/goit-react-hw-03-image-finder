const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32887815-95ef90331530c7572123f2036';

export const getImage = (searchText, page = 1) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
