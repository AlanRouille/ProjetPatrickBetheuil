"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeLogo = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.appendChild(renderer.domElement);
    }

    // Chargement du logo
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/images/Logo.svg");

    const geometry = new THREE.PlaneGeometry(5, 5);

    // Matériau avec effet de verr
    const material = new THREE.MeshPhysicalMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.8,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const logoMesh = new THREE.Mesh(geometry, material);
    scene.add(logoMesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Dispose du renderer pour libérer la mémoire
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default ThreeLogo;
