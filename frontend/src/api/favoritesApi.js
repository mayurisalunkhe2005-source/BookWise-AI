import API from "./axios";


// Get all favorite books
export const getFavorites = async () => {

  const response = await API.get("/favorites/");

  return response.data;

};


// Add book to favorites
export const addFavorite = async (isbn) => {

  const response = await API.post(`/favorites/${isbn}`);

  return response.data;

};


// Remove book from favorites
export const removeFavorite = async (isbn) => {

  const response = await API.delete(`/favorites/${isbn}`);

  return response.data;

};


// Check favorite status
export const getFavoriteStatus = async (isbn) => {

  const response = await API.get(`/favorites/${isbn}/status`);

  return response.data;

};