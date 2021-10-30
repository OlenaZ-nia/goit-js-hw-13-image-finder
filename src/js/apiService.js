const API_KEY = '24011086-928385de9f6ca9cb6056973c7';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }
  
   fetchImg() {
    let url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${API_KEY}`;
    return fetch(url, options)
        .then(response => response.json())
      .then((data) => {
        this.incrementPage();
          return data;
        })
        .catch(error => {
            console.log('this is error', error)
        });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
