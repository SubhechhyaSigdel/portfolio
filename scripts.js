/* =========================================
   THEME TOGGLE
========================================= */

const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
} else {
  document.body.setAttribute("data-theme", "light");
}

/* =========================================
   UPDATE THEME ICON
========================================= */

function updateThemeIcon() {
  if (!themeToggle) return;

  const isDark = document.body.getAttribute("data-theme") === "dark";

  themeToggle.innerHTML = isDark
    ? `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    `
    : `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3
          7 7 0 0 0 21 12.79z">
        </path>
      </svg>
    `;
}

/* Set correct icon when page loads */
updateThemeIcon();

/* =========================================
   TOGGLE LIGHT / DARK
========================================= */

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    updateThemeIcon();
  });
}

/* =========================================
   SOCIAL LINKS
========================================= */

const socialLinks = document.querySelectorAll(".social-sidebar a");

socialLinks.forEach((link) => {
  link.addEventListener("click", () => {
    link.blur();
  });
});

/* =========================================
   DYNAMIC COPYRIGHT YEAR
========================================= */

document.getElementById("year").textContent = new Date().getFullYear();