const API_KEY = '32892374-a95000907ffe9110fe06b3122';
const BASE_URL = 'https://pixabay.com/api/';

export default function fetchImages(name, page) {
  return fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('No response'));
  });
}
