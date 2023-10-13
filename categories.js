import { products } from './product.js';

const productList = document.getElementById("productList");
const filter = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const breadcrumbContainer = document.getElementById("breadcrumb");

const urlParams = new URLSearchParams(window.location.search);
const receivedCategories = urlParams.get('categories');
const decodedCategories = decodeURIComponent(receivedCategories);
const categoriesPage = "categories.html";

if (decodedCategories) {
  filter.style.display = "block";

  let selectedFilters;

  if (decodedCategories === 'Men' || decodedCategories === 'Women') {
    selectedFilters = {
      gender: decodedCategories
    };
  } else {
    selectedFilters = {
      categories: decodedCategories
    };
  }

  function applyFilters() {
    const filteredProducts = products.filter((product) => {
      for (const filter in selectedFilters) {
        if (filter === "gender") {
          if (selectedFilters[filter] !== "" && selectedFilters[filter] !== product.gender) {
            return false; // Skip products with different gender
          }
        } else if (filter === "categories") {
          if (selectedFilters[filter] !== "" && selectedFilters[filter] !== product.categories) {
            return false; // Skip products with different categories
          }
        }
      }
      return true; // Include the product in the filtered list
    });
  
    sortProducts(filteredProducts);
  }
  

  function sortProducts(productsArray) {
    const sortValue = sortSelect.value;

    const sortedProducts = [...productsArray];

    sortedProducts.sort((a, b) => {
      const brandA = a.brand.toLowerCase();
      const brandB = b.brand.toLowerCase();

      if (sortValue === "asc") {
        if (brandA < brandB) return -1;
        if (brandA > brandB) return 1;
      } else if (sortValue === "des") {
        if (brandA > brandB) return -1;
        if (brandA < brandB) return 1;
      }

      return 0;
    });

    renderProducts(sortedProducts);
  }

  function renderProducts(productsArray) {
    productList.innerHTML = '';

    productsArray.forEach(product => {
      const { brand, image, name, price, rating, id } = product;

      const productContainer = document.createElement("div");
      productContainer.classList.add("product-container");

      const div = document.createElement("div");
      div.classList.add("product");

      const wishList = document.createElement("img");
      wishList.classList.add("wish-list");
      wishList.src = "aset/wishlist_icon.png";
      wishList.alt = "wishlist icon";

      const img = document.createElement("img");
      img.classList.add("product-img");
      img.src = image;
      img.alt = brand;

      const h2 = document.createElement("h2");
      h2.classList.add("product-brand-name");
      h2.textContent = brand;

      const nameElement = document.createElement("p");
      nameElement.classList.add("product-name");
      nameElement.textContent = name;

      const prWrapper = document.createElement("div");
      prWrapper.classList.add("prWrapper");

      const priceElement = document.createElement("p");
      priceElement.classList.add("product-price");
      priceElement.textContent = price;

      const ratingWrapper = document.createElement("div");
      ratingWrapper.classList.add("rating-wrapper");

      const ratingIcon = document.createElement("img");
      ratingIcon.classList.add("rating-icon");
      ratingIcon.src = "aset/rating_icon.png";
      ratingIcon.alt = "rating icon";

      const ratingElement = document.createElement("p");
      ratingElement.classList.add("product-rating");
      ratingElement.textContent = rating;

      prWrapper.appendChild(priceElement);
      ratingWrapper.append(ratingIcon, ratingElement);
      prWrapper.appendChild(ratingWrapper);

      div.append(wishList, img, h2, nameElement, prWrapper);
      productContainer.appendChild(div);
      productList.appendChild(productContainer);

      div.addEventListener("click", () => {
        window.location.href = `/product_detail.html?id=${id}&categories=${receivedCategories}&brandsPage=${categories}`;
      });

    });

    attachWishlistEventListener();
  }

  function attachWishlistEventListener() {
    const wishlist = document.querySelectorAll('.wish-list');
  
    wishlist.forEach(item => {
      item.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleWishlistImage(item);
      });
    });
  }

  function toggleWishlistImage(element) {
    if (element.src.includes("checked_wishlist_icon.png")) {
      element.src = "aset/wishlist_icon.png";
    } else {
      element.src = "aset/checked_wishlist_icon.png";
    }
  }

  function handleFilterChange(event) {
    const checkbox = event.target;
    const filterName = checkbox.name;
    const filterValue = checkbox.checked;

    selectedFilters[filterName] = filterValue;
    applyFilters();
  }

  document.addEventListener("change", handleFilterChange);
  sortSelect.addEventListener("change", applyFilters);

  applyFilters();
} else {
  window.location.href = "/homepage2.html";
}

// Generate breadcrumb
generateBreadcrumb();

// --------CREATE BREADCRUMB---------
function generateBreadcrumb() {
  breadcrumbContainer.innerHTML = "";

  const homeBreadcrumb = createBreadcrumbElement("Home", "homepage.html");
  breadcrumbContainer.appendChild(homeBreadcrumb);

  const brandPage = createBreadcrumbElement(`Categories - "${decodedCategories}"`, "categories.html");
  breadcrumbContainer.appendChild(brandPage);

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
