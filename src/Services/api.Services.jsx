import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31842853-978e72f35827287bca0aab5ce';

export async function fetchImages(searchQuery, pageNumber) {
  try {
    const resp = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNumber,
        per_page: 12,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    toast.error("We're sorry, something's wrong. Please try again later!");
  }
}
