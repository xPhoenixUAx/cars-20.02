// Navbar functionality
const navbar = document.getElementById("navbar");
const menuToggle = document.querySelector(".menu-toggle");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(18, 18, 18, 0.8)";
  } else {
    navbar.style.background = "transparent";
  }
});

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Fade-in animation for About section
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.5 }
);

fadeElements.forEach((element) => {
  fadeInObserver.observe(element);
});

// Car catalog
const carData = [
  {
    name: "Electric Supercar",
    price: "$150,000",
    image: "https://source.unsplash.com/random/400x300/?electric-supercar",
  },
  {
    name: "Autonomous SUV",
    price: "$85,000",
    image: "https://source.unsplash.com/random/400x300/?autonomous-suv",
  },
  {
    name: "Hydrogen Sedan",
    price: "$70,000",
    image: "https://source.unsplash.com/random/400x300/?hydrogen-car",
  },
  {
    name: "Flying Car Prototype",
    price: "$500,000",
    image: "https://source.unsplash.com/random/400x300/?flying-car",
  },
  {
    name: "Amphibious Vehicle",
    price: "$120,000",
    image: "https://source.unsplash.com/random/400x300/?amphibious-car",
  },
  {
    name: "Solar-Powered Compact",
    price: "$45,000",
    image: "https://source.unsplash.com/random/400x300/?solar-car",
  },
];

const carGrid = document.querySelector(".car-grid");

carData.forEach((car) => {
  const carCard = document.createElement("div");
  carCard.classList.add("car-card", "glass-effect");
  carCard.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-image">
        <div class="car-details">
            <h3>${car.name}</h3>
            <p class="car-price">${car.price}</p>
        </div>
    `;
  carGrid.appendChild(carCard);

  // Add hover effect to change image
  const carImage = carCard.querySelector(".car-image");
  const originalSrc = carImage.src;
  carCard.addEventListener("mouseenter", () => {
    carImage.style.transform = "scale(1.1)";
    setTimeout(() => {
      carImage.src = `https://source.unsplash.com/random/400x300/?${car.name.toLowerCase()}-interior`;
    }, 300);
  });
  carCard.addEventListener("mouseleave", () => {
    carImage.style.transform = "scale(1)";
    setTimeout(() => {
      carImage.src = originalSrc;
    }, 300);
  });

  // Add click event to reveal details
  carCard.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.classList.add("modal", "glass-effect");
    modal.innerHTML = `
            <div class="modal-content">
                <h2>${car.name}</h2>
                <p>Price: ${car.price}</p>
                <p>Experience the future of automotive technology with our ${car.name.toLowerCase()}. This cutting-edge vehicle combines style, performance, and innovation to deliver an unparalleled driving experience.</p>
                <button class="close-modal neon-effect">Close</button>
            </div>
        `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => {
      modal.remove();
    });
  });
});

// Form validation with enhanced UX
const appointmentForm = document.getElementById("appointment-form");

appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const serviceType = document.getElementById("service-type");
  const appointmentDate = document.getElementById("appointment-date");

  const fields = [name, email, phone, serviceType, appointmentDate];
  let isValid = true;

  fields.forEach((field) => {
    if (!field.value) {
      isValid = false;
      field.classList.add("error");
      field.addEventListener("input", () => field.classList.remove("error"));
    }
  });

  if (!isValid) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showNotification("Please enter a valid email address.", "error");
    email.classList.add("error");
    return;
  }

  // Simple phone validation (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.value)) {
    showNotification("Please enter a valid 10-digit phone number.", "error");
    phone.classList.add("error");
    return;
  }

  // If all validations pass, show success message and reset form
  showNotification(
    "Appointment booked successfully! We will contact you soon.",
    "success"
  );
  appointmentForm.reset();
});

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }, 100);
}

// Parallax scrolling effect for the hero section
window.addEventListener("scroll", () => {
  const heroSection = document.querySelector(".hero");
  const scrollPosition = window.pageYOffset;
  heroSection.style.backgroundPositionY = `${scrollPosition * 0.7}px`;
});

// Add a typing effect to the hero title
const heroTitle = document.querySelector(".animated-slogan");
const text = heroTitle.textContent;
heroTitle.textContent = "";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    heroTitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

typeWriter();

// Add scroll-triggered animations to sections
const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
