import React, { useEffect, useState } from 'react';
import { Table, Button, message, Card, Popconfirm } from 'antd';
import api from 'apis';
import day from 'tools/day';
import Loading from 'components/Loading';

function List() {
  const [books, setBooks] = useState();
  const [pageInfo, setPageInfo] = useState({ page: 1, pageSize: 10, total: 0 });

  const columns = [
    {
      title: '封面',
      dataIndex: 'coverImage',
      key: 'coverImage',
      render() {
        return (
          <Card
            style={{ width: 50, height: 50 }}
            cover={<img alt="封面" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          />
        );
      },
    },
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '简介',
      dataIndex: 'introduce',
      key: 'introduce',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: '出版日期',
      dataIndex: 'publishDate',
      key: 'publishDate',
      render(date) {
        return <span>{day.getDate(date)}</span>;
      },
    },
    {
      title: '页数',
      dataIndex: 'pages',
      key: 'pages',
    },
    {
      title: '类别',
      key: 'types',
      dataIndex: 'types',
      render: (types) => <span>{types.join(',')}</span>,
    },
    {
      title: '售价',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '折扣价',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      sorter: (a, b) => a.discountPrice - b.discountPrice,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: '销量',
      dataIndex: 'salesVolume',
      key: 'salesVolume',
      sorter: (a, b) => a.salesVolume - b.salesVolume,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        const handleConfirm = async () => {
          try {
            await api.deleteBook(record._id);
            handleChange({ current: pageInfo.page, pageSize: pageInfo.pageSize });
            message.success('删除成功！');
          } catch (error) {
            message.error('删除失败！');
          }
        };

        return (
          <>
            <Button type="primary">编辑</Button>
            <Popconfirm title="确定删除这本书吗？" onConfirm={handleConfirm} okText="是" cancelText="否">
              <Button type="danger">删除</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    handleChange({ current: 1, pageSize: 10 });
  }, []);

  const handleChange = async (pagination) => {
    const { current: page, pageSize } = pagination;
    const { status, message: msg, data } = await api.getPageBooks(page, pageSize);
    if (status !== 0) {
      message.error(msg);
      return;
    }
    const { books, count } = data;
    setPageInfo({ page, pageSize, total: count });
    setBooks(books);
  };

  const onShowSizeChange = async (current, pageSize) => {
    await handleChange({ current, pageSize });
  };

  if (!books) return <Loading />;

  return (
    <Table
      rowKey="_id"
      columns={columns}
      pagination={{ ...pageInfo, showSizeChanger: true, onShowSizeChange }}
      dataSource={books}
      onChange={handleChange}
    />
  );
}

export default List;