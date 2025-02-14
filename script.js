// Cart Functionality with Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const user = localStorage.getItem("user"); // Check if user is logged in
        if (!user) {
            alert("You must be logged in to add items to the cart.");
            window.location.href = "login.html";
            return;
        }

        const productCard = event.target.closest(".product-card");
        const name = productCard.getAttribute("data-name");
        const price = parseFloat(productCard.getAttribute("data-price"));
        const image = productCard.querySelector("img").src;

        let item = cart.find(item => item.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1, image });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Item added to cart!");
    });
});

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
}

// Restrict checkout if user is not logged in
document.getElementById("checkout-btn")?.addEventListener("click", function () {
    const user = localStorage.getItem("user");
    if (!user) {
        alert("You must be logged in to proceed to checkout.");
        window.location.href = "login.html";
        return;
    }
    window.location.href = "checkout.html";
});

// FAQ Toggle - Only one open at a time
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".faq-item").forEach(faq => faq !== item && faq.classList.remove("active"));
        item.classList.toggle("active");
    });
});

// Testimonial Slider with Improved Handling
const testimonials = document.querySelectorAll(".testimonial");
let current = 0;

if (testimonials.length > 0) {
    function showNextTestimonial() {
        testimonials[current].classList.remove("active");
        current = (current + 1) % testimonials.length;
        testimonials[current].classList.add("active");
        setTimeout(showNextTestimonial, 3000);
    }
    setTimeout(showNextTestimonial, 3000);
}

// Scroll to Section with Safety Check
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Scroll-triggered Animation using IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, { threshold: 0.3 });

    hiddenElements.forEach(element => observer.observe(element));
});

// User Authentication Handling
document.addEventListener("DOMContentLoaded", function () {
    const authLink = document.getElementById("auth-link");

    function checkAuthStatus() {
        const user = localStorage.getItem("user");
        if (user) {
            authLink.textContent = "Logout";
            authLink.href = "#";
            authLink.removeEventListener("click", logout); // Prevent duplicate listeners
            authLink.addEventListener("click", logout);
        } else {
            authLink.textContent = "Login";
            authLink.href = "login.html";
        }
    }

    function logout(event) {
        event.preventDefault(); // Prevent link navigation
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        window.location.href = "index.html";
    }

    checkAuthStatus();
});
