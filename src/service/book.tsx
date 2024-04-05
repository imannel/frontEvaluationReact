import axiosInstance from "../api/axiosInstance";
import { BookData } from '../model/bookData';

export const getBooks = () => {
    return axiosInstance.get("books");
};

export const addBook = (bookData: BookData) => {
    return axiosInstance.post("books", bookData);
};

export const getBookById = (bookId: number) => {
    return axiosInstance.get(`books/${bookId}`);
};

export const deleteBookById = (bookId: number) => {
    return axiosInstance.delete(`books/${bookId}`);
};
export const searchBooks = (keyword: string) => {
    return axiosInstance.get<BookData[]>(`books/search?keyword=${keyword}`);
};
export const addBookToUserLibrary = (userId: number, bookId: number) => {
    return axiosInstance.post(`books/add-to-library/${userId}/${bookId}`);
  };
