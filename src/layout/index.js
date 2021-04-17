import { Layout } from 'antd';
import React, { useState } from 'react';
import './index.less';

import Header from './Header';
import Aside from './Aside';
import Content from './Content';

function LayoutCom() {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => {
    setCollapsed(collapsed => !collapsed);
  };

  return (
    <Layout className="layout-container">
      <Aside collapsed={collapsed} />
      <Layout className="site-layout">
        <Header collapsed={collapsed} toggle={toggle} />
        <Content />
      </Layout>
    </Layout>
  );
}

export default LayoutCom;
