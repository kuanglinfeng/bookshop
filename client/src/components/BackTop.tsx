import styled from 'styled-components';
import { BackTop as BT } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { themeColor } from '@/config';

const Container = styled.div`
  @media (max-width: 740px) {
    display: none;
  }
  .content {
    bottom: 180px;
    right: 150px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 90px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f5f5f5;
  color: #757575;
  &:hover {
    color: ${themeColor};
  }
  .icon {
    font-size: 30px;
  }
  span.description {
    transition: color 0.3s;
    font-size: 14px;
  }
`;

const BackTop = () => {
  return (
    <Container>
      <BT className="content">
        <IconWrapper>
          <VerticalAlignTopOutlined className="icon" />
          <span className="description">回顶部</span>
        </IconWrapper>
      </BT>
    </Container>
  );
};

export default BackTop;
