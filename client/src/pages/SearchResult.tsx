import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import api, { Book } from '@/api';
import Loading from '@/components/Loading';
import BookGroup from '@/components/BookGroup';
import Back from '@/components/Back';
import NoData from '@/components/NoData';

const Container = styled.div`
  max-width: 960px;
  margin: 10px auto 0px;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

const SearchResult = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search) as { keyword: string };
  const [books, setBooks] = useState<Book[]>();
  const [keyword, setKeyword] = useState(parsed.keyword);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    api.search(keyword).then((books) => {
      setIsSearching(true);
      setBooks(books);
      setIsSearching(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    const searchObj = queryString.parse(location.search) as { keyword: string };
    setKeyword(searchObj.keyword);
  }, [location.search]);

  if (isSearching || !books) return <Loading />;

  return (
    <Container>
      <Back />
      {books.length ? <BookGroup books={books!} titleVisible={false} moreVisible={false} /> : <NoData />}
    </Container>
  );
};

export default SearchResult;
