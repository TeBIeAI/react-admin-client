import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getStorage } from '../utils'
import { getUserInfo } from '../store/actions/user'
import { basicRouterMap } from './RouterMap'
import LayoutCom from '../layout'

const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  _getUserInfo: dispatch(getUserInfo)
})

function RouterCom({ user, _getUserInfo }) {
  const token = getStorage('hc-token')
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route
            path="/admin"
            render={routeProps => {
              if (token && user.roles.length) {
                return <LayoutCom {...routeProps} />
              } else {
                _getUserInfo({ token })
              }
            }}
          />
          {basicRouterMap.map(route => {
            return <Route component={route.component} path={route.path} key={route.path} />
          })}
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterCom)
