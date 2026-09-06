/* =========================================================
   NOMAD ART INK — main.js
   Interface do site. Toda a config (contato, redes, galeria,
   avaliações etc.) é responsabilidade do js/v8-loader.js.
   ========================================================= */

"use strict";

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupCurrentYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

// Esconde wrappers de itens de contato opcionais (ex: endereço) quando o
// campo interno [data-v8] terminou vazio — evita rótulo sem valor na tela.
function setupOptionalWrappers() {
  document.addEventListener("v8loader:done", () => {
    document.querySelectorAll("[data-wrap-if]").forEach((wrapper) => {
      const inner = wrapper.querySelector("[data-v8]");
      const isEmpty = !inner || inner.style.display === "none" || inner.hidden;
      wrapper.style.display = isEmpty ? "none" : "";
    });
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupCurrentYear();
  setupOptionalWrappers();
});
