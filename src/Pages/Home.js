import React from 'react';
import { Redirect } from 'react-router-dom';

const {
  getCategories,
  getProductsFromCategoryAndQuery,
} = require('../services/api');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      didMount: false,
      categories: [],
      search: '',
      searchResult: [],
    };
  }

  componentDidMount() {
    getCategories().then((response) => this.setState({ didMount: true, categories: response }));
  }

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  handleSearch = async () => {
    const { search } = this.state;
    const searchResponse = await getProductsFromCategoryAndQuery(search);
    console.log(searchResponse);
    this.setState({ searchResult: searchResponse.results });
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { redirect, didMount, categories, searchResult } = this.state;
    const categoriesList = categories.map((category, index) => (
      <div key={ index }>
        <label htmlFor={ category.name } data-testid="category">
          <input type="radio" id={ category.name } />
          {category.name}
        </label>
      </div>
    ));

    const searchResultList = searchResult.map((list) => (
      <div key={ list.id } data-testid="product">
        <ul>
          <img src={ list.thumbnail } />
          <li>
            {' '}
            Nome:
            {' '}
            {list.title}
            {' '}
          </li>
          <li>
            {' '}
            Preço:
            {' '}
            {list.price}
          </li>
        </ul>
      </div>
    ));

    return (
      <div>
        {redirect ? <Redirect to="/cart" /> : ''}
        <h1>Home Page</h1>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          <input
            name="search"
            onChange={ this.handleInput }
            data-testid="query-input"
          />
          <button onClick={ this.handleSearch } data-testid="query-button">
            {' '}
            Pesquisar
            {' '}
          </button>
        </div>
        <div>
          <button
            data-testid="shopping-cart-button"
            type="button"
            onClick={ this.handleRedirect }
          >
            Carrinho
          </button>
        </div>
        {didMount ? categoriesList : ''}
        <div>{searchResultList.length === 0? <p>Nenhum produto foi encontrado</p>: searchResultList}</div>
      </div>
    );
  }
}

export default Home;
