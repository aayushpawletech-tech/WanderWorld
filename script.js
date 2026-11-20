const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterStatus = document.querySelector("#newsletter-status");

document.querySelector("#year").textContent = new Date().getFullYear();

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonials = Array.from(testimonialTrack.children);
let activeTestimonial = 0;

function showTestimonial(index) {
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonialTrack.style.transform = `translateX(-${activeTestimonial * 100}%)`;
}

document.querySelector(".review-prev").addEventListener("click", () => {
  showTestimonial(activeTestimonial - 1);
});

document.querySelector(".review-next").addEventListener("click", () => {
  showTestimonial(activeTestimonial + 1);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const name = new FormData(contactForm).get("name").trim();
  formStatus.textContent = `Thanks, ${name}! The form is ready to connect to your travel team's inbox.`;
  contactForm.reset();
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;

  newsletterStatus.textContent = "Thanks! Connect this form to your mailing list to enable subscriptions.";
  newsletterForm.reset();
});
