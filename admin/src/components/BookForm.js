import React from 'react';
import { Steps, Button, message, Form, Input, DatePicker } from 'antd';
import styled from 'styled-components';
import day from 'tools/day';

const Container = styled.div`
  padding: 0 50px;
  .steps {
  }
  .steps-content {
    min-height: 200px;
    margin-top: 16px;
    padding: 20px 50px;
    border-radius: 2px;
    background-color: #fafafa;
    text-align: center;
    .input {
      width: 500px;
    }
  }
  .next-tip {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  .steps-action {
    margin-top: 24px;
    text-align: center;
  }
  .ant-form-item-control-input-content {
    display: inherit;
  }
`;

const { Step } = Steps;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const BookForm = () => {
  const [current, setCurrent] = React.useState(0);

  const onFinish = (values) => {
    console.log(new Date(values.publishDate).toLocaleDateString());
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const BookBasicMessage = (
    <Form {...formItemLayout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="书名" name="name" rules={[{ required: true, message: '请输入书名!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="简介" name="introduce">
        <TextArea />
      </Form.Item>
      <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入作者!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="出版社" name="publisher" rules={[{ required: true, message: '请输入出版社!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="出版日期" name="publishDate" rules={[{ required: true, message: '请选择出版日期!' }]}>
        <DatePicker onChange={() => {}} />
      </Form.Item>
      <Form.Item label="页数" name="pages">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="类别" name="types">
        <Input type="number" />
      </Form.Item>
      <Form.Item className="next-tip">
        <Button type="primary" htmlType="submit" onClick={() => next()}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );

  const steps = [
    {
      title: '书籍基本信息',
      content: BookBasicMessage,
    },
    {
      title: '书籍售卖信息',
      content: 'Second-content',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = () => {
    message.success('添加成功！');
  };

  return (
    <Container>
      <Steps current={current} className="steps">
        {steps.map((item, index) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {/* {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )} */}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            返回上一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={done}>
            确认
          </Button>
        )}
      </div>
    </Container>
  );
};

export default BookForm;
