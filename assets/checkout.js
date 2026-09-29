(() => {
  const CONFIG = {
    enabled: false,
    paymentLinks: {
      "competitor-research": "https://buy.stripe.com/28E9AU3E20gm4ficpYcs80b"
    }
  };

  function startCheckout(taskSlug, button) {
    const url = CONFIG.paymentLinks[taskSlug];
    if (!CONFIG.enabled || !url) {
      const status = document.querySelector("[data-checkout-status]");
      if (status) status.textContent = "Secure checkout is in final activation. The $49 task is configured, but ordering remains gated until payment verification is fully online.";
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
