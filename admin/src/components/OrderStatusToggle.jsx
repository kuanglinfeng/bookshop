import { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const ORDER_STATUS = {
  0: '待发货',
  1: '已发货',
  2: '已完成',
  3: '已取消',
};

const OrderStatusToggle = ({ value, onChange }) => {
  const [status, setStatus] = useState(value);

  const handleChange = (value) => {
    setStatus(value);
    onChange(value);
  };

  return (
    <Select value={ORDER_STATUS[status]} style={{ width: 120 }} onChange={handleChange}>
      {Object.keys(ORDER_STATUS).map((item) => (
        <Option key={item} value={item}>
          {ORDER_STATUS[item]}
        </Option>
      ))}
    </Select>
  );
};

export default OrderStatusToggle;
