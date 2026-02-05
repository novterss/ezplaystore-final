'use client';

const NewsTicker = () => {
    return (
        <div className="w-full bg-black/40 backdrop-blur-xl border-b border-white/5 text-sm py-3 overflow-hidden relative z-40 shadow-lg">
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="animate-marquee whitespace-nowrap inline-block">
                <div className="flex gap-32 font-mono items-center tracking-wide">
                    <span className="flex items-center gap-3 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]" />
                        Status: <span className="text-white font-bold">All Systems Normal</span>
                    </span>
                    <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        🛠️ รับลงโปรแกรมทุกชนิด <span className="text-purple-400 font-bold">50 บาท</span> (ทักแชท Discord)
                    </span>
                    <span className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                        🔥 New: <span className="text-white font-bold">After Effects 2026</span> & Plugins Updated!
                    </span>
                    <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                        ✨ Update: Website V2.0 Live Now!
                    </span>

                    {/* Duplicate for infinite loop illusion */}
                    <span className="flex items-center gap-3 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]" />
                        Status: <span className="text-white font-bold">All Systems Normal</span>
                    </span>
                    <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        🛠️ รับลงโปรแกรมทุกชนิด <span className="text-purple-400 font-bold">50 บาท</span> (ทักแชท Discord)
                    </span>
                    <span className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                        🔥 New: <span className="text-white font-bold">After Effects 2026</span> & Plugins Updated!
                    </span>
                    <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                        ✨ Update: Website V2.0 Live Now!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
