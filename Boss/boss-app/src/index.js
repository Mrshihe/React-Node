import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.css';

import Register from './page/register'
import Login from './page/login'
import AuthRoute from './components/authRoute'
import Boss from './page/boss'
import Staff from './page/staff'

ReactDOM.render(
  <BrowserRouter>
    <AuthRoute />
    <Route path="/login" component={ Login }></Route>
    <Route path="/register" component={ Register }></Route>
    <Route path="/boss" component={ Boss }></Route>
    <Route path="/staff" component={ Staff }></Route>
  </BrowserRouter>,
  document.getElementById('root')
);
