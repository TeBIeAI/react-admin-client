import React from 'react'
import { Breadcrumb } from 'antd';
import menuMap from '../../router/menuMap'

const Index = ({ location }) => {
  const { pathname } = location
  const paths = pathname.slice(1).split('/')
  const breads = []
  let breadshift = `/${paths[0]}`

  const getBreads = (menuMaps, paths) => {
    menuMaps.forEach(menu => {
      if (menu.path === breadshift) {
        breads.push({
          title: menu.title
        })
        paths.shift()
        if (menu.children && paths[0]) {
          breadshift += `/${paths[0]}`
          getBreads(menu.children, paths)
        }
      }
    })
    return breads
  }



  return (
    <Breadcrumb>
      {
        getBreads(menuMap, paths).map(item => {
          return <Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>
        })
      }

    </Breadcrumb>
  )
}

export default Index
