// Back to Top Button Functionality
const backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when the user scrolls down 100px from the top
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Scroll to top when the button is clicked
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener('DOMContentLoaded', function () {
  // Select all progress bars
  const progressBars = document.querySelectorAll('.progress-bar');

  // Function to animate the progress bar
  function animateProgressBar(progressBar) {
    // Add the 'in-view' class to trigger the animation
    if (!progressBar.classList.contains('in-view')) {
      progressBar.classList.add('in-view');
    }
  }

  // Create an intersection observer to animate when in view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        animateProgressBar(progressBar);
        observer.unobserve(progressBar); // Stop observing after animation
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the progress bar is in view
  });

  // Start observing each progress bar
  progressBars.forEach(progressBar => {
    // Set the custom width for each progress bar from its inline style '--progress-width'
    const width = progressBar.style.getPropertyValue('--progress-width');
    progressBar.setAttribute('aria-valuenow', width.replace('%', '')); // Ensure aria value is set correctly
    observer.observe(progressBar);
  });
});


// Testimonial Carousel (Radio Button Navigation)
const testimonialItems = document.querySelectorAll(".testimonial-item");
const radioButtons = document.querySelectorAll(".testimonial-radio-nav input[type='radio']");

// Function to handle the active testimonial
function showTestimonial(index) {
  testimonialItems.forEach(item => item.classList.remove("active"));
  radioButtons.forEach(button => button.checked = false);
  testimonialItems[index].classList.add("active");
  radioButtons[index].checked = true;
}

// Set up an event listener for each radio button
radioButtons.forEach((radioButton, index) => {
  radioButton.addEventListener("click", () => showTestimonial(index));
});

// Automatically move to the next testimonial every 5 seconds
let currentTestimonialIndex = 0;
setInterval(() => {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
  showTestimonial(currentTestimonialIndex);
}, 5000);

// Typewriter Animation for Multiple Words with Forward and Backward Animation
const typewriterText = document.getElementById('typewriter-text');
const words = ["Web Developer", "Frontend Developer", "Backend Developer"];
let currentWordIndex = 0;
let currentCharIndex = 0;
let typingForward = true; // Direction control for typing animation
let deleting = false; // Flag for deleting animation

function typeWriter() {
  if (typingForward) {
    // Typing forward
    if (currentCharIndex < words[currentWordIndex].length) {
      typewriterText.innerHTML += words[currentWordIndex].charAt(currentCharIndex);
      currentCharIndex++;
      setTimeout(typeWriter, 100); // Typing speed
    } else {
      // Pause before starting to delete
      setTimeout(() => {
        deleting = true;
        typingForward = false;
        typeWriter();
      }, 1500);
    }
  } else if (deleting) {
    // Deleting the current word
    if (currentCharIndex > 0) {
      typewriterText.innerHTML = words[currentWordIndex].substring(0, currentCharIndex - 1);
      currentCharIndex--;
      setTimeout(typeWriter, 50); // Deleting speed
    } else {
      // Move to the next word and start typing again
      deleting = false;
      typingForward = true;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(typeWriter, 500); // Short delay before typing the next word
    }
  }
}

// Start the typewriter effect once the page has loaded
window.addEventListener("load", () => {
  typeWriter();
});


/*
document.addEventListener("DOMContentLoaded", function() {
  AOS.init({
      easing: 'ease-out',
      duration: 1300,
      delay: 0,
      once: false,
      disable: ''
  });
});

*/
  // Close the navbar when a nav link is clicked in mobile view
  document.querySelectorAll('.navbar-nav .nav-link').forEach(item => {
    item.addEventListener('click', () => {
      const navbarCollapse = document.getElementById('navbarNav');
      const collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      collapse.hide();  // This will collapse the navbar
    });
  });



