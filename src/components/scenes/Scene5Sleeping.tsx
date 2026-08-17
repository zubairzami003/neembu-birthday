import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CatsSleeping } from '../CatCharacters';
import { sound } from '../../utils/audio';
import { Moon, Sparkles, RotateCcw, Volume2, VolumeX, Heart } from 'lucide-react';

interface Scene5Props {
  onRestart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  date?: string;
}

export const Scene5Sleeping: React.FC<Scene5Props> = ({
  onRestart,
  isMuted,
  onToggleMute,
  date = '১৮ আগস্ট ২০২৬',
}) => {
  useEffect(() => {
    sound.startLullaby();
    return () => {
      sound.stopLullaby();
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#1E1F22] via-[#2B2D2B] to-[#1E2320] border-4 border-[#606C38]/40 p-3 sm:p-5 text-[#FAF6F0]">
      {/* Night Sky Stars & Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#E9C46A] animate-twinkle"
            style={{
              top: `${(i * 19) % 85}%`,
              left: `${(i * 29) % 95}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDelay: `${(i * 0.25) % 3}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Top Header */}
      <div className="text-center mb-1 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FAF6F0] mt-1 font-cute">
          &ldquo;শুভ রাত্রি, মিষ্টি স্বপ্ন...&rdquo; 🐱💤
        </h2>
      </div>

      {/* Cozy Bedroom Scene: Window with Moon + Night Lamp + Bed */}
      <div className="relative min-h-[250px] sm:min-h-[280px] flex flex-col items-center justify-center my-1">
        {/* Cozy Window in the Background */}
        <div className="absolute top-1 sm:top-3 w-28 sm:w-36 h-28 sm:h-36 rounded-t-full border-3 border-[#606C38]/40 bg-[#161816]/90 p-1.5 shadow-inner flex flex-col items-center justify-between overflow-hidden">
          {/* Crescent Moon in Window */}
          <div className="text-2xl sm:text-3xl text-[#E9C46A] filter drop-shadow-[0_0_10px_#DDA15E] mt-1 animate-float">
            🌙
          </div>
          {/* Stars in window */}
          <div className="text-[10px] sm:text-xs text-[#DDA15E]/80 tracking-widest">★ ✦ ★ ✧ ★</div>
          {/* Window pane bars */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#283618]/70" />
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#283618]/70" />
        </div>

        {/* Nightstand Table with Warm Lamp on side */}
        <div className="absolute right-3 sm:right-12 bottom-10 sm:bottom-14 flex flex-col items-center pointer-events-none">
          {/* Warm glowing lamp shade */}
          <div className="w-9 h-7 bg-[#E9C46A] rounded-t-full shadow-[0_0_25px_#BC6C25] border-2 border-[#DDA15E] flex items-center justify-center animate-pulse-soft">
            <span className="text-[10px]">💡</span>
          </div>
          <div className="w-0.5 h-6 bg-[#8C5E3D]" />
          <div className="w-6 h-1.5 bg-[#58311B] rounded-full" />
        </div>

        {/* Centerpiece: The Two Cats Sleeping Cuddled under Blanket */}
        <div className="relative z-10 flex flex-col items-center mt-12 sm:mt-16">
          <CatsSleeping />
          <div className="w-56 sm:w-72 h-3.5 bg-black/40 rounded-full -mt-2 blur-[2px]" />
        </div>

        {/* Floating Sweet Dream Words */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-2 text-center z-10"
        >
          <p className="text-[#DDA15E] font-cute font-bold text-xs sm:text-sm flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
            {date} • আজীবনের মধুর এক স্মৃতি
            <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
          </p>
        </motion.div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex flex-row items-center justify-between gap-2 mt-2 pt-2.5 border-t border-[#606C38]/40 relative z-10">
        {/* Lullaby Music Audio Button */}
        <button
          onClick={onToggleMute}
          className="px-3 py-1.5 rounded-xl bg-[#283618]/70 hover:bg-[#283618] text-[#DDA15E] text-xs font-semibold flex items-center gap-1.5 border border-[#606C38]/50 transition-colors"
          title={isMuted ? "সাউন্ড চালু করুন" : "সাউন্ড বন্ধ করুন"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#B85D43]" />
              <span>সাউন্ড বন্ধ</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#A3B18A] animate-pulse" />
              <span>সাউন্ড চালু 🎵</span>
            </>
          )}
        </button>

        {/* Restart Story Button */}
        <motion.button
          id="restart-story-btn"
          onClick={() => {
            sound.stopLullaby();
            sound.playCelebrationFanfare();
            onRestart();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-2xl font-bold bg-gradient-to-r from-[#B85D43] via-[#9C6644] to-[#606C38] hover:from-[#A44A3F] hover:to-[#505A2F] text-[#FAF6F0] shadow-md shadow-[#B85D43]/25 flex items-center gap-1.5 text-xs sm:text-sm transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>আবার দেখুন 🔄</span>
        </motion.button>
      </div>
    </div>
  );
};
