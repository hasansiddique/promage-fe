import React, { FC } from "react";
import { Layout, theme } from 'antd';
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

interface LayoutInterface {
    children: JSX.Element | JSX.Element[];
}

const AppLayout: FC<LayoutInterface> = ({ children }) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

  return (
      <Layout style={{ height: '100vh' }}>
          <Header
              style={{
                  top: 0,
                  zIndex: 1,
                  width: '100%',
                  color: 'white',
                  display: 'flex',
                  position: 'sticky',
                  alignItems: 'center',
              }}
          >
              <h1 onClick={() => navigate('/')}>Promage</h1>
          </Header>
          <Content
              style={{
                  padding: '0 48px',
              }}
          >
              <div
                  style={{
                      padding: 24,
                      minHeight: 380,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                  }}
              >
                  {children}
              </div>
          </Content>
      </Layout>
  );
}

export default AppLayout;
