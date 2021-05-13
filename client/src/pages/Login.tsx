import { Form, Input, Button, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import api, { BaseUser } from '@/api';
import { Dispatch } from '@/redux/store';
import Footer from '@/components/Footer';

const Container = styled.main`
  max-width: 960px;
  margin: 10px auto 0px;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

const Content = styled.div`
  margin: 150px;
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .ant-form-item-label {
    line-height: 38px;
  }
  .submit {
    height: auto;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    background: #3b5998;
    border-color: #3b5998;
    display: inline-block;
    padding: 4px 24px;
    text-align: center;
    cursor: pointer;
    margin: 20px 0 50px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Tip = styled.p`
  padding-left: 30px;
  text-align: center;
`;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 11 },
};

const Login = () => {
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();

  const onFinish = (values: BaseUser) => {
    api.login(values).then((result) => {
      if (result.status === 0) {
        message.success('登录成功!');
        const token = result.data.token;
        if (token) {
          window.localStorage.setItem('token', token);
          dispatch.user.asyncSet(token);
          history.push('/');
        }
      } else {
        message.error(result.message);
      }
    });
  };

  return (
    <Container>
      <Content>
        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <Tip>
          没有账号，请点击这里 <Link to="/register">注册</Link>
        </Tip>
        <Footer className="footer" />
      </Content>
    </Container>
  );
};

export default Login;
