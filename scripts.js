document.addEventListener("DOMContentLoaded", () => {
  const scrollProgress = createScrollProgress();
  initNavigation();
  observeReveal();
  setupScrollEffects(scrollProgress);
  addInteractions();
});

function initNavigation() {
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

        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function observeReveal() {
  const targets = document.querySelectorAll(
    ".hero-content, .section-header, .project-card, .contact-card",
  );

  if (!("IntersectionObserver" in window)) {
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
      threshold: 0.14,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  targets.forEach((target, index) => {
    target.classList.add("scroll-reveal");
    target.style.transitionDelay = `${Math.min(index * 70, 220)}ms`;
    observer.observe(target);
  });
}

function setupScrollEffects(scrollProgress) {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  let ticking = false;

  const updateState = () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollY > 40);
    }

    let currentSection = "hero";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.getAttribute("id") || currentSection;
      }
    });

    if (
      scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 80
    ) {
      currentSection = "contact";
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`,
      );
    });

    if (scrollProgress) {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
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
    height: 2px;
    background: linear-gradient(90deg, #8dd3f7, #5aa9d6);
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
