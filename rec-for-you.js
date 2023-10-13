import { products } from './product.js';

// Function to create product elements
function createProductElement(product, parentContainer) {
  // Create the main container for each product
  if (parentContainer.children.length > 7) {
    return; // Stop creating products
  }

  const productContainer = document.createElement('div');
  productContainer.classList.add('rec-content-detail');

  // Create the wishlist icon element
  const wishlistIcon = document.createElement('img');
  wishlistIcon.classList.add('for-you-wishlist');
  wishlistIcon.src = 'aset/wishlist_icon.png';
  wishlistIcon.alt = 'wishlist';
  productContainer.appendChild(wishlistIcon);

  // Create the product image element
  const productImage = document.createElement('img');
  productImage.classList.add('product-img');
  productImage.src = product.image;
  productImage.alt = product.name;
  productContainer.appendChild(productImage);

  // Create the product description container
  const productDescription = document.createElement('div');
  productDescription.classList.add('product-description');

  // Create the product title (brand and name)
  const productTitle = document.createElement('h4');
  productTitle.textContent = product.brand;
  productDescription.appendChild(productTitle);

  // Create the product description text
  const productText = document.createElement('p');
  productText.textContent = product.name;
  productDescription.appendChild(productText);

  // Create the product price
  const productPrice = document.createElement('h5');
  productPrice.textContent = product.price;
  productDescription.appendChild(productPrice);

  // Add the product description to the main container
  productContainer.appendChild(productDescription);

  // Add the product container to the parent container
  parentContainer.appendChild(productContainer);

  // Add event listener to the wishlist icon
  wishlistIcon.addEventListener('click', event => {
    event.stopPropagation();
    toggleWishlistImage(wishlistIcon);
  });
}

// Get the parent container where the items will be added
const parentContainer1 = document.querySelector('.rec-content');

// Function to filter and display products based on the selected options
function displaySelectedProducts() {
  const age = document.getElementById('age').value;
  const skinType = document.getElementById('skin-type').value;
  const skinProblem = document.getElementById('skin-problem').value;
  const productType = document.getElementById('type-product').value;
  let gender = '';

  // Check which image is active for gender selection
  const menImage = document.getElementById('select-men-img');
  const womenImage = document.getElementById('select-women-img');

  if (menImage.classList.contains('active')) {
    gender = 'Men';
  } else if (womenImage.classList.contains('active')) {
    gender = 'Women';
  }

  // Clear existing products
  parentContainer1.innerHTML = '';

  // Filter products based on selected options
  const filteredProducts = products.filter(product => {
    return (
      (age === '' || product.age === age) &&
      (skinType === '' || product.skinType === skinType) &&
      (skinProblem === '' || product.skinProblem === skinProblem) &&
      (productType === '' || product.productType === productType) &&
      (gender === '' || product.gender === gender)
    );
  });

  // Create product elements for the filtered products
  filteredProducts.forEach(product => {
    createProductElement(product, parentContainer1);
  });
}

// Add event listener to the select elements
const selectElements = document.querySelectorAll('.select-wrapper select');
selectElements.forEach(select => {
  select.addEventListener('change', displaySelectedProducts);
});

// Add event listeners to the men and women images
const menImage = document.getElementById('select-men-img');
const womenImage = document.getElementById('select-women-img');
let isMenActive = false;
let isWomenActive = false;

menImage.addEventListener('click', () => {
  if (isMenActive) {
    menImage.classList.remove('active');
    menImage.style.outline = 'none';
    isMenActive = false;
  } else {
    menImage.classList.add('active');
    womenImage.classList.remove('active');
    menImage.style.outline = '6px solid #EDF1D6';
    womenImage.style.outline = 'none';
    isMenActive = true;
    isWomenActive = false;
  }
  displaySelectedProducts();
});

womenImage.addEventListener('click', () => {
  if (isWomenActive) {
    womenImage.classList.remove('active');
    womenImage.style.outline = 'none';
    isWomenActive = false;
  } else {
    womenImage.classList.add('active');
    menImage.classList.remove('active');
    womenImage.style.outline = '6px solid #EDF1D6';
    menImage.style.outline = 'none';
    isWomenActive = true;
    isMenActive = false;
  }
  displaySelectedProducts();
});


// Initial display of products
displaySelectedProducts();


// -----------Wishlist functionality----------
const wishlistIcons = document.querySelectorAll('.for-you-wishlist');

function toggleWishlistImage(element) {
  if (element.src.includes('checked_wishlist_icon.png')) {
    element.src = 'aset/wishlist_icon.png';
  } else {
    element.src = 'aset/checked_wishlist_icon.png';
  }
}

wishlistIcons.forEach(wishlistIcon => {
  wishlistIcon.addEventListener('click', event => {
    event.stopPropagation();
    toggleWishlistImage(wishlistIcon);
  });
});
