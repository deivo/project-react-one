import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store from './store'
import Tabs from './components/Tabs'
import Home from './routes/Home'
import Profile from './routes/Profile'
import Mine from './routes/Mine'
import Register from './routes/Register'
import Login from './routes/Login'
import Detail from './routes/Detail'
import history from './store/history'
import './assets/css/common.less'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
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
      <Tabs />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));