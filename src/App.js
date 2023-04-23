import React, { Component } from 'react';
import Routes from './components/Routes';
import styles from './App.module.css';

export default class App extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <Routes />
      </div>
    );
  }
}
