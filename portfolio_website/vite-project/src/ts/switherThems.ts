const switch_dark_theme = document.getElementById("switch-dark-theme") as HTMLInputElement;
const switch_icon = document.getElementById("theme-icon") as HTMLElement;
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
    color.setProperty("--pickr-color", "#d9d9d9ff");
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
    color.setProperty("--pickr-color", "#252525");
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
    color.setProperty("--pickr-color", "#d9d9d9ff");
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
    color.setProperty("--pickr-color", "#252525");
  }
}
