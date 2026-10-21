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

  // Simple form handler (demo only – shows success message)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = "Message sent ✓";
      btn.disabled = true;
      btn.style.background = "#34d399";

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
      }, 2800);
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
