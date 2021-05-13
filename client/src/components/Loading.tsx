import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <Container className={className}>
      <Spin tip="拼命加载中..." />
    </Container>
  );
};

export default Loading;
