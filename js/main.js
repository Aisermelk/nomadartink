 /* =========================================================
    NOMAD ART INK — main.js
    Interface / animações do site.

    Toda configuração do projeto continua sendo responsabilidade
    do js/v8-loader.js.
    ========================================================= */

"use strict";


/* =========================================================
   MENU MOBILE
   ========================================================= */

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    toggle.classList.toggle(
      "active",
      isOpen
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );
  });


  nav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      toggle.classList.remove("active");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    });

  });
}


/* =========================================================
   HEADER AO ROLAR
   ========================================================= */

function setupHeaderScroll() {

  const header = document.getElementById(
    "site-header"
  );

  if (!header) return;


  const updateHeader = () => {

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );
}


/* =========================================================
   ANIMAÇÕES DE ENTRADA
   ========================================================= */

function setupRevealAnimations() {

  const elements = document.querySelectorAll(
    ".reveal"
  );

  if (!elements.length) return;


  /*
   * Se o navegador não suportar IntersectionObserver,
   * mostramos tudo normalmente.
   */

  if (!("IntersectionObserver" in window)) {

    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }


  const observer = new IntersectionObserver(
    (entries, obs) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add(
          "visible"
        );

        obs.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );


  elements.forEach((element) => {

    observer.observe(element);

  });
}


/* =========================================================
   ANIMAÇÃO SUAVE DAS IMAGENS
   ========================================================= */

function setupImageReveal() {

  const images = document.querySelectorAll(
    ".gallery-grid img, .about-image img"
  );

  if (!images.length) return;


  images.forEach((image) => {

    image.addEventListener(
      "load",
      () => {

        image.classList.add(
          "image-loaded"
        );

      },
      { once: true }
    );

  });
}


/* =========================================================
   ANO AUTOMÁTICO
   ========================================================= */

function setupCurrentYear() {

  const el = document.getElementById(
    "current-year"
  );

  if (el) {

    el.textContent =
      new Date().getFullYear();

  }
}


/* =========================================================
   WRAPPERS OPCIONAIS DO V8
   ========================================================= */

/*
 * Esconde automaticamente wrappers como endereço
 * quando o campo data-v8 correspondente estiver vazio.
 *
 * Isso acontece depois que o V8 Loader terminar
 * de carregar a configuração do projeto.
 */

function setupOptionalWrappers() {

  document.addEventListener(
    "v8loader:done",
    () => {

      document
        .querySelectorAll("[data-wrap-if]")
        .forEach((wrapper) => {

          const inner =
            wrapper.querySelector(
              "[data-v8]"
            );

          const isEmpty =
            !inner ||
            inner.style.display === "none" ||
            inner.hidden ||
            !inner.textContent.trim();

          wrapper.style.display =
            isEmpty ? "none" : "";

        });

    },
    { once: true }
  );
}


/* =========================================================
   FECHAMENTO DO MENU AO REDIMENSIONAR
   ========================================================= */

function setupResizeHandler() {

  const toggle =
    document.getElementById(
      "menu-toggle"
    );

  const nav =
    document.getElementById(
      "main-nav"
    );

  if (!toggle || !nav) return;


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 850) {

        nav.classList.remove("open");

        toggle.classList.remove(
          "active"
        );

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }

    },
    { passive: true }
  );
}


/* =========================================================
   ESC PARA FECHAR MENU
   ========================================================= */

function setupEscapeMenu() {

  const toggle =
    document.getElementById(
      "menu-toggle"
    );

  const nav =
    document.getElementById(
      "main-nav"
    );

  if (!toggle || !nav) return;


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape" ||
        !nav.classList.contains("open")
      ) {
        return;
      }


      nav.classList.remove("open");

      toggle.classList.remove(
        "active"
      );

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

      toggle.focus();

    }
  );
}


/* =========================================================
   SMOOTH UX DOS LINKS INTERNOS
   ========================================================= */

function setupInternalLinks() {

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;


          event.preventDefault();


          const header =
            document.getElementById(
              "site-header"
            );

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });
}


/* =========================================================
   V8 LOADER — EVENTOS
   ========================================================= */

function setupV8Events() {

  document.addEventListener(
    "v8loader:done",
    (event) => {

      /*
       * O Loader já terminou de preencher:
       *
       * WhatsApp
       * Redes sociais
       * Galeria
       * SEO
       * Formulário
       * Avaliações
       * Conteúdo
       *
       * Aqui apenas garantimos que elementos
       * visuais sejam reavaliados.
       */

      setupImageReveal();

      /*
       * A galeria é criada dinamicamente pelo V8.
       * Por isso, adicionamos a classe visual quando
       * as imagens forem carregadas.
       */

      const gallery =
        document.querySelector(
          "[data-v8-gallery]"
        );

      if (gallery) {

        gallery
          .querySelectorAll("img")
          .forEach((image) => {

            image.addEventListener(
              "load",
              () => {

                image.classList.add(
                  "image-loaded"
                );

              },
              { once: true }
            );

          });

      }

    }
  );

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupMobileMenu();

    setupHeaderScroll();

    setupRevealAnimations();

    setupImageReveal();

    setupCurrentYear();

    setupOptionalWrappers();

    setupResizeHandler();

    setupEscapeMenu();

    setupInternalLinks();

    setupV8Events();

  }
);
