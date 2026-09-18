/**
 * MONIKA // FLUID CUSTOM CURSOR & MAGNETIC INTERACTION
 * Implements smooth spring-lerp cursor tracking, magnetic pulls, and contextual morphs.
 */

class FluidCursor {
  constructor() {
    this.dot = document.getElementById("cursor-dot");
    this.ring = document.getElementById("cursor-ring");
    this.text = document.getElementById("cursor-text");

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.lerpFactor = 0.18;
    this.isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (this.isTouch || !this.dot || !this.ring) {
      return;
    }

    this.init();
  }

  init() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Direct instant position for the center dot
      this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    });

    this.setupHoverTriggers();
    this.render();
  }

  setupHoverTriggers() {
    // Standard interactive triggers (buttons, nav links, controls)
    const hoverElements = document.querySelectorAll(
      "a, button, .skill-card, .btn-control, .color-dot, .palette-swatch, .stat-card, .achievement-card"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
        if (window.soundEngine) window.soundEngine.playHover();
      });
      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
      });
    });

    // Magnetic buttons
    const magneticBtns = document.querySelectorAll(".btn-magnetic, .btn-primary, .btn-secondary");
    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
      });
    });

    // Project panels contextual morph
    const projectItems = document.querySelectorAll(".project-panel, .project-visual-side");
    projectItems.forEach((panel) => {
      panel.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-project");
        if (this.text) this.text.textContent = "VIEW ↗";
        if (window.soundEngine) window.soundEngine.playHover();
      });
      panel.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-project");
      });
    });

    // Creative Lab interactive triggers
    const labItems = document.querySelectorAll(".lab-interactive-area, .lab-card");
    labItems.forEach((lab) => {
      lab.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-lab");
        if (window.soundEngine) window.soundEngine.playHover();
      });
      lab.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-lab");
      });
    });
  }

  render() {
    // Linear interpolation for smooth trailing ring
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * this.lerpFactor;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * this.lerpFactor;

    this.ring.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
    if (this.text) {
      this.text.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
    }

    requestAnimationFrame(() => this.render());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.fluidCursor = new FluidCursor();
});
