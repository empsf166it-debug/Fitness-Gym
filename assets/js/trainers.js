/* ==========================================================================
   FITFORGE - Trainers Filtering Engine & Booking Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const trainerFilters = document.querySelectorAll('.js-trainer-filter');
  const trainerCards = document.querySelectorAll('.js-trainer-item');

  trainerFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      trainerFilters.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const filterVal = e.target.getAttribute('data-filter') || 'all';

      trainerCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
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
    });
  });

  // Trainer booking trigger
  const bookBtns = document.querySelectorAll('.js-book-trainer');
  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const trainerName = e.target.getAttribute('data-trainer-name') || 'Trainer';
      alert(`Thank you for choosing ${trainerName}! Redirecting to consultation booking...`);
      window.location.href = `contact.html?trainer=${encodeURIComponent(trainerName)}`;
    });
  });
});
