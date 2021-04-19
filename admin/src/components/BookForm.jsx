import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, message, Form, Input } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TypesInput from './TypesInput';
import ImageUploader from './ImageUploader';
import DatePicker from './DatePicker';

const Container = styled.div`
  padding: 0 50px;
  .ant-form-item-control-input-content {
    display: inherit;
  }
`;

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

const BookForm = ({ initialBook, onSubmit }) => {
  
  const history = useHistory();

  const onFinish = async (book) => {
    book.publishDate = dayjs(book.publishDate);
    try {
      await onSubmit(book);
      message.success(`${initialBook ? '编辑' : '添加'}成功！`, 1, () => {
        history.push('/book/list');
      });
    } catch (error) {
      message.error(`${initialBook ? '编辑' : '添加'}失败！`);
    }
  };

  const onFailed = () => {
    message.error('提交失败，请确认后重新提交！');
  };

  const getDefaultFields = () => {
    const fields = [];
    if (initialBook) {
      for (let prop in initialBook) {
        let item = {};
        if (initialBook.hasOwnProperty(prop)) {
          if (prop === 'publishDate') {
            item = { name: prop, value: dayjs(initialBook[prop], 'YYYY-MM-DD') };
          } else {
            item = { name: prop, value: initialBook[prop] };
          }
        }
        fields.push(item);
      }
    }
    return fields;
  }

  return (
    <Container>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFailed}
        fields={getDefaultFields()}
      >
        <Form.Item label="书名" name="name" rules={[{ required: true, message: '请输入书名!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="简介" name="introduce">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item label="作者" name="author" rules={[{ required: true, message: '请输入作者!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="出版社" name="publisher" rules={[{ required: true, message: '请输入出版社!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="出版日期" name="publishDate" rules={[{ required: true, message: '请选择出版日期!' }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="页数" name="pages" rules={[{ required: true, message: '请输入页数!' }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="类别" name="types" rules={[{ required: true, message: '请选择类别!' }]}>
          <TypesInput />
        </Form.Item>

        <Form.Item label="售价" name="price" rules={[{ required: true, message: '请输入售价!' }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="折扣价" name="discountPrice">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="库存" name="stock" rules={[{ required: true, message: '请输入库存!' }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="销量" name="salesVolume">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="封面图" name="coverImage">
          <ImageUploader />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

BookForm.propTypes = {
  initialBook: PropTypes.object,
  onSubmit: PropTypes.func,
};

BookForm.defaultProps = {
  initialBook: {},
  onSubmit: () => {},
};

export default BookForm;
