document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
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
const navExpand = [].slice.call(document.querySelectorAll(".nav-expand"));
const backLink = `<li class="nav-item">
  <a class="nav-link nav-back-link" href="javascript:;">
    Back
  </a>
</li>`;

navExpand.forEach((item) => {
  item
    .querySelector(".nav-expand-content")
    ?.insertAdjacentHTML("afterbegin", backLink);
  item
    .querySelector(".nav-link")
    .addEventListener("click", () => item.classList.add("active"));
  item
    .querySelector(".nav-back-link")
    ?.addEventListener("click", () => item.classList.remove("active"));
});

// not-so-important stuff starts here
const ham = document.getElementById("ham");
ham.addEventListener("click", function () {
  document.body.classList.toggle("nav-is-toggled");
});

const form = document.getElementsByTagName("form")[0];
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error-subtext");
const namefeedback = document.getElementById("name");
const nameError = document.querySelector("#name + span.error-subtext");
const sendMessage = document.querySelector("span.send-subtext");

email.addEventListener("input", function (event) {
  email.setCustomValidity("");
  namefeedback.setCustomValidity("");
});

form.addEventListener("submit", function (event) {
  let isValid = true;
  event.preventDefault();
  if (!email.validity.valid) {
    showError();
    email.setCustomValidity("");
    isValid = false;
  }

  if (namefeedback.validity.valueMissing) {
    nameError.textContent = "Поле должно быть заполнено";
    namefeedback.setCustomValidity("");
    nameError.className = "error-subtext active";
    isValid = false;
  }

  if (isValid) {
    sendMessage.textContent = "Сообщение отправлено";
    sendMessage.className = "send-subtext active";
  }
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Поле должно быть заполнено";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Некорректный email-адрес";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Слишком короткий email-адрес`;
  }
  emailError.className = "error-subtext active";
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".container-point");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  document.getElementById("time").textContent = formatted;
  document.getElementById("time").datetime = formatted;
}

updateClock();
setInterval(updateClock, 1000);

const switch_dark_theme = document.getElementById("switch-dark-theme");
const switch_icon = document.getElementById("theme-icon");
let flag = 0;

saved_theme();

switch_dark_theme.addEventListener("click", change_theme);

function change_theme() {
  const color = document.documentElement.style;
  const savedTheme = localStorage.getItem("theme");

  if (flag == 0) {
    color.setProperty("--main-background-color", "white");
    color.setProperty("--content-background", "#d9d9d9ff");
    color.setProperty("--content-text", "black");
    color.setProperty("--topbar-color", "#9f9f9f");
    color.setProperty("--cswither-padding-right", "20px");
    color.setProperty("--cswither-padding-left", "0px");
    switch_icon.textContent = "mode_night";
    flag = 1;
    localStorage.setItem("theme", "light");
  } else if (flag == 1) {
    color.setProperty("--main-background-color", "black");
    color.setProperty("--topbar-color", "black");
    color.setProperty("--content-background", "#252525");
    color.setProperty("--content-text", "#ffffffff");
    switch_icon.textContent = "light_mode";
    color.setProperty("--cswither-padding-right", "0px");
    color.setProperty("--cswither-padding-left", "26px");
    flag = 0;
    localStorage.setItem("theme", "night");
  }
}

function saved_theme() {
  const color = document.documentElement.style;
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    savedTheme = prefersDark ? "night" : "light";
  }

  if (savedTheme === "light") {
    flag = 1;
    color.setProperty("--main-background-color", "white");
    color.setProperty("--content-background", "#d9d9d9ff");
    color.setProperty("--content-text", "black");
    color.setProperty("--topbar-color", "#9f9f9f");
    color.setProperty("--cswither-padding-right", "20px");
    color.setProperty("--cswither-padding-left", "0px");
    switch_icon.textContent = "mode_night";
    switch_dark_theme.checked = false;
  } else if (savedTheme === "night") {
    flag = 0;
    color.setProperty("--main-background-color", "black");
    color.setProperty("--topbar-color", "black");
    color.setProperty("--content-background", "#252525");
    color.setProperty("--content-text", "#ffffffff");
    switch_icon.textContent = "light_mode";
    color.setProperty("--cswither-padding-right", "0px");
    color.setProperty("--cswither-padding-left", "26px");
    switch_dark_theme.checked = true;
  }
}
