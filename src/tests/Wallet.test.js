import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testa componente Wallet', () => {
  it('Testa se Header é renderizado com email, total "0", e "BRL', () => {
    const EMAIL = 'gato@gmail.com';
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
  it.only('Testa se header é atualizado com o total de despesas ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
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
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const valueExpense = screen.getByTestId('value-input');
    const descriptionExpense = screen.getByTestId('description-input');
    const currencyExpense = screen.getByTestId('currency-input');
    const methodExpense = screen.getByTestId('method-input');
    const tagExpense = screen.getByTestId('tag-input');
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueExpense, expense.value);
    userEvent.type(descriptionExpense, expense.description);
    await waitFor(() => {
      userEvent.selectOptions(currencyExpense, expense.currency);
    });
    // screen.debug();
    userEvent.selectOptions(methodExpense, expense.method);
    userEvent.selectOptions(tagExpense, expense.tag);
    userEvent.click(btnAddExpense);
    const total = screen.getByTestId('total-field');
    screen.debug();
    await waitFor(() => {
      expect(total).toBeInTheDocument();
    });
  });
  it('Testa se o botão de deletar despesa funciona', async () => {
    const initialState = {
      user: { email: 'bode@gmail.com' },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          { id: 0, value: '10', description: 'bode', currency: 'USD', method: 'Dinheiro', tag: 'Trabalho', exchangeRates: mockData },
          { id: 1, value: '5', description: 'gato', currency: 'USD', method: 'Dinheiro', tag: 'Transporte', exchangeRates: mockData },
        ],
        editor: false,
        idToEdit: 0,
        isLoading: true,
        errorMsg: null,
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialState });
    await waitFor(() => {
      const trElements = screen.getByRole('tr');
      expect(trElements).toHaveLength(3);
      const btnsDelete = screen.getAllByTestId('delete-btn');
      expect(btnsDelete).toHaveLength(2);
    });
  });
});
