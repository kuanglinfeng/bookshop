import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { InputNumber, message, Modal } from 'antd';
import { ExclamationCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { imageBaseURL, moneyColor, themeColor } from '@/config';
import api, { Book, OrderStatus, User } from '@/api';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Back from '@/components/Back';

const { confirm } = Modal;

const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
  @media (max-width: 740px) {
    margin-top: 70px;
  }
`;

const Content = styled.div`
  padding: 20px;
  background: #fff;
  display: flex;
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const LeftLayout = styled.div`
  .shopping-car {
    font-size: 24px;
  }
`;
const RightLayout = styled.div`
  padding-left: 20px;
  flex-grow: 1;
`;

const Image = styled.img`
  width: 220px;
  height: 320px;
`;

const Action = styled.div`
  margin-top: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input {
    min-width: 136px;
    flex-grow: 1;
    margin: 0 6px 6px 0;
  }
`;

const CustomButton = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  border-radius: 2px;
  color: ${themeColor};
  background-color: #fff;
  border: 1px solid ${themeColor};
  margin-bottom: 4px;
  &:hover {
    color: #fff;
    background-color: ${themeColor};
  }
  &.back {
    width: 80px;
  }
`;

const Title = styled.h2`
  margin: 10px 0;
  font-size: 30px;
  font-weight: bold;
`;

const PriceWrapper = styled.div`
  margin: 10px 0;
`;

const DiscountPrice = styled.span`
  font-size: 28px;
  line-height: 40px;
  margin-right: 10px;
  font-weight: bold;
  color: ${moneyColor};
  > span {
    font-size: 14px;
  }
`;

const Price = styled.span`
  font-size: 14px;
  color: ${themeColor};
  text-decoration: line-through;
`;

const SpanField = styled.p`
  padding: 6px 0;
  margin-right: 10px;
  color: #9c9c9c;
  font-size: 14px;
  &.sales-volume {
    color: ${themeColor};
  }
`;

const Description = styled.span`
  display: inline-block;
  margin-top: 10px;
  color: #76767c;
  font-size: 14px;
  line-height: 1.8;
`;

const TagWrapper = styled.ul`
  padding: 0 0 15px;
`;

const Tag = styled.li`
  cursor: pointer;
  list-style: none;
  padding: 4px 6px;
  color: #fff;
  background: ${themeColor};
  display: inline-block;
  border-radius: 1px;
  margin-right: 8px;
`;

const Stock = styled.span`
  padding: 2px;
  font-size: 12px;
`;

const BookDetail: React.FC = () => {
  const user = useSelector<RootState, User>((state) => state.user);

  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [book, setBook] = useState<Book>();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    api.getBookById(params.id).then((b) => {
      setBook(b);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAmountChange = (n: number) => {
    setAmount(n);
  };

  const addToBookPocket = async () => {
    try {
      await api.addBookToPocket(user._id, book!, amount);
      message.success('加入成功！');
    } catch (error) {
      message.error('加入失败！');
    }
  };

  const handleBuy = () => {
    if (!user.address || !user.phone) {
      message.error('需要先将手机号和地址填写完整！');
      return;
    }
    if (book!.stock <= 0) {
      message.error('库存不足，等待书店补货！');
      return;
    }
    confirm({
      title: '确定购买吗?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          if (book) {
            const actualPrice = book.discountPrice || book.price;
            const newBook = { ...book, stock: book.stock - amount, salesVolume: book.salesVolume + amount };
            await api.addOrder({
              user,
              book: newBook,
              amount,
              money: amount * actualPrice,
              createAt: new Date().toString(),
              status: OrderStatus.Paid,
            });
            setBook(newBook);
            message.success('支付成功！');
          } else {
            message.error('支付失败！');
          }
        } catch {
          message.error('支付失败！');
        }
      },
    });
  };

  const goToBookType = (type: string) => {
    history.push(`/type?type=${type}`);
  };

  if (!book) return <Loading />;

  const {
    coverImage,
    stock,
    name,
    price,
    discountPrice,
    types,
    salesVolume,
    author,
    pages,
    publishDate,
    publisher,
    introduce,
  } = book;

  return (
    <Container>
      <Back />
      <Content>
        <LeftLayout>
          <Image src={`${imageBaseURL}/${coverImage}`} />
          <Action>
            <InputWrapper>
              <InputNumber
                className="input"
                min={1}
                max={stock}
                value={amount}
                bordered
                onChange={handleAmountChange}
              />
              <Stock className="item">库存：{stock}</Stock>
            </InputWrapper>
            <CustomButton onClick={addToBookPocket}>
              <ShoppingCartOutlined className="shopping-car" />
              加入购书袋
            </CustomButton>
            <CustomButton onClick={handleBuy}>直接购买</CustomButton>
          </Action>
        </LeftLayout>
        <RightLayout>
          <Title>{name}</Title>
          <PriceWrapper>
            <DiscountPrice>
              <span>￥</span>
              {discountPrice || price}
            </DiscountPrice>
            {discountPrice ? <Price>￥{price}</Price> : null}
          </PriceWrapper>
          <TagWrapper>
            {types.map((type) => (
              <Tag key={type} onClick={() => goToBookType(type)}>
                {type}
              </Tag>
            ))}
          </TagWrapper>
          <SpanField className="sales-volume">销量：{salesVolume}</SpanField>
          <SpanField>作者：{author}</SpanField>
          <SpanField>页数：{pages}</SpanField>
          <SpanField>出版社：{publisher}</SpanField>
          <SpanField>出版日期：{dayjs(publishDate).format('YYYY年MM月DD日')}</SpanField>
          <Description>{introduce}</Description>
        </RightLayout>
        <Footer className="footer" />
      </Content>
    </Container>
  );
};

export default BookDetail;
