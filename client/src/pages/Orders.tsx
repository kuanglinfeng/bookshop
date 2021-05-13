import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import api, { Order, User } from '@/api';
import dayjs from 'dayjs';
import Back from '@/components/Back';

export const ORDER_STATUS = {
  0: '待发货',
  1: '已发货',
  2: '已完成',
  3: '已取消',
};

const Container = styled.div`
  max-width: 960px;
  margin: 10px auto 0px;
  .avatar {
    border-radius: 50%;
    overflow: hidden;
  }
`;

const Content = styled.main`
  border-radius: 4px;
  padding: 30px;
  background-color: #fff;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const Title = styled.div`
  font-weight: bold;
  padding: 5px 0;
  font-size: 20px;
`;

const FieldWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 30px;
  }
  border: 1px dashed #999;
  padding: 20px;
`;

const Field = styled.div`
  font-size: 14px;
  width: 400px;
  display: inline-block;
  padding: 10px 0;
  .label {
    width: 100px;
    text-align: right;
    display: inline-block;
  }
  .value {
    display: inline-block;
  }
`;

const Orders = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user._id) {
      api.getOrders(user._id).then((result) => {
        setOrders(result);
      });
    }
  }, [user]);

  return (
    <Container>
      <Back />
      <Content>
        <Title>我的订单</Title>
        {orders.map((order) => {
          const { _id, user, book, amount, money, status, createAt } = order;
          return (
            <FieldWrapper key={_id}>
              <Field>
                <div className="label">订单号：</div>
                <div className="value">{_id}</div>
              </Field>
              <Field>
                <div className="label">用户：</div>
                <div className="value">{user.email}</div>
              </Field>
              <Field>
                <div className="label">手机号码：</div>
                <div className="value">{user.phone}</div>
              </Field>
              <Field>
                <div className="label">地址：</div>
                <div className="value">{user.address}</div>
              </Field>
              <Field>
                <div className="label">图书：</div>
                <div className="value">
                  <NavLink to={`/book/${book._id}`}>{book.name}</NavLink>
                </div>
              </Field>
              <Field>
                <div className="label">创建时间：</div>
                <div className="value">{dayjs(createAt).format('YYYY年MM月DD日HH时MM分')}</div>
              </Field>
              <Field>
                <div className="label">图书单价：</div>
                <div className="value">{book.discountPrice ? book.discountPrice : book.price}</div>
              </Field>
              <Field>
                <div className="label">数量：</div>
                <div className="value">{amount}</div>
              </Field>
              <Field>
                <div className="label">支付金额：</div>
                <div className="value">{money}</div>
              </Field>
              <Field>
                <div className="label">订单状态：</div>
                <div className="value">{ORDER_STATUS[status]}</div>
              </Field>
            </FieldWrapper>
          );
        })}
      </Content>
    </Container>
  );
};

export default Orders;
