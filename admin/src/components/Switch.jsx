import { Switch as AntSwitch } from 'antd';

const Switch = ({value, onChange}) => {
  return <AntSwitch checked={value} onChange={onChange} />
}

export default Switch;
