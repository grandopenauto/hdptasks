(() => {
  const CONFIG = {
    enabled: false,
    checkoutEndpoint: "",
    intakeBase: "/intake/",
    successPath: "/order-success/",
    cancelPath: "/order-cancelled/"
  };

  async function startCheckout(taskSlug, button) {
    if (!CONFIG.enabled || !CONFIG.checkoutEndpoint) {
      window.location.href = `/intake/${taskSlug}/?preview=1`;
      return;
    }

    const original = button.textContent;
    button.disabled = true;
    button.textContent = "Opening secure checkout…";

    try {
      const response = await fetch(CONFIG.checkoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_slug: taskSlug })
      });
      if (!response.ok) throw new Error("Checkout request failed");
      const payload = await response.json();
      if (!payload.checkout_url) throw new Error("Missing checkout URL");
      window.location.href = payload.checkout_url;
    } catch (error) {
      console.error(error);
      button.disabled = false;
      button.textContent = original;
      alert("Checkout is not available yet. Please try again later.");
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-checkout]");
    if (!button) return;
    event.preventDefault();
    startCheckout(button.dataset.taskCheckout, button);
  });
})();
