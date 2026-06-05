(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  const workTabs = document.querySelectorAll(".work-tab");
  const workSubtabs = document.querySelectorAll(".work-subtab");
  const workPanels = document.querySelectorAll(".work-panel");
  const workSubtabsWrap = document.querySelector(".work-subtabs");
  const projectCards = document.querySelectorAll(".project-card");

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

  /* Work tabs: creative vs professional */
  function setWorkTab(tabId) {
    workTabs.forEach((tab) => {
      const active = tab.dataset.tab === tabId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    workPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === tabId);
    });

    if (workSubtabsWrap) {
      workSubtabsWrap.classList.toggle("is-visible", tabId === "professional");
    }

    if (tabId === "professional") {
      filterProfessional("all");
    }
  }

  workTabs.forEach((tab) => {
    tab.addEventListener("click", () => setWorkTab(tab.dataset.tab));
  });

  /* Professional sub-filters */
  function filterProfessional(filter) {
    workSubtabs.forEach((sub) => {
      sub.classList.toggle("is-active", sub.dataset.filter === filter);
    });

    const professionalItems = document.querySelectorAll(
      "[data-work='professional'][data-category]"
    );

    professionalItems.forEach((item) => {
      const category = item.dataset.category || "";
      const show = filter === "all" || category === filter;
      item.dataset.hidden = show ? "false" : "true";
    });

    observeProjects();
  }

  workSubtabs.forEach((sub) => {
    sub.addEventListener("click", () => filterProfessional(sub.dataset.filter));
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
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

  revealEls.forEach((el) => revealObserver.observe(el));

  /* Project cards stagger */
  let projectObserver;

  function observeProjects() {
    if (projectObserver) projectObserver.disconnect();

    projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.hidden !== "true") {
            entry.target.classList.add("is-visible");
            projectObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    projectCards.forEach((card) => {
      if (card.dataset.hidden !== "true") {
        card.classList.remove("is-visible");
        projectObserver.observe(card);
      }
    });
  }

  observeProjects();
  setWorkTab("creative");

  /* Floating button: show text fallback until image is uploaded */
  const floatingConnect = document.getElementById("floating-connect");
  const connectImg = floatingConnect?.querySelector("img");
  if (connectImg && floatingConnect) {
    connectImg.addEventListener("error", () => {
      connectImg.remove();
      floatingConnect.classList.add("is-fallback");
      floatingConnect.textContent = "Connect with me!";
    });
    if (connectImg.complete && connectImg.naturalWidth === 0) {
      connectImg.dispatchEvent(new Event("error"));
    }
  }

  /* FormSubmit: show note before first send */
  const connectForm = document.querySelector(".connect-form");
  const formNote = document.getElementById("form-note");
  if (connectForm && formNote) {
    connectForm.addEventListener("submit", () => {
      formNote.hidden = false;
    });
  }
})();
