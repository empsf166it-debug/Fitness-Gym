/* ==========================================================================
   FITFORGE - Contact Form Client-Side Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('fitforgeContactForm');
  const alertContainer = document.getElementById('contactAlertContainer');

  // Pre-fill trainer if coming from trainers page
  const urlParams = new URLSearchParams(window.location.search);
  const selectedTrainer = urlParams.get('trainer');
  if (selectedTrainer) {
    const messageInput = document.getElementById('formMessage');
    if (messageInput) {
      messageInput.value = `Hello! I would like to book a training consultation with ${decodeURIComponent(selectedTrainer)}.`;
    }
  }

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const goal = document.getElementById('formGoal').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !goal || !message) {
      showAlert('danger', 'Please complete all required fields before submitting.');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('warning', 'Please enter a valid email address.');
      return;
    }

    // Submit Success Simulation
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Sending...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();

      showAlert(
        'success',
        '<i class="fas fa-check-circle me-2"></i> Thanks! Our FitForge team will contact you shortly to confirm your consultation.'
      );
    }, 1200);
  });

  function showAlert(type, msg) {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show bg-surface-2 border-0 text-main shadow-sm" role="alert">
        ${msg}
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
