// Contact form handling
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(emailInput.value.trim())) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Here you would typically send the form data to a server
    // For this example, we'll just show a success message
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} transition-opacity duration-300`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const eventsSlider = document.querySelector('.events-slider');
    const prevEventBtn = document.getElementById('prev-event');
    const nextEventBtn = document.getElementById('next-event');
    const eventCards = document.querySelectorAll('.event-card');
    
    let currentIndex = 0;
    const totalCards = eventCards.length;

    function updateSlider() {
        const cardWidth = eventCards[0].offsetWidth;
        const newPosition = -currentIndex * cardWidth;
        eventsSlider.style.transform = `translateX(${newPosition}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        prevEventBtn.classList.toggle('disabled', currentIndex === 0);
        nextEventBtn.classList.toggle('disabled', currentIndex === totalCards - 1);
    }

    nextEventBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevEventBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Initialize slider position and button states
    updateSlider();

    // Optionally, add touch swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    eventsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    eventsSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX && currentIndex < totalCards - 1) {
            nextEventBtn.click();
        }
        if (touchEndX > touchStartX && currentIndex > 0) {
            prevEventBtn.click();
        }
    }
});

// Enhance event card animations
const animateEventCards = () => {
    eventCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animate-fade-in');
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 200); // Stagger the animations
        }
    });
};

window.addEventListener('scroll', animateEventCards);
animateEventCards(); // Check on load

// Initialize event cards
eventCards.forEach((card, index) => {
    card.style.transform = 'translateY(50px)';
    card.style.opacity = '0';
    card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
});

// ... (rest of your JavaScript code)

