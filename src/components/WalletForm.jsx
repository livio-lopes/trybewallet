import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetchListCoint,
  fetchAddExpense,
  fetchSaveEditExpense } from '../redux/actions';

import styles from './WalletForm.module.css';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    valueExpense: '',
    descriptionExpense: '',
    coinExpense: 'USD',
    methodExpense: 'Dinheiro',
    tagExpense: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchListCoint());
  }

  componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;
    const toEdit = expenses.find((exp) => exp.id === idToEdit);
    if (prevProps.editor !== editor) {
      this.setState({
        valueExpense: toEdit.value,
        descriptionExpense: toEdit.description,
        coinExpense: toEdit.currency,
        methodExpense: toEdit.method,
        tagExpense: toEdit.tag,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clickEditExpense = () => {
    const { idToEdit, dispatch } = this.props;
    const {
      valueExpense,
      descriptionExpense,
      coinExpense,
      methodExpense,
      tagExpense } = this.state;
    const expense = {
      id: idToEdit,
      value: valueExpense,
      description: descriptionExpense,
      currency: coinExpense,
      method: methodExpense,
      tag: tagExpense,
    };
    dispatch(fetchSaveEditExpense(expense));
    this.setState({
      valueExpense: '',
      descriptionExpense: '',
    });
  };

  clickAddExpense = () => {
    const { expenses, dispatch } = this.props;
    const {
      valueExpense,
      descriptionExpense,
      coinExpense,
      methodExpense,
      tagExpense } = this.state;
    const expense = {
      id: expenses.length,
      value: valueExpense,
      description: descriptionExpense,
      currency: coinExpense,
      method: methodExpense,
      tag: tagExpense,
    };
    dispatch(fetchAddExpense(expense));
    this.setState({
      valueExpense: '',
      descriptionExpense: '',
    });
  };

  btn() {
    const { editor } = this.props;
    return editor ? this.btnEditExpense() : this.btnAddExpense();
  }

  btnAddExpense() {
    return (
      <button
        className={ styles.btn_add_editing }
        type="button"
        onClick={ this.clickAddExpense }
      >
        Adicionar despesa

      </button>
    );
  }

  btnEditExpense() {
    return (
      <button
        className={ styles.btn_add_editing }
        type="button"
        onClick={ this.clickEditExpense }
      >
        Editar despesa

      </button>
    );
  }

  render() {
    const {
      valueExpense,
      descriptionExpense,
      methodExpense,
      coinExpense,
      tagExpense } = this.state;
    const { currencies } = this.props;
    return (
      <div>

        <form className={ styles.container__form }>
          <label
            className={ styles.label__forms }
            htmlFor="descriptionExpense"
          >
            Descrição da Despesa:
            <input
              data-testid="description-input"
              type="text"
              name="descriptionExpense"
              value={ descriptionExpense }
              onChange={ this.handleChange }
            />
          </label>
          <label
            className={ styles.label__forms }
            htmlFor="valueExpense"
          >
            Valor da Despesa:
            <input
              data-testid="value-input"
              type="number"
              name="valueExpense"
              value={ valueExpense }
              onChange={ this.handleChange }
            />
          </label>
          <label
            className={ styles.label__forms }
            htmlFor="coinExpense"
          >
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
          <label
            className={ styles.label__forms }
            htmlFor="methodExpense"
          >
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
          <label
            className={ styles.label__forms }
            htmlFor="tagExpense"
          >
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
        <div className={ styles.container__btn }>
          {this.btn()}
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
