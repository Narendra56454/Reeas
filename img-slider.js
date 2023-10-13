const sliderImages = document.querySelectorAll(".slide");
const arrowLeft = document.getElementById("prev_btn");
const arrowRight = document.getElementById("next_btn");
let current = 0;
let intervalId;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Initial slide
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
  intervalId = setInterval(slideRight, 3000); // Change slide every 3 seconds
}

// Show previous
function slideLeft() {
  reset();
  current = (current === 0) ? sliderImages.length - 1 : current - 1;
  sliderImages[current].style.display = "block";
  resetInterval();
}

// Show next
function slideRight() {
  reset();
  current = (current === sliderImages.length - 1) ? 0 : current + 1;
  sliderImages[current].style.display = "block";
  resetInterval();
}

// Reset the interval
function resetInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(slideRight, 2000);
}

// Left arrow click
function handleLeftArrowClick() {
  slideLeft();
}

// Right arrow click
function handleRightArrowClick() {
  slideRight();
}

// Add event listeners
arrowLeft.addEventListener("click", handleLeftArrowClick);
arrowRight.addEventListener("click", handleRightArrowClick);

startSlide();
