const BASE_URL = 'https://fakestoreapi.com';

/**
 * Busca todos os produtos ou filtra por categoria na FakeStoreAPI.
 * @param {string} category - Categoria selecionada ('all' ou nome da categoria)
 * @returns {Promise<Array>} Lista de produtos
 */
export const fetchProducts = async (category = 'all') => {
  const endpoint = category === 'all' 
    ? `${BASE_URL}/products` 
    : `${BASE_URL}/products/category/${encodeURIComponent(category)}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Falha na requisição (Status: ${response.status})`);
  }

  const data = await response.json();
  return data;
};