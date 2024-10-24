let currentSlide = 0;

function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;

    if (slideIndex >= totalSlides) {
        currentSlide = 0; // Loop back to first slide
    } else if (slideIndex < 0) {
        currentSlide = totalSlides - 1; // Loop to last slide
    } else {
        currentSlide = slideIndex;
    }

    // Hide all slides first
    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
    });

    // Show the current slide
    slides[currentSlide].style.display = 'block';
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialize the first slide as active
document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlide);
});
