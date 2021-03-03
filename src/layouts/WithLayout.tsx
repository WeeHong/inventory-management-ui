import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import styled from "styled-components";

interface WithLayoutProps {
  children: React.ReactNode;
}

function WithLayout(props: WithLayoutProps) {
  const history = useHistory();
  const location = useLocation();
  const { children } = props;
  const { Header, Content, Footer, Sider } = Layout;

  function clearSession() {
    sessionStorage.clear();
    history.push("/login");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" />
        <Menu
          style={{ height: "calc(100vh - 60px)", position: "relative", marginTop: "60px" }}
          theme={"dark"}
          mode="inline"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <NavLink to="/">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="/products">
            Products
            <NavLink to="/products"></NavLink>
          </Menu.Item>
          <Menu.Item
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "#002766",
            }}
            onClick={() => clearSession()}
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default WithLayout;
