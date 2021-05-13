import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink as Link, useHistory } from 'react-router-dom';
import logo from '@/assets/logo.png';
import menu from '@/assets/menu.png';
import { themeColor } from '@/config';
import { User } from '@/api';
import CoolText from '@/components/CoolText';
import Search from '@/components/SearchInput';
import Avatar from '@/components/Avatar';

const Container = styled.nav`
  background: #fff;
  border-bottom: #f0f0f0;
  @media (max-width: 740px) {
    top: 0;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 99;
  }
`;

const TopNavCenter = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 8px 0;
  max-width: 1100px;
  margin: 0 auto;
  background: #fff;
  @media (max-width: 740px) {
    position: relative;
    justify-content: center;
  }
`;

const MenuButton = styled.div`
  @media (max-width: 740px) {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 22px;
    left: 12px;
    cursor: pointer;
    background: url(${menu}) center center no-repeat;
    background-size: 24px;
  }
`;

const AsideNav = styled.ul`
  z-index: 99;
  user-select: none;
  list-style: none;
  display: none;
  @media (max-width: 740px) {
    margin: 20px 0;
    display: block;
    position: absolute;
    top: 50px;
    left: 0;
    background: #eee;
    padding: 10px 10px 10px 20px;
    width: 100%;
  }
`;

const AsideNavItem = styled.li`
  @media (max-width: 740px) {
    margin-top: 0.5em;
    line-height: 1.5em;
    padding-left: 1em;
  }
`;

const Logo = styled.img`
  user-select: none;
  width: 50px;
  max-width: 6em;
`;

const TipWrapper = styled.div`
  user-select: none;
  position: relative;
  margin-right: auto;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 740px) {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Tip = styled.span`
  position: absolute;
  top: 22px;
  left: 42px;
  white-space: nowrap;
  display: inline-block;
  padding-left: 6px;
  font-size: 14px;
  color: ${themeColor};
  margin-right: auto;
  @media (max-width: 740px) {
    display: none;
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  height: 30px;
  font-size: 17px;
  @media (max-width: 740px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  margin: 0 1em;
  &:hover {
    cursor: pointer;
  }
  &.avatar {
    margin: 0;
  }
`;

interface Props {
  user: User;
}

const TopNav: React.FC<Props> = ({ user }) => {
  const [asideVisible, setAsideVisible] = useState<boolean>(false);
  const [keyword, setKeyword] = useState('');

  const history = useHistory();

  useEffect(() => {
    const fn = (e: unknown) => {
      setAsideVisible(false);
    };
    document.addEventListener('click', fn);
    return () => {
      document.removeEventListener('click', fn);
    };
  }, []);

  const handleSearchInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      history.push(`/search?keyword=${keyword}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleMenuButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setAsideVisible(!asideVisible);
    history.listen(() => {
      setAsideVisible(false);
    });
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <TopNavCenter>
        <MenuButton onClick={handleMenuButtonClick} />
        {asideVisible ? (
          <AsideNav>
            <AsideNavItem>
              <Link to="/">首页</Link>
            </AsideNavItem>
            <AsideNavItem>
              <Link to="/tags">标签</Link>
            </AsideNavItem>
            <AsideNavItem>
              <Link to="/register">注册</Link>
            </AsideNavItem>
            <AsideNavItem>
              <Link to="/login">登录</Link>
            </AsideNavItem>
          </AsideNav>
        ) : null}
        <TipWrapper onClick={goHome}>
          <Logo src={logo} />
          <Tip>极客书店</Tip>
        </TipWrapper>
        <Search onSubmit={handleSearchInputSubmit} onChange={handleSearchInputChange} value={keyword} />
        <Menu>
          <MenuItem>
            <Link to="/">
              <CoolText>首页</CoolText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/types">
              <CoolText>类别</CoolText>
            </Link>
          </MenuItem>
          {user._id ? (
            <>
              <MenuItem>
                <Link to="/book_pocket">
                  <CoolText>购书袋</CoolText>
                </Link>
              </MenuItem>
              <MenuItem className="avatar">
                <Avatar url={user.avatar} />
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/register">
                  <CoolText>注册</CoolText>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">
                  <CoolText>登录</CoolText>
                </Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </TopNavCenter>
    </Container>
  );
};

export default TopNav;
