import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store from './store'
import Tabs from './components/Tabs'
import { Spin } from 'antd'
const Home = React.lazy(() => import('./routes/Home'))
const Profile = React.lazy(() => import('./routes/Profile'))
const Mine = React.lazy(() => import('./routes/Mine'))
const Register = React.lazy(() => import('./routes/Register'))
const Login = React.lazy(() => import('./routes/Login'))
const Detail = React.lazy(() => import('./routes/Detail'))
import history from './store/history'
import './assets/css/common.less'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Suspense fallback={<div className="lazy-loading">{<Spin />}</div>}>
        <main className="main-container">
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/mine" component={Mine} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/detail/:id" component={Detail} />
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Suspense>
      <Tabs />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));