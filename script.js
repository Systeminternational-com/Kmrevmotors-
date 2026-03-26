document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Initialize AOS Animations
    AOS.init({
        duration: 800, 
        easing: 'ease-in-out',
        once: true, 
        offset: 100 
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Main Hero Slideshow
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    if(heroSlides.length > 0) {
        let currentHeroSlide = 0;
        function nextHeroSlide() {
            heroSlides[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            heroSlides[currentHeroSlide].classList.add('active');
        }
        setInterval(nextHeroSlide, 4000);
    }

    // 4. NEW: Product Showcase (Bike Slider)
    const bikeSlides = document.querySelectorAll('.bike-slide');
    const prevBikeBtn = document.getElementById('prevBike');
    const nextBikeBtn = document.getElementById('nextBike');
    
    if(bikeSlides.length > 0) {
        let currentBikeSlide = 0;

        function showBike(index) {
            // Hide all
            bikeSlides.forEach(slide => slide.classList.remove('active'));
            // Ensure index loops correctly
            if (index < 0) currentBikeSlide = bikeSlides.length - 1;
            else if (index >= bikeSlides.length) currentBikeSlide = 0;
            else currentBikeSlide = index;
            // Show active
            bikeSlides[currentBikeSlide].classList.add('active');
        }

        prevBikeBtn.addEventListener('click', () => {
            showBike(currentBikeSlide - 1);
        });

        nextBikeBtn.addEventListener('click', () => {
            showBike(currentBikeSlide + 1);
        });
    }

    // 5. NEW: Booking WhatsApp Logic for Product Slider
    // UPDATE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (Country Code + Number, no + sign)
    const WHATSAPP_NUMBER = "919666363922"; 
    
    const bookButtons = document.querySelectorAll('.book-now-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bikeName = this.getAttribute('data-bike'); // Gets the name (e.g., "Etorq")
            const message = encodeURIComponent(`Hi KMR EV Motors, I am interested in booking the ${bikeName} E-Bike. Could you please provide more details?`);
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    });

    // 6. Enquiry Modal Logic (Bottom floating bar)
    const modal = document.getElementById("enquiryModal");
    const btnEnq = document.getElementById("enquiryBtn");
    const spanClose = document.getElementsByClassName("close-modal")[0];
    const form = document.getElementById("enquiryForm");

    if(btnEnq) { btnEnq.onclick = function() { modal.style.display = "block"; } }
    if(spanClose) { spanClose.onclick = function() { modal.style.display = "none"; } }
    window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const targetEmail = "sales.elesco@gmail.com";
            const subject = `New Website Enquiry from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            
            window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
            modal.style.display = "none";
            form.reset();
        });
    }

});
