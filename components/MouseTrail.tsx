'use client';

import { useEffect, useRef } from 'react';

const MouseTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const createParticle = (x: number, y: number) => {
            const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ffffff']; // Purple shades
            particles.current.push({
                x,
                y,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                life: 1
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Create multiple particles for density
            for (let i = 0; i < 3; i++) {
                createParticle(e.clientX, e.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.current.forEach((p, index) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.02; // Fade out speed
                p.size *= 0.95; // Shrink speed

                if (p.life <= 0 || p.size <= 0.2) {
                    particles.current.splice(index, 1);
                } else {
                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();

                    // Add glow
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.color;
                }
            });

            // Reset glow for next frame
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default MouseTrail;
