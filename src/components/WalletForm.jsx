import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetchListCoint } from '../redux/actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    valueExpense: 0,
    descriptioExpense: '',
    coinExpense: '',
    methodExpense: 'Dinheiro',
    tagExpense: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchListCoint());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      valueExpense,
      descriptioExpense,
      methodExpense,
      coinExpense,
      tagExpense } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueExpense">
          Valor da Despesa:
          <input
            data-testid="value-input"
            type="number"
            name="valueExpense"
            value={ valueExpense }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descriptioExpense">
          Descriação da Despesa:
          <input
            data-testid="description-input"
            type="text"
            name="descriptioExpense"
            value={ descriptioExpense }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="coinExpense">
          Moeda:
          <select
            data-testid="currency-input"
            name="coinExpense"
            value={ coinExpense }
            onChange={ this.handleChange }
          >
            {currencies.map((e, k) => (<option key={ k } value={ e }>{e}</option>))}
          </select>
        </label>
        <label htmlFor="methodExpense">
          Metodo de Pagamento:
          <select
            data-testid="method-input"
            name="methodExpense"
            value={ methodExpense }
            onChange={ this.handleChange }
          >
            {methods.map((e, k) => (<option key={ k } value={ e }>{e}</option>))}
          </select>

        </label>
        <label htmlFor="tagExpense">
          Categorias:
          <select
            data-testid="tag-input"
            name="tagExpense"
            value={ tagExpense }
            onChange={ this.handleChange }
          >
            {tags.map((e, k) => (<option key={ k } value={ e }>{e}</option>))}
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
