/* NAVBAR */
const toggleBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");

// Toggle menu
toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("open");
  navMenu.classList.toggle("active");
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* Stats Section */

function animateCounter(el, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;

  function updateCounter() {
    current += increment;
    if (current < target) {
      el.textContent = formatNumber(Math.floor(current));
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = formatNumber(target);
    }
  }

  updateCounter();
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
  if (num >= 1000) return Math.floor(num / 1000) + ' k+';
  return num + ' +';
}

let hasAnimated = false;

window.addEventListener('scroll', () => {
  const section = document.getElementById("stats");
  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100 && !hasAnimated) {
    hasAnimated = true;

    // Animate numbers
    document.querySelectorAll(".stat-number").forEach(stat => {
      const target = +stat.getAttribute("data-target");
      animateCounter(stat, target);
    });

    // Fade + zoom animation
    document.querySelectorAll(".stat-box").forEach((box, i) => {
      setTimeout(() => {
        box.classList.add("visible");
      }, i * 150);
    });
  }
});




function animateCounter(el, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;

  function updateCounter() {
    current += increment;
    if (current < target) {
      el.textContent = formatNumber(Math.floor(current));
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = formatNumber(target);
    }
  }

  updateCounter();
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
  if (num >= 1000) return Math.floor(num / 1000) + 'k+';
  return num;
}

let animated = false;

window.addEventListener('scroll', () => {
  const section = document.getElementById("intro");
  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight - 100 && !animated) {
    animated = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = +el.getAttribute('data-target');
      animateCounter(el, target);
    });
  }
});

