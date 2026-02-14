const slogan = document.querySelector(".slogan");
const interfaz = document.querySelector(".interfaz");
const materias = document.querySelector(".container-materias");
const header = document.querySelector("header");

// Scroll parallax effect + header background
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(scrollY / windowHeight, 1);

    // Hero section animations
    const scaleHero = 1 - progress * 0.3;
    const translateHero = progress * 150;
    const opacityHero = 1 - progress * 1.2;

    slogan.style.transform = `translateY(${translateHero}px) scale(${scaleHero})`;
    interfaz.style.transform = `translateY(${translateHero}px) scale(${scaleHero})`;
    slogan.style.opacity = opacityHero;
    interfaz.style.opacity = opacityHero;

    // Materias section animations
    const translateMaterias = 200 - progress * 200;
    const scaleMaterias = 0.9 + progress * 0.1;
    materias.style.transform = `translateY(${translateMaterias}px) scale(${scaleMaterias})`;

    // Header background on scroll
    if (scrollY > 100) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        header.style.backdropFilter = "blur(10px)";
        header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
    } else {
        header.style.backgroundColor = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        let target;

        // Manejo especial para los diferentes IDs
        if (targetId === "#aboutUs") {
            target = document.querySelector(".descriptionEmpresa");
        } else if (targetId === "#contact") {
            target = document.querySelector("footer");
        } else {
            target = document.querySelector(targetId);
        }

        if (!target) return;

        const startPosition = window.scrollY;
        const targetPosition = target.offsetTop - 100; // Offset para el header
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let start = null;

        function animation(currentTime) {
            if (!start) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    });
});

// Duplicar cards para el carrusel infinito
function duplicateCards() {
    const columnUp = document.getElementById('columnUp');
    const columnDown = document.getElementById('columnDown');

    if (columnUp && columnDown) {
        const cardsUp = columnUp.innerHTML;
        columnUp.innerHTML = cardsUp + cardsUp;

        const cardsDown = columnDown.innerHTML;
        columnDown.innerHTML = cardsDown + cardsDown;
    }
}

duplicateCards();