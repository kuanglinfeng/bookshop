import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const history = useHistory();

  const goBack = () => {
    history.push('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，这个页面没有找到！"
      extra={
        <Button type="primary" onClick={goBack}>
          回到首页
        </Button>
      }
    />
  );
};

export default NotFoundPage;
