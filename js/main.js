document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Mudar ícone do menu
            if (navMenu.classList.contains('active')) {
                hamburger.innerHTML = '&#10005;'; // X icon
            } else {
                hamburger.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }

    // Fechar menu ao clicar em um link (mobile)
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '&#9776;';
            }
        });
    });

    // Animação suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
