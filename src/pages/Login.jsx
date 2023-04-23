import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';
import styles from './Login.module.css';
import Logo from '../components/Logo';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validation = () => {
    const { inputEmail, inputPassword } = this.state;
    const validEmail = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).test(inputEmail);
    const sizePassword = 6;
    const validPassword = inputPassword.length >= sizePassword;
    return !((validEmail && validPassword));
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { inputEmail } = this.state;
    dispatch(saveEmail(inputEmail));
    history.push('/carteira');
  };

  render() {
    const { inputEmail, inputPassword } = this.state;
    return (
      <div className={ styles.container }>
        <Logo />
        <label htmlFor="inputEmail">
          <input
            className={ styles.input__login }
            type="email"
            name="inputEmail"
            placeholder="Email"
            value={ inputEmail }
            onChange={ this.handleChange }
            data-testid="email-input"

          />
        </label>
        <label htmlFor="inputPassword">
          <input
            className={ styles.input__login }
            type="password"
            name="inputPassword"
            placeholder="Senha"
            value={ inputPassword }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          className={ styles.btn__login }
          disabled={ this.validation() }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
