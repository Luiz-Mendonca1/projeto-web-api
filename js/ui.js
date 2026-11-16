const productsGrid = document.getElementById('products-grid');
const loadingEl = document.getElementById('loading');
const errorContainer = document.getElementById('error-container');
const errorMessageEl = document.getElementById('error-message');

export const toggleLoading = (isLoading) => {
  if (isLoading) {
    loadingEl.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    errorContainer.classList.add('hidden');
  } else {
    loadingEl.classList.add('hidden');
  }
};

export const showError = (message) => {
  errorMessageEl.textContent = message;
  errorContainer.classList.remove('hidden');
  productsGrid.classList.add('hidden');
};

export const renderProducts = (products) => {
  errorContainer.classList.add('hidden');
  productsGrid.classList.remove('hidden');
  productsGrid.innerHTML = '';

  if (products.length === 0) {
    productsGrid.innerHTML = '<p>Nenhum produto encontrado para essa busca.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  products.forEach(({ title, price, category, image, rating }) => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const formattedPrice = price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    card.innerHTML = `
      <div>
        <div class="product-image-wrapper">
          <img src="${image}" alt="Imagem ilustrativa do produto: ${title}" loading="lazy">
        </div>
        <span class="product-category">${category}</span>
        <h2 class="product-title" title="${title}">${title}</h2>
      </div>
      <div class="product-footer">
        <span class="product-price">${formattedPrice}</span>
        <span class="product-rating" aria-label="Avaliação ${rating.rate} de 5">
          ★ ${rating.rate} (${rating.count})
        </span>
      </div>
    `;

    fragment.appendChild(card);
  });

  productsGrid.appendChild(fragment);
};