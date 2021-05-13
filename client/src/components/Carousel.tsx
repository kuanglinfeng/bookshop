import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Settings } from 'react-slick';
import { Book } from '@/api';
import { imageBaseURL } from '@/config';

const Container = styled.div`
  @media (max-width: 740px) {
    display: none;
  }
  cursor: pointer;
  border-radius: 4px;
  .slick-dots {
    bottom: 10px;
  }
  .slick-prev,
  .slick-next {
    visibility: hidden;
    z-index: 99;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 34px;
  }
  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 24px;
  }
  &:hover .slick-prev {
    visibility: visible;
  }
  &:hover .slick-next {
    visibility: visible;
  }
`;

const ImageWrapper = styled.div``;

const Image = styled.img`
  width: 960px;
`;

interface CarouselProps {
  className?: string;
  books: Book[];
}

const Carousel: React.FC<CarouselProps> = ({ className, books }) => {
  const history = useHistory();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const afterChange = (current: number) => {
    setCurrentBannerIndex(current);
  };

  const goToDetail = () => {
    history.push(`/book/${books[currentBannerIndex]._id}`);
  };

  const [settings] = useState<Settings>({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: true,
    afterChange,
  });
  return (
    <Container className={className}>
      <Slider {...settings}>
        {books.map((book) => (
          <ImageWrapper key={book._id}>
            <Image src={`${imageBaseURL}/${book.poster}`} onClick={() => goToDetail()} />
          </ImageWrapper>
        ))}
      </Slider>
    </Container>
  );
};

export default Carousel;
