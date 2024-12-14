import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" style={{ height: 32, margin: 16, background: '#fff' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/companies">Companies</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>My Dashboard</h1>
        </Header>

        {/* Content */}
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2024 Created by You
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
