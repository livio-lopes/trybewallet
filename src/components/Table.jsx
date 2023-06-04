import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import styles from './Table.module.css';
import iconDelete from '../images/delete_icon.svg';
import iconEdit from '../images/edit_icon.svg';

const colunn = ['Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

class Table extends Component {
  deleteClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  editClick = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className={ styles.container__table }>
        <table className={ styles.table }>
          <thead>
            <tr>
              {
                colunn.map((info, i) => <th key={ i }>{info}</th>)
              }
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp, i) => (
              <tr key={ i }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{Number(exp.value).toFixed(2)}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td>{Number(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(exp.value)
              * Number(exp.exchangeRates[exp.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    key={ exp.value }
                    className={ styles.buttons }
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editClick(exp.id) }
                  >
                    <img
                      className={ styles.icons }
                      src={ iconEdit }
                      alt="editar"
                    />
                  </button>
                  <button
                    key={ exp.id }
                    className={ styles.buttons }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteClick(exp.id) }
                  >
                    <img
                      className={ styles.icons }
                      src={ iconDelete }
                      alt="deletar"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.shape(
    PropTypes.object,
  ),
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
