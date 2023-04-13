import React, { Component } from 'react';

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
    return (
      <table>
        <thead>
          <tr>
            {
              colunn.map((info, i) => <th key={ i }>{info}</th>)
            }
          </tr>
        </thead>

        {/* <tbody>
        {rowsFiltred().map((planet, index) => (
          <tr key={ index }>
            {
              colunn.map((info, newIndex) => (
                <td key={ newIndex }>{planet[info]}</td>
              ))
            }
          </tr>
        ))}
      </tbody> */}
      </table>
    );
  }
}

export default Table;
