import React, { Component } from 'react';
import logoTrybeWallet from '../images/logo.png';
import styles from './Logo.module.css';

export default class Logo extends Component {
  render() {
    return (
      <img
        className={ styles.logo }
        src={ logoTrybeWallet }
        alt="logo Trybewallet"
      />
    );
  }
}
