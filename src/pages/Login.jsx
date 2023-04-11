import PropTypes from 'prop-types';
import React from 'react';

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
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { inputEmail, inputPassword } = this.state;
    return (
      <div>
        <label htmlFor="inputEmail">
          <input
            type="email"
            name="inputEmail"
            placeholder="bode@bode.com"
            value={ inputEmail }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <label htmlFor="inputPassword">
          <input
            type="password"
            name="inputPassword"
            placeholder="Sua senha"
            value={ inputPassword }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <button
          type="button"
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
