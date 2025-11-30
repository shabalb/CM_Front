
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            document.documentElement.style.scrollPaddingTop = '60px';
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }
            document.body.classList.remove('nav-is-toggled');
        });
    });

});
const navExpand = [].slice.call(document.querySelectorAll('.nav-expand'))
const backLink = `<li class="nav-item">
  <a class="nav-link nav-back-link" href="javascript:;">
    Back
  </a>
</li>`

navExpand.forEach(item => {
    item.querySelector('.nav-expand-content')?.insertAdjacentHTML('afterbegin', backLink)
    item.querySelector('.nav-link').addEventListener('click', () => item.classList.add('active'))
    item.querySelector('.nav-back-link')?.addEventListener('click', () => item.classList.remove('active'))
})

// ---------------------------------------
// not-so-important stuff starts here
const ham = document.getElementById('ham')
ham.addEventListener('click', function () {
    document.body.classList.toggle('nav-is-toggled')
})

const form = document.getElementsByTagName("form")[0];

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const namefeedback = document.getElementById("name");
const nameError = document.querySelector("#name + span.error");

const sendMessage = document.querySelector("span.send");

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
        nameError.className = "error active";
        isValid = false;
    }

    if (isValid) {

        sendMessage.textContent = "Сообщение отправлено";
        sendMessage.className = "send active";
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

    emailError.className = "error active";
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.cv__container_point');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 2) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  document.getElementById('time').textContent = formatted;
  document.getElementById('time').datetime = formatted;
}

updateClock();               
setInterval(updateClock, 1000); 

// swither  switch-dark-theme

const  switch_dark_theme = document.getElementById("switch-dark-theme");
let flag = 0;

switch_dark_theme.addEventListener("click", change_theme);

function change_theme() {
  const color = document.documentElement.style;

  if (flag == 0){
    color.setProperty('--cv_background-color', 'white');
    color.setProperty('--cv_content_background', '#9f9f9f');
    color.setProperty('--cv_content_text', 'black');
    flag = 1;
  }
  else if (flag == 1){
    color.setProperty('--cv_background-color', 'black');
    color.setProperty('--cv_content_background', '#252525');
    color.setProperty('--cv_content_text', '#ffffffff');
    flag = 0;
  }
}