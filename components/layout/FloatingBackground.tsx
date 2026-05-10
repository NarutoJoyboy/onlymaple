'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import MapleLeaf from '@/public/MapleLeaf.svg'; // Your local file import

export const FloatingBackground = () => {
  const leaf1Ref = useRef<HTMLDivElement>(null);
  const leaf2Ref = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Physics state for 2 leaves
  // Increased velocity (dx/dy) slightly for better movement visibility
  const physics = useRef({
    leaf1: { x: 50, y: 50, dx: 1.5, dy: 1.0, rot: 90, rotSpeed: 0.3, size: 384 }, // w-96 is ~384px
    leaf2: { x: 400, y: 300, dx: -1.2, dy: -1.6, rot: 45, rotSpeed: -0.7, size: 500 }, // w-[500px] is 500px
  });

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const p1 = physics.current.leaf1;
      const p2 = physics.current.leaf2;

      // 1. Move based on velocity
      p1.x += p1.dx;
      p1.y += p1.dy;
      p1.rot += p1.rotSpeed;

      p2.x += p2.dx;
      p2.y += p2.dy;
      p2.rot += p2.rotSpeed;

      // 2. Wall Collisions (Bounce off screen edges)
      // Check Leaf 1
      if (p1.x + p1.size > width || p1.x < -100) p1.dx = -p1.dx;
      if (p1.y + p1.size > height || p1.y < -100) p1.dy = -p1.dy;

      // Check Leaf 2
      if (p2.x + p2.size > width || p2.x < -100) p2.dx = -p2.dx;
      if (p2.y + p2.size > height || p2.y < -100) p2.dy = -p2.dy;

      // 3. Leaf-to-Leaf Collision Check
      const c1 = { x: p1.x + p1.size / 2, y: p1.y + p1.size / 2 };
      const c2 = { x: p2.x + p2.size / 2, y: p2.y + p2.size / 2 };

      const dx = c2.x - c1.x;
      const dy = c2.y - c1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Hitbox radius: 55% of size provides a good overlap for irregular leaf shapes
      const r1 = p1.size * 0.55;
      const r2 = p2.size * 0.55;
      const minDistance = r1 + r2;

      if (distance < minDistance) {
        // --- Collision Detected ---
        
        // A. Resolve Overlap (prevent sticking)
        const overlap = minDistance - distance;
        const nx = dx / distance;
        const ny = dy / distance;
        const moveX = nx * overlap * 0.5;
        const moveY = ny * overlap * 0.5;

        p1.x -= moveX;
        p1.y -= moveY;
        p2.x += moveX;
        p2.y += moveY;

        // B. Bounce Physics (Elastic Collision)
        // Tangent vector
        const tx = -ny;
        const ty = nx;

        // Dot Product Tangent
        const dpTan1 = p1.dx * tx + p1.dy * ty;
        const dpTan2 = p2.dx * tx + p2.dy * ty;

        // Dot Product Normal
        const dpNorm1 = p1.dx * nx + p1.dy * ny;
        const dpNorm2 = p2.dx * nx + p2.dy * ny;

        // Conservation of momentum (mass proportional to size)
        const m1 = p1.size;
        const m2 = p2.size;

        const m1_final = (dpNorm1 * (m1 - m2) + 2 * m2 * dpNorm2) / (m1 + m2);
        const m2_final = (dpNorm2 * (m2 - m1) + 2 * m1 * dpNorm1) / (m1 + m2);

        // Update velocities
        p1.dx = tx * dpTan1 + nx * m1_final;
        p1.dy = ty * dpTan1 + ny * m1_final;
        p2.dx = tx * dpTan2 + nx * m2_final;
        p2.dy = ty * dpTan2 + ny * m2_final;
        
        // Spin reaction
        p1.rotSpeed = -p1.rotSpeed;
        p2.rotSpeed = -p2.rotSpeed;
      }

      // 4. Apply Transforms to DOM
      if (leaf1Ref.current) {
        leaf1Ref.current.style.transform = `translate3d(${p1.x}px, ${p1.y}px, 0) rotate(${p1.rot}deg)`;
      }
      if (leaf2Ref.current) {
        leaf2Ref.current.style.transform = `translate3d(${p2.x}px, ${p2.y}px, 0) rotate(${p2.rot}deg)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // Randomize start positions slightly to vary the path on reload
    physics.current.leaf1.x = Math.random() * (width - 400);
    physics.current.leaf2.x = Math.random() * (width - 600);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Leaf 1 */}
      <div 
        ref={leaf1Ref}
        className="absolute top-0 left-0 opacity-[0.08] w-96 h-96 will-change-transform"
      >
        <Image 
          priority 
          src={MapleLeaf} 
          alt="Floating Maple Leaf" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Leaf 2 */}
      <div 
        ref={leaf2Ref}
        className="absolute top-0 left-0 opacity-[0.08] w-[500px] h-[500px] will-change-transform"
      >
        <Image 
          priority 
          src={MapleLeaf} 
          alt="Floating Maple Leaf" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};