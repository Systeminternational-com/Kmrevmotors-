// 1. Initialize AOS Animations
// This makes elements smoothly fade/slide in as you scroll down the page
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800, // Animation lasts 0.8 seconds
        easing: 'ease-in-out',
        once: true, // Animation happens only once when scrolling down
        offset: 100 // Starts animation 100px before element is in view
    });
});

// 2. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 3. Slideshow Logic (Only runs if on index.html)
const slides = document.querySelectorAll('.slide');
if(slides.length > 0) {
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide automatically every 4 seconds
    setInterval(nextSlide, 4000);
}

// 4. Enquiry Modal Logic
const modal = document.getElementById("enquiryModal");
const btn = document.getElementById("enquiryBtn");
const span = document.getElementsByClassName("close-modal")[0];
const form = document.getElementById("enquiryForm");

// Open Modal when Enquiry button is clicked
if(btn) {
    btn.onclick = function() {
        modal.style.display = "block";
    }
}

// Close Modal on 'X' click
if(span) {
    span.onclick = function() {
        modal.style.display = "none";
    }
}

// Close Modal on clicking outside the white box
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle Form Submission (Drafts an Email via Mailto)
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents page reload
        
        // Get values from input boxes
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // The target email from the client
        const targetEmail = "sales.elesco@gmail.com";
        const subject = `New Website Enquiry from ${name}`;
        
        // Format the email body text 
        // (%0D%0A is the code for a line break in email links)
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        
        // Open default mail client (Gmail/Outlook/Apple Mail)
        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        
        // Close modal and reset form fields
        modal.style.display = "none";
        form.reset();
    });
}
