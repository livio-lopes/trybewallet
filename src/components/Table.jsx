import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

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
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
                  key={ exp.id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleClick(exp.id) }
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
