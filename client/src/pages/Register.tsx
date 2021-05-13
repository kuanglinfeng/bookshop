import { Form, Input, Button, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import api from '@/api';

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
    margin: 0px 0 50px;
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

interface Values {
  email: string;
  name: string;
  password: string;
  confirm: string;
}

const Register = () => {
  const history = useHistory();

  const onFinish = (values: Values) => {
    const { confirm, ...user } = values;
    api.register(user).then(
      (result) => {
        if (result.status === 0) {
          message.success('注册成功！', 1, () => {
            history.push('/login');
          });
        } else {
          message.error(result.message);
        }
      },
      () => {
        message.success('注册失败！');
      },
    );
  };

  return (
    <Container>
      <Content>
        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '邮箱不合法!' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item label="昵称" name="name" rules={[{ required: true, message: '请输入昵称!' }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入你的密码！',
              },
              {
                validator(_, value) {
                  if (value.length >= 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('密码长度不能低于6位数！'));
                },
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
        <Tip>
          已有账号，请点击这里 <Link to="/login">登录</Link>
        </Tip>
        <Footer className="footer" />
      </Content>
    </Container>
  );
};

export default Register;
