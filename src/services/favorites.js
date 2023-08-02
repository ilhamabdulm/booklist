import axios from 'axios';

export const getAllFavorites = async () => {
  try {
    const response = await axios.get('/api/favorites');
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const saveFavorite = async (data) => {
  try {
    const response = await axios.post('/api/favorites', data);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteFavorite = async (id) => {
  try {
    const response = await axios.delete('/api/favorites/', { params: { id } });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
