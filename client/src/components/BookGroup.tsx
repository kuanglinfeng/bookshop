import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Book } from '@/api';
import { themeColor } from '@/config';

import BookItem from './BookItem';

const Container = styled.div`
  user-select: none;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 740px) {
    padding: 0 12px;
  }
`;

const TitleWrapper = styled.div`
  height: 58px;
  -webkit-font-smoothing: antialiased;
`;

const Title = styled.h3`
  font-size: 22px;
  line-height: 58px;
  color: #333;
`;

const More = styled.div`
  cursor: pointer;
  position: relative;
  padding-right: 12px;
  &:hover {
    color: ${themeColor};
  }
  &::after {
    position: absolute;
    top: -1px;
    right: 0;
    content: '>';
    display: block;
  }
`;

const Main = styled.ul`
  margin: 0 -14px 0 -25px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 740px) {
    margin: 0;
  }
`;

interface BookGroupProps {
  type?: string;
  books: Book[];
  moreVisible?: boolean;
  titleVisible?: boolean;
}

export const BookGroup: React.FC<BookGroupProps> = ({ type, books, moreVisible = true, titleVisible = true }) => {
  const history = useHistory();

  return (
    <Container>
      <Header>
        {titleVisible ? (
          <TitleWrapper>
            <Title>{type}</Title>
          </TitleWrapper>
        ) : null}
        {moreVisible ? <More onClick={() => history.push(`/type?type=${type}`)}>查看更多</More> : null}
      </Header>
      <Main>
        {books.map((book) => (
          <BookItem key={book._id} book={book} />
        ))}
      </Main>
    </Container>
  );
};

export default BookGroup;
