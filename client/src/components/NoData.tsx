import { Empty } from 'antd';

interface Props {
  className?: string;
}

const NoData: React.FC<Props> = ({ className }) => {
  return <Empty className={className} />;
};

export default NoData;
