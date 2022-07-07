import React from 'react';

class Cart extends React.Component {
  render() {
    return (
      <div>
        <h1>Cart</h1>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
  }
}

export default Cart;
