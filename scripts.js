document.addEventListener("DOMContentLoaded", () => {
  const scrollProgress = createScrollProgress();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  initNavigation(prefersReducedMotion);
  observeReveal(prefersReducedMotion);
  observeActiveSection();
  setupScrollEffects(scrollProgress, prefersReducedMotion);
  addInteractions();
});

function setActiveNavLink(sectionId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${sectionId}`,
    );
  });
}

function initNavigation(prefersReducedMotion) {
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const logo = document.querySelector(".logo");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      event.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        if (menuToggle) {
          menuToggle.checked = false;
        }

        targetSection.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  });

  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }
}

function observeReveal(prefersReducedMotion) {
  const targets = document.querySelectorAll(
    ".hero-content, .section-header, .project-card, .contact-card",
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -48px 0px",
    },
  );

  targets.forEach((target, index) => {
    target.classList.add("scroll-reveal");
    target.style.transitionDelay = `${Math.min(index * 40, 140)}ms`;
    observer.observe(target);
  });
}

function setupScrollEffects(scrollProgress, prefersReducedMotion) {
  const navbar = document.querySelector(".navbar");
  let ticking = false;

  const updateState = () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollY > 40);
    }

    if (
      scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 80
    ) {
      setActiveNavLink("contact");
    }

    if (scrollProgress) {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      scrollProgress.style.opacity = prefersReducedMotion ? "0" : "1";
      scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateState);
        ticking = true;
      }
    },
    { passive: true },
  );

  updateState();
}

function observeActiveSection() {
  const sections = document.querySelectorAll("section");

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (!visibleEntries.length) {
        return;
      }

      visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const sectionId = visibleEntries[0].target.getAttribute("id");

      if (sectionId) {
        setActiveNavLink(sectionId);
      }
    },
    {
      rootMargin: "-42% 0px -42% 0px",
      threshold: [0.15, 0.3, 0.5],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function createScrollProgress() {
  if (document.querySelector(".scroll-progress")) {
    return document.querySelector(".scroll-progress");
  }

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(141, 211, 247, 0.55), rgba(90, 169, 214, 0.8));
    transform: scaleX(0);
    transform-origin: left center;
    z-index: 999;
    pointer-events: none;
    will-change: transform;
    transition: transform 0.12s linear;
  `;
  document.body.appendChild(progressBar);
  return progressBar;
}

function addInteractions() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add("ripple");

      this.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 600);
    });
  });
}
