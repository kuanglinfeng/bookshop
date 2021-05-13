import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TagItem from '@/components/TagItem';
import Footer from '@/components/Footer';
import { tagColors } from '@/config';
import api, { Book } from '@/api';
import Loading from '@/components/Loading';
import Back from '@/components/Back';

const Container = styled.div`
  max-width: 960px;
  margin: 10px auto 30px;
`;

const Content = styled.main`
  border-radius: 4px;
  background: #fff;
  min-height: 100vh;
  padding: 20px;

  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

interface ITagProps {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const TagWrapper = styled.ul`
  padding: 0 1.5em;
  margin: 0;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.li<ITagProps>`
  display: inline-block;
  height: auto;
  margin: 0 8px 8px 0;
  padding: 0 7px;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  color: ${(props) => props.color || '#eb2f96'};
  background-color: ${(props) => props.backgroundColor || '#fff0f6'};
  border-color: ${(props) => props.borderColor || '#ffadd2'};
`;

interface BooksHash {
  [key: string]: Book[];
}

const BookTypes = () => {
  const [booksHash, setBooksHash] = useState<BooksHash>({});
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const result = await api.groupBooksByType();
      setBooksHash(result);
    })();
  }, []);

  const showSortedArticles = (booksHash: BooksHash) => {
    const cache = [];
    const types = Object.keys(booksHash);
    if (types.length === 0) return <Loading />;
    cache.push(
      <div key={'fuck' + types.length}>
        <Title>图书类别</Title>
        <TagWrapper>
          {types!.map((type) => {
            return (
              <Tag
                key={type}
                {...tagColors[type.length % 7]}
                onClick={() => {
                  history.push(`/type?type=${type}`);
                }}
              >
                {type}
              </Tag>
            );
          })}
        </TagWrapper>
      </div>,
    );
    for (let tagTitle in booksHash) {
      if (booksHash.hasOwnProperty(tagTitle)) {
        const articles = booksHash[tagTitle];
        cache.push(
          <div key={tagTitle}>
            <TagItem tag={tagTitle} books={articles} borderBottom="solid" />
          </div>,
        );
      }
    }
    return <Content>{cache}</Content>;
  };

  return (
    <>
      <Container>
        <Back />
        {showSortedArticles(booksHash)}
      </Container>
      <Footer />
    </>
  );
};

export default BookTypes;
