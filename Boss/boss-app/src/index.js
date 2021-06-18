import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.css';

import Register from './page/register'
import Login from './page/login'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/login" component={ Login }></Route>
    <Route path="/register" component={ Register }></Route>
  </BrowserRouter>,
  document.getElementById('root')
);
