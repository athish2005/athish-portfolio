// Typing Effect + Scroll Animations + Theme Toggle + Loader

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
      SCROLL REVEAL ANIMATIONS
  ------------------------------ */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-anim]").forEach(el => observer.observe(el));



  /* ------------------------------
        TYPING TEXT EFFECT
  ------------------------------ */
  const words = [
    "Spring Boot • REST APIs",
    "JWT Authentication",
    "Clean Architecture",
    "Responsive UI Development"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  const typingElement = document.getElementById("typing");
  const cursor = document.querySelector(".cursor");

  function type() {
    if (!typingElement) return;

    const current = words[wordIndex];

    if (charIndex <= current.length) {
      typingElement.textContent = current.substring(0, charIndex);
      charIndex++;
      setTimeout(type, 70);
    } else {
      setTimeout(erase, 900);
    }
  }

  function erase() {
    const current = words[wordIndex];

    if (charIndex >= 0) {
      typingElement.textContent = current.substring(0, charIndex);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 200);
    }
  }

  type();



  /* ------------------------------
            PAGE LOADER
  ------------------------------ */
  const loader = document.getElementById("page-loader");

  window.addEventListener("load", () => {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 600);
  });



  /* ------------------------------
            THEME TOGGLE
  ------------------------------ */
  const toggleBtn = document.getElementById("theme-toggle");

  function setDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      toggleBtn.textContent = "🌗";
    }
    localStorage.setItem("athish_theme", enabled ? "1" : "0");
  }

  const savedTheme = localStorage.getItem("athish_theme");

  if (savedTheme === null) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  } else {
    setDarkMode(savedTheme === "1");
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    setDarkMode(!isDark);
  });
});
