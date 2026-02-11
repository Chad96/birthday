/* ===================================
   CONFIGURATION - EDIT THESE VALUES
   =================================== */
const CONFIG = {
    // Personal Information
    girlfriendName: "My Love, Valencia",
    yourName: "Chad",
    
    // Relationship Timeline
    relationshipStartDate: "2019-06-13", // Format: YYYY-MM-DD
    
    // Typewriter Messages
    typewriterMessages: [
        "To the most amazing person in my life...",
        "Every moment with you is a treasure...",
        "You make every day brighter...",
        "Here's to celebrating YOU today! 🎉"
        
    ],
    
    // Love Letter Content
    loveLetterText: `From the moment I met you, I knew my life would never be the same. Your smile lights up even my darkest days, and your laughter is the most beautiful sound I've ever heard.

These past years with you have been nothing short of magical. You've taught me what it means to truly love and be loved. Every adventure we've shared, every quiet moment together, every challenge we've overcome – they've all made us stronger.

Today, on your special day, I want you to know how incredibly grateful I am for you. You are kind, beautiful, intelligent, and so much more than I could have ever dreamed of. You inspire me to be better every single day.

Happy 26th Birthday, my darling. Here's to many more years of laughter, love, and unforgettable memories together.`,

    // Timeline Events (Feel free to modify or add more)
    timelineEvents: [
        {
            title: "First Meeting",
            subtitle: "The Day Everything Changed",
            description: "The moment I saw you, I knew my life would never be the same. Your smile lit up the entire room."
        },
        {
            title: "First Date",
            subtitle: "Dinner & Conversations",
            description: "Hours felt like minutes when we talked. I've never felt so comfortable being myself with anyone."
        },
        {
            title: "Our First Trip",
            subtitle: "Adventures Together",
            description: "Exploring new places with you showed me that home isn't a place—it's wherever you are."
        },
        {
            title: "Today",
            subtitle: "Your Special Day",
            description: "Every moment with you is a gift. Here's to celebrating you and the amazing person you are!"
        }
    ]
};

/* ===================================
   GLOBAL VARIABLES
   =================================== */
let currentImageIndex = 0;
let uploadedImages = [];
let typewriterIndex = 0;
let charIndex = 0;
let letterOpened = false;
let imageCount = 0; // Will be set after loading images

/* ===================================
   CUSTOM CURSOR
   =================================== */
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('button, a, .gallery-item, .timeline-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

/* ===================================
   THEME TOGGLE
   =================================== */
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});

/* ===================================
   MUSIC TOGGLE (FIXED & IMPROVED)
   =================================== */
const musicToggle = document.querySelector('.music-toggle');
const bgMusic = document.getElementById('bgMusic');

// Ensure audio loads properly
bgMusic.volume = 0.7; // Set default volume (optional)
bgMusic.preload = "auto";

// Toggle button control
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
        }).catch(error => {
            console.log("Playback failed:", error);
        });
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    }
});

// Auto-start music after first user interaction
document.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
        }).catch(error => {
            console.log("Autoplay blocked:", error);
        });
    }
}, { once: true });


/* ===================================
   PROGRESS BAR
   =================================== */
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

/* ===================================
   PARTICLES BACKGROUND
   =================================== */
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() > 0.5 ? '255, 107, 157' : '196, 69, 105'}, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

/* ===================================
   GREETING BASED ON TIME
   =================================== */
function setGreeting() {
    const greetingEl = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = `Good Morning, ${CONFIG.girlfriendName} ☀️`;
    } else if (hour < 18) {
        greeting = `Good Afternoon, ${CONFIG.girlfriendName} 🌤️`;
    } else {
        greeting = `Good Evening, ${CONFIG.girlfriendName} 🌙`;
    }
    
    greetingEl.textContent = greeting;
}

setGreeting();

/* ===================================
   TYPEWRITER EFFECT
   =================================== */
function typeWriter() {
    const typewriterEl = document.getElementById('typewriter');
    const messages = CONFIG.typewriterMessages;
    
    if (charIndex < messages[typewriterIndex].length) {
        typewriterEl.textContent += messages[typewriterIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        setTimeout(() => {
            setTimeout(eraseText, 2000);
        }, 1000);
    }
}

function eraseText() {
    const typewriterEl = document.getElementById('typewriter');
    
    if (charIndex > 0) {
        typewriterEl.textContent = typewriterEl.textContent.slice(0, -1);
        charIndex--;
        setTimeout(eraseText, 30);
    } else {
        typewriterIndex = (typewriterIndex + 1) % CONFIG.typewriterMessages.length;
        setTimeout(typeWriter, 500);
    }
}

// Start typewriter after page load
setTimeout(typeWriter, 2000);

/* ===================================
   FLOATING HEARTS ON HERO
   =================================== */
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = 'floatUp ' + (Math.random() * 3 + 4) + 's ease-in forwards';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 800);
}

// Add CSS for floatUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            bottom: 110%;
            transform: translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createFloatingHearts();

/* ===================================
   CTA BUTTON - SMOOTH SCROLL
   =================================== */
document.getElementById('ctaButton').addEventListener('click', () => {
    document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
});

/* ===================================
   SCROLL REVEAL ANIMATIONS
   =================================== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

/* ===================================
   PHOTO GALLERY - LOAD FROM FOLDER
   =================================== */
const uploadArea = document.getElementById('uploadArea');
const galleryGrid = document.getElementById('galleryGrid');

// Load images from img folder
function loadImagesFromFolder() {
    // Try to load images numbered 1.jpg through 20.jpg
    // Users should place their images in img folder with names: 1.jpg, 2.jpg, 3.jpg, etc.
    const imageFolder = 'img/';
    const maxImages = 20;
    
    for (let i = 1; i <= maxImages; i++) {
        const imagePath = imageFolder + i + '.jpg';
        
        // Create a temporary image to check if it exists
        const img = new Image();
        img.onload = function() {
            uploadedImages.push(imagePath);
            addImageToGallery(imagePath, uploadedImages.length - 1);
        };
        img.onerror = function() {
            // Image doesn't exist, continue to next
        };
        img.src = imagePath;
    }
}

// Hide upload area and show message when images are loaded from folder
function setupGalleryFromFolder() {
    uploadArea.style.display = 'none';
    loadImagesFromFolder();
}

function addImageToGallery(imageSrc, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.innerHTML = `
        <img src="${imageSrc}" alt="Memory">
    `;
    
    item.addEventListener('click', (e) => {
        openLightbox(index);
    });
    
    galleryGrid.appendChild(item);
    
    // Trigger reveal animation
    setTimeout(() => {
        item.classList.add('active');
    }, 100);
}

function renderGallery() {
    galleryGrid.innerHTML = '';
    uploadedImages.forEach((src, index) => {
        addImageToGallery(src, index);
    });
}

// Load gallery on page load
setupGalleryFromFolder();

/* ===================================
   LIGHTBOX
   =================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = uploadedImages[currentImageIndex];
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showPrevImage() {
    if (uploadedImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + uploadedImages.length) % uploadedImages.length;
    lightboxImg.src = uploadedImages[currentImageIndex];
}

function showNextImage() {
    if (uploadedImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % uploadedImages.length;
    lightboxImg.src = uploadedImages[currentImageIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

/* ===================================
   LOVE LETTER - FLIP CARD
   =================================== */
const letterCard = document.getElementById('letterCard');
const letterText = document.getElementById('letterText');

letterCard.addEventListener('click', () => {
    if (!letterOpened) {
        letterCard.classList.add('flipped');
        letterOpened = true;
        setTimeout(() => {
            typeLetter();
        }, 600);
    }
});

function typeLetter() {
    const text = CONFIG.loveLetterText;
    let i = 0;
    
    function type() {
        if (i < text.length) {
            letterText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    
    type();
}

/* ===================================
   ANIMATED COUNTERS
   =================================== */
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    
    counters.forEach(counter => {
        const target = counter.getAttribute('data-target');
        
        if (target === '∞') {
            counter.textContent = '∞';
            return;
        }
        
        const duration = 2000;
        const increment = parseInt(target) / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < parseInt(target)) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counters when section is visible
const counterSection = document.getElementById('counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(counterSection);

/* ===================================
   CONFETTI ANIMATION
   =================================== */
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    randomColor() {
        const colors = ['#ff6b9d', '#c44569', '#ffa6c1', '#ff8fb1', '#ffb3d9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > confettiCanvas.height) {
            return false;
        }
        return true;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiArray = [];
let confettiActive = false;

function animateConfetti() {
    if (!confettiActive) return;
    
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiArray = confettiArray.filter(confetti => {
        confetti.draw();
        return confetti.update();
    });
    
    if (confettiArray.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiActive = false;
    }
}

function launchConfetti() {
    confettiActive = true;
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            confettiArray.push(new Confetti());
        }, i * 10);
    }
    animateConfetti();
}

/* ===================================
   SURPRISE BUTTON & MODAL
   =================================== */
const surpriseButton = document.getElementById('surpriseButton');
const surpriseModal = document.getElementById('surpriseModal');
const surpriseClose = document.querySelector('.surprise-close');

surpriseButton.addEventListener('click', () => {
    launchConfetti();
    setTimeout(() => {
        surpriseModal.classList.add('active');
        createSurpriseHearts();
    }, 500);
});

surpriseClose.addEventListener('click', () => {
    surpriseModal.classList.remove('active');
});

surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) {
        surpriseModal.classList.remove('active');
    }
});

function createSurpriseHearts() {
    const container = document.querySelector('.surprise-hearts-container');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.opacity = Math.random() * 0.6 + 0.4;
            heart.style.pointerEvents = 'none';
            
            const duration = Math.random() * 2 + 3;
            heart.style.animation = `floatUp ${duration}s ease-in forwards`;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, i * 100);
    }
}

/* ===================================
   SMOOTH SCROLL WITH EASING
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===================================
   PARALLAX EFFECT
   =================================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ===================================
   LOADING SCREEN REMOVAL
   =================================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
    }, 3000);
});

/* ===================================
   CONSOLE EASTER EGG
   =================================== */
console.log('%c💖 Happy Birthday! 💖', 'font-size: 40px; color: #ff6b9d; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cMade with love for the most amazing person ❤️', 'font-size: 16px; color: #c44569;');
