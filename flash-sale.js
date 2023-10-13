var items = [
    {
      id: "B2",
      discountTag: "aset/discount_tag.png",
      productImg: "aset/barenbliss_eye_product_2.png",
      wishlistIcon: "aset/wishlist_icon.png",
      productName: "BARRENBLISS",
      productDescription: "BNB barenbliss Korean Like A Pro! Shockproof Durabrow Pomade Waterproof Smudgeproof Long Lasting",
      previousPrice: "Rp 72.100",
      currentPrice: "Rp 62.100",
      ratingIcon: "aset/rating_icon.png",
      rating: "5"
    },
    {
      id: "B2",
      discountTag: "aset/discount_tag.png",
      productImg: "aset/barenbliss_eye_product_1.png",
      wishlistIcon: "aset/wishlist_icon.png",
      productName: "BARRENBLISS",
      productDescription: "BNB barenbliss Better Than Magic Eyeliner Waterproof Korea Make Up Eyeliner Pensil Tahan Lama-Hitam",
      previousPrice: "Rp 50.500",
      currentPrice: "Rp 40.500",
      ratingIcon: "aset/rating_icon.png",
      rating: "4.5"
    },
    {
      id: "B4",
      discountTag: "aset/discount_tag.png",
      productImg: "aset/barenbliss_skin_face_2.png",
      wishlistIcon: "aset/wishlist_icon.png",
      productName: "BARRENBLISS",
      productDescription: "BNB barenbliss Machi Peachy Micellar Water - Mineral Oil Free",
      previousPrice: "Rp 59.500",
      currentPrice: "Rp 49.500",
      ratingIcon: "aset/rating_icon.png",
      rating: "4"
    },
    {
      id: "B3",
      discountTag: "aset/discount_tag.png",
      productImg: "aset/barenbliss_face_2_png_1.png",
      wishlistIcon: "aset/wishlist_icon.png",
      productName: "BARRENBLISS",
      productDescription: "BNB barenbliss Korean Bloomatte True Beauty Inside Cushion 24H Full Coverage",
      previousPrice: "Rp 173.100",
      currentPrice: "Rp 143.100",
      ratingIcon: "aset/rating_icon.png",
      rating: "4.5"
    }
  ];
  
  var parentContainer = document.getElementById("fs-content");
  
  items.forEach(function (item) {
    var containerDiv = document.createElement("div");
    containerDiv.className = "fs-content-detail";
  
    var discountTagImg = document.createElement("img");
    discountTagImg.className = "discount-tag";
    discountTagImg.src = item.discountTag;
    discountTagImg.alt = "discount-tag";
    containerDiv.appendChild(discountTagImg);
  
    var productImg = document.createElement("img");
    productImg.className = "product-img";
    productImg.src = item.productImg;
    productImg.alt = "product-image";
    containerDiv.appendChild(productImg);
  
    var productDescDiv = document.createElement("div");
    productDescDiv.className = "product-description";
  
    var wishlistIconImg = document.createElement("img");
    wishlistIconImg.src = item.wishlistIcon;
    wishlistIconImg.alt = "";
    wishlistIconImg.className = "fs-wishlist-icon";
    productDescDiv.appendChild(wishlistIconImg);
  
    var productNameHeading = document.createElement("h4");
    productNameHeading.textContent = item.productName;
    productDescDiv.appendChild(productNameHeading);
  
    var productDescPara = document.createElement("p");
    productDescPara.textContent = item.productDescription;
    productDescDiv.appendChild(productDescPara);
  
    var priceDiv = document.createElement("div");
  
    var previousPriceHeading = document.createElement("h5");
    var previousPriceStrike = document.createElement("s");
    previousPriceStrike.textContent = item.previousPrice;
    previousPriceHeading.appendChild(previousPriceStrike);
    priceDiv.appendChild(previousPriceHeading);
  
    var currentPriceHeading = document.createElement("h5");
    currentPriceHeading.textContent = item.currentPrice;
    priceDiv.appendChild(currentPriceHeading);
  
    productDescDiv.appendChild(priceDiv);
  
    var ratingDiv = document.createElement("div");
    ratingDiv.className = "fs-rating";
  
    var ratingIconImg = document.createElement("img");
    ratingIconImg.src = item.ratingIcon;
    ratingIconImg.alt = "";
    ratingDiv.appendChild(ratingIconImg);
  
    var ratingPara = document.createElement("p");
    ratingPara.textContent = item.rating;
    ratingDiv.appendChild(ratingPara);
  
    productDescDiv.appendChild(ratingDiv);
  
    containerDiv.appendChild(productDescDiv);
  
    parentContainer.appendChild(containerDiv);
  
    containerDiv.addEventListener("click", function () {
      window.location.href = `/product_detail.html?id=${item.id}`;
    });
  });
  
  var wishlist = document.querySelectorAll('.fs-wishlist-icon');
  
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
  