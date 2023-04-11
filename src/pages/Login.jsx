import PropTypes from 'prop-types';
import React from 'react';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { inputEmail, inputPassword, isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="inputPassword">
          <input
            type="password"
            name="inputPassword"
            placeholder="bode@bode.com"
            value={ inputPassword }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="inputEmail">
          <input
            type="email"
            name="inputEmail"
            placeholder="Sua senha"
            value={ inputEmail }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
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
