import { products } from './product.js';

const productList = document.getElementById("productList");
const filter = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const breadcrumbContainer = document.getElementById("breadcrumb");

filter.style.display = "block";

const selectedFilters = {};

function applyFilters() {
  const checkedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));

  Object.keys(selectedFilters).forEach((filter) => delete selectedFilters[filter]);

  checkedCheckboxes.forEach((checkbox) => {
    const filterName = checkbox.name;
    const filterValue = checkbox.checked;
    selectedFilters[filterName] = filterValue;
  });

  const filtered = products.filter((product) =>
    Object.entries(selectedFilters).every(([filter, value]) => {
      if (value) {
        switch (filter) {
          case "cashback":
            return product.offer === "Cashback";
          case "diskon":
            return product.offer === "Diskon";
          case "harga-grosir":
            return product.offer === "Grosir";
          case "preorder":
            return product.stock === "Preorder";
          case "tersedia":
            return product.stock === "Tersedia";
          case "tidak-tersedia":
            return product.stock === "Tidak tersedia";
          default:
            return product[filter] === value;
        }
      } else {
        return true;
      }
    })
  );

  sortProducts(filtered);
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
    productList.textContent = "";
  
    productsArray.forEach((product) => {
      if (product.isWishlist.toLowerCase() === "true") {
        const { brand, image, name, price, rating, id } = product;
  
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");
  
        const div = document.createElement("div");
        div.classList.add("product");
  
        const wishList = document.createElement("img");
        wishList.classList.add("wish-list");
        wishList.src = "aset/checked_wishlist_icon.png";
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
          window.location.href = `/product_detail.html?id=${id}`;
        });
  
        wishList.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the product click event from triggering
      
            // Display confirmation dialog before removing the product
            const confirmed = confirm("Are you sure you want to remove this product?");
            if (confirmed) {
              // Remove the product from the wishlist
              const index = products.findIndex((p) => p.id === id);
              if (index !== -1) {
                products.splice(index, 1);
                renderProducts(filteredProducts);
              }
            }
          });
      }
    });
  }
  

function handleFilterChange(event) {
  const checkbox = event.target;
  const filterName = checkbox.name;
  const filterValue = checkbox.checked;

  Object.keys(selectedFilters).forEach((filter) => {
    if (filter !== filterName) {
      selectedFilters[filter] = false;
      const otherCheckbox = document.querySelector(`input[name="${filter}"]`);
      otherCheckbox.checked = false;
    }
  });

  selectedFilters[filterName] = filterValue;
  applyFilters();
}

document.addEventListener("change", handleFilterChange);
sortSelect.addEventListener("change", applyFilters);

// Assuming `filteredProducts` is defined and contains the initial list of products
const filteredProducts = products;

renderProducts(filteredProducts);

// Generate breadcrumb
generateBreadcrumb();

// --------CREATE BREADCRUMB---------
function generateBreadcrumb() {
  breadcrumbContainer.innerHTML = "";

  const homeBreadcrumb = createBreadcrumbElement("Home", "homepage.html");
  breadcrumbContainer.appendChild(homeBreadcrumb);

  const wishlistPage = createBreadcrumbElement("Wishlist", "wishlist.html");
  breadcrumbContainer.appendChild(wishlistPage);

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
