/**
 * MONIKA // CREATIVE LAB INTERACTIVE EXPERIMENTS
 * Interactive sandbox prototypes: Particle Gravity, Waveform Synth, Glass HUD, and AI Palette.
 */

class CreativeLab {
  constructor() {
    this.initParticleGravity();
    this.initWaveformSynth();
    this.initGlassHUD();
    this.initPaletteGenerator();
  }

  // 1. Particle Gravitational Field
  initParticleGravity() {
    const canvas = document.getElementById("lab-canvas-particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    window.addEventListener("resize", () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    const particles = [];
    const count = 45;
    const mouse = { x: -1000, y: -1000, radius: 90 };

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
      });
    }

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * 3;
          p.y += Math.sin(angle) * 3;
        }

        ctx.fillStyle = "rgba(0, 240, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connective lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 50) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // 2. Kinetic Waveform Synth
  initWaveformSynth() {
    const canvas = document.getElementById("lab-canvas-waveform");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const freqInput = document.getElementById("wave-freq");
    const speedInput = document.getElementById("wave-speed");

    let step = 0;

    function renderWave() {
      ctx.clearRect(0, 0, width, height);

      const freq = freqInput ? parseFloat(freqInput.value) : 0.02;
      const speed = speedInput ? parseFloat(speedInput.value) : 0.04;
      step += speed;

      // Layer 1
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.8)";
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * freq + step) * 25 + height / 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Layer 2
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(192, 132, 252, 0.6)";
      for (let x = 0; x < width; x++) {
        const y = Math.cos(x * freq * 0.8 - step * 1.2) * 20 + height / 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(renderWave);
    }
    renderWave();
  }

  // 3. Dynamic Glass HUD Switcher
  initGlassHUD() {
    const blurSlider = document.getElementById("glass-blur");
    const opacitySlider = document.getElementById("glass-opacity");
    const previewBox = document.getElementById("glass-preview-box");
    const cssDisplay = document.getElementById("glass-css-display");

    function updateGlass() {
      if (!previewBox) return;
      const blurVal = blurSlider ? blurSlider.value : 16;
      const opVal = opacitySlider ? opacitySlider.value : 0.65;

      previewBox.style.backdropFilter = `blur(${blurVal}px)`;
      previewBox.style.webkitBackdropFilter = `blur(${blurVal}px)`;
      previewBox.style.background = `rgba(18, 22, 28, ${opVal})`;

      if (cssDisplay) {
        cssDisplay.textContent = `backdrop-filter: blur(${blurVal}px); background: rgba(18,22,28,${opVal});`;
      }
    }

    if (blurSlider) blurSlider.addEventListener("input", updateGlass);
    if (opacitySlider) opacitySlider.addEventListener("input", updateGlass);
    updateGlass();
  }

  // 4. AI Cyber Palette Generator
  initPaletteGenerator() {
    const container = document.getElementById("palette-boxes-container");
    const rollBtn = document.getElementById("btn-roll-palette");
    const toast = document.getElementById("palette-toast");

    const palettes = [
      ["#070809", "#00F0FF", "#3B82F6", "#F5F5F7", "#1E293B"],
      ["#0B0F19", "#CCFF00", "#10B981", "#E2E8F0", "#1A2234"],
      ["#0A0612", "#C084FC", "#F43F5E", "#FAF5FF", "#2E1065"],
      ["#05080E", "#38BDF8", "#818CF8", "#F8FAFC", "#0F172A"],
      ["#08090C", "#2DD4BF", "#A7F3D0", "#FFFFFF", "#134E4A"],
    ];

    let currentIdx = 0;

    function renderPalette(colors) {
      if (!container) return;
      container.innerHTML = "";
      colors.forEach((hex) => {
        const swatch = document.createElement("div");
        swatch.className = "palette-swatch";
        swatch.style.backgroundColor = hex;
        swatch.textContent = hex;
        swatch.title = `Click to copy ${hex}`;

        swatch.addEventListener("click", () => {
          navigator.clipboard.writeText(hex);
          if (toast) {
            toast.textContent = `Copied ${hex} to clipboard!`;
            toast.style.opacity = "1";
            setTimeout(() => {
              toast.style.opacity = "0";
            }, 1800);
          }
          if (window.soundEngine) window.soundEngine.playClick();
        });

        container.appendChild(swatch);
      });
    }

    if (rollBtn) {
      rollBtn.addEventListener("click", () => {
        currentIdx = (currentIdx + 1) % palettes.length;
        renderPalette(palettes[currentIdx]);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }

    renderPalette(palettes[0]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.creativeLab = new CreativeLab();
});
