/* ==========================================================================
   FITFORGE - Membership Pricing Toggle Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const billingToggle = document.getElementById('billingToggle');
  const priceStarter = document.getElementById('priceStarter');
  const pricePerformance = document.getElementById('pricePerformance');
  const priceElite = document.getElementById('priceElite');
  const billingPeriodTexts = document.querySelectorAll('.js-billing-period');

  if (!billingToggle) return;

  const prices = {
    monthly: { starter: 39, performance: 69, elite: 119 },
    yearly: { starter: 31, performance: 55, elite: 95 }
  };

  billingToggle.addEventListener('change', () => {
    const isYearly = billingToggle.checked;
    const mode = isYearly ? 'yearly' : 'monthly';

    if (priceStarter) priceStarter.textContent = `$${prices[mode].starter}`;
    if (pricePerformance) pricePerformance.textContent = `$${prices[mode].performance}`;
    if (priceElite) priceElite.textContent = `$${prices[mode].elite}`;

    billingPeriodTexts.forEach(el => {
      el.textContent = isYearly ? '/ month (Billed Annually)' : '/ month';
    });
  });
});
