import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { CatsHugging } from '../CatCharacters';
import { sound } from '../../utils/audio';
import { PartyPopper, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface Scene3Props {
  onNext: () => void;
}

export const Scene3CelebrationHug: React.FC<Scene3Props> = ({ onNext }) => {
  const [showNextBtn, setShowNextBtn] = useState(false);

  useEffect(() => {
    // Play celebratory sounds
    sound.playCelebrationFanfare();
    sound.playHugSound();

    // Trigger confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#B85D43', '#9C6644', '#DDA15E', '#BC6C25', '#606C38', '#E9C46A', '#A44A3F'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Secondary burst after 1.2s
    const secondBurst = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5, x: 0.2 },
        colors: ['#B85D43', '#DDA15E', '#606C38'],
      });
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5, x: 0.8 },
        colors: ['#B85D43', '#DDA15E', '#606C38'],
      });
    }, 1200);

    // Show Next Button after short delay
    const btnTimer = setTimeout(() => {
      setShowNextBtn(true);
    }, 1500);

    return () => {
      clearTimeout(secondBurst);
      clearTimeout(btnTimer);
    };
  }, []);

  const triggerMoreConfetti = () => {
    sound.playCelebrationFanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B85D43', '#9C6644', '#DDA15E', '#606C38', '#E9C46A'],
    });
  };

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-b from-[#F2ECE1] via-[#FAF6F0] to-[#EAE0D5] border-4 border-[#DDB892] p-3 sm:p-5">
      {/* Background Party Bunting Banner */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-around pointer-events-none opacity-90">
        {['🚩', '🎈', '🎉', '🌟', '🎊', '🎈', '🚩', '✨', '🎈'].map((emoji, idx) => (
          <motion.span
            key={idx}
            animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 2 + (idx % 3) * 0.4, delay: idx * 0.15 }}
            className="text-lg sm:text-2xl filter drop-shadow-sm select-none"
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Huge Glowing "Happy Birthday!" Text Banner */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
        className="text-center relative z-20 my-1 pt-4 sm:pt-5"
      >
        <div className="inline-block relative">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#B85D43] via-[#9C6644] to-[#606C38] bg-clip-text text-transparent filter drop-shadow-sm font-cute tracking-wide">
            ✨ শুভ জন্মদিন! ✨
          </h1>
          <p className="text-sm sm:text-lg font-black text-[#B85D43] tracking-wider font-cute mt-0.5">
            Happy birthday to you, my Neembu! 🎂🎉
          </p>
        </div>
      </motion.div>

      {/* Centerpiece: The Two Cats Hugging in Joy */}
      <div className="relative min-h-[220px] sm:min-h-[260px] flex flex-col items-center justify-center my-1">
        {/* Floating background decorative balloons */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute left-3 sm:left-10 top-4 text-2xl sm:text-4xl pointer-events-none select-none filter drop-shadow-md"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
          className="absolute right-3 sm:right-10 top-6 text-2xl sm:text-4xl pointer-events-none select-none filter drop-shadow-md"
        >
          🎁
        </motion.div>

        {/* Cats Hugging SVG with Heart Sparkles */}
        <div
          id="cats-hugging-actor"
          onClick={triggerMoreConfetti}
          className="cursor-pointer group relative flex flex-col items-center"
        >
          <CatsHugging />
          <div className="w-44 sm:w-56 h-3 bg-[#4A3B32]/15 rounded-full -mt-2 blur-[2px]" />
        </div>
      </div>

      {/* Next Step Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-2 pt-3 border-t border-[#DDB892]/80 relative z-20">
        {showNextBtn && (
          <motion.button
            id="next-to-notebook-btn"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            onClick={() => {
              sound.playPageFlip();
              onNext();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-2.5 rounded-2xl font-black text-[#FAF6F0] bg-gradient-to-r from-[#B85D43] via-[#9C6644] to-[#7F5539] hover:from-[#A44A3F] hover:to-[#6F472D] shadow-md shadow-[#B85D43]/25 flex items-center justify-center gap-2 text-sm sm:text-base animate-pulse-soft transition-all"
          >
            <span>পরবর্তী</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
