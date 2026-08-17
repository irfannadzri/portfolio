// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal animation (staggered within each grid/list)
document.querySelectorAll('.skills-grid, .projects-grid, .edu-grid, .timeline').forEach((group) => {
  Array.from(group.children).forEach((el, i) => {
    if (el.classList.contains('reveal')) {
      el.style.transitionDelay = `${i * 80}ms`;
    }
  });
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar + active nav link
const scrollProgress = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;

  let currentId = '';
  sections.forEach((section) => {
    if (scrollTop >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });
  navAnchors.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });

  backToTop.classList.toggle('visible', scrollTop > 500);
}

const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Interactive Cursor Light Glow Follower (Blue theme matching navbar pills)
// Skipped entirely under prefers-reduced-motion — no point animating a hidden element.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });

  function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursorGlow);
  }
  animateCursorGlow();
}

// Project Card Multi-View Switcher (Dashboard vs Public/Login)
document.querySelectorAll('.project-media-wrapper').forEach((wrapper) => {
  const buttons = wrapper.querySelectorAll('.view-tab-btn');
  const imgs = wrapper.querySelectorAll('.project-img');

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetView = btn.getAttribute('data-view');

      buttons.forEach((b) => b.classList.toggle('active', b === btn));
      imgs.forEach((img) => {
        const isTarget = img.classList.contains(`view-${targetView}`);
        img.classList.toggle('active', isTarget);
      });
    });
  });
});

// Full-Size Image Lightbox Modal
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

function openLightbox(src, altText) {
  lightboxImg.src = src;
  lightboxImg.alt = altText;
  lightboxCaption.textContent = altText;
  imageLightbox.classList.add('open');
  imageLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  imageLightbox.classList.remove('open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Click on any project screenshot to open high-res lightbox
document.querySelectorAll('.project-media-wrapper').forEach((wrapper) => {
  wrapper.addEventListener('click', (e) => {
    if (e.target.closest('.project-view-switch')) return;
    const activeImg = wrapper.querySelector('.project-img.active');
    if (activeImg) {
      openLightbox(activeImg.src, activeImg.alt);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageLightbox.classList.contains('open')) {
    closeLightbox();
  }
});
