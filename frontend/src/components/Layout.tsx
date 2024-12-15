import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined, LogoutOutlined, HomeOutlined, BankOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const AppLayout: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="flex items-center justify-between px-4"
        style={{
          background: "#001529",
          position: "fixed",
          zIndex: 1000,
          width: "100%",
        }}
      >
        <div
          className="logo"
          style={{
            textAlign: "center",
            lineHeight: "32px",
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: 4,
            color: "#ffff",
          }}
        >
          <Link to={"/home"}>
          Company Dashboard
          </Link>
        </div>
        <Button
          icon={<MenuOutlined style={{ color: "#fff", fontSize: 20 }} />}
          onClick={toggleDrawer}
          type="text"
        />
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ background: "#001529", color: "#fff" }}
        width={240}
      >
        <Menu
          className="h-full"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BankOutlined />}>
            <Link to="/companies">Companies</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item style={{position: "absolute", bottom: 0}} key="4" onClick={handleLogout} icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>

      <Layout style={{ marginTop: 64 }}>
        <Content
          style={{
            margin: "16px",
            background: "#fff",
            padding: "16px",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
