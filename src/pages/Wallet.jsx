import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className={ styles.container__wallet }>
        <div className={ styles.container__header_form }>
          <Header />
          <WalletForm />
        </div>
        <div className={ styles.container__table }>
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
