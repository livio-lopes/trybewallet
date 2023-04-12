import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL = 'bode@gmail.com';
const PASSWORD = '123456';
const testIdEmail = 'email-input';
const testIdPassword = 'password-input';

describe('Testa pagina Login', () => {
  it('Verifica se tela de login renderiza dois inputs e um botão desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const button = screen.getByRole('button');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Verifica se o botão é habilido com as email e senha validos', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const button = screen.getByRole('button');
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    expect(button).not.toBeDisabled();
  });
  it('Verifica se ao habilitar o botão e clica-lo a pagina "/carteira" é rendenrizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const button = screen.getByRole('button');
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
  it('Verifica se o email está salvo na store', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const button = screen.getByRole('button');
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, PASSWORD);
    userEvent.click(button);
    const storeEmail = store.getState().user.email;
    expect(storeEmail).toBe(EMAIL);
  });
});
