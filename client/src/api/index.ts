import axios from '@/tools/axios';

const BOOK_API_PATH = '/api/book';
const AUTH_PATH = '/api/auth';
const USER_POCKET_PATH = '/api/user/book_pocket';
const ORDER_PATH = '/api/order';

export interface BookPocketItem {
  book: Book;
  amount: number;
}

export type BookPocket = BookPocketItem[];

export interface Account {
  email: string;
  password: string;
}

export interface BaseUser extends Account {
  avatar: string;
  name: string;
  phone: string;
  address: string;
  bookPocket: BookPocket;
}

export interface User extends BaseUser {
  _id: string;
}

export interface Book {
  author: string;
  coverImage: string;
  discountPrice: number;
  introduce: string;
  isAdded: boolean;
  name: string;
  pages: number;
  poster: string;
  price: number;
  publishDate: string;
  publisher: string;
  salesVolume: number;
  stock: number;
  types: string[];
  _id: string;
}

export enum OrderStatus {
  Paid,
  Finished,
  Cancel,
}

export interface BaseOrder {
  user: User;
  book: Book;
  amount: number;
  money: number;
  createAt: string;
  status: OrderStatus;
}

export interface Order extends BaseOrder {
  _id: string;
}

const api = {
  async getPageBooks(page: number, pageSize: number) {
    const { data } = await axios.get(`${BOOK_API_PATH}?page=${page}&pageSize=${pageSize}`);
    return data;
  },
  async register(user: Pick<BaseUser, 'name' | 'email' | 'password'>) {
    const { data } = await axios.post(`${AUTH_PATH}/register`, user);
    return data;
  },
  async login(user: Account) {
    const { data } = await axios.post(`${AUTH_PATH}/login`, user);
    return data;
  },
  async auth(token: string) {
    const { data } = await axios.get(AUTH_PATH, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  },
  async editUser(userId: string, newUser: User) {
    const { data } = await axios.put(`${AUTH_PATH}/${userId}`, { user: newUser });
    return data;
  },
  async getCarouselBooks() {
    const { data } = await axios.get(`${BOOK_API_PATH}/home/carousel`);
    return data;
  },
  async groupBooksByType() {
    const { data } = await axios.get(`${BOOK_API_PATH}/all/books`);
    const map: { [key: string]: Book[] } = {};
    const books = data.data as Book[];
    books.forEach((book) => {
      book.types.forEach((type) => {
        if (!map[type]) {
          map[type] = [book];
        } else {
          map[type].push(book);
        }
      });
    });
    return map;
  },
  async getBookById(id: string) {
    const { data } = await axios.get(`${BOOK_API_PATH}/${id}`);
    return data.data as Book;
  },
  async getBooksByType(type: string) {
    const { data } = await axios.get(`${BOOK_API_PATH}?page=1&pageSize=99999&keywordProp=types&keywordValue=${type}`);
    return data.data as { books: Book[]; count: number };
  },
  async search(keyword: string) {
    const { data: resultOfName } = await axios.get(
      `${BOOK_API_PATH}?page=1&pageSize=99999&keywordProp=name&keywordValue=${keyword}`,
    );
    const { data: resultOfAuthor } = await axios.get(
      `${BOOK_API_PATH}?page=1&pageSize=99999&keywordProp=author&keywordValue=${keyword}`,
    );
    const resultOfNameBooks = resultOfName.data.books as Book[];
    const resultOfAuthorBooks = resultOfAuthor.data.books as Book[];
    const books: Book[] = [];
    resultOfNameBooks.forEach((b) => {
      if (!books.find((book) => book._id === b._id)) {
        books.push(b);
      }
    });
    resultOfAuthorBooks.forEach((b) => {
      if (!books.find((book) => book._id === b._id)) {
        books.push(b);
      }
    });
    return books;
  },
  async getBookPocket(userId: string) {
    const { data } = await axios.get(`${USER_POCKET_PATH}/${userId}`);
    return data.data as BookPocket;
  },
  async addBookToPocket(userId: string, book: Book, amount: number) {
    const { data } = await axios.post(`${USER_POCKET_PATH}`, { userId, book, amount });
    return data.data;
  },
  async deleteBookFromPocket(userId: string, bookId: string, amount: number) {
    const { data } = await axios.delete(`${USER_POCKET_PATH}?userId=${userId}&bookId=${bookId}&amount=${amount}`);
    return data.data;
  },
  async addOrder(order: BaseOrder) {
    const { data } = await axios.post(`${ORDER_PATH}`, { order });
    return data.data;
  },
  async getOrders(userId: string) {
    const { data } = await axios.get(`${ORDER_PATH}/${userId}`);
    return data.data;
  },
};

export default api;
