document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e: MouseEvent) {
      e.preventDefault();

      const href = this.getAttribute("href");

      if (href == null) {
        return;
      }
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      document.documentElement.style.scrollPaddingTop = "60px";
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      document.body.classList.remove("nav-is-toggled");
    });
  });
});
