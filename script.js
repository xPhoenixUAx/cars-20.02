// Navbar functionality
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'transparent';
    }
});

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation for elements
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Animated counter for stats
const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 200;

    const updateCounter = () => {
        const value = parseInt(stat.innerText);
        if (value < target) {
            stat.innerText = Math.ceil(value + increment);
            setTimeout(updateCounter, 1);
        } else {
            stat.innerText = target;
        }
    };

    updateCounter();
});

// Car catalog
const carData = [
    { name: 'Quantum Surge EV', price: '$250,000', image: 'https://source.unsplash.com/random/400x300/?electric-supercar' },
    { name: 'NeuroDrive Autonomous', price: '$180,000', image: 'https://source.unsplash.com/random/400x300/?autonomous-car' },
    { name: 'Fusion X Hybrid', price: '$120,000', image: 'https://source.unsplash.com/random/400x300/?hybrid-car' },
    { name: 'Nebula GT', price: '$350,000', image: 'https://source.unsplash.com/random/400x300/?futuristic-sports-car' },
    { name: 'Eco Voyager', price: '$90,000', image: 'https://source.unsplash.com/random/400x300/?eco-friendly-car' },
    { name: 'Stellar X', price: '$280,000', image: 'https://source.unsplash.com/random/400x300/?luxury-electric-car' }
];

const carGrid = document.querySelector('.car-grid');

carData.forEach(car => {
    const carCard = document.createElement('div');
    carCard.classList.add('car-card', 'glass-effect');
    carCard.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-image">
        <div class="car-details">
            <h3>${car.name}</h3>
            <p class="car-price">${car.price}</p>
        </div>
    `;
    carGrid.appendChild(carCard);
});

// Form validation with enhanced UX
const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const serviceType = document.getElementById('service-type');
    const appointmentDate = document.getElementById('appointment-date');

    const fields = [name, email, phone, serviceType, appointmentDate];
    let isValid = true;

    fields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('error');
            field.addEventListener('input', () => field.classList.remove('error'));
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showNotification('Please enter a valid email address.', 'error');
        email.classList.add('error');
        return;
    }

    // Simple phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.value)) {
        showNotification('Please enter a valid 10-digit phone number.', 'error');
        phone.classList.add('error');
        return;
    }

    // If all validations pass, show success message and reset form
    showNotification('Appointment booked successfully! We will contact you soon.', 'success');
    appointmentForm.reset();
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero content
gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});

// Animate sections
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate car cards
gsap.utils.toArray('.car-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Parallax scrolling effect for the hero section
gsap.to('.hero', {
    backgroundPosition: '50% 100%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});