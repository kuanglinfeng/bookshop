import React from 'react';
import styled from 'styled-components';
import Carousel from '@/components/Carousel';
import BookGroup from '@/components/BookGroup';
import Footer from '@/components/Footer';
import { Book } from '@/api';

const Content = styled.div``;

const Main = styled.main`
  max-width: 960px;
  margin: 10px auto 0px;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

interface HomeProps {
  carouselBooks: Book[];
  groupBooks: { [key: string]: Book[] };
}

const Home: React.FC<HomeProps> = ({ carouselBooks, groupBooks }) => {
  const renderGroupBooks = () => {
    const result = [];
    for (let i in groupBooks) {
      if (groupBooks.hasOwnProperty(i)) {
        result.push(<BookGroup key={i} type={i} books={groupBooks[i]} />);
      }
    }
    return result;
  };

  return (
    <>
      <Main>
        <Content>
          <Carousel books={carouselBooks} />
          {renderGroupBooks()}
        </Content>
      </Main>
      <Footer />
    </>
  );
};

export default Home;
