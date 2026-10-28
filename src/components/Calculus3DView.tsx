import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { formatNum } from '../math/calculus';
import { playClickSound } from '../utils/soundEffects';
import { Play, Pause, RotateCcw, Compass, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

interface Calculus3DViewProps {
  onBack?: () => void;
}

export const Calculus3DView: React.FC<Calculus3DViewProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [posX, setPosX] = useState<number>(0);
  const [curveType, setCurveType] = useState<'cubic' | 'wave' | 'parabola'>('cubic');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // Current slope readout
  const [currentSlope, setCurrentSlope] = useState<number>(0);

  // Curve definition functions: y = f(x), slope = f'(x)
  const getCurveData = (x: number, type: 'cubic' | 'wave' | 'parabola') => {
    if (type === 'cubic') {
      // Smooth roller coaster S-curve: y = 0.08 * (x^3 - 9x)
      const y = 0.08 * (x * x * x - 9 * x);
      const slope = 0.08 * (3 * x * x - 9);
      return { y, slope };
    }
    if (type === 'wave') {
      // Harmonic wave: y = 2 * sin(0.8 * x)
      const y = 2 * Math.sin(0.8 * x);
      const slope = 1.6 * Math.cos(0.8 * x);
      return { y, slope };
    }
    // Parabola: y = 0.25 * x^2 - 2
    const y = 0.25 * x * x - 2;
    const slope = 0.5 * x;
    return { y, slope };
  };

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;

    // Detect Software WebGL (SwiftShader, llvmpipe) as per skill instructions
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.Fog(0xf8fafc, 25, 60);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 8, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 6;
    controls.maxDistance = 35;
    controls.target.set(0, 0, 0);

    // Studio Environment Lighting via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(8, 15, 10);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0xf1f5f9, 1.2);
    scene.add(hemiLight);

    // Ground Grid Floor Plane
    const gridHelper = new THREE.GridHelper(30, 30, 0xc7d2fe, 0xe2e8f0);
    gridHelper.position.y = -4;
    scene.add(gridHelper);

    // Composite 5-Part Procedural Duck Cart Model (THREE.Group)
    // 1. Cart Chassis, 2. Wheels, 3. Duck Body, 4. Beak, 5. Mortarboard Cap
    const duckCart = new THREE.Group();

    // Part 1: Cart wooden / metal base
    const chassisGeo = new THREE.BoxGeometry(1.6, 0.35, 1.0);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      metalness: 0.3,
      roughness: 0.4,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.25;
    duckCart.add(chassis);

    // Part 2: 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const wheelPositions = [
      [-0.6, 0.15, 0.55],
      [0.6, 0.15, 0.55],
      [-0.6, 0.15, -0.55],
      [0.6, 0.15, -0.55],
    ];
    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      duckCart.add(wheel);
    });

    // Part 3: Duck Body & Head
    const duckBodyGeo = new THREE.SphereGeometry(0.55, 20, 20);
    const duckMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.3,
      metalness: 0.05,
    });
    const duckBody = new THREE.Mesh(duckBodyGeo, duckMat);
    duckBody.position.set(0, 0.8, 0);
    duckCart.add(duckBody);

    // Part 4: Orange Beak
    const beakGeo = new THREE.ConeGeometry(0.18, 0.35, 12);
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.rotation.z = -Math.PI / 2;
    beak.position.set(0.65, 0.8, 0);
    duckCart.add(beak);

    // Part 5: Scholar Cap (Mortarboard)
    const capBaseGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.12, 16);
    const capTopGeo = new THREE.BoxGeometry(0.7, 0.05, 0.7);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 });
    const capBase = new THREE.Mesh(capBaseGeo, capMat);
    const capTop = new THREE.Mesh(capTopGeo, capMat);
    capBase.position.set(0, 1.35, 0);
    capTop.position.set(0, 1.45, 0);
    duckCart.add(capBase);
    duckCart.add(capTop);

    scene.add(duckCart);

    // Dynamic 3D Tangent Vector Line Indicator
    const tangentLength = 4.5;
    const tangentGeo = new THREE.CylinderGeometry(0.08, 0.08, tangentLength, 12);
    const tangentMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      emissive: 0x0f766e,
      emissiveIntensity: 0.25,
      metalness: 0.4,
      roughness: 0.2,
    });
    const tangentLineMesh = new THREE.Mesh(tangentGeo, tangentMat);
    scene.add(tangentLineMesh);

    // Tube Track Geometry for the curve
    let trackMesh: THREE.Mesh | null = null;
    const updateTrackMesh = (type: 'cubic' | 'wave' | 'parabola') => {
      if (trackMesh) {
        scene.remove(trackMesh);
        trackMesh.geometry.dispose();
      }

      const points: THREE.Vector3[] = [];
      const steps = 140;
      for (let i = 0; i <= steps; i++) {
        const tx = -6 + (12 * i) / steps;
        const { y: ty } = getCurveData(tx, type);
        points.push(new THREE.Vector3(tx, ty, 0));
      }

      const curvePath = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curvePath, 120, 0.22, 12, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.25,
        metalness: 0.35,
      });

      trackMesh = new THREE.Mesh(tubeGeo, tubeMat);
      trackMesh.castShadow = !isSoftwareGl;
      trackMesh.receiveShadow = !isSoftwareGl;
      scene.add(trackMesh);
    };

    updateTrackMesh(curveType);

    // Animation Loop
    let animationFrameId = 0;
    let localX = posX;
    let direction = 1;

    function tick() {
      // Advance cart if playing
      if (isPlaying) {
        localX += 0.03 * direction;
        if (localX > 5.5) {
          direction = -1;
        } else if (localX < -5.5) {
          direction = 1;
        }
        setPosX(localX);
      }

      // Update Duck Cart position & inclination angle
      const { y: curY, slope: curSlope } = getCurveData(localX, curveType);
      setCurrentSlope(curSlope);

      duckCart.position.set(localX, curY, 0);

      // Incline rotation angle based on derivative slope (tan theta = slope)
      const angle = Math.atan(curSlope);
      duckCart.rotation.z = angle;

      // Update Tangent Vector line
      tangentLineMesh.position.set(localX, curY, 0);
      tangentLineMesh.rotation.z = angle + Math.PI / 2;

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [curveType, isPlaying]);

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-50">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Header Spec Badge (Zero Viewport Occlusion) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm text-xs font-semibold text-slate-800">
        <span className="text-base">🐤</span>
        <span>Wahana Kalkulus 3D: Garis Singgung & Kemiringan Lintasan</span>
        <span className="text-indigo-600 font-bold font-mono">
          m = {formatNum(currentSlope)}
        </span>
      </div>

      {/* Unified Bottom Control Dock (Adheres to ThreeJS skill instructions) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[92%] max-w-xl transition-all duration-300 ${
          isDockCollapsed ? 'translate-y-[calc(100%-2.25rem)]' : 'translate-y-0'
        }`}
      >
        <div className="bg-slate-900/90 text-white backdrop-blur-md rounded-2xl border border-slate-700/80 p-3.5 shadow-xl space-y-2.5">
          {/* Dock Header Toggle */}
          <div className="flex items-center justify-between text-xs font-semibold pb-1 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              Kontrol Simulasi 3D
            </span>
            <button
              onClick={() => setIsDockCollapsed((c) => !c)}
              type="button"
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <span>{isDockCollapsed ? 'Buka Kontrol' : 'Sembunyikan'}</span>
              {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Play / Pause */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsPlaying((p) => !p);
                  playClickSound();
                }}
                type="button"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Jeda' : 'Jalankan'}</span>
              </button>
            </div>

            {/* Model Curve Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Bentuk Kurva:</span>
              <button
                onClick={() => {
                  setCurveType('cubic');
                  playClickSound();
                }}
                type="button"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  curveType === 'cubic' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Kubik S
              </button>
              <button
                onClick={() => {
                  setCurveType('wave');
                  playClickSound();
                }}
                type="button"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  curveType === 'wave' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Gelombang
              </button>
              <button
                onClick={() => {
                  setCurveType('parabola');
                  playClickSound();
                }}
                type="button"
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  curveType === 'parabola' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Parabola
              </button>
            </div>

            {/* Realtime Slope Pill */}
            <div className="font-mono text-[11px] text-teal-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
              Gradien m = <strong>{formatNum(currentSlope)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
