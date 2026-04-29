// === NAV SCROLL BEHAVIOR ===
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');

function handleNavScroll() {
  const heroBottom = hero.offsetHeight;
  if (window.scrollY > heroBottom - 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// === MOBILE NAV TOGGLE ===
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// === SHOWREEL CLICK TO PLAY ===
const reelPlaceholder = document.querySelector('.reel-placeholder');
if (reelPlaceholder) {
  reelPlaceholder.addEventListener('click', () => {
    const embedWrap = reelPlaceholder.parentElement;
    // Replace YOUR_VIDEO_ID with your actual YouTube video ID
    const videoId = 'YOUR_VIDEO_ID';
    embedWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="KANVAS Showreel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
}

// === CONTACT FORM SELECT COLOR FIX ===
const projectSelect = document.getElementById('project-type');
if (projectSelect) {
  projectSelect.addEventListener('change', function () {
    if (this.value) {
      this.classList.add('filled');
    } else {
      this.classList.remove('filled');
    }
  });
}

// === CONTACT FORM SUBMISSION ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-send');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    const data = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.textContent = 'Sent ✓';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        contactForm.reset();
        projectSelect.classList.remove('filled');
      }, 2500);
    } else {
      btn.textContent = 'Failed — try again';
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }
  });
}

// === SCROLL ANIMATIONS (MOTION GRAPHICS) ===
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealOptions = {
  root: null,
  rootMargin: '0px 0px -15% 0px',
  threshold: 0
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// === STATS COUNTER ANIMATION ===
const stats = document.querySelectorAll('.stat-value');
let hasCounted = false;

const statsOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasCounted) {
      hasCounted = true;
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const isInfinity = stat.getAttribute('data-infinity');
        const duration = 2000;
        const increment = target / (duration / 16);
        
        let current = 0;
        const updateCount = () => {
          current += increment;
          if (current < target) {
            stat.innerText = Math.ceil(current) + (isInfinity ? '' : '+');
            requestAnimationFrame(updateCount);
          } else {
            stat.innerText = isInfinity ? '∞' : target + '+';
          }
        };
        updateCount();
      });
      observer.unobserve(entry.target);
    }
  });
}, statsOptions);

const aboutStatsContainer = document.querySelector('.about-stats');
if (aboutStatsContainer) {
  statsObserver.observe(aboutStatsContainer);
}

// === 3D TUBES BACKGROUND ===
(async function initTubes() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  try {
    const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
    const TubesCursor = module.default;

    // Helper for random colors
    const randomColors = (count) => {
      return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    };

    // Initial theme colors (Cyan, Purple, Silver)
    const initialTubesColors = ["#00dfff", "#8b5cf6", "#eeeeee"];
    const initialLightsColors = ["#00dfff", "#8b5cf6", "#050a14", "#ffffff"];

    const app = TubesCursor(canvas, {
      tubes: {
        colors: initialTubesColors,
        lights: {
          intensity: 200,
          colors: initialLightsColors
        }
      }
    });

    // Handle click to randomize colors (whole body)
    document.body.addEventListener('click', () => {
      if (!app) return;
      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    });

  } catch (error) {
    console.error("Failed to load TubesCursor:", error);
  }
})();

// === LOADER ===
const loader = document.getElementById('loader');
if (loader) {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.style.overflow = '';
    }, 600);
  }, 1500);
}

// === SCROLL PROGRESS ===
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = (window.scrollY / docHeight) * 100;
    scrollProgress.style.width = scrollPct + '%';
  }, { passive: true });
}

// === CUSTOM CURSOR ===
const cursor = document.getElementById('custom-cursor');
const follower = document.getElementById('custom-cursor-follower');
if (cursor && follower && window.matchMedia("(min-width: 769px)").matches) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const updateFollower = () => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(updateFollower);
  };
  updateFollower();
}

// === PROJECT MODAL ===
const modal = document.getElementById('project-modal');
if (modal) {
  const modalClose = modal.querySelector('.modal-close');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalIframe = modal.querySelector('iframe');
  const workCards = document.querySelectorAll('.work-card');

  const closeModal = () => {
    modal.classList.remove('active');
    modalIframe.src = '';
  };

  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      modal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// === WORK CARD 3D TILT ===
if (window.matchMedia("(min-width: 769px)").matches) {
  const tiltCards = document.querySelectorAll('.work-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((y - centerY) / centerY) * -8;
      const tiltY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
    });
  });
}
