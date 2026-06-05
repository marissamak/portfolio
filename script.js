(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  /* Header scroll state */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
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

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* Project cards fade-in */
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
  );

  document.querySelectorAll(".project-card, .case-study").forEach((card) => {
    cardObserver.observe(card);
  });

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
})();
