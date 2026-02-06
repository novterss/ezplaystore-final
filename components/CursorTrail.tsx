'use client';

import { useEffect, useRef } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const points = useRef<{ x: number; y: number; age: number }[]>([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize canvas to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            // Add point immediately for smoother trail
            points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrame: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Filter dead points and age existing ones
            points.current = points.current
                .map(p => ({ ...p, age: p.age + 1 }))
                .filter(p => p.age < 25); // Trail length

            // Draw line
            if (points.current.length > 1) {
                ctx.beginPath();
                ctx.moveTo(points.current[0].x, points.current[0].y);

                for (let i = 1; i < points.current.length; i++) {
                    const point = points.current[i];
                    const p1 = points.current[i - 1];
                    const p2 = point;

                    const xc = (p1.x + p2.x) / 2;
                    const yc = (p1.y + p2.y) / 2;

                    ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
                }

                // Gradient stroke
                const gradient = ctx.createLinearGradient(
                    points.current[0].x, points.current[0].y,
                    points.current[points.current.length - 1].x, points.current[points.current.length - 1].y
                );

                gradient.addColorStop(0, 'rgba(168, 85, 247, 0)'); // Fading tail
                gradient.addColorStop(1, 'rgba(168, 85, 247, 0.8)'); // Bright head

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[60]" // z-60 to be above everything but modal
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default CursorTrail;
