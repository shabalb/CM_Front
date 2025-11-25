console.log('Работает!');

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
        });
    });
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('li');
    const getVisibleSection = () => {
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        return currentSection;
    };


    const updateActiveLink = () => {
        const currentSection = getVisibleSection();

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();




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
    /*
    if (email.validity.typeMismatch) {
        //email.setCustomValidity("I am expecting an e-mail address!");
        //console.log('Неправильная почта!');
        
        emailError.textContent = ""; // Сбросить содержимое сообщения
        emailError.className = "error"; // Сбросить визуальное состояние 

    } else {
        
        showError();
    }*/
});


form.addEventListener("submit", function (event) {
    // Если поле email валдно, позволяем форме отправляться
    let isValid = true;
    event.preventDefault();
    if (!email.validity.valid) {
        // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
        
        showError();
        // Затем предотвращаем стандартное событие отправки формы
        
        email.setCustomValidity("");
        isValid = false;
    }
    if (namefeedback.validity.valueMissing) {
        // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
        
        // Затем предотвращаем стандартное событие отправки формы
        nameError.textContent = "Поле должно быть заполнено";
        namefeedback.setCustomValidity("");
        nameError.className = "error active";
        isValid = false;
    }
    
    if (isValid){

        sendMessage.textContent = "Сообщение отправлено";
        sendMessage.className = "send active";
    }
});


function showError() {
    if (email.validity.valueMissing) {
        // Если поле пустое,
        // отображаем следующее сообщение об ошибке
        emailError.textContent = "Поле должно быть заполнено";
    } else if (email.validity.typeMismatch) {
        // Если поле содержит не email-адрес,
        // отображаем следующее сообщение об ошибке
        emailError.textContent = "Некорректный email-адрес";
    } else if (email.validity.tooShort) {
        // Если содержимое слишком короткое,
        // отображаем следующее сообщение об ошибке
        emailError.textContent = `Слишком короткий email-адрес`;
    }

    // Задаём соответствующую стилизацию
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
