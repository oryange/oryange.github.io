function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createTotal() {
  const lista = document.querySelectorAll('.cart__item');
 
  let sum = 0;
   for (let index = 0; index < lista.length; index += 1) {
    const valor = lista[index].innerHTML.split('$')[1];
    sum += Number(valor);
  }
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerHTML = sum;
}

function cartItemClickListener(event, contador) {
  const local = event.target;
  local.parentNode.removeChild(local);
  localStorage.removeItem(`item${contador}`);
  createTotal();
}

function clearCart() {
  const li = document.querySelectorAll('.cart__item');
  const ol = document.querySelector('ol');
  for (let index = 0; index < li.length; index += 1) {
    ol.removeChild(li[index]);
  }
  createTotal();
}

function createCartItemElement({ sku, name, price }) {
  const li = document.createElement('li');
  const cartItems = document.querySelector('.cart__items');
  const contador = cartItems.childElementCount;
  localStorage.setItem(`item${contador}`, `${sku}|${name}|${price}`);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${price}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, contador));
  cartItems.appendChild(li);
  createTotal();
  return li;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Add to Cart!'))
  .addEventListener('click', () => createCartItemElement({ sku, name, price }));
  
  return section;
}

function fetchProducts() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=$computador';
  const conteinerItems = document.querySelector('.items');
  const loading = document.querySelector('.loading');
  fetch(endpoint) 
  .then((response) => response.json())
  .then((data) => {
    loading.parentNode.removeChild(loading);
    data.results.forEach(({ id, title, thumbnail, price }) => {
  conteinerItems
  .appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail, price }));
    });
  })
  .then(() => {
    for (let index = 0; index < localStorage.length; index += 1) {
      const [sku, name, price] = localStorage.getItem(`item${index}`).split('|');
      createCartItemElement({ sku, name, price });
    }
  });
}

window.onload = () => {
  fetchProducts();
  const cart = document.querySelector('.empty-cart');
  cart.addEventListener('click', clearCart);
};