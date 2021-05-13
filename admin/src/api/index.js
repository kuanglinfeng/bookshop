import axios from 'tools/axios';

const BOOK_API_PATH = '/api/admin/book';
const AUTH_PATH = '/api/admin/auth';
const ORDER_PATH = '/api/order';

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
  },
  async putAddedStatus(book, isAdded) {
    const { _id: id, ...rest } = book;
    const newBook = { ...rest, isAdded };
    const { data } = await this.editBook(id, newBook);
    return data;
  },
  async login(admin) {
    const { data } = await axios.post(`${AUTH_PATH}/login`, admin);
    return data;
  },
  async auth(token) {
    const { data } = await axios.get(AUTH_PATH, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return data;
  },
  async getPageOrders(page, pageSize) {
    const { data } = await axios.get(`${ORDER_PATH}?page=${page}&pageSize=${pageSize}`);
    return data;
  },
  async editOrder(id, newOrder) {
    const { data } = await axios.put(`${ORDER_PATH}/${id}`, {order: newOrder});
    return data;
  },
};

export default api;
