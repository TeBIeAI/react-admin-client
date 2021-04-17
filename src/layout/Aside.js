import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import menuMap from '../router/menuMap';

const { Sider } = Layout;
const { Item, SubMenu } = Menu

function Aside(props) {

  const createMenu = (menuMaps) => {
    return menuMaps.map(item => {
      if (item.children && item.children.length) {
        const title = (
          <span>
            <span>{item.title}</span>
          </span>
        )
        return !item.hidden && (
          <SubMenu key={item.title} title={title}>
            {createMenu(item.children)}
          </SubMenu>
        )
      }
      return !item.hidden && (
        <Item key={item.path}>
          <Link to={item.path}>
            <span>{item.title}</span>
          </Link>
        </Item>
      )
    })
  }

  const { collapsed } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Menu theme="dark" mode="inline" >
        {createMenu(menuMap)}
      </Menu>
    </Sider>
  );
}

export default Aside;
