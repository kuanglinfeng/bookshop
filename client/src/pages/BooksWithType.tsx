import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import api, { Book } from '@/api';
import BookGroup from '@/components/BookGroup';
import Loading from '@/components/Loading';
import Back from '@/components/Back';

const Container = styled.div`
  max-width: 960px;
  margin: 10px auto 0px;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

const BooksWithType: React.FC = () => {
  const location = useLocation();
  const { type } = queryString.parse(location.search) as { type: string };
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    api.getBooksByType(type).then((result) => {
      setBooks(result.books);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!books) return <Loading />;

  return (
    <Container>
      <Back />
      <BookGroup type={type} books={books} moreVisible={false} />
    </Container>
  );
};

export default BooksWithType;
