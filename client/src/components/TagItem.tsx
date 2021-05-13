import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Book } from '@/api';
import { themeColor } from '@/config';

type BookListProps = {
  borderBottom: 'none' | 'solid';
};

export const BookList = styled.ul`
  margin: 0;
  padding: 0 1.5em;
  border-bottom: 1px #eef2f8;
  border-bottom-style: ${(props: BookListProps) => props.borderBottom};
`;

export const BookItem = styled.li`
  font-size: 16px;
  cursor: pointer;
  list-style: none;
  margin-bottom: 10px;
  color: #444;
  &:hover {
    color: #000;
  }
`;

export const TagTitle = styled.h4`
  font-weight: 700;
  margin: 22px 0;
  color: ${themeColor};
`;

export const AuthorTip = styled.span`
  font-size: 14px;
  color: #999;
`;

interface Props {
  tag: string;
  books: Book[];
  borderBottom: 'none' | 'solid';
}

const TagItem: React.FC<Props> = ({ books, borderBottom, tag }) => {
  return (
    <>
      <TagTitle>{tag + `(${books.length})`}</TagTitle>
      <BookList borderBottom={borderBottom}>
        {books.map((book) => (
          <NavLink to={`/book/${book._id}`} key={book._id}>
            <BookItem>
              {book.name}
              <AuthorTip> - {book.author}</AuthorTip>
            </BookItem>
          </NavLink>
        ))}
      </BookList>
    </>
  );
};

export default TagItem;
