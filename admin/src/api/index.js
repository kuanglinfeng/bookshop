import axios from 'tools/axios';

const BOOK_API_PATH = '/api/admin/book';

const api = {
  async getPageBooks(page, pageSize) {
    const { data } = await axios.get(`${BOOK_API_PATH}?page=${page}&pageSize=${pageSize}`);
    return data;
  },
  async deleteBook(id) {
    const { data } = await axios.delete(`${BOOK_API_PATH}/${id}`);
    return data;
  },
  async addBook(book) {
    const { data } = await axios.post(BOOK_API_PATH, book);
    return data;
  },
  async getBookById(id) {
    const { data } = await axios.get(`${BOOK_API_PATH}/${id}`);
    return data;
  },
  async editBook(id, book) {
    const { data } = await axios.put(`${BOOK_API_PATH}/${id}`, book);
    return data;
  }
};

export default api;
