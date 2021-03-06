import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Loading({ className }) {
  return (
    <Container className={className}>
      <Spin tip="拼命加载中..." />
    </Container>
  );
}

export default Loading;
