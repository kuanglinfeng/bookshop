import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Checkbox, InputNumber, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { imageBaseURL, moneyColor, themeColor } from '@/config';
import { Book, BookPocketItem } from '@/api';

const Item = styled.li`
  user-select: none;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: ${(props: { checked: boolean }) => (props.checked ? '#fff8e1' : '#fff')};
`;

const CoverImageWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 10px;
  width: 100px;
  height: 100px;
  text-align: center;
  background: ${(props: { checked: boolean }) => (props.checked ? '#fff' : '#eee')};
`;

const CoverImage = styled.img`
  height: 80px;
`;

const ZoomInCoverImage = styled.img`
  height: 260px;
`;

const FieldWrapper = styled.ul`
  display: inline-block;
  margin-left: 10px;
`;

const Field = styled.li`
  font-size: 12px;
  color: #3c3c3c;
  line-height: 1.6;
  width: 150px;
  max-height: 40px;
  &.name {
    font-weight: bold;
  }
  &.name:hover {
    color: ${themeColor};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PriceWrapper = styled.div`
  font-size: 12px;
  line-height: 1.5;
  margin-left: 80px;
  display: inline-block;
`;

const Price = styled.div`
  width: 80px;
  color: #3c3c3c;
  font-weight: 700;
  &.delete {
    width: 80px;
    color: #9c9c9c;
    text-decoration: line-through;
  }
`;

const AmountWrapper = styled.div`
  display: inline-block;
  margin-left: 80px;
`;

const TotalMoneyWrapper = styled(PriceWrapper)``;

const TotalMoney = styled(Price)`
  color: ${moneyColor};
`;

const OperationWrapper = styled.div`
  display: inline-block;
  margin-left: 80px;
`;

export interface CheckValue {
  index: number;
  checked: boolean;
}

interface Props {
  value: BookPocketItem;
  checked: boolean;
  index: number;
  onCheckBoxChange: (checkValue: CheckValue) => void;
  onItemDeleteConfirm: (bookId: string, amount: number) => void;
  onItemAmountAdd: (book: Book, amount: number) => void;
  onItemAmountDelete: (bookId: string, amount: number) => void;
}

const PocketItem: React.FC<Props> = ({
  value,
  checked,
  index,
  onCheckBoxChange,
  onItemDeleteConfirm,
  onItemAmountAdd,
  onItemAmountDelete,
}) => {
  const history = useHistory();

  const { book, amount } = value;
  const { _id, coverImage, name, author, publisher, publishDate, discountPrice, price, stock } = book;
  const [isHoverCoverImage, setIsHoverCoverImage] = useState(false);
  const [count, setCount] = useState(amount);

  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    onCheckBoxChange({ index, checked: e.target.checked });
  };

  const handleAmountChange = (value: number) => {
    const deltaAmount = value - count;
    if (deltaAmount >= 0) {
      onItemAmountAdd(book, deltaAmount);
    } else {
      onItemAmountDelete(_id, Math.abs(deltaAmount));
    }
    setCount(value);
  };

  const handleDeleteConfirm = async () => {
    onItemDeleteConfirm(_id, stock);
  };

  const goToBookDetail = () => {
    history.push(`/book/${_id}`);
  };

  return (
    <Item key={_id} checked={checked}>
      <Checkbox className="checkbox" checked={checked} onChange={handleCheckBoxChange} />
      <Popconfirm
        placement="rightTop"
        overlayClassName="coverImage"
        visible={isHoverCoverImage}
        title={
          <div style={{ fontSize: '0' }}>
            <ZoomInCoverImage src={`${imageBaseURL}/${coverImage}`} />
          </div>
        }
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        icon={null}
        okText={null}
        cancelText={null}
      >
        <CoverImageWrapper
          checked={checked}
          onClick={goToBookDetail}
          onMouseEnter={() => setIsHoverCoverImage(true)}
          onMouseLeave={() => setIsHoverCoverImage(false)}
        >
          <CoverImage src={`${imageBaseURL}/${coverImage}`} />
        </CoverImageWrapper>
      </Popconfirm>

      <FieldWrapper>
        <Field className="name" onClick={goToBookDetail}>
          {name}
        </Field>
        <Field>{author}</Field>
        <Field>{publisher}</Field>
        <Field>{dayjs(publishDate).format('YYYY年MM月DD日')}</Field>
      </FieldWrapper>
      <PriceWrapper>
        {discountPrice ? <Price className="delete">￥{price}</Price> : null}
        <Price>￥{discountPrice ? discountPrice : price}</Price>
      </PriceWrapper>
      <AmountWrapper>
        <InputNumber min={1} size="small" max={stock} value={count} onChange={handleAmountChange} />
      </AmountWrapper>
      <TotalMoneyWrapper>
        <TotalMoney>￥{discountPrice ? discountPrice * count : price * count}</TotalMoney>
      </TotalMoneyWrapper>
      <OperationWrapper>
        <Popconfirm title="确定删除吗?" onConfirm={handleDeleteConfirm} okText="删除" cancelText="取消">
          <Button size="small" className="button">
            删除
          </Button>
        </Popconfirm>
      </OperationWrapper>
    </Item>
  );
};

export default PocketItem;
