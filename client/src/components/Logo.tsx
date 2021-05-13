import React from 'react';
import styled from 'styled-components';
import logo from '@/assets/logo.png';

const Container = styled.div`
  cursor: pointer;
  max-width: 132px;
  display: flex;
  align-items: flex-end;
`;

const Image = styled.img`
  max-height: 40px;
`;

const Name = styled.span`
  color: #fbcc66;
  font-weight: bold;
  font-size: 22px;
`;

const Logo = () => {
  return (
    <Container>
      <Image src={logo} />
      <Name>极客书店</Name>
    </Container>
  );
};

export default Logo;
