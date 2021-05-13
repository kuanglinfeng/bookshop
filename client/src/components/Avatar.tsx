import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar as AntdAvatar } from 'antd';
import { UserOutlined, IdcardOutlined, ProfileOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { imageBaseURL, themeColor } from '@/config';
import { Dispatch } from '@/redux/store';

const AvatarWrapper = styled.ul`
  position: relative;
  padding: 0 1em;
  height: 70px;
  display: flex;
  align-items: center;
`;

const AvatarPopBox = styled.li`
  padding: 5px 0;
  position: absolute;
  top: 56px;
  width: 150px;
  background: #fff;
  border-color: transparent;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  color: #000;
  font-size: 14px;
  .item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    > span {
      line-height: 18px;
    }
    &:hover {
      background: #f0f0f0;
    }
    .icon {
      font-size: 20px;
      color: ${themeColor};
      margin-right: 10px;
    }
  }
`;

const UserAvatar = styled.img``;

interface Props {
  url: string;
}

const Avatar: React.FC<Props> = ({ url }) => {
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();
  const [popBoxVisible, setPopBoxVisible] = useState(false);

  const goToProfile = () => {
    history.push(`/profile`);
    setPopBoxVisible(false);
  };

  const goToOrders = () => {
    history.push(`/orders`);
    setPopBoxVisible(false);
  };

  const logout = () => {
    dispatch.user.clear();
    history.replace('/login');
    setPopBoxVisible(false);
  };

  return (
    <AvatarWrapper onMouseEnter={() => setPopBoxVisible(true)} onMouseLeave={() => setPopBoxVisible(false)}>
      <AntdAvatar size={40} icon={url ? <UserAvatar src={`${imageBaseURL}/${url}`} /> : <UserOutlined />} />
      {popBoxVisible ? (
        <AvatarPopBox>
          <div className="item" onClick={goToProfile}>
            <IdcardOutlined className="icon" />
            <span>我的信息</span>
          </div>
          <div className="item" onClick={goToOrders}>
            <ProfileOutlined className="icon" />
            <span>我的订单</span>
          </div>
          <div className="item" onClick={logout}>
            <CloseSquareOutlined className="icon" />
            <span>退出</span>
          </div>
        </AvatarPopBox>
      ) : null}
    </AvatarWrapper>
  );
};

export default Avatar;
