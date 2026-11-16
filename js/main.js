import { fetchProducts } from './api.js';
import { toggleLoading, showError, renderProducts } from './ui.js';

let currentProducts = [];
let currentCategory = 'all';

const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const retryBtn = document.getElementById('retry-btn');

const loadCatalog = async (category = 'all') => {
  currentCategory = category;
  toggleLoading(true);

  try {
    currentProducts = await fetchProducts(category);
    filterAndRender();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    showError('Não foi possível conectar ao servidor de produtos. Verifique sua conexão e tente novamente.');
  } finally {
    toggleLoading(false);
  }
};

const filterAndRender = () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filtered = currentProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
};

// Eventos de filtro por categoria
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    searchInput.value = '';
    loadCatalog(btn.dataset.category);
  });
});

// Evento de busca em tempo real
searchInput.addEventListener('input', filterAndRender);

// Evento de tentar novamente em caso de falha na API
retryBtn.addEventListener('click', () => loadCatalog(currentCategory));

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadCatalog();
});