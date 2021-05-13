import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: inline-block;
  .back {
    margin: 10px 0;
    padding: 16px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    > .icon {
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
    }
    > span {
      margin: 0;
    }
  }
`;

const Back = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Container>
      <Button className="back" onClick={goBack}>
        <LeftOutlined className="icon" />
        <span>返回</span>
      </Button>
    </Container>
  );
};

export default Back;
