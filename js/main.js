/* ScaleUp Gym — lichte interacties. Geen dependencies. */
(function () {
  "use strict";

  /* --- Nav: achtergrond zodra je scrollt --- */
  var nav = document.querySelector(".site-nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobiel menu --- */
  var toggle = document.querySelector(".site-nav__toggle");
  var menu = document.getElementById("mobiel-menu");
  if (toggle && menu) {
    function sluit() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menu openen");
    }
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        sluit();
      } else {
        menu.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Menu sluiten");
      }
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", sluit);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        sluit();
        toggle.focus();
      }
    });
  }

  /* --- Reveal bij binnenkomst (subtiel) --- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-zichtbaar"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-zichtbaar");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* --- Jaartal in footer --- */
  var jaar = document.getElementById("jaar");
  if (jaar) jaar.textContent = String(new Date().getFullYear());
})();
