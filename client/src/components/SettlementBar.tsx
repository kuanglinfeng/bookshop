import styled from 'styled-components';
import { Checkbox } from 'antd';
import { moneyColor, themeColor } from '@/config';

const Container = styled.div`
  user-select: none;
  padding-right: 120px;
  position: fixed;
  bottom: 0;
  width: 960px;
  height: 50px;
  overflow: hidden;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  .delete {
    margin-top: 4px;
    vertical-align: baseline;
    margin-left: 20px;
    color: #000;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      cursor: ${(props: { checked: boolean }) => (props.checked ? 'pointer' : 'not-allowed')};
      color: ${(props: { checked: boolean }) => (props.checked ? themeColor : '#000')};
      text-decoration: ${(props: { checked: boolean }) => (props.checked ? 'underline' : 'none')};
    }
  }
  .amount {
    margin-top: 4px;
    vertical-align: baseline;
    margin-left: 300px;
    display: flex;
    align-items: center;
    .number {
      color: ${moneyColor};
      font-weight: bold;
      font-size: 16px;
      padding: 0 3px;
    }
  }
  .totalMoney {
    margin-top: 4px;
    margin-left: 50px;
    display: flex;
    align-items: center;
    .number {
      font-weight: 700;
      font-size: 22px;
      padding: 0 3px;
      color: ${moneyColor};
      max-width: 140px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .calc {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    width: 120px;
    height: 50px;
    padding: 0 30px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 20px;
    color: #fff;
    border-left: 1px solid #e7e7e7;
    background: ${(props: { checked: boolean }) => (props.checked ? moneyColor : '#b0b0b0')};
    cursor: ${(props: { checked: boolean }) => (props.checked ? 'pointer' : 'not-allowed')};
    border: none;
  }
`;

interface Props {
  isAllChecked: boolean;
  hasItemchecked: boolean;
  checkedItemsLength: number;
  totalMoney: number;
  onTogleAllChecked: () => void;
  onDeleteCheckedItems: () => void;
  onBuy: () => void;
}

const SettlementBar: React.FC<Props> = ({
  isAllChecked,
  hasItemchecked,
  checkedItemsLength,
  totalMoney,
  onTogleAllChecked,
  onDeleteCheckedItems,
  onBuy,
}) => {
  return (
    <Container checked={hasItemchecked}>
      <Checkbox className="checkbox" checked={isAllChecked} onChange={onTogleAllChecked}>
        全选
      </Checkbox>
      <span className="delete" onClick={onDeleteCheckedItems}>
        删除
      </span>
      <span className="amount">
        已选商品 <span className="number"> {checkedItemsLength} </span> 件
      </span>
      <span className="totalMoney">
        合计（不含运费）：<span className="number">{totalMoney.toFixed(2)}</span>
      </span>
      <div
        className="calc"
        onClick={() => {
          hasItemchecked && onBuy();
        }}
      >
        结算
      </div>
    </Container>
  );
};

export default SettlementBar;
