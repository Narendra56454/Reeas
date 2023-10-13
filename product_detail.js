import { products } from './product.js';

const urlParams = new URLSearchParams(window.location.search);
const receivedId = urlParams.get('id');
const product = products.find(item => item.id === receivedId);
const similarIds = products.filter(item => item.id !== receivedId && item.id.charAt(0) === receivedId.charAt(0)).map(item => item.id);
const breadcrumbContainer = document.getElementById("breadcrumb");

const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get("searchQuery");
const decodedSearchQuery = decodeURIComponent(searchQuery);
const searchPage = searchParams.get("searchPage");


if (product) {
  const name = document.getElementById("product-name");
  const desc = document.getElementById("desc");
  const hashtag = document.getElementById("hashtag");
  const price = document.getElementById("price");

  name.textContent = product.name;
  desc.textContent = product.description;
  hashtag.textContent = product.hashtag;
  price.textContent = product.price;

  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImg = document.getElementById('img-view');
  const img1 = document.getElementById("thumb-img");
  mainImg.src = product.image;
  img1.src = product.image;

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      mainImg.src = thumbnail.src;
      if(mainImg.src === img1.src){
        mainImg.style.height = '50%';
      } else {
        mainImg.style.height = '100%';
      }
    });
  });


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


  // RATING
  const averageRating = parseFloat(product.rating);
  const starElements = document.querySelectorAll('.star');

  starElements.forEach((star, index) => {
    if (averageRating >= index + 1) {
      star.classList.add('filled');
    } else if (averageRating > index && averageRating < index + 1) {
      star.classList.add('half-filled');
    }
  });


  // SIMILAR PRODUCT
  const productList = document.getElementById("product-that-related");

  similarIds.forEach(id => {
    const relatedProduct = products.find(item => item.id === id);

    const productContainer = createElement("div", "product-related-container");
    const div = createElement("div", "the-related-product");
    const wishList = createElement("img", "related-wish-list", "aset/wishlist_icon.png", "wishlist icon");
    const img = createElement("img", "related-product-img", relatedProduct.image, relatedProduct.brand);
    const h2 = createElement("h2", "related-product-brand-name", relatedProduct.brand);
    const name = createElement("p", "related-product-name", relatedProduct.name);
    const prWrapper = createElement("div", "related-prWrapper");
    const p = createElement("p", "related-product-price", relatedProduct.price);
    const ratingWrapper = createElement("div", "related-rating-wrapper");
    const rating = createElement("img", "related-rating-icon", "aset/rating_icon.png", "rating icon");
    const p2 = createElement("p", "related-product-rating", relatedProduct.rating);

    prWrapper.append(p);
    ratingWrapper.append(rating, p2);
    prWrapper.append(ratingWrapper);
    div.append(wishList, img, h2, name, prWrapper);
    productContainer.append(div);
    productList.append(productContainer);

    div.addEventListener("click", () => {
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      window.location.href = `/product_detail.html?id=${relatedProduct.id}&searchQuery=${encodedSearchQuery}&searchPage=${searchPage}`;
    });
  });


  // BUY BUTTON
  const buyBtn = document.getElementById("buy-btn");
  buyBtn.addEventListener("click", () => {
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const productPage = window.location.href;
    window.location.href = `/checkout.html?id=${product.id}&searchQuery=${encodedSearchQuery}&searchPage=${searchPage}&productPage=${productPage}`;
  });


  // CLICK WISHLIST
  const wishlist = document.getElementById('wishlist');
  const relatedWishlist = document.querySelectorAll('.related-wish-list');

  function toggleWishlistImage(element) {
    if (element.src.includes("checked_wishlist_icon.png")) {
      element.src = "aset/wishlist_icon.png";
    } else {
      element.src = "aset/checked_wishlist_icon.png";
    }
  }

  wishlist.addEventListener("click", () => {
    toggleWishlistImage(wishlist);
  });

  relatedWishlist.forEach(element => {
    element.addEventListener("click", event => {
      event.stopPropagation();
      toggleWishlistImage(element);
    });
  });

}

function createElement(tag, className, srcOrText, alt) {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (tag === "img") {
    element.src = srcOrText;
    element.alt = alt;
  } else {
    element.textContent = srcOrText;
  }

  return element;
}


// BREADCRUMB
function generateBreadcrumb() {
  breadcrumbContainer.innerHTML = "";

  const homeBreadcrumb = createBreadcrumbElement("Home", "homepage.html");
  breadcrumbContainer.appendChild(homeBreadcrumb);

  const currentPageUrl = window.location.href;
  
  if(searchPage){  
    const searchBreadcrumb = createBreadcrumbElement(`Search - "${decodedSearchQuery}"`, searchPage);
    breadcrumbContainer.appendChild(searchBreadcrumb);
  }

  if (product) {
    const productBreadcrumb = createBreadcrumbElement(product.name, currentPageUrl);
    breadcrumbContainer.appendChild(productBreadcrumb);
  }  

  const breadcrumbElements = breadcrumbContainer.children;
  for (let i = 1; i < breadcrumbElements.length; i++) {
    breadcrumbContainer.insertBefore(document.createTextNode(" > "), breadcrumbElements[i]);
  }
}

function createBreadcrumbElement(text, url) {
  const breadcrumbElement = document.createElement("a");
  breadcrumbElement.href = url;
  breadcrumbElement.textContent = text;
  return breadcrumbElement;
}

generateBreadcrumb();
