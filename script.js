(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  const backToTop = document.getElementById("back-to-top");

  /* Header scroll state + back to top */
  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    if (backToTop) {
      const show = window.scrollY > 480;
      backToTop.classList.toggle("is-visible", show);
      backToTop.hidden = !show;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function closeMenu() {
    if (!menuToggle || !navMobile) return;
    menuToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      navMobile.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  const revealOptions = { threshold: 0.05, rootMargin: "0px 0px 5% 0px" };

  function revealElement(el) {
    el.classList.add("is-visible");
  }

  function revealStuckElements() {
    document
      .querySelectorAll(".reveal:not(.is-visible), .projects-grid .project-card:not(.is-visible), .creative-list .creative-project.project-card:not(.is-visible)")
      .forEach(revealElement);
  }

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealElement(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* Project cards fade-in (grid + brand list only) */
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealElement(entry.target);
        cardObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document
    .querySelectorAll(".projects-grid .project-card, .creative-list .creative-project.project-card")
    .forEach((card) => cardObserver.observe(card));

  /* Mobile Safari often misses IO at the document bottom */
  window.addEventListener("load", () => setTimeout(revealStuckElements, 2000));
  window.addEventListener(
    "scroll",
    () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        revealStuckElements();
      }
    },
    { passive: true }
  );

  /* Work section jump nav highlight */
  const workSections = document.querySelectorAll(".work-category[id]");
  const workJumpLinks = document.querySelectorAll(".work-jump-nav a[href^='#']");

  if (workSections.length && workJumpLinks.length) {
    const setActiveJump = (id) => {
      workJumpLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const workSpy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveJump(visible[0].target.id);
        }
      },
      { rootMargin: "-12% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] }
    );

    workSections.forEach((section) => workSpy.observe(section));

    workJumpLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const id = link.getAttribute("href")?.slice(1);
        if (id) setActiveJump(id);
      });
    });
  }

  const floatingConnect = document.getElementById("floating-connect");
  const connectImg = floatingConnect?.querySelector("img");

  if (connectImg) {
    connectImg.addEventListener("error", () => {
      floatingConnect.classList.add("is-fallback");
      floatingConnect.innerHTML = "Connect<br>with me";
    });
  }

  const form = document.querySelector(".connect-form");
  const formNote = document.getElementById("form-note");

  if (form && formNote) {
    form.addEventListener("submit", () => {
      formNote.hidden = false;
    });
  }

  /* Torch writing samples lightbox */
  const writingLightbox = document.getElementById("writing-lightbox");
  const writingCards = document.querySelectorAll(".writing-card[data-writing-images]");
  let writingLastFocus = null;

  if (writingLightbox && writingCards.length) {
    const writingTitle = writingLightbox.querySelector(".writing-lightbox__title");
    const writingIssue = writingLightbox.querySelector(".writing-lightbox__issue");
    const writingPages = writingLightbox.querySelector(".writing-lightbox__pages");

    const closeWritingLightbox = () => {
      writingLightbox.hidden = true;
      writingLightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      writingPages.innerHTML = "";
      if (writingLastFocus) {
        writingLastFocus.focus();
        writingLastFocus = null;
      }
    };

    const openWritingLightbox = (card) => {
      const title = card.getAttribute("data-writing-title") || "Writing sample";
      const issue = card.getAttribute("data-writing-issue") || "";
      let images = [];

      try {
        images = JSON.parse(card.getAttribute("data-writing-images") || "[]");
      } catch {
        images = [];
      }

      writingTitle.textContent = title;
      writingIssue.textContent = issue;
      writingPages.innerHTML = "";

      images.forEach((src, index) => {
        const img = document.createElement("img");
        img.className = "writing-lightbox__page";
        img.src = src;
        img.alt = images.length > 1 ? `${title} (page ${index + 1})` : title;
        img.loading = "eager";
        img.decoding = "async";
        writingPages.appendChild(img);
      });

      writingLastFocus = document.activeElement;
      writingLightbox.hidden = false;
      writingLightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      writingLightbox.querySelector(".writing-lightbox__close")?.focus();
    };

    writingCards.forEach((card) => {
      card.addEventListener("click", () => openWritingLightbox(card));
    });

    writingLightbox.querySelectorAll("[data-writing-close]").forEach((el) => {
      el.addEventListener("click", closeWritingLightbox);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !writingLightbox.hidden) {
        closeWritingLightbox();
      }
    });
  }
})();
