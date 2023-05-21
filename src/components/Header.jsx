import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import styles from './Header.module.css';
import expense from '../images/expense.svg';
import person from '../images/person.svg';

class Header extends Component {
  totalFiled = (expenses) => {
    const total = expenses.reduce((acc, cur) => {
      const { ask } = cur.exchangeRates[cur.currency];
      acc += Number(ask) * Number(cur.value);
      return acc;
    }, 0);
    return total;
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <div className={ styles.container }>
        <Logo className={ styles.logo_header } />
        <span className={ styles.total__expense }>
          <img
            className={ styles.icon__expense }
            src={ expense }
            alt="icone_despesa"
          />
          Total de despesas:
          <span
            className={ styles.expense }
            data-testid="total-field"
          >
            {expenses.length !== 0
              ? this.totalFiled(expenses).toFixed(2) : '0.00'}

          </span>
          <span
            className={ styles.expense }
            data-testid="header-currency-field"
          >
            BRL

          </span>
        </span>
        <span
          className={ styles.email }
          data-testid="email-field"
        >
          <img
            className={ styles.icon__person }
            src={ person }
            alt="icone_despesa"
          />
          {email}

        </span>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
