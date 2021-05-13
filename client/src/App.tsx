import { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from '@/redux/store';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import BookDetail from '@/pages/BookDetail';
import BooksWithType from '@/pages/BooksWithType';
import BookTypes from '@/pages/BookTypes';
import SearchResult from '@/pages/SearchResult';
import BookPocket from '@/pages/BookPocket';
import Loading from '@/components/Loading';
import TopNav from '@/components/TopNav';
import BackTop from '@/components/BackTop';
import api, { Book, User } from '@/api';
import Profile from '@/pages/Profile';
import NotFoundPage from './pages/NotFoundPage';
import Orders from './pages/Orders';

const App = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  const dispatch = useDispatch<Dispatch>();

  const [carouselBooks, setCarouselBooks] = useState<Book[]>();
  const [groupBooks, setGroupBooks] = useState<{ [key: string]: Book[] }>();

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem('token');
      dispatch.user.asyncSet(token);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api.getCarouselBooks().then((result) => {
      setCarouselBooks(result.data);
    });
    api.groupBooksByType().then((result) => {
      setGroupBooks(result);
    });
  }, []);

  if (!carouselBooks || !groupBooks) return <Loading />;

  return (
    <Router>
      <BackTop />
      <TopNav user={user} />
      <Switch>
        <Route path="/" exact>
          <Home carouselBooks={carouselBooks!} groupBooks={groupBooks!} />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/book/:id" exact>
          <BookDetail />
        </Route>
        <Route path="/type" exact>
          <BooksWithType />
        </Route>
        <Route path="/types" exact>
          <BookTypes />
        </Route>
        <Route path="/search" exact>
          <SearchResult />
        </Route>
        <Route path="/book_pocket" exact>
          <BookPocket />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
