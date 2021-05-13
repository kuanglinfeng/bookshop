import styled from 'styled-components';
import search from '@/assets/search.png';
import { themeColor } from '@/config';

const Input = styled.input`
  width: 250px;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding: 0 15px 0 30px;
  border: 1px solid #e3e3e3;
  color: #273849;
  outline: none;
  border-radius: 15px;
  margin-right: 10px;
  transition: border-color 0.2s ease;
  background: #fff url(${search}) 8px 5px no-repeat;
  background-size: 20px;
  vertical-align: middle !important;
  &:focus {
    border-color: ${themeColor};
  }
  &::placeholder {
    font-size: 12px;
    color: #ccc;
  }
  @media (max-width: 980px) {
    display: none;
  }
`;

interface IProps {
  value: string;
  onSubmit: (e: any) => void;
  onChange: (e: any) => void;
}

const SearchInput = (props: IProps) => {
  return <Input placeholder="图书搜索" onKeyDown={props.onSubmit} onChange={props.onChange} value={props.value} />;
};

export default SearchInput;
