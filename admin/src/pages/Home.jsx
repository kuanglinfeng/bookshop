import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, NavLink, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Button, Popconfirm } from 'antd';
import { UnorderedListOutlined, FormOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import api from 'api';
import List from 'pages/book/List';
import Add from 'pages/book/Add';
import Edit from 'pages/book/Edit';
import OrderList from 'pages/OrderList';

const { Sider, Content, Header } = Layout;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  .header {
    color: #1890ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
    }
  }
  .ant-menu-item {
    margin: 0;
  }
  .ant-layout {
    background: #fff;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  .main {
    width: 100%;
    min-height: 100%;
    overflow: auto;
  }
  .admin-icon {
    color: #fff;
  }
  .admin {
    color: #fff;
    margin: 0 10px;
  }
  .loading {
    margin-top: 200px;
  }
`;

function Home() {

  const history = useHistory();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem('token');
      const { data } = await api.auth(token);
      setAdmin(data);
    })()
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    history.push('/login');
  }

  const confirm = (e) => {
    logout();
  }
  
  if (!admin) return null;

  const { name } = admin;

  return (
    <Container>
      <Layout>
        <Header className='header'>
          <NavLink to='/' >极客书店后台管理系统</NavLink>
          <div>
            <UserOutlined className="admin-icon" />
            <span className='admin'>{name}</span>
            <Popconfirm
              title="确定注销吗？"
              onConfirm={confirm}
              okText="是的"
              cancelText="取消"
            >
              <Button danger type="primary" size="small">注销</Button>
            </Popconfirm>
          </div>
        </Header>
        <Layout>
        <Sider trigger={null}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              <Link to="/book/list">书籍列表</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to="/book/add">添加书籍</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />}>
              <Link to="/order">订单管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
          <div className="main">
            <Content
              className="site-layout-background"
              style={{
                padding: 20,
                minHeight: 280,
              }}
            >
              <Switch>
                <Redirect from="/" to="/book/list" exact />
                <Route path="/book/list" exact>
                  <List />
                </Route>
                <Route path="/book/add" exact>
                  <Add />
                </Route>
                <Route path="/book/edit/:id" exact>
                  <Edit />
                </Route>
                <Route path="/order" exact>
                  <OrderList />
                </Route>
              </Switch>
            </Content>
          </div>
        </Layout>
      </Layout>
    </Container>
  );
}

export default Home;
