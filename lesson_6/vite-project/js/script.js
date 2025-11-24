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