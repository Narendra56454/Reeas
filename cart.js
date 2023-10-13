var items = [
    {
        id: "B1",
        brand: "Barenbliss",
        name: "BNB barenbliss Better Than Magic Eyeliner Waterproof Korea Make Up Eyeliner Pensil Tahan Lama-Hitam",
        image: "aset/barenbliss_eye_product_1.png",
        description: "lorem ipsum",
        hashtag: "#lorem",
        price: "Rp 40.500",
        actualPrice: 40500,
        rating: "4.5",
        offer: "Diskon",
        stock: "Tersedia",
        gender: "Women",
        categories: "Make up",
        age: "<18",
        skinType: "Dry",
        skinProblem: "Acne",
        productType: "Cleanser",
        isWishlist: "True"
      },
      {
        id: "B2",
        brand: "Barenbliss",
        name: "BNB barenbliss Korean Like A Pro! Shockproof Durabrow Pomade Waterproof Smudgeproof Long Lasting",
        image: "aset/barenbliss_eye_product_2.png",
        description: "lorem ipsum",
        hashtag: "#lorem",
        price: "Rp 62.100",
        actualPrice: 62100,
        rating: "4",
        offer: "Diskon",
        stock: "Tersedia",
        gender: "Women",
        categories: "Make up",
        age: "<18",
        skinType: "Oily",
        skinProblem: "Dark Spots",
        productType: "Toner",
        isWishlist: "True"
      }
];

const parentContainer = document.getElementById("productList");
  
  items.forEach(function (item) {
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
        img.src = item.image;
        img.alt = item.brand;
  
        const h2 = document.createElement("h2");
        h2.classList.add("product-brand-name");
        h2.textContent = item.brand;
  
        const nameElement = document.createElement("p");
        nameElement.classList.add("product-name");
        nameElement.textContent = item.name;
  
        const prWrapper = document.createElement("div");
        prWrapper.classList.add("prWrapper");
  
        const priceElement = document.createElement("p");
        priceElement.classList.add("product-price");
        priceElement.textContent = item.price;
  
        const ratingWrapper = document.createElement("div");
        ratingWrapper.classList.add("rating-wrapper");
  
        const ratingIcon = document.createElement("img");
        ratingIcon.classList.add("rating-icon");
        ratingIcon.src = "aset/rating_icon.png";
        ratingIcon.alt = "rating icon";
  
        const ratingElement = document.createElement("p");
        ratingElement.classList.add("product-rating");
        ratingElement.textContent = item.rating;
  
        prWrapper.appendChild(priceElement);
        ratingWrapper.append(ratingIcon, ratingElement);
        prWrapper.appendChild(ratingWrapper);
  
        div.append(wishList, img, h2, nameElement, prWrapper);
        productContainer.appendChild(div);
        parentContainer.appendChild(productContainer);
  
        productContainer.addEventListener("click", function () {
            window.location.href = `/product_detail.html?id=${item.id}`;
        });
  });
  
  var wishlist = document.querySelectorAll('.wish-list');
  
  function toggleWishlistImage(element) {
    if (element.src.includes("checked_wishlist_icon.png")) {
      element.src = "aset/wishlist_icon.png";
    } else {
      element.src = "aset/checked_wishlist_icon.png";
    }
  }
  
  wishlist.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleWishlistImage(element);
    });
  });

  // BUY BUTTON
  const buyBtn = document.getElementById("buy-btn");
  buyBtn.addEventListener("click", () => {
    const cartPage = window.location.href;
    window.location.href = `/checkout.html?id=${items[0].id}&cartPage=${cartPage}`;
  });


const breadcrumbContainer = document.getElementById("breadcrumb");
// Generate breadcrumb
generateBreadcrumb();

// --------CREATE BREADCRUMB---------
function generateBreadcrumb() {
  breadcrumbContainer.innerHTML = "";

  const homeBreadcrumb = createBreadcrumbElement("Home", "homepage.html");
  breadcrumbContainer.appendChild(homeBreadcrumb);

  const cartPage = createBreadcrumbElement("Cart", "cart.html");
  breadcrumbContainer.appendChild(cartPage);

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
