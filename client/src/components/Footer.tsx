import styled from 'styled-components';

const Container = styled.footer`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  background: #f2f2f2;
  > p {
    margin: 0;
    padding: 8px;
  }
`;

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <Container className={className}>
      <p>Copyright © LinFeng.Kuang</p>
    </Container>
  );
};

export default Footer;
