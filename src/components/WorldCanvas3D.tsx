import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uVelocity;
  uniform vec2 uPointer;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPos;
  varying float vDisplacement;
  varying float vFresnel;

  // 3D Simplex-style noise (Ashima / Gustavson)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);

    // Frequency and amplitude morph with scroll and velocity
    float freq = 1.35 + sin(uScroll * 6.2831) * 0.55;
    float speed = uTime * 0.55;
    float n1 = snoise(position * freq + vec3(speed, speed * 0.8, -speed * 0.6));
    float n2 = snoise(position * (freq * 2.1) - vec3(speed * 1.2, uPointer.x * 1.5, uPointer.y * 1.5)) * 0.45;
    float disp = (n1 + n2) * (0.26 + clamp(abs(uVelocity) * 0.12, 0.0, 0.25));

    vDisplacement = disp;

    vec3 newPos = position + normal * disp;
    vec4 worldPosition = modelMatrix * vec4(newPos, 1.0);
    vWorldPos = worldPosition.xyz;
    vPosition = newPos;

    vec3 viewDir = normalize(cameraPosition - worldPosition.xyz);
    vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
    vFresnel = pow(1.0 - max(dot(viewDir, worldNormal), 0.0), 2.6);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPos;
  varying float vDisplacement;
  varying float vFresnel;

  // Inigo Quilez cosine iridescence palette
  vec3 palette(float t) {
    vec3 a = vec3(0.06, 0.12, 0.18);
    vec3 b = vec3(0.08, 0.45, 0.38);
    vec3 c = vec3(1.0, 1.0, 0.85);
    vec3 d = vec3(0.00, 0.33, 0.67);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir1 = normalize(vec3(2.5, 3.0, 4.0));
    vec3 lightDir2 = normalize(vec3(-3.0, -2.0, 2.0));

    float diff1 = max(dot(normal, lightDir1), 0.0);
    float diff2 = max(dot(normal, lightDir2), 0.0);

    // Specular highlight
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 halfDir = normalize(lightDir1 + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 48.0);

    // Iridescent liquid metal base
    float colorIndex = vDisplacement * 1.6 + uScroll * 1.4 + uTime * 0.08;
    vec3 irid = palette(colorIndex);

    vec3 obsidian = vec3(0.02, 0.035, 0.065);
    vec3 emerald = vec3(0.0, 0.96, 0.63);
    vec3 cyan = vec3(0.0, 0.85, 0.96);
    vec3 gold = vec3(0.95, 0.76, 0.32);

    // Blend accent color across scroll chapters
    float chapter = fract(uScroll * 1.5);
    vec3 rimAccent = mix(emerald, mix(cyan, gold, smoothstep(0.3, 0.85, uScroll)), 0.55);

    vec3 color = mix(obsidian, irid, 0.52);
    color += diff1 * emerald * 0.28;
    color += diff2 * gold * 0.18;
    color += vFresnel * rimAccent * 1.15;
    color += spec * vec3(0.88, 1.0, 0.96) * 0.75;

    // Subtle scanline interference on the 3D surface
    float scan = sin(vWorldPos.y * 28.0 - uTime * 3.0) * 0.03;
    color += scan * emerald;

    gl_FragColor = vec4(color, 0.94);
  }
`;

export const WorldCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
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
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x030508, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.065);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(0, 0, 7.5);

    // Master stage group that moves through space as user scrolls
    const rigGroup = new THREE.Group();
    scene.add(rigGroup);

    const coreGroup = new THREE.Group();
    rigGroup.add(coreGroup);

    // 1. Custom GLSL Liquid-Metal Morphing Singularity Core
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };

    const coreGeo = new THREE.IcosahedronGeometry(1.42, 48);
    const coreMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Outer Geodesic Wireframe Shell
    const cageGeo = new THREE.IcosahedronGeometry(1.92, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      wireframe: true,
      transparent: true,
      opacity: 0.11,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // 3. Three Precision Gyroscopic Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.45, 0.012, 16, 140);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      transparent: true,
      opacity: 0.42,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.set(Math.PI * 0.35, Math.PI * 0.12, 0);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.95, 0.009, 16, 140);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xe5b84b,
      transparent: true,
      opacity: 0.28,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(-Math.PI * 0.28, Math.PI * 0.38, 0);
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.48, 0.007, 16, 140);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x00d9f5,
      transparent: true,
      opacity: 0.18,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.set(Math.PI * 0.18, -Math.PI * 0.44, 0);
    coreGroup.add(ring3);

    // 4. Orbiting Crystalline Satellites
    const shardGroup = new THREE.Group();
    coreGroup.add(shardGroup);
    const shardGeo = new THREE.OctahedronGeometry(0.085, 0);
    const shardMatEmerald = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const shardMatGold = new THREE.MeshBasicMaterial({
      color: 0xe5b84b,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    const shards: { mesh: THREE.Mesh; radius: number; speed: number; angle: number; yOffset: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(shardGeo, i % 2 === 0 ? shardMatEmerald : shardMatGold);
      const radius = 2.2 + (i % 4) * 0.42;
      const angle = (i / 14) * Math.PI * 2;
      const yOffset = (Math.sin(i * 2.1) - 0.5) * 1.4;
      m.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      shardGroup.add(m);
      shards.push({ mesh: m, radius, speed: 0.25 + (i % 5) * 0.08, angle, yOffset });
    }

    // 5. Deep Space 3D Particle Vortex (1,800 particles)
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cEmerald = new THREE.Color(0x00f5a0);
    const cCyan = new THREE.Color(0x00d9f5);
    const cGold = new THREE.Color(0xe5b84b);
    const cWhite = new THREE.Color(0xdbeafe);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = 1.8 + Math.random() * 14.0;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 26.0;
      positions[i3] = Math.cos(theta) * r;
      positions[i3 + 1] = Math.sin(theta) * r;
      positions[i3 + 2] = z;

      const pick = i % 5 === 0 ? cGold : i % 3 === 0 ? cEmerald : i % 2 === 0 ? cCyan : cWhite;
      colors[i3] = pick.r;
      colors[i3 + 1] = pick.g;
      colors[i3 + 2] = pick.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.036,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleField);

    // State for pointer + scroll choreography
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothScroll = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerTargetX = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointerTargetY = -((e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Compute target 3D core position based on normalized scroll progress (0..1)
    const getStageTarget = (p: number, isMobile: boolean) => {
      if (isMobile) {
        return {
          x: Math.sin(p * Math.PI * 3) * 0.45,
          y: 0.35 - p * 0.5,
          z: -0.9 - Math.sin(p * Math.PI) * 0.8,
          scale: 0.76,
        };
      }
      // Desktop multi-chapter spatial choreography
      // 0.00 (Hero): Right side framing the hero headline
      // 0.16 (3D Orbit Ring): Center deep behind the ring
      // 0.38 (Selected Work): Left side counter-balancing the bento grid
      // 0.58 (Services & Video): Right side
      // 0.78 (Journey & Education): Left-center
      // 1.00 (Contact): Center reactor horizon
      const x = Math.cos(p * Math.PI * 3.2) * 1.95;
      const y = Math.sin(p * Math.PI * 2.0) * 0.45;
      const z = -0.35 - Math.sin(p * Math.PI) * 1.15;
      const scale = 0.95 + Math.cos(p * Math.PI * 2.0) * 0.12;
      return { x, y, z, scale };
    };

    let rafId = 0;
    let clock = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const currentScrollY = window.scrollY;
      const rawProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity += (deltaY * 0.04 - scrollVelocity) * 0.12;
      smoothScroll += (rawProgress - smoothScroll) * 0.075;

      pointerX += (pointerTargetX - pointerX) * 0.06;
      pointerY += (pointerTargetY - pointerY) * 0.06;

      if (!prefersReducedMotion) {
        clock += 0.012;
      }

      uniforms.uTime.value = clock;
      uniforms.uScroll.value = smoothScroll;
      uniforms.uVelocity.value = scrollVelocity;
      uniforms.uPointer.value.set(pointerX, pointerY);

      const isMobile = window.innerWidth < 960;
      const target = getStageTarget(smoothScroll, isMobile);

      coreGroup.position.x += (target.x + pointerX * 0.35 - coreGroup.position.x) * 0.06;
      coreGroup.position.y += (target.y + pointerY * 0.28 - coreGroup.position.y) * 0.06;
      coreGroup.position.z += (target.z - coreGroup.position.z) * 0.06;

      const s = target.scale;
      coreGroup.scale.setScalar(s);

      // Rotate core and gyroscopic rings with scroll + time
      coreMesh.rotation.y = clock * 0.35 + smoothScroll * Math.PI * 2.4 + pointerX * 0.4;
      coreMesh.rotation.x = clock * 0.22 + smoothScroll * Math.PI * 1.2 - pointerY * 0.3;

      cageMesh.rotation.y = -clock * 0.28 - smoothScroll * Math.PI * 2.0;
      cageMesh.rotation.z = clock * 0.15;

      ring1.rotation.z = clock * 0.48 + smoothScroll * 5.0;
      ring1.rotation.x = Math.PI * 0.35 + smoothScroll * 1.8;

      ring2.rotation.z = -clock * 0.36 - smoothScroll * 4.2;
      ring2.rotation.y = Math.PI * 0.38 + smoothScroll * 2.1;

      ring3.rotation.z = clock * 0.25 + smoothScroll * 3.4;

      shards.forEach((sh, idx) => {
        const a = sh.angle + clock * sh.speed + smoothScroll * 4.0;
        sh.mesh.position.x = Math.cos(a) * sh.radius;
        sh.mesh.position.z = Math.sin(a) * sh.radius;
        sh.mesh.position.y = sh.yOffset + Math.sin(clock * 1.5 + idx) * 0.22;
        sh.mesh.rotation.x = clock * 1.2;
        sh.mesh.rotation.y = clock * 0.9;
      });

      // Scroll-driven particle tunnel rotation and camera banking
      particleField.rotation.z = smoothScroll * Math.PI * 1.4 + clock * 0.04;
      particleField.rotation.y = pointerX * 0.18;
      particleField.rotation.x = -pointerY * 0.14;
      particleField.position.z = (smoothScroll * 8.0) % 4.0;

      camera.position.x += (pointerX * 0.25 - camera.position.x) * 0.05;
      camera.position.y += (pointerY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      shardGeo.dispose();
      shardMatEmerald.dispose();
      shardMatGold.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
};
