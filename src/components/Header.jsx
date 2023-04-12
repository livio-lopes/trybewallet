import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        <h1 data-testid="email-field">{email}</h1>
        <h2 data-testid="total-field">
          {expenses.length !== 0
            ? this.totalFiled(expenses).toFixed(2) : '0'}

        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
