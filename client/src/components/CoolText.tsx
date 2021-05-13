import React from 'react';
import styled from 'styled-components';

const CoolWrapper = styled.span`
  text-decoration: none;
  color: #121314;
  position: relative;
  &::after {
    border-radius: 2px;
    content: '';
    position: absolute;
    top: 70%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
    background: rgba(75, 108, 180, 0.5) !important;
  }
  &:hover::after {
    top: 0%;
  }
`;

const CoolText: React.FC = ({ children }) => {
  return <CoolWrapper>{children}</CoolWrapper>;
};

export default CoolText;
