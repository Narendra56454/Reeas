import { products } from './product.js';

// Function to create product elements
function createProductElement(product, parentContainer) {
  // Create the main container for each product
  if (parentContainer2.children.length > 3) {
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
}


const parentContainer2 = document.querySelector('.rec-content-man');
products.forEach(product => {
    if (product.gender === 'Men') {
        createProductElement(product, parentContainer2);
    }
})


const wishlist = document.querySelectorAll('.for-you-wishlist');

function toggleWishlistImage(element) {
  if (element.src.includes("checked_wishlist_icon.png")) {
    element.src = "aset/wishlist_icon.png";
  } else {
    element.src = "aset/checked_wishlist_icon.png";
  }
}

wishlist.forEach(element => {
  element.addEventListener("click", event => {
    event.stopPropagation();
    toggleWishlistImage(element);
  });
});
