import API from "./axios";


export const getBooks = async (page = 1, limit = 20) => {

  const response = await API.get(`/books?page=${page}&limit=${limit}`);

  return response.data.books;

};


export const getPopularBooks = async (limit = 10) => {

  const response = await API.get(`/books/popular?limit=${limit}`);

  return response.data.books || response.data;

};


export const searchBooks = async (query) => {

  const response = await API.get(`/books/search?query=${query}`);

  return response.data.books || response.data;

};


export const recommendBooks = async (title) => {

  const response = await API.post("/books/recommend", {
    book_title: title,
  });

  return response.data;

};