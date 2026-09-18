/**
 * MONIKA // MAIN APPLICATION CONTROLLER
 * Handles scroll spy, reveals, case study modal, live clocks, theme switcher, and holographic card.
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveClock();
  initNavbarScroll();
  initScrollReveals();
  initHolographicCard();
  initCaseStudyModal();
  initThemeSwitcher();
  initSoundControls();
  initContactForm();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. LIVE IST (INDIAN STANDARD TIME) CLOCK
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const heroClock = document.getElementById("hero-clock");
  const heroClockMeta = document.getElementById("hero-clock-meta");
  const footerClock = document.getElementById("footer-clock");

  function updateClock() {
    const now = new Date();
    // Options for IST time format
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const timeStr = now.toLocaleTimeString("en-US", options) + " IST";

    if (heroClock) heroClock.textContent = timeStr;
    if (heroClockMeta) heroClockMeta.textContent = timeStr;
    if (footerClock) footerClock.textContent = timeStr;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Glass navbar elevation effect
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Scroll spy
    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 200;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });

    // Animate timeline line progress
    const timelineFill = document.querySelector(".timeline-line-fill");
    const timelineTrack = document.querySelector(".timeline-track");
    if (timelineFill && timelineTrack) {
      const trackRect = timelineTrack.getBoundingClientRect();
      const trackTop = trackRect.top;
      const trackHeight = trackRect.height;
      const windowHeight = window.innerHeight;

      if (trackTop < windowHeight && trackTop + trackHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, ((windowHeight * 0.7 - trackTop) / trackHeight) * 100)
        );
        timelineFill.style.height = `${progress}%`;
      }
    }
  });

  // Smooth scroll back to top
  const btnTop = document.getElementById("btn-back-top");
  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEALS & STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-fade, .reveal-stagger");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Stat numbers count-up animation
  const statsSection = document.querySelector(".stats-grid");
  let hasCounted = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          hasCounted = true;
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  function animateNumbers() {
    const counters = document.querySelectorAll(".stat-number[data-target]");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const suffix = counter.getAttribute("data-suffix") || "";
      let current = 0;
      const increment = Math.ceil(target / 30) || 1;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = (current < 10 && target < 10 ? `0${current}` : `${current}`) + suffix;
      }, 35);
    });
  }
}

/* --------------------------------------------------------------------------
   4. HOLOGRAPHIC PROFILE HUD 3D TILT
   -------------------------------------------------------------------------- */
function initHolographicCard() {
  const card = document.querySelector(".hologram-profile-card");
  if (!card) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

/* --------------------------------------------------------------------------
   5. CASE STUDY SLIDE-OVER MODAL
   -------------------------------------------------------------------------- */
function initCaseStudyModal() {
  const drawer = document.getElementById("case-modal-drawer");
  const closeBtn = document.getElementById("btn-modal-close");
  const triggerBtns = document.querySelectorAll(".btn-open-case");

  if (!drawer) return;

  function openModal(projectId) {
    if (!window.PORTFOLIO_DATA) return;
    const project = window.PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (!project) return;

    // Populate data
    document.getElementById("modal-project-cat").textContent = `${project.number} // ${project.category}`;
    document.getElementById("modal-project-title").textContent = project.title;
    document.getElementById("modal-project-desc").textContent = project.summary;
    document.getElementById("modal-project-challenge").textContent = project.challenge;
    document.getElementById("modal-project-solution").textContent = project.solution;

    const imgEl = document.getElementById("modal-project-img");
    if (imgEl) imgEl.src = project.image;

    // Tech Tags
    const tagsContainer = document.getElementById("modal-project-tags");
    if (tagsContainer) {
      tagsContainer.innerHTML = "";
      project.tech.forEach((t) => {
        const span = document.createElement("span");
        span.className = "project-tag";
        span.textContent = t;
        tagsContainer.appendChild(span);
      });
    }

    // Architecture specs
    const specsContainer = document.getElementById("modal-project-specs");
    if (specsContainer) {
      specsContainer.innerHTML = "";
      project.architecture.forEach((spec) => {
        const item = document.createElement("div");
        item.className = "modal-spec-item";
        item.innerHTML = `
          <div class="modal-spec-title">${spec.label}</div>
          <div class="modal-spec-value">${spec.value}</div>
        `;
        specsContainer.appendChild(item);
      });
    }

    drawer.classList.add("is-active");
    document.body.style.overflow = "hidden";

    if (window.soundEngine) window.soundEngine.playModalOpen();
  }

  function closeModal() {
    drawer.classList.remove("is-active");
    document.body.style.overflow = "";
    if (window.soundEngine) window.soundEngine.playClick();
  }

  triggerBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-project-id");
      openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-active")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. THEME ACCENT COLOR SWITCHER
   -------------------------------------------------------------------------- */
function initThemeSwitcher() {
  const dots = document.querySelectorAll(".color-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const theme = dot.getAttribute("data-color");
      document.documentElement.setAttribute("data-theme", theme);

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      if (window.soundEngine) window.soundEngine.playSuccess();
    });
  });
}

/* --------------------------------------------------------------------------
   7. SOUND CONTROLS TOGGLE
   -------------------------------------------------------------------------- */
function initSoundControls() {
  const btnSound = document.getElementById("btn-sound-toggle");
  if (!btnSound) return;

  btnSound.addEventListener("click", () => {
    if (!window.soundEngine) return;
    const isNowActive = window.soundEngine.toggle();
    if (isNowActive) {
      btnSound.classList.add("active");
      btnSound.setAttribute("title", "Audio SFX Enabled");
      btnSound.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
    } else {
      btnSound.classList.remove("active");
      btnSound.setAttribute("title", "Audio SFX Muted");
      btnSound.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    }
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const feedback = document.getElementById("form-feedback");
  const submitBtn = document.getElementById("form-submit-btn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "SENDING TRANSMISSION...";
    }

    setTimeout(() => {
      if (feedback) {
        feedback.className = "form-feedback success";
        feedback.textContent = "Transmission received! Monika will connect with you within 24 hours.";
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "MESSAGE SENT ✓";
      }
      if (window.soundEngine) window.soundEngine.playSuccess();
      form.reset();
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   9. MOBILE MENU DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById("btn-mobile-toggle");
  const drawer = document.getElementById("mobile-menu-drawer");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains("is-open");
    if (isOpen) {
      drawer.classList.remove("is-open");
      toggleBtn.classList.remove("is-open");
      document.body.style.overflow = "";
    } else {
      drawer.classList.add("is-open");
      toggleBtn.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    if (window.soundEngine) window.soundEngine.playClick();
  }

  toggleBtn.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      toggleBtn.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });
}
