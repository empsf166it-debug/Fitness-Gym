/* ==========================================================================
   FITFORGE - Programs Filtering Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const categoryFilters = document.querySelectorAll('.js-program-category-filter');
  const levelFilters = document.querySelectorAll('.js-program-level-filter');
  const programCards = document.querySelectorAll('.js-program-item');

  let currentCategory = 'all';
  let currentLevel = 'all';

  categoryFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryFilters.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-filter') || 'all';
      applyProgramFilters();
    });
  });

  levelFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      levelFilters.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentLevel = e.target.getAttribute('data-level') || 'all';
      applyProgramFilters();
    });
  });

  function applyProgramFilters() {
    programCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardLevel = card.getAttribute('data-level');

      const matchCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchLevel = currentLevel === 'all' || cardLevel === currentLevel;

      if (matchCategory && matchLevel) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
});
