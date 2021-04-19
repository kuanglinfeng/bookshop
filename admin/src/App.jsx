import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UnorderedListOutlined, FormOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import List from 'pages/book/List';
import Add from 'pages/book/Add';
import Edit from 'pages/book/Edit';

const { Sider, Content, Header } = Layout;

const Container = styled.div`
  .ant-layout-content {
    min-height: 100vh !important;
  }
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
`;

function App() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({ collapsed: !state.collapsed });
  };

  return (
    <Router>
      <Container>
        <Layout>
          <Sider trigger={null} collapsible collapsed={state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                <Link to="/book/list">书籍列表</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FormOutlined />}>
                <Link to="/book/add">添加书籍</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                padding: 10,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/book/list">
                  <List />
                </Route>
                <Route path="/book/add">
                  <Add />
                </Route>
                <Route path="/book/edit/:id">
                  <Edit />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Container>
    </Router>
  );
}

export default App;
