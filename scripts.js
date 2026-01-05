// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  observeSections();
  setupScrollAnimations();
  addInteractions();
  enhanceAcccessibility();
  setupParallax();
});

// ===== NAVIGATION =====
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.querySelector(".navbar");

  // Smooth scroll navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Close mobile menu
        if (menuToggle) {
          menuToggle.checked = false;
        }

        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    activateNavLink();
  });
}

// ===== ACTIVE NAV LINK TRACKING =====
function activateNavLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function observeSections() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(card);
  });

  // Observe feature cards
  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * 0.1
    }s`;
    observer.observe(card);
  });

  // Observe skill items
  document.querySelectorAll(".skill-item").forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
      (index % 4) * 0.1
    }s`;
    observer.observe(item);
  });

  // Observe contact buttons
  document.querySelectorAll(".contact-btn").forEach((btn, index) => {
    btn.style.opacity = "0";
    btn.style.transform = "translateY(20px)";
    btn.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * 0.1
    }s`;
    observer.observe(btn);
  });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
  // Parallax effect for hero
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// ===== INTERACTIONS =====
function addInteractions() {
  // Ripple effect on buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Logo click to scroll to top
  document.querySelector(".logo")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== ENHANCED ACCESSIBILITY =====
function enhanceAcccessibility() {
  // Add keyboard navigation support
  document
    .querySelectorAll(".nav-link, .btn, .contact-btn, .social-link")
    .forEach((element) => {
      element.addEventListener("keypress", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          this.click();
        }
      });
    });

  // Add skip to content link functionality
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("#hero").focus();
    });
  }

  // Improve focus visibility
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-nav");
  });
}

// ===== ADVANCED PARALLAX =====
function setupParallax() {
  const heroContent = document.querySelector(".hero-content");
  const imageFrame = document.querySelector(".image-frame");

  if (!heroContent || !imageFrame) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector(".hero");
    const heroTop = heroSection.offsetTop;
    const scrollPercent = Math.min(
      (scrolled - heroTop) / window.innerHeight,
      1
    );

    // Parallax effect - move content up as you scroll
    if (scrollPercent >= -0.5 && scrollPercent <= 1) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;

      // Subtle rotation effect
      const rotateValue = scrollPercent * 5;
      imageFrame.style.transform = `perspective(1000px) rotateY(${rotateValue}deg) translateY(${
        scrolled * 0.3
      }px)`;
    }
  });
}

// ===== LAZY LOAD IMAGES =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ===== ENHANCED MOUSE TRACKING FOR CARDS =====
function setupMouseTracking() {
  const cards = document.querySelectorAll(".project-card, .feature-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", x + "%");
      card.style.setProperty("--mouse-y", y + "%");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    });
  });
}

// ===== SCROLL PROGRESS INDICATOR =====
function setupScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 60px;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #ec4899);
    width: 0%;
    z-index: 999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// Initialize on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setupMouseTracking();
    setupScrollProgress();
  });
} else {
  setupMouseTracking();
  setupScrollProgress();
}
