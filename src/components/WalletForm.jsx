import React, { Component } from 'react';
import { connect } from 'react-redux';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Saúde'];

class WalletForm extends Component {
  state = {
    valueExpense: 0,
    descriptioExpense: '',
    coinExpense: '',
    methodExpense: 'Dinheiro',
    tagExpense: 'Alimentação',
  };

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
      coinExpense,
      methodExpense,
      tagExpense } = this.state;
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
            data-testid="method-input"
            name="coinExpense"
            value={ coinExpense }
            onChange={ this.handleChange }
          >
            {methods.map((e, k) => (<option key={ k } value={ e }>{e}</option>))}
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

export default connect()(WalletForm);
