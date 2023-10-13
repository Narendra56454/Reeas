(async function() {
  try {
    const response = await fetch('header.html');
    const data = await response.text();
    document.getElementById('header-placeholder').innerHTML = data;

    const brandNavbar = document.getElementById('brands-navbar');
    const brandOption = document.getElementById('brand-option');
    const categoriesNavbar = document.getElementById('categories-navbar');
    const categoriesOption = document.getElementById('categories-option');

    brandNavbar.addEventListener('click', toggleBrandOption);
    categoriesNavbar.addEventListener('click', toggleCategoriesOption);

    function toggleBrandOption() {
      brandOption.style.display = 'block';
      categoriesOption.style.display = 'none';
    }

    function toggleCategoriesOption() {
      brandOption.style.display = 'none';
      categoriesOption.style.display = 'block';
    }

    const trueBrandOptions = Array.from(document.querySelectorAll('.true-brand-option'));
    const trueCategoriesOptions = Array.from(document.querySelectorAll('.true-categories-option'));

    document.addEventListener('click', handleOptionClick);

    function handleOptionClick(event) {
      const option = event.target;
      if (trueBrandOptions.includes(option)) {
        const brand = option.textContent;
        window.location.href = `brands.html?brand=${encodeURIComponent(brand)}`;
      } else if (trueCategoriesOptions.includes(option)) {
        const categories = option.textContent;
        window.location.href = `categories.html?categories=${encodeURIComponent(categories)}`;
      }
    }
  } catch (error) {
    console.error('Error retrieving header content:', error);
  }
})();
