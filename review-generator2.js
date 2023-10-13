const reviewElements2 = document.getElementsByClassName("review2");

const createAndAppendElement2 = (parent, elementType, className = '') => {
  const element = document.createElement(elementType);
  if (className !== '') {
    element.classList.add(className);
  }
  parent.appendChild(element);
  return element;
};

Array.from(reviewElements2).forEach((reviewElement2) => {
  const wrapper1 = createAndAppendElement2(reviewElement2, 'div', 'wrapper1');
  
  const profile = createAndAppendElement2(wrapper1, 'img');
  profile.src = 'aset/profile_icon.png';
  profile.alt = '';
  
  const wrapper2 = createAndAppendElement2(wrapper1, 'div', 'wrapper2');
  
  const reviewerName = createAndAppendElement2(wrapper2, 'h4');
  reviewerName.textContent = 'Barudak Cikarang';
  
  const starContainer = createAndAppendElement2(wrapper2, 'span', 'star-container');
  
  for (let i = 0; i < 5; i++) {
    const star = createAndAppendElement2(starContainer, 'span', 'star');
  }
  
  const content = createAndAppendElement2(reviewElement2, 'p');
  content.textContent = 'Lorem Ipsum';
});
