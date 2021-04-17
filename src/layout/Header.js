import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Dropdown } from 'antd';
import { removeStorage } from '../utils'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Breadcrumb from '../components/Breadcrumb'

const { Header } = Layout;
const mapStateToProps = state => ({
  user: state.user,
});

function HeaderCom(props) {
  let { collapsed, toggle, user, location } = props;

  const handleLogOut = () => {
    removeStorage('hc-token')
    window.location.reload()
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogOut} key="1">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="header-left">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle,
            style: {
              fontSize: 18,
              padding: '0 20px',
            },
          }
        )}
        <Breadcrumb location={location} />
      </div>
      <Dropdown overlay={menu}>
        <span>
          你好：{user.name}
        </span>
      </Dropdown>
    </Header>
  );
}

export default connect(mapStateToProps)(withRouter(HeaderCom));
