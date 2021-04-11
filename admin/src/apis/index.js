import axios from 'tools/axios';

const api = {
  async getPageBooks(page, pageSize) {
    const { data } = await axios.get(`/api/admin/book?page=${page}&pageSize=${pageSize}`);
    return data;
  },
  async deleteBook(id) {
    await axios.delete(`/api/admin/book/${id}`);
  },
};

export default api;
