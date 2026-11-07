/* Elevate – minimal vanilla JS */

(function () {
  "use strict";

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close on link click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Sticky header border on scroll
  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Send the validated enquiry to WhatsApp with a prefilled message.
  // The visitor reviews and sends it inside WhatsApp; no data is silently submitted.
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const text = [
        "Hello, I would like to book a strategy call.",
        "",
        "Name: " + name,
        "Email: " + email,
        "Project details: " + message
      ].join("\\n");
      const whatsappUrl = "https://wa.me/923122581354?text=" + encodeURIComponent(text);
      const status = document.getElementById("formStatus");

      if (status) {
        status.textContent = "WhatsApp is opening with your message. Review it there and press Send to submit.";
      }

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Smooth reveal for sections (optional light animation)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".service-card, .step, .testimonial, .price-card, .stat").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Add visible class styles via JS (no extra CSS needed)
  const style = document.createElement("style");
  style.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);
})();
