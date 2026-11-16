import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // Root group shifted slightly to frame the hero composition nicely
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Wireframe futuristic AI icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.75, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x14f195,
      wireframe: true,
      transparent: true,
      opacity: 0.34,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // 2. Inner glowing octahedron core
    const innerGeo = new THREE.OctahedronGeometry(0.95, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf5c451,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 3. Outer emerald orbital ring
    const ring1Geo = new THREE.TorusGeometry(2.55, 0.016, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x14f195,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.36;
    ring1.rotation.y = Math.PI * 0.14;
    coreGroup.add(ring1);

    // 4. Secondary gold orbital gyro ring
    const ring2Geo = new THREE.TorusGeometry(3.05, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.38,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.y = Math.PI * 0.42;
    coreGroup.add(ring2);

    // 5. Floating particle constellation
    const particleCount = 160;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const emeraldColor = new THREE.Color(0x14f195);
    const goldColor = new THREE.Color(0xf5c451);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = i % 3 === 0 ? goldColor : emeraldColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particleSystem);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let inView = true;
    let rafId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx * 0.45;
      targetY = ny * 0.35;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let clock = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!inView) return;

      if (!prefersReducedMotion) {
        clock += 0.008;
        icoMesh.rotation.y = clock * 0.65;
        icoMesh.rotation.x = clock * 0.32;
        innerMesh.rotation.y = -clock * 1.1;
        innerMesh.rotation.z = clock * 0.55;
        ring1.rotation.z = clock * 0.5;
        ring2.rotation.z = -clock * 0.38;
        particleSystem.rotation.y = clock * 0.18;
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      coreGroup.rotation.y = currentX;
      coreGroup.rotation.x = -currentY * 0.6;

      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-85"
    >
      {!webglSupported && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-72 w-72 rounded-full border border-[#14F195]/30 bg-[#10A37F]/10 blur-2xl" />
        </div>
      )}
    </div>
  );
};
