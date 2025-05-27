"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const MilkyWayBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Stars
    const starCount = 5000;
    const starVertices = new Float32Array(starCount * 3);
    const starVelocities = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const index = i * 3;
      starVertices[index] = (Math.random() - 0.5) * 200;
      starVertices[index + 1] = (Math.random() - 0.5) * 200;
      starVertices[index + 2] = (Math.random() - 0.5) * 200;
      starSizes[i] = 1 + Math.random(); // random base size
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starVertices, 3));
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starsGeometry, starMaterial);
    scene.add(stars);

    // Glowing Galactic Core
    const coreTexture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/sprites/glow.png"
    );
    const glowMaterial = new THREE.SpriteMaterial({
      map: coreTexture,
      color: 0xffddaa,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(20, 20, 1);
    scene.add(glow);

    const coreLight = new THREE.PointLight(0xffddaa, 3, 100);
    scene.add(coreLight);

    // Parallax
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Click scatter pulse
    const onClick = (e) => {
      const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const clickPoint = raycaster.ray.origin
        .clone()
        .add(raycaster.ray.direction.clone().multiplyScalar(10));

      const posAttr = starsGeometry.getAttribute("position");
      for (let i = 0; i < starCount; i++) {
        const ix = i * 3;
        const star = new THREE.Vector3(
          posAttr.array[ix],
          posAttr.array[ix + 1],
          posAttr.array[ix + 2]
        );
        const dist = star.distanceTo(clickPoint);
        if (dist < 15) {
          const direction = star.clone().sub(clickPoint).normalize();
          const force = Math.pow(15 - dist, 2) * 0.03; // pulse force
          starVelocities[ix] += direction.x * force;
          starVelocities[ix + 1] += direction.y * force;
          starVelocities[ix + 2] += direction.z * force;
        }
      }
    };
    window.addEventListener("click", onClick);

    // Animate
    let clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      stars.rotation.y += 0.0007;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      stars.rotation.x = targetY * 0.3;

      const pos = starsGeometry.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        const ix = i * 3;
        pos[ix] += starVelocities[ix];
        pos[ix + 1] += starVelocities[ix + 1];
        pos[ix + 2] += starVelocities[ix + 2];

        // Fade out velocities
        starVelocities[ix] *= 0.93;
        starVelocities[ix + 1] *= 0.93;
        starVelocities[ix + 2] *= 0.93;
      }

      // Twinkling stars
      starMaterial.size = 0.05 + 0.01 * Math.sin(elapsed * 5);

      starsGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      containerRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      starsGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default MilkyWayBackground;
