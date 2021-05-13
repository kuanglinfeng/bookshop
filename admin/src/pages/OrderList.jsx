import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import api from 'api';
import useGetColumnSearchProps from 'hooks/useGetColumnSearchProps';
import Loading from 'components/Loading';
import OrderStatusToggle from 'components/OrderStatusToggle';
import { ORDER_STATUS } from 'components/OrderStatusToggle';

function OrderList() {
  const getColumnSearchProps = useGetColumnSearchProps();

  const [ordersShowInfo, setOrdersShowInfo] = useState();
  const [pageInfo, setPageInfo] = useState({ page: 1, pageSize: 10, total: 0 });

  const columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
      ...getColumnSearchProps('userName'),
    },
    {
      title: '书籍',
      dataIndex: 'book',
      key: 'book',
      render(book, record) {
        return <NavLink to={`/book/edit/${book._id}`}>{book.name}</NavLink>;
      },
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('phone'),
    },
    {
      title: '创建日期',
      dataIndex: 'createAt',
      key: 'createAt',
      render(date) {
        return <span>{dayjs(date).format('YYYY年MM月DD日')}</span>;
      },
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '支付金额',
      dataIndex: 'money',
      key: 'money',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status, record) {
        const handleChange = async (status) => {
          Modal.confirm({
            title: `确定变更为「${ORDER_STATUS[status]}」吗?`,
            icon: <ExclamationCircleOutlined />,
            async onOk() {
              api.editOrder(record.id, { ...record, status }).then((result) => {
                if (result.status === 0) {
                  message.success('状态变更成功！');
                } else {
                  message.success('状态变更失败！');
                }
              });
            },
          });
        };
        return <OrderStatusToggle value={status} onChange={handleChange} />;
      },
    },
  ];

  const handleChange = async (pagination) => {
    const { current: page, pageSize } = pagination;
    const { status, message: msg, data } = await api.getPageOrders(page, pageSize);
    if (status !== 0) {
      message.error(msg);
      return;
    }
    const { orders, count } = data;
    setPageInfo({ page, pageSize, total: count });
    const showInfo = orders.map((order) => {
      const { book, user, amount, money, status, createAt, _id } = order;
      return {
        id: _id,
        userName: user.name,
        phone: user.phone,
        address: user.address,
        book,
        createAt,
        amount,
        money,
        status,
        bookId: book._id,
      };
    });
    setOrdersShowInfo(showInfo);
  };

  const onShowSizeChange = async (current, pageSize) => {
    await handleChange({ current, pageSize });
  };

  useEffect(() => {
    handleChange({ current: 1, pageSize: 10 });
  }, []);

  if (!ordersShowInfo) return <Loading />;

  return (
    <Table
      rowKey="id"
      columns={columns}
      pagination={{ ...pageInfo, showSizeChanger: true, onShowSizeChange }}
      dataSource={ordersShowInfo}
      onChange={handleChange}
      bordered
    />
  );
}

export default OrderList;
