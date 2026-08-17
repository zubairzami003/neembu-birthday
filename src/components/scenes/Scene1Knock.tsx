import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BoyCat } from '../CatCharacters';
import { sound } from '../../utils/audio';
import { Hand, Sparkles } from 'lucide-react';

interface Scene1Props {
  onNext: () => void;
}

export const Scene1Knock: React.FC<Scene1Props> = ({ onNext }) => {
  const [knocking, setKnocking] = useState(false);
  const [knockCount, setKnockCount] = useState(0);

  const getKnockText = () => {
    if (knockCount === 1) return 'টুক টুক... কেউ কি আছো? 🌹✨';
    if (knockCount === 2) return 'মায়াবতী... দরজাটা খোলো না! 🐾';
    return 'তোমার জাম্বু গোলাপ নিয়ে এসেছে! 🌹💖';
  };

  const handleKnock = () => {
    sound.playKnock();
    sound.playMeow(0.95);
    setKnocking(true);
    setKnockCount((prev) => prev + 1);

    setTimeout(() => {
      setKnocking(false);
    }, 650);
  };

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-b from-[#F2ECE1] via-[#FAF6F0] to-[#ECE4D6] border-4 border-[#DDB892] p-3 sm:p-5">
      {/* Decorative Garden & Cottage Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#E3D9C9]/50 to-transparent pointer-events-none" />
      {/* Floating clouds */}
      <div className="absolute top-2 left-6 text-[#CBB298]/60 text-2xl select-none animate-float">☁️</div>
      <div className="absolute top-4 right-8 text-[#CBB298]/60 text-xl select-none animate-float" style={{ animationDelay: '1.5s' }}>☁️</div>

      {/* Header */}
      <div className="text-center mb-2 sm:mb-3 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3D342C] mt-1 font-cute leading-tight">
          দরজায় অপেক্ষা করছে{' '}
          <span className="text-[#B85D43]">জাম্বু</span> 🐾
        </h2>
      </div>

      {/* Main Interaction Area */}
      <div className="relative min-h-[260px] sm:min-h-[290px] flex flex-row items-end justify-center gap-2 sm:gap-5 my-1">
        {/* The Cottage Wooden Door */}
        <div
          id="cottage-door"
          onClick={handleKnock}
          className="relative cursor-pointer group flex flex-col items-center select-none"
        >
          {/* Porch Hanging Lantern */}
          <motion.div
            animate={
              knocking
                ? { rotate: [-8, 8, -5, 5, 0] }
                : { rotate: [0, 1.5, -1.5, 0] }
            }
            transition={{ duration: knocking ? 0.6 : 3, repeat: knocking ? 0 : Infinity }}
            className="absolute -top-7 z-20 flex flex-col items-center origin-top"
          >
            <div className="w-0.5 h-4 bg-[#4A3B32]" />
            <div className="w-6 h-6 rounded-full bg-[#E9C46A] shadow-[0_0_15px_#E76F51] border-2 border-[#7F5539] flex items-center justify-center animate-pulse-soft">
              <span className="text-[10px]">💡</span>
            </div>
          </motion.div>

          {/* Door Frame */}
          <div className="relative w-36 sm:w-44 h-52 sm:h-60 bg-[#58311B] rounded-t-full p-2 shadow-xl border-4 border-[#3E2723]">
            {/* The Door itself */}
            <motion.div
              animate={
                knocking
                  ? { x: [-3, 3, -2, 2, 0], scale: [1, 0.99, 1] }
                  : { x: 0 }
              }
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full rounded-t-full bg-gradient-to-b from-[#8C5E3D] via-[#7F5539] to-[#5C3D2E] border-2 border-[#A67C52] relative overflow-hidden flex flex-col items-center justify-between p-3 group-hover:brightness-105 transition-all"
            >
              {/* Door Wood Planks Lines */}
              <div className="absolute inset-y-0 left-1/3 w-0.5 bg-[#3E2723]/60" />
              <div className="absolute inset-y-0 right-1/3 w-0.5 bg-[#3E2723]/60" />

              {/* Decorative Wreath on Door */}
              <div className="w-12 h-12 rounded-full border-3 border-[#606C38] bg-[#606C38]/20 flex items-center justify-center shadow-inner mt-4">
                <span className="text-base">🌸</span>
              </div>

              {/* Gold Door Handle & Knocker */}
              <div className="relative my-auto flex items-center justify-between w-full px-2">
                <div className="w-3 h-3 rounded-full bg-[#DDA15E] border-2 border-[#BC6C25] shadow-md" />
                <div className="relative group-hover:scale-110 transition-transform">
                  <motion.div
                    animate={knocking ? { rotate: [-15, 15, -10, 10, 0], y: [-2, 2, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="w-5 h-8 border-3 border-[#DDA15E] rounded-full shadow-lg bg-[#DDA15E]/30 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#58311B]" />
                  </motion.div>
                </div>
              </div>

              {/* Welcome Mat hint at bottom */}
              <div className="text-[10px] font-semibold text-[#E6CCB2] tracking-wider">
                SWEET HOME
              </div>
            </motion.div>

            {/* Knock Visual Waves & Impact Sparks right at the door knocker area */}
            {knocking && (
              <>
                <motion.div
                  initial={{ opacity: 1, scale: 0.4 }}
                  animate={{ opacity: 0, scale: 1.9 }}
                  transition={{ duration: 0.45 }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 w-16 h-16 rounded-full border-3 border-[#DDA15E] bg-[#DDA15E]/20 pointer-events-none"
                />
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], y: -28, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 z-30 font-black text-xs text-[#B85D43] bg-[#FCFAF5] px-2 py-0.5 rounded-full shadow-md border border-[#DDB892] pointer-events-none whitespace-nowrap"
                >
                  ✨ টুক টুক! 💥
                </motion.div>
              </>
            )}
          </div>

          {/* Doormat */}
          <div className="w-32 sm:w-40 h-3 bg-[#4A3B32] rounded-full mt-1 shadow-md flex items-center justify-center">
            <span className="text-[8px] text-[#E6CCB2]/80 font-medium">WELCOME</span>
          </div>
        </div>

        {/* The Boy Tabby Cat standing by the door and facing towards the door */}
        <motion.div
          id="boy-cat-actor"
          onClick={handleKnock}
          className="cursor-pointer relative flex flex-col items-center max-w-[125px] sm:max-w-[155px]"
          animate={
            knocking
              ? { x: [-2, -10, -3, -8, -2, 0], rotate: [0, -3, 1, -2, 0] }
              : { y: [0, -4, 0] }
          }
          transition={
            knocking
              ? { duration: 0.6, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
          }
        >
          {/* Speech Bubble when knocked */}
          {knockCount > 0 && (
            <motion.div
              key={knockCount}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-11 z-30 bg-[#FCFAF5] text-[#3D342C] text-xs font-bold px-2.5 py-1 rounded-2xl shadow-lg border-2 border-[#DDB892] whitespace-nowrap"
            >
              {getKnockText()}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#FCFAF5] rotate-45 border-r-2 border-b-2 border-[#DDB892]" />
            </motion.div>
          )}

          {/* Boy Cat explicitly facing LEFT towards the door */}
          <BoyCat
            pose={knocking ? 'knocking' : 'holding_rose'}
            facing="left"
          />

          {/* Shadow beneath cat */}
          <div className="w-24 sm:w-28 h-2.5 bg-[#4A3B32]/15 rounded-full -mt-2 blur-[1px]" />
        </motion.div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 mt-3 pt-3 border-t border-[#DDB892]/60 relative z-10">
        <button
          id="knock-button"
          onClick={handleKnock}
          className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#BC6C25] to-[#9C6644] hover:from-[#A85D1E] hover:to-[#8B5637] active:scale-95 text-[#FAF6F0] font-bold text-xs sm:text-sm shadow-md shadow-[#BC6C25]/25 flex items-center justify-center gap-1.5 transition-all"
        >
          <Hand className="w-4 h-4 animate-pulse" />
          <span>নক করুন</span>
        </button>

        <motion.button
          id="open-door-button"
          onClick={() => {
            sound.playDoorOpen();
            onNext();
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`flex-1 sm:flex-initial px-5 sm:px-8 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-md ${
            knockCount > 0
              ? 'bg-gradient-to-r from-[#B85D43] to-[#8C5E3D] hover:from-[#A44A3F] hover:to-[#7F5539] text-[#FAF6F0] shadow-[#B85D43]/30 animate-pulse-soft'
              : 'bg-[#FCFAF5] text-[#58311B] hover:bg-[#F3ECE0] border-2 border-[#DDB892]'
          }`}
        >
          <span>পরবর্তী</span>
          <span className="text-sm">➔</span>
        </motion.button>
      </div>
    </div>
  );
};
