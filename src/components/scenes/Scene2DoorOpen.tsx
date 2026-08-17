import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BoyCat, GirlCat } from '../CatCharacters';
import { sound } from '../../utils/audio';
import { Calendar, Sparkles, Heart } from 'lucide-react';

interface Scene2Props {
  onNext: () => void;
  date?: string;
}

export const Scene2DoorOpen: React.FC<Scene2Props> = ({ onNext, date = '১৮ আগস্ট ২০২৬' }) => {
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    // Trigger door opening sequence and sounds
    const timer = setTimeout(() => {
      setDoorOpen(true);
      sound.playDoorOpen();
      setTimeout(() => {
        sound.playMeow(1.25); // high pitch girl meow
      }, 500);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-b from-[#F7F2E7] via-[#FAF6F0] to-[#EAE0D5] border-4 border-[#DDB892] p-3 sm:p-5">
      {/* Room Wall Decorations */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#E3D9C9]/40 to-transparent pointer-events-none" />

      {/* Fairy lights string across ceiling */}
      <div className="absolute top-1.5 left-4 right-4 flex justify-between pointer-events-none opacity-85">
        {['💡', '✨', '💛', '🌸', '✨', '💡', '🌾', '✨', '💡'].map((icon, idx) => (
          <span
            key={idx}
            className="text-xs animate-twinkle"
            style={{ animationDelay: `${idx * 0.3}s` }}
          >
            {icon}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-2 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3D342C] mt-1 font-cute">
          Happy birthday, Mrs. Doraemon 🐱🌹
        </h2>
      </div>

      {/* Centerpiece: Cozy Room Interior + Open Door + Wall Calendar */}
      <div className="relative min-h-[270px] sm:min-h-[300px] flex flex-col items-center justify-center my-1">
        {/* Wall Calendar Showing Date */}
        <motion.div
          id="birthday-calendar"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-20 mb-2 bg-[#FCFAF5] rounded-2xl p-2 sm:p-3 shadow-md border-3 border-[#DDB892] max-w-xs sm:max-w-sm w-full mx-auto text-center"
        >
          {/* Calendar top hanger loops */}
          <div className="absolute -top-2.5 left-8 w-3.5 h-5 rounded-full border-2 border-[#3E2723] bg-[#DDA15E] shadow-sm" />
          <div className="absolute -top-2.5 right-8 w-3.5 h-5 rounded-full border-2 border-[#3E2723] bg-[#DDA15E] shadow-sm" />

          {/* Calendar Header */}
          <div className="bg-gradient-to-r from-[#B85D43] via-[#9C6644] to-[#B85D43] text-[#FAF6F0] py-1 px-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#FAF6F0]" />
            <span>CALENDAR • ক্যালেন্ডার</span>
          </div>

          {/* Big Date Display */}
          <div className="py-1 sm:py-1.5 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#B85D43] tracking-wide font-bengali-clear">
                {date}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 px-2.5 py-0.5 rounded-full bg-[#EAE2D6] text-[#58311B] font-bold text-[11px] sm:text-xs border border-[#DDB892] animate-pulse-soft">
              <Heart className="w-3 h-3 fill-[#B85D43] text-[#B85D43]" />
              <span>আজকের এই শুভ জন্মদিন! 🎂🎉</span>
              <Heart className="w-3 h-3 fill-[#B85D43] text-[#B85D43]" />
            </div>
          </div>
        </motion.div>

        {/* Centered Speech Bubble: Perfectly visible & centered on all mobile/desktop screens */}
        <motion.div
          id="dialogue-rose-gift"
          initial={{ scale: 0, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 220, damping: 18 }}
          className="relative z-30 mb-2 mx-auto flex items-center justify-center px-1"
        >
          <div className="bg-[#FAF6F0] text-[#3D342C] font-black text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-md border-2 border-[#DDB892] text-center font-bengali-clear flex items-center gap-1.5 max-w-full">
            <span className="text-sm sm:text-base">🐾</span>
            <span className="text-[#58311B]">এই নাও, তোমার জন্য লাল গোলাপ 🌹</span>
            <span className="text-sm sm:text-base">✨</span>
          </div>
        </motion.div>

        {/* The Two Cats Facing Each Other at Doorway (Exact match to reference photo!) */}
        <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto flex items-end justify-center gap-1 xs:gap-2 sm:gap-4 px-1 xs:px-2">
          {/* Open Door Frame Background */}
          <div className="absolute inset-x-1 sm:inset-x-0 bottom-0 top-4 sm:top-6 bg-[#7F5539]/10 rounded-3xl border-2 border-[#7F5539]/20 -z-0" />

          {/* Boy Cat presenting rose */}
          <motion.div
            id="boy-cat-presenting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => {
              sound.playMeow(0.95);
              sound.playPop();
            }}
            className="relative z-10 flex flex-col items-center flex-1 max-w-[110px] xs:max-w-[130px] sm:max-w-[150px] cursor-pointer"
          >
            <BoyCat pose="holding_rose" />
            <div className="w-16 xs:w-20 sm:w-24 h-2 bg-[#4A3B32]/15 rounded-full -mt-1.5 blur-[1px]" />
          </motion.div>

          {/* Little Floating Hearts between them */}
          <div
            onClick={() => {
              sound.playSparkle();
            }}
            className="relative z-20 flex flex-col items-center justify-center pb-8 xs:pb-10 sm:pb-14 shrink-0 px-0.5 cursor-pointer"
          >
            <motion.div
              animate={{ y: [-2, -7, -2], scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-lg xs:text-xl sm:text-2xl text-[#B85D43] filter drop-shadow-md"
            >
              💖
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0], scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.4 }}
              className="text-xs xs:text-sm sm:text-base text-[#DDA15E] filter drop-shadow"
            >
              ✨
            </motion.div>
          </div>

          {/* Girl Cat blushing in surprised delight */}
          <motion.div
            id="girl-cat-surprised"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => {
              sound.playMeow(1.3);
              sound.playSparkle();
            }}
            className="relative z-10 flex flex-col items-center flex-1 max-w-[110px] xs:max-w-[130px] sm:max-w-[150px] cursor-pointer"
          >
            <GirlCat pose="surprised" />
            <div className="w-16 xs:w-20 sm:w-24 h-2 bg-[#4A3B32]/15 rounded-full -mt-1.5 blur-[1px]" />
          </motion.div>
        </div>
      </div>

      {/* Action Next Step */}
      <div className="flex items-center justify-center mt-3 pt-3 border-t border-[#DDB892]/80 relative z-10">
        <motion.button
          id="celebrate-hug-button"
          onClick={() => {
            sound.playCelebrationFanfare();
            sound.playHugSound();
            onNext();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-7 py-2.5 rounded-2xl font-black text-[#FAF6F0] bg-gradient-to-r from-[#B85D43] via-[#9C6644] to-[#7F5539] hover:from-[#A44A3F] hover:to-[#6F472D] shadow-md shadow-[#B85D43]/25 flex items-center justify-center gap-2 text-sm sm:text-base animate-pulse-soft transition-all"
        >
          <span>পরবর্তী</span>
          <span className="text-base">➔</span>
        </motion.button>
      </div>
    </div>
  );
};
