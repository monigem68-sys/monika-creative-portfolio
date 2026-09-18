/**
 * MONIKA // THREE.JS 3D HERO VISUALIZER + CANVAS FALLBACK
 * Renders a kinetic geometric wireframe orb with particle field reacting to mouse movement.
 */

class HeroVisualizer {
  constructor() {
    this.container = document.getElementById("hero-canvas-container");
    if (!this.container) return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isThreeLoaded = typeof window.THREE !== "undefined";

    if (this.isThreeLoaded) {
      this.initThree();
    } else {
      this.initCanvasFallback();
    }

    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener("mousemove", (e) => {
      // Normalize mouse coordinates (-1 to 1)
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("resize", () => {
      if (this.isThreeLoaded && this.camera && this.renderer) {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      } else if (this.fallbackCanvas) {
        this.fallbackCanvas.width = this.container.clientWidth;
        this.fallbackCanvas.height = this.container.clientHeight;
      }
    });
  }

  initThree() {
    const THREE = window.THREE;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 7;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Group for mouse tilt
    this.meshGroup = new THREE.Group();
    this.scene.add(this.meshGroup);

    // 1. Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    this.outerMesh = new THREE.Mesh(outerGeo, outerMat);
    this.meshGroup.add(this.outerMesh);

    // 2. Inner Glowing Core Dodecahedron
    const innerGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.meshGroup.add(this.innerMesh);

    // 3. Glowing Vertices Points
    const pointsGeo = new THREE.IcosahedronGeometry(2.32, 1);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
    });
    this.pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    this.meshGroup.add(this.pointsMesh);

    // 4. Floating Particle Cloud
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x58a6ff,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);

    this.animateThree();
  }

  animateThree() {
    requestAnimationFrame(() => this.animateThree());

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Rotations
    this.outerMesh.rotation.x += 0.003;
    this.outerMesh.rotation.y += 0.005;

    this.innerMesh.rotation.x -= 0.005;
    this.innerMesh.rotation.y -= 0.004;

    this.pointsMesh.rotation.x += 0.003;
    this.pointsMesh.rotation.y += 0.005;

    this.particles.rotation.y += 0.0008;

    // React to cursor tilt
    this.meshGroup.rotation.y = this.mouse.x * 0.55;
    this.meshGroup.rotation.x = -this.mouse.y * 0.55;

    this.renderer.render(this.scene, this.camera);
  }

  /* Robust 2D Canvas Fallback if WebGL/Three.js CDN is unavailable */
  initCanvasFallback() {
    this.fallbackCanvas = document.createElement("canvas");
    this.fallbackCanvas.width = this.container.clientWidth || 400;
    this.fallbackCanvas.height = this.container.clientHeight || 400;
    this.ctx = this.fallbackCanvas.getContext("2d");
    this.container.appendChild(this.fallbackCanvas);

    this.angleX = 0;
    this.angleY = 0;

    // Generate 3D sphere vertices
    this.nodes = [];
    const count = 70;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      this.nodes.push({
        x: 140 * Math.cos(theta) * Math.sin(phi),
        y: 140 * Math.sin(theta) * Math.sin(phi),
        z: 140 * Math.cos(phi),
      });
    }

    this.animateCanvasFallback();
  }

  animateCanvasFallback() {
    requestAnimationFrame(() => this.animateCanvasFallback());
    const ctx = this.ctx;
    const w = this.fallbackCanvas.width;
    const h = this.fallbackCanvas.height;

    ctx.clearRect(0, 0, w, h);

    this.angleX += 0.008;
    this.angleY += 0.006;

    const rotX = this.angleX + this.mouse.targetY * 0.4;
    const rotY = this.angleY + this.mouse.targetX * 0.4;

    const projected = this.nodes.map((node) => {
      // 3D rotation matrix
      let x = node.x * Math.cos(rotY) - node.z * Math.sin(rotY);
      let z = node.z * Math.cos(rotY) + node.x * Math.sin(rotY);
      let y = node.y * Math.cos(rotX) - z * Math.sin(rotX);
      z = z * Math.cos(rotX) + node.y * Math.sin(rotX);

      // Perspective projection
      const fov = 350;
      const scale = fov / (fov + z);
      return {
        x: x * scale + w / 2,
        y: y * scale + h / 2,
        scale: scale,
        alpha: Math.max(0.15, (z + 140) / 280),
      };
    });

    // Draw connecting wireframe lines
    ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 55) {
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing vertices
    projected.forEach((p) => {
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.heroVisualizer = new HeroVisualizer();
});
