const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function activateNavLink() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}
function smoothScrollWithOffset(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  const yOffset = -60; // height of your fixed nav
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}


window.addEventListener("scroll", activateNavLink);
window.addEventListener("load", activateNavLink);

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("menu-toggle").checked = false;
  });
});
