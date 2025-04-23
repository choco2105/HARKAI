let lastScrollTop = 0;
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector(".hero");
const btnMenu = document.getElementById("btn-menu");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");
const navLinks = document.querySelectorAll("nav a, .mobile-nav a");

// Control de scroll para mostrar/ocultar el encabezado y el botón para subir
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const heroSectionHeight = heroSection.offsetHeight;

  // Mostrar/ocultar botón para subir
  if (scrollTop > heroSectionHeight / 2) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }

  // Mostrar/ocultar encabezado al hacer scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  // Actualizar posición de último scroll
  lastScrollTop = scrollTop;
});

// Manejo del menú móvil
btnMenu.addEventListener("click", () => {
  const mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.toggle("active");
  document.body.style.overflow = "hidden"; // Prevenir scroll cuando el menú está abierto
});

closeMobileNavBtn.addEventListener("click", () => {
  const mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.remove("active");
  document.body.style.overflow = ""; // Restaurar scroll
});

// Cerrar menú móvil al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const mobileNav = document.querySelector(".mobile-nav");
    mobileNav.classList.remove("active");
    document.body.style.overflow = ""; // Restaurar scroll
  });
});

// Botón para subir al inicio
toTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Efectos de parallax para el hero
window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  const heroContent = document.querySelector(".hero .content");
  const heroLight = document.querySelector(".hero .light");
  
  if (heroLight) {
    heroLight.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  }
});

// Inicialización del carrusel para las funciones (simulado)
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");
  
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        // Activar el dot actual
        document.querySelector(".dot.active").classList.remove("active");
        dot.classList.add("active");
        
        // Mover el slider (en una implementación real)
        const track = document.querySelector(".features-track");
        if (track) {
          track.style.transform = `translateX(-${index * 100}%)`;
        }
      });
    });
  }
  
  // Flechas de navegación del slider
  const arrows = document.querySelectorAll(".arrow");
  if (arrows.length > 0) {
    let currentSlide = 0;
    const totalSlides = dots.length;
    
    arrows.forEach(arrow => {
      arrow.addEventListener("click", () => {
        if (arrow.classList.contains("arrow-left")) {
          currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        } else {
          currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        }
        
        // Actualizar dots
        document.querySelector(".dot.active").classList.remove("active");
        dots[currentSlide].classList.add("active");
        
        // Mover slider
        const track = document.querySelector(".features-track");
        if (track) {
          track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
      });
    });
  }
  
  // Validación simple de formulario
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = contactForm.querySelectorAll("input, textarea");
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          input.style.borderColor = "#F1202F";
          isValid = false;
        } else {
          input.style.borderColor = "";
        }
      });
      
      if (isValid) {
        // Aquí iría el código para enviar el formulario
        alert("¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.");
        contactForm.reset();
      } else {
        alert("Por favor, completa todos los campos requeridos.");
      }
    });
  }
});