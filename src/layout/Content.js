import React, { Suspense } from 'react'
import { adminRouterMap } from '@/router/RouterMap';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';

function Content({ location }) {
  return (
    <div style={{
      margin: '24px 16px',
    }}>
      <Suspense fallback={<div></div>}>
        <TransitionGroup>
          <CSSTransition
            classNames={'fade'}
            appear={true}
            key={location.pathname}
            timeout={300}
            unmountOnExit={true}
          >
            <Switch>
              <Redirect exact from="/" to="/admin/user/list" />
              {adminRouterMap.map(route => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    render={routeProps => {
                      return <route.component {...routeProps} />
                    }}
                  />
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

      </Suspense>

    </div >
  );
}

export default withRouter(Content);
