'use client';

import { useEffect } from 'react';

const AntiDevTools = () => {
    useEffect(() => {
        // ===== Right-click disable =====
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            // Optional: show alert
            // alert('คลิกขวาไม่ได้นะจ๊ะ 😜');
        };

        // ===== Keyboard shortcuts disable =====
        const handleKeyDown = (e: KeyboardEvent) => {
            // Disable F12
            if (e.key === 'F12') {
                e.preventDefault();
                console.log('%c🚫 F12 ไม่ทำงานนะจ๊ะ', 'color: red; font-size: 20px;');
            }

            // Disable Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
            }

            // Disable Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
            }

            // Disable Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
            }

            // Disable Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
            }
        };

        // ===== Console warning message =====
        const showConsoleWarning = () => {
            console.clear();
            console.log('%c⚠️ หยุด!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 4px #000;');
            console.log('%cนี่คือฟีเจอร์เบราว์เซอร์สำหรับนักพัฒนา', 'font-size: 16px;');
            console.log('%c🚫 จะก็อปหาพ่อมึงเหรอ ไปทำเองไป', 'color: orange; font-size: 18px; font-weight: bold;');
            console.log('%c💀 ก็อปไปแล้วพังอย่ามาโวยวาย', 'color: red; font-size: 14px;');
            console.log('%c😂 กูเห็นมึงอยู่นะ', 'color: purple; font-size: 14px;');
            console.log('%c🔒 Anti-Copy System by EzplaystoreTH', 'color: cyan; font-size: 12px;');
        };

        // ===== DevTools detection =====
        let devToolsOpen = false;
        const threshold = 160;

        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;

            if (widthThreshold || heightThreshold) {
                if (!devToolsOpen) {
                    devToolsOpen = true;
                    showConsoleWarning();
                }
            } else {
                devToolsOpen = false;
            }
        };

        // Add event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        // Show initial console warning
        showConsoleWarning();

        // Check for DevTools periodically
        const interval = setInterval(detectDevTools, 1000);

        // Cleanup
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default AntiDevTools;
