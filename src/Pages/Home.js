import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  handleredirect = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {redirect ? <Redirect to="/cart" /> : ''}
        <h1>Home Page</h1>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleredirect }
        >
          Carrinho
        </button>
      </div>
    );
  }
}

export default Home;
