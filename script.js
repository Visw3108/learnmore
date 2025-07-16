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
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
  if (num >= 1000) return Math.floor(num / 1000) + " k+";
  return num + " +";
}

let hasAnimated = false;

window.addEventListener("scroll", () => {
  const section = document.getElementById("stats");
  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100 && !hasAnimated) {
    hasAnimated = true;

    // Animate numbers
    document.querySelectorAll(".stat-number").forEach((stat) => {
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
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
  if (num >= 1000) return Math.floor(num / 1000) + "k+";
  return num;
}

let animated = false;

window.addEventListener("scroll", () => {
  const section = document.getElementById("intro");
  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight - 100 && !animated) {
    animated = true;
    document.querySelectorAll(".stat-number").forEach((el) => {
      const target = +el.getAttribute("data-target");
      animateCounter(el, target);
    });
  }
});

/* Categories Section */
// Scroll fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Swiper config
const swiper = new Swiper(".categories-swiper", {
  spaceBetween: 20,
  grabCursor: true,
  breakpoints: {
    0: {
      slidesPerView: "auto",
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

/* Learning Progress Section */
const learningSectionElement = document.getElementById("progress-section");
const progressFillElements = document.querySelectorAll(".progress-fill");
const percentageTextElements = document.querySelectorAll(".percent");
let hasAnimatedOnce = false;

function animatePercentageCounter(textElement, targetPercentage) {
  let currentPercentage = 0;
  const animationDuration = 1500;
  const frameRate = 20;
  const incrementStep = targetPercentage / (animationDuration / frameRate);

  const countInterval = setInterval(() => {
    currentPercentage += incrementStep;
    if (currentPercentage >= targetPercentage) {
      currentPercentage = targetPercentage;
      clearInterval(countInterval);
    }
    textElement.textContent = Math.round(currentPercentage) + "%";
  }, frameRate);
}

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimatedOnce) {
        progressFillElements.forEach((barElement) => {
          const targetWidth = barElement.getAttribute("data-width");
          barElement.style.width = targetWidth;
        });

        percentageTextElements.forEach((percentSpan) => {
          const finalValue = +percentSpan.getAttribute("data-target");
          animatePercentageCounter(percentSpan, finalValue);
        });

        hasAnimatedOnce = true;
        progressObserver.unobserve(learningSectionElement);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

progressObserver.observe(learningSectionElement);

/* LATEST COURSE VIDEOS SECTION */

const videoCards = document.querySelectorAll(".video-card");
const modal = document.getElementById("video-modal");
const iframe = document.getElementById("video-iframe");
const closeModal = document.getElementById("modal-close");

videoCards.forEach((card) => {
  card.querySelector(".play-button").addEventListener("click", (e) => {
    e.stopPropagation();
    const videoURL = card.getAttribute("data-video");
    iframe.src = videoURL + "?autoplay=1";
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});
