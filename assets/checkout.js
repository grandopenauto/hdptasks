(() => {
  const CONFIG = {
    enabled: true,
    paymentLinks: {
      "competitor-research": "https://buy.stripe.com/28E9AU3E20gm4ficpYcs80b"
    }
  };

  function startCheckout(taskSlug, button) {
    const url = CONFIG.paymentLinks[taskSlug];
    if (!CONFIG.enabled || !url) {
      const status = document.querySelector("[data-checkout-status]");
      if (status) status.textContent = "Secure checkout is temporarily unavailable. Please try again shortly.";
      return;
    }
    button.setAttribute("aria-disabled", "true");
    button.textContent = "Opening secure Stripe checkout…";
    window.location.href = url;
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-checkout]");
    if (!button) return;
    event.preventDefault();
    startCheckout(button.dataset.taskCheckout, button);
  });
})();
