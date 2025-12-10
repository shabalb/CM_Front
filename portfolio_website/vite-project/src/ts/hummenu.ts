const navExpand = document.querySelectorAll<HTMLElement>(".nav-expand");

navExpand.forEach((item) => {
  
  const open = item.querySelector<HTMLElement>(".nav-link");
  if (open != null){
    open.addEventListener("click", () => item.classList.add("active"));
  }
  const back = item.querySelector(".nav-back-link");
  if (back != null){
    back.addEventListener("click", () => item.classList.remove("active"));
  }
});

const  ham = document.getElementById("ham") as HTMLElement;
ham.addEventListener("click", function () {
  document.body.classList.toggle("nav-is-toggled");
});