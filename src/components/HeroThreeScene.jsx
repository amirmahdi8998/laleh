import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.35, 8.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const facadeMat = new THREE.MeshStandardMaterial({ color: 0xb07a45, roughness: 0.62, metalness: 0.12 });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xd8d2c2, roughness: 0.8, metalness: 0.04 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x243443, roughness: 0.44, metalness: 0.26 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd6ae5d, roughness: 0.28, metalness: 0.5, emissive: 0x2c1800, emissiveIntensity: 0.18 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x111720, roughness: 0.28, metalness: 0.45, transparent: true, opacity: 0.72 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.25, 0.78), facadeMat);
    body.position.set(0, -0.25, 0);
    group.add(body);

    const side = new THREE.Mesh(new THREE.BoxGeometry(0.68, 3.35, 0.92), sideMat);
    side.position.set(2.12, -0.2, 0.03);
    group.add(side);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.95, 0.38, 1), roofMat);
    roof.position.set(-0.02, 1.58, 0.02);
    roof.rotation.z = -0.02;
    group.add(roof);

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 10; col++) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.022), glassMat);
        win.position.set(-1.52 + col * 0.32, -1.45 + row * 0.29, 0.405);
        group.add(win);
        if ((row + col) % 5 === 0) {
          const light = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.026), goldMat);
          light.position.set(win.position.x, win.position.y, 0.422);
          group.add(light);
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.045, 3.38, 0.035), goldMat);
      rib.position.set(-1.77 + i * 0.58, -0.22, 0.44);
      rib.rotation.z = -0.05;
      group.add(rib);
    }

    const tower = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.028, 2.4, 16), goldMat);
    stem.position.set(-4.25, -1.05, -0.5);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 12), goldMat);
    head.position.set(-4.25, 0.18, -0.5);
    const deck = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.015, 12, 40), goldMat);
    deck.position.set(-4.25, 0.18, -0.5);
    deck.rotation.x = Math.PI / 2;
    tower.add(stem, head, deck);
    scene.add(tower);

    const particleCount = 380;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = -2.2 + Math.random() * 4.8;
      positions[i * 3 + 2] = -2.5 + Math.random() * 2.4;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ color: 0xf4d486, size: 0.018, transparent: true, opacity: 0.62 }));
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    const key = new THREE.PointLight(0xffc468, 13, 18);
    key.position.set(-3.5, 3.5, 5);
    const violet = new THREE.PointLight(0x7d6cff, 5, 18);
    violet.position.set(4, 2, 3.5);
    scene.add(ambient, key, violet);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = -0.34 + Math.sin(t * 0.45) * 0.035 + mouse.x * 0.06;
      group.rotation.x = Math.sin(t * 0.5) * 0.018 - mouse.y * 0.035;
      group.position.y = Math.sin(t * 0.8) * 0.035;
      tower.rotation.y = mouse.x * 0.08;
      particles.rotation.y = t * 0.025;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      particlesGeo.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="three-scene hero-hotel-model" ref={mountRef} aria-hidden="true" />;
}
