(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  const workTabs = document.querySelectorAll(".work-tab");
  const workSubtabs = document.querySelectorAll(".work-subtab");
  const workPanels = document.querySelectorAll(".work-panel");
  const workSubtabsWrap = document.querySelector(".work-subtabs");
  const professionalPanel = document.querySelector('[data-panel="professional"]');
  const creativePanel = document.querySelector('[data-panel="creative"]');
  const workSection = document.getElementById("work");

  let activeWorkTab = "creative";
  let workSectionVisible = false;
  let loadQueue = Promise.resolve();

  function loadImage(img) {
    if (!img || img.src || !img.dataset.src) return Promise.resolve();
    return new Promise((resolve) => {
      const onDone = () => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
        resolve();
      };
      img.addEventListener("load", onDone);
      img.addEventListener("error", onDone);
      img.src = img.dataset.src;
    });
  }

  function enqueueImage(img) {
    loadQueue = loadQueue.then(() => loadImage(img));
  }

  function observeLazyImages(root, enabled) {
    if (!root || !("IntersectionObserver" in window)) return null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !enabled()) return;
          enqueueImage(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "40px 0px", threshold: 0.08 }
    );

    root.querySelectorAll("img[data-src]:not([src])").forEach((img) => {
      observer.observe(img);
    });

    return observer;
  }

  let creativeObserver = null;
  let professionalObserver = null;

  function refreshCreativeObserver() {
    if (creativeObserver) creativeObserver.disconnect();
    if (!workSectionVisible || activeWorkTab !== "creative") return;
    creativeObserver = observeLazyImages(creativePanel, () => workSectionVisible && activeWorkTab === "creative");
  }

  function refreshProfessionalObserver() {
    if (professionalObserver) professionalObserver.disconnect();
    if (!workSectionVisible || activeWorkTab !== "professional") return;
    professionalObserver = observeLazyImages(
      professionalPanel,
      () => workSectionVisible && activeWorkTab === "professional"
    );
  }

  if (workSection && "IntersectionObserver" in window) {
    const workObserver = new IntersectionObserver(
      (entries) => {
        workSectionVisible = entries[0].isIntersecting;
        if (!workSectionVisible) return;
        refreshCreativeObserver();
        refreshProfessionalObserver();
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" }
    );
    workObserver.observe(workSection);
  } else {
    workSectionVisible = true;
    refreshCreativeObserver();
  }

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
    activeWorkTab = tabId;

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

    refreshCreativeObserver();
    refreshProfessionalObserver();

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
    refreshProfessionalObserver();
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

  /* Project cards fade-in */
  function observeProjects() {
    const visible = document.querySelectorAll(
      '.project-card:not([data-hidden="true"])'
    );
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

    visible.forEach((card) => {
      if (!card.classList.contains("is-visible")) {
        cardObserver.observe(card);
      }
    });
  }

  observeProjects();

  /* Floating connect button fallback */
  const floatingConnect = document.getElementById("floating-connect");
  const connectImg = floatingConnect?.querySelector("img");

  if (connectImg) {
    connectImg.addEventListener("error", () => {
      floatingConnect.classList.add("is-fallback");
      floatingConnect.innerHTML = "Connect<br>with me";
    });
  }

  /* Form note visibility */
  const form = document.querySelector(".connect-form");
  const formNote = document.getElementById("form-note");

  if (form && formNote) {
    form.addEventListener("submit", () => {
      formNote.hidden = false;
    });
  }

  setWorkTab("creative");
})();
