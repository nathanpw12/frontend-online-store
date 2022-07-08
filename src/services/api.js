export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId) {
  const URL = ` https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
