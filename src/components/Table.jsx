import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
              <td>Editar/Excluir</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
