// Sticky Header Logic
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('section, .product-card, .stat-item, .contact-details, .contact-form-container');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial state for animations
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Form Handling (Demo)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        if (form.id === 'loginForm' || form.id === 'businessForm' || form.id === 'categoryForm' || form.id === 'productForm') return; // Skip Admin Forms
        e.preventDefault();
        alert('Thank you for your inquiry! Our trade team will contact you shortly.');
        form.reset();
    });
});

// Dynamic CMS Injector Logic (Fetch from Firebase)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initFirebase === 'function') {
        initFirebase(); // Initialize if script is present

        // Load Business Info Dynamically
        if (typeof db !== 'undefined') {
            db.collection('config').doc('business_data').get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    
                    // Update layout emails and phones
                    const emailElements = document.querySelectorAll('.footer-info p:nth-child(2), .contact-details p:nth-child(3)');
                    const phoneElements = document.querySelectorAll('.footer-info p:nth-child(3), .contact-details p:nth-child(1)');
                    const locationElements = document.querySelectorAll('.footer-info p:nth-child(1), .contact-details p:nth-child(2)');

                    if(data.email) emailElements.forEach(el => el.innerHTML = `<i class="fas fa-envelope"></i> ${data.email}`);
                    if(data.phone) phoneElements.forEach(el => el.innerHTML = `<i class="fas fa-phone"></i> ${data.phone}`);
                    if(data.location) locationElements.forEach(el => el.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`);
                }
            });

            // Load Dynamic Products Grid if element is present
            const productsGrid = document.getElementById('productsGrid'); // Match id if renamed or dynamically inject
            if (productsGrid) {
                db.collection('products').orderBy('timestamp', 'desc').get().then(snapshot => {
                    if (snapshot.empty) return; // Fallback to static html
                    let html = '';
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        html += `
                        <div class="product-card">
                            <div class="product-img">
                                <img src="${data.imageUrl}" alt="${data.title}">
                            </div>
                            <div class="product-info">
                                <h3>${data.title}</h3>
                                <p>${data.shortDesc}</p>
                                <a href="view-product.html?id=${doc.id}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.8rem; margin-top: 10px;">View Details</a>
                            </div>
                        </div>`;
                    });
                    productsGrid.innerHTML = html;
                });
            }
        }
    }
});
