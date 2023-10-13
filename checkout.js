import { products } from './product.js';

const urlParams = new URLSearchParams(window.location.search);
const receivedId = urlParams.get('id');
const breadcrumbContainer = document.getElementById("breadcrumb");

const searchQuery = decodeURIComponent(urlParams.get("searchQuery"));
const searchPage = urlParams.get("searchPage");
const productPage = urlParams.get("productPage");

const cartParams = new URLSearchParams(window.location.search);
const cartPage = cartParams.get("cartPage");

const courier = document.getElementById("courier-id");
const estimate = document.getElementById("estimate");
courier.addEventListener("change", displayEstimate);

const selectElement = document.getElementById("payment-id");
const imageElement = document.getElementById("bank-logo");
selectElement.onchange = changeImage;


const productImg = document.getElementById('product-img');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');

if (receivedId) {
  const product = products.find((product) => product.id === receivedId);

  if (product) {
    productImg.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = product.price;
  }
}


function displayEstimate() {
  estimate.style.display = "block";
}

function changeImage() {
  const selectedOption = selectElement.value;

  if (selectedOption === "mandiri") {
    imageElement.src = "aset/Logo_Mandiri.png";
  } else if (selectedOption === "BCA") {
    imageElement.src = "aset/Logo_BCA.png";
  } else if (selectedOption === "BSI") {
    imageElement.src = "aset/Logo_BSI.png";
  } else if (selectedOption === "BNI") {
    imageElement.src = "aset/Logo_BNI.png";
  }
}



// ADD & SUBSTRACT PRODUCT QUANTITY
const subtractBtn = document.getElementById('subtract');
const addBtn = document.getElementById('add');
const quantityInput = document.getElementById('quantity');

subtractBtn.addEventListener('click', () => updateQuantity(-1));
addBtn.addEventListener('click', () => updateQuantity(1));

quantityInput.addEventListener('input', () => {
  let quantity = quantityInput.value;
  if (quantity === '') {
    quantity = '0';
  } else if (quantity.startsWith('0') && quantity.length > 1) {
    quantity = quantity.replace(/^0+/, '');
  }
  quantityInput.value = quantity;
});

function updateQuantity(delta) {
  let quantity = parseInt(quantityInput.value, 10) || 0;
  quantity += delta;
  if (quantity < 0) {
    quantity = 0;
  }
  quantityInput.value = quantity;
}



// --------CREATE BREADCRUMB---------
function generateBreadcrumb() {
  breadcrumbContainer.innerHTML = "";

  addBreadcrumb("Home", "homepage.html");

  if(searchPage) {
    addBreadcrumb(`Search - "${searchQuery}"`, searchPage);
  }
  if(productPage) {
    addBreadcrumb("...", productPage);
  }

  if(cartPage) {
    addBreadcrumb("Cart", cartPage);
  }

  addBreadcrumb("Checkout", window.location.href);

  const breadcrumbElements = breadcrumbContainer.children;
  for (let i = 1; i < breadcrumbElements.length; i++) {
    breadcrumbContainer.insertBefore(document.createTextNode(" > "), breadcrumbElements[i]);
  }
}

function addBreadcrumb(text, url) {
  const breadcrumbElement = document.createElement("a");
  breadcrumbElement.href = url;
  breadcrumbElement.textContent = text;
  breadcrumbContainer.appendChild(breadcrumbElement);
}

generateBreadcrumb();
