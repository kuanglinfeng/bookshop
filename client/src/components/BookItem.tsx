import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { imageBaseURL, moneyColor } from '@/config';
import { Book } from '@/api';

const Container = styled.li`
  user-select: none;
  cursor: pointer;
  list-style: none;
  padding: 20px 0 10px;
  width: 220px;
  margin-left: 26px;
  margin-bottom: 22px;
  background: #fff;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
    transform: translate3d(0, -2px, 0);
  }

  @media (max-width: 740px) {
    width: 170px;
    margin: 0 0 10px 12px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 18px;
`;

const Image = styled.img`
  width: 180px;
  height: 220px;
  @media (max-width: 740px) {
    width: 140px;
    height: 160px;
  }
`;

const Title = styled.h3`
  margin: 0 10px 10px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  color: #333;
`;

const Author = styled.p`
  margin: 0 10px 2px;
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;

  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Price = styled.p`
  margin: 0 10px 0;
  text-align: center;
  color: ${moneyColor};
`;

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book: { _id, coverImage, name, author, discountPrice, price } }) => {
  const history = useHistory();

  return (
    <Container onClick={() => history.push(`/book/${_id}`)}>
      <ImageWrapper>
        <Image src={`${imageBaseURL}/${coverImage}`} />
      </ImageWrapper>
      <Title>{name}</Title>
      <Author>{author}</Author>
      <Price>￥{discountPrice || price}</Price>
    </Container>
  );
};

export default BookItem;
