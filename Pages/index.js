const slogan = document.querySelector(".slogan");
const interfaz = document.querySelector(".interfaz");
const materias = document.querySelector(".container-materias");

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const progress = Math.min(scrollY / windowHeight, 1);


    const scaleHero = 1 - progress * 0.3; 
    const translateHero = progress * 150;
    const opacityHero = 1 - progress * 1.2;

    slogan.style.transform = `translateY(${translateHero}px) scale(${scaleHero})`;
    interfaz.style.transform = `translateY(${translateHero}px) scale(${scaleHero})`;

    slogan.style.opacity = opacityHero;
    interfaz.style.opacity = opacityHero;

   
    const translateMaterias = 200 - progress * 200;
    const scaleMaterias = 0.9 + progress * 0.1;

    materias.style.transform = `translateY(${translateMaterias}px) scale(${scaleMaterias})`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    const startPosition = window.scrollY;
    const targetPosition = target.offsetTop;
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

