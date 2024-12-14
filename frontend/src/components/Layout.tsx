import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "32px",
          }}
        >
          LOGO
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/companies">Companies</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
          <Content style={{ margin: "16px", background: "#fff", padding: "16px" }}>
            <Outlet />
          </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
