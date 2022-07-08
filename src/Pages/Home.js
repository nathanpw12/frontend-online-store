import React from 'react';
import { Redirect } from 'react-router-dom';

const { getCategories } = require('../services/api');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      didMount: false,
      categories: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((response) => this.setState({ didMount: true, categories: response }));
  }

  handleredirect = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect, didMount, categories } = this.state;
    const categoriesList = (
      categories.map((category, index) => (
        <div key={ index }>
          <label htmlFor={ category.name } data-testid="category">
            <input type="radio" id={ category.name } />
            { category.name }
          </label>
        </div>
      ))
    );

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
        { didMount ? categoriesList : '' }
      </div>
    );
  }
}

export default Home;
