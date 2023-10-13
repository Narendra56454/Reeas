const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");

function redirectToSearchResults(event) {
  event.preventDefault(); // prevent default form submission behavior

  const searchQuery = searchInput.value.trim(); // get the search query input value and trim whitespace

  if (searchQuery) { // proceed only if search query is not empty
    const encodedSearchQuery = encodeURIComponent(searchQuery); // encode search query for URL

    // redirect to search results page with search query as query parameter
    window.location.href = `/search-results.html?searchQuery=${encodedSearchQuery}`;
  }
}

searchForm.addEventListener("submit", redirectToSearchResults);
searchIcon.addEventListener("click", redirectToSearchResults);
