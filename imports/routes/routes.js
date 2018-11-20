import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Authenticated from './../ui/Authenticated';
import Login from './../ui/AccountManagement/Login';
import Signup from './../ui/AccountManagement/Signup';
import Menu from './../ui/Menu/menu';

export default class Routes extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Authenticated path='/menu' component={Menu}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
