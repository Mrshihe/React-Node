import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.css';

import Register from './page/register'
import Login from './page/login'
import AuthRoute from './components/authRoute'
import BossInfo from './page/bossinfo'
import StaffInfo from './page/staffinfo'
import SkeletonPage from './components/skeletonPage'


ReactDOM.render(
  <BrowserRouter>
    <AuthRoute />
    <Switch>
      <Route path="/login" component={ Login }></Route>
      <Route path="/register" component={ Register }></Route>
      <Route path="/bossinfo" component={ BossInfo }></Route>
      <Route path="/staffinfo" component={ StaffInfo }></Route>
      {/* 页面结构类似，放在通用骨架屏内 */}
      <Route component={ SkeletonPage }></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
