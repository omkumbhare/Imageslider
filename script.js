document.addEventListener('DOMContentLoaded', () => {

  let currentIndex = 0;
  let autoSlideInterval;
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slides');
  const totalSlides = slides.length;

  function initSlider() {
    positionSlides();
    createIndicators();
    startAutoSlide();
  }


  function positionSlides() {
    slides.forEach((slide, index) => {
      slide.style.left = `${index * 100}%`;
    });
  }

  
  function createIndicators() {
    const container = document.querySelector('.slide-indicators');
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.className = `slide-indicator ${i === 0 ? 'active' : ''}`;
      indicator.addEventListener('click', () => goToSlide(i));
      container.appendChild(indicator);
    }
  }

  
  function moveSlide(step) {
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
    resetAutoSlide();
  }

  function updateIndicators() {
    document.querySelectorAll('.slide-indicator').forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  }

  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlide(1), 2500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

    document.querySelector('.prev')?.addEventListener('click', () => moveSlide(-1));
  document.querySelector('.next')?.addEventListener('click', () => moveSlide(1));

  
  const modeToggle = document.getElementById('modeToggle');
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  }
  
  modeToggle?.addEventListener('click', toggleDarkMode);
  
  
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  
  if (document.querySelector('.slider')) {
    initSlider();
  }
});