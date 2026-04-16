// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 800);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX - 18) * 0.15;
    followerY += (mouseY - followerY - 18) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        if (counter.dataset.animated) return;
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        counter.dataset.animated = 'true';
        update();
    });
}

// ===== AOS (Animate on Scroll) =====
function checkAOS() {
    document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            setTimeout(() => el.classList.add('aos-animate'), parseInt(el.dataset.aosDelay || 0));
        }
    });
}
window.addEventListener('scroll', checkAOS);
window.addEventListener('load', () => setTimeout(checkAOS, 100));

// ===== COUNTER TRIGGER =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) animateCounters(); });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== GALLERY FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
                item.style.opacity = '0';
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position:absolute; width:2px; height:2px; background:rgba(200,164,94,${Math.random()*0.3});
            border-radius:50%; left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation: particleFloat ${3+Math.random()*4}s ease-in-out infinite ${Math.random()*3}s;
        `;
        particlesContainer.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes particleFloat {
        0%,100%{transform:translate(0,0);opacity:0.3}
        50%{transform:translate(${Math.random()>0.5?'':'-'}${20+Math.random()*30}px,-${20+Math.random()*40}px);opacity:0.8}
    }`;
    document.head.appendChild(style);
}

// ===== CONTACT FORM → WHATSAPP =====
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const style = form.querySelector('select').value;
    const msg = form.querySelector('textarea').value;
    const text = `Merhaba! Ben ${name}.%0ATelefon: ${phone}%0AStil: ${style}%0A${msg}`;
    window.open(`https://wa.me/905321662852?text=${text}`, '_blank');
});

// ===== BOTTOM NAV ACTIVE STATE =====
const bnavLinks = document.querySelectorAll('.bnav-link');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    bnavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === current) link.classList.add('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
