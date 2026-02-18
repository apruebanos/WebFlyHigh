// app.js
document.addEventListener("DOMContentLoaded", () => {
  // Splash (1-1.5s)
  const splash = document.getElementById("splash");
  if (splash) setTimeout(() => splash.classList.add("hide"), 1200);

  // Header shrink on scroll
  const header = document.querySelector(".header");
  const onScroll = () => header?.classList.toggle("shrink", window.scrollY > 18);
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile menu toggle
  const toggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });
  }

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));

  // Empresa tabs (si existen)
  const empresaNav = document.querySelector("[data-empresa-nav]");
  const panels = document.querySelectorAll("[data-empresa-panel]");
  if (empresaNav && panels.length) {
    const buttons = empresaNav.querySelectorAll("button[data-target]");
    const showPanel = (id) => {
      panels.forEach(p => p.style.display = (p.id === id ? "block" : "none"));
      buttons.forEach(b => b.classList.toggle("active", b.dataset.target === id));
      // trigger reveal for visible panel elements
      document.querySelectorAll(`#${id} .reveal`).forEach(el => el.classList.add("show"));
    };

    buttons.forEach(btn => {
      btn.addEventListener("click", () => showPanel(btn.dataset.target));
    });

    // Default panel
    const defaultId = buttons[0]?.dataset.target;
    if (defaultId) showPanel(defaultId);
  }
});
