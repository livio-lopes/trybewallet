import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="https://livio-lopes.github.io/trybewallet/" component={ Login } />
        <Route exact path="https://livio-lopes.github.io/trybewallet/carteira" component={ Wallet } />
      </Switch>
    );
  }
}
