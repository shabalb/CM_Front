const sections = document.querySelectorAll<HTMLElement>("section");
const navLinks = document.querySelectorAll<HTMLElement>(".container-point");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 2) {
      const id = section.getAttribute("id");
      if (id != null) {
        current = id;
      }
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
