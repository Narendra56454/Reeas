const reviewElements = document.getElementsByClassName("review");

const createAndAppendElement = (parent, elementType, className = '') => {
  const element = document.createElement(elementType);
  if (className !== '') {
    element.classList.add(className);
  }
  parent.appendChild(element);
  return element;
};

Array.from(reviewElements).forEach((reviewElement) => {
  const profileRating = createAndAppendElement(reviewElement, "div", "profile-rating");
  const reviewContent = createAndAppendElement(reviewElement, "div", "review-content");

  const profile = createAndAppendElement(profileRating, "img");
  profile.src = "aset/profile_icon.png";
  profile.alt = "profile image";

  const starContainer = createAndAppendElement(profileRating, "span", "star-container");
  const stars = [1, 2, 3, 4, 5];

  stars.forEach((starIndex) => {
    const star = createAndAppendElement(starContainer, "span", "star");
  });

  const reviewerName = createAndAppendElement(reviewContent, "h4");
  reviewerName.textContent = "Barudak Cikarang";

  const content = createAndAppendElement(reviewContent, "p");
  content.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ...";
});
