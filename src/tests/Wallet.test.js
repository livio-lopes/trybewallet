import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa componente Wallet', () => {
  it('Testa se Header é renderizado com email, total "0", e "BRL', () => {
    const EMAIL = 'bode@gmail.com';
    const initialState = {
      user: { email: EMAIL },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
        isLoading: true,
        errorMsg: null,
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const emailHeader = screen.getByText(EMAIL);
    const totalZero = screen.getByText(/0/i);
    const brl = screen.getByText(/brl/i);
    expect(emailHeader).toBeInTheDocument();
    expect(totalZero).toBeInTheDocument();
    expect(brl).toBeInTheDocument();
  });
  it('Testa se a função fetch foi chamada uma vez', () => {
    global.fetch = jest.fn();
    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toBeCalled();
  });
  it('Testa se formulário de desepesa foi redenrizado com 2 inputs, 3 selects e 1 botão', () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueExpense = screen.getByTestId('value-input');
    const descriptionExpense = screen.getByTestId('description-input');
    const currencyExpense = screen.getByTestId('currency-input');
    const methodExpense = screen.getByTestId('method-input');
    const tagExpense = screen.getByTestId('tag-input');
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(valueExpense).toBeInTheDocument();
    expect(descriptionExpense).toBeInTheDocument();
    expect(currencyExpense).toBeInTheDocument();
    expect(methodExpense).toBeInTheDocument();
    expect(tagExpense).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();
  });
  it.skip('Testa se o botão salva despesa em expenses', () => {
    const EMAIL = 'bode@gmail.com';
    const initialState = {
      user: { email: EMAIL },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
        isLoading: true,
        errorMsg: null,
      },
    };
    const expense = {
      value: 10,
      description: 'bode',
      currency: 'DOGE',
      method: 'Dinheiro',
      tag: 'Alimentação',

    };
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const valueExpense = screen.getByTestId('value-input');
    const descriptionExpense = screen.getByTestId('description-input');
    const currencyExpense = screen.getByTestId('currency-input');
    const methodExpense = screen.getByTestId('method-input');
    const tagExpense = screen.getByTestId('tag-input');
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueExpense, expense.value);
    userEvent.type(descriptionExpense, expense.description);
    userEvent.selectOptions(currencyExpense, [expense.currency]);
    userEvent.selectOptions(methodExpense, [expense.method]);
    userEvent.selectOptions(tagExpense, [expense.tag]);
    userEvent.click(btnAddExpense);
  });
  it.skip('Testa se header é atualizado com o total de despesas ', () => {});
});
