'use client';

import { useEffect, useRef } from 'react';

const InteractiveStarBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;

        // Configuration
        const STAR_COUNT = 450; // Increased count for better look
        const CONNECTION_DISTANCE = 100;
        const MOUSE_REPULSION_RADIUS = 300; // Radius where stars flee
        const MOUSE_REPULSION_FORCE = 0.8; // How fast they flee

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseX: number; // To return to original functionality if needed, but here we just drift
            baseY: number;
            alpha: number;
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.2, // Drift velocity
                    vy: (Math.random() - 0.5) * 0.2,
                    size: Math.random() * 2 + 0.5,
                    baseX: 0,
                    baseY: 0,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        };

        // Mouse state
        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw nebula background effect (static or slow moving could affect performance, so keep simple)
            // Using CSS for static background image is better for performance. This canvas just draws stars.

            particles.forEach((p) => {
                // Background Drift
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around screen
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Interaction: Repulsion from mouse
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_REPULSION_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (MOUSE_REPULSION_RADIUS - distance) / MOUSE_REPULSION_RADIUS;
                    const repulsionX = Math.cos(angle) * force * 5; // Strength multiplier
                    const repulsionY = Math.sin(angle) * force * 5;

                    p.x += repulsionX;
                    p.y += repulsionY;
                }

                // Draw Star
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });

            // Draw "Shooting Stars" occasionally could be added here, but sticking to core requirement first

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 bg-[#050505] overflow-hidden">
            {/* Static Image Background Layer for Performance */}
            <div
                className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none bg-[url('/images/websitebg.jpg')] bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* The Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10"
            />
        </div>
    );
};

export default InteractiveStarBackground;
