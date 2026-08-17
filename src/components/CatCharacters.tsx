import React from 'react';
import { motion } from 'motion/react';

interface CatProps {
  className?: string;
  pose?: 'standing' | 'knocking' | 'holding_rose' | 'walking' | 'surprised' | 'happy' | 'waving';
  scale?: number;
  facing?: 'left' | 'right';
}

// Striped Ginger Tabby Boy Cat
export const BoyCat: React.FC<CatProps> = ({
  className = '',
  pose = 'standing',
  scale = 1,
  facing = 'right',
}) => {
  const isKnocking = pose === 'knocking';
  const isHoldingRose = pose === 'holding_rose' || pose === 'knocking';
  const isFacingLeft = facing === 'left';

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        transform: `${scale !== 1 ? `scale(${scale})` : ''} ${isFacingLeft ? 'scaleX(-1)' : ''}`.trim() || undefined,
        transformOrigin: 'bottom center',
      }}
    >
      <svg
        viewBox="0 0 200 220"
        className="w-28 h-32 xs:w-36 xs:h-40 sm:w-48 sm:h-52 md:w-56 md:h-60 max-w-full filter drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="tabbyBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6b26b" />
            <stop offset="50%" stopColor="#e69138" />
            <stop offset="100%" stopColor="#d57b22" />
          </linearGradient>
          <linearGradient id="tabbyEarInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4cccc" />
            <stop offset="100%" stopColor="#ea9999" />
          </linearGradient>
          <linearGradient id="roseRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="100%" stopColor="#c9184a" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <motion.path
          d="M 60 170 Q 30 180 25 150 Q 20 130 35 135 Q 45 140 50 160 Z"
          fill="url(#tabbyBody)"
          stroke="#b45f06"
          strokeWidth="2.5"
          animate={{ rotate: [-4, 6, -4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ originX: '60px', originY: '170px' }}
        />

        {/* Tail stripes */}
        <path d="M 30 145 Q 38 150 35 156" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />
        <path d="M 36 158 Q 44 162 42 168" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />

        {/* Body */}
        <path
          d="M 70 110 Q 45 140 55 190 Q 95 205 135 190 Q 145 140 120 110 Z"
          fill="url(#tabbyBody)"
          stroke="#b45f06"
          strokeWidth="3"
        />

        {/* White chest belly patch */}
        <path
          d="M 85 130 Q 98 175 110 185 Q 98 190 85 185 Q 75 170 85 130 Z"
          fill="#fff9f0"
          opacity="0.9"
        />

        {/* Body stripes */}
        <path d="M 52 145 Q 68 150 78 142" stroke="#783f04" strokeWidth="4" strokeLinecap="round" />
        <path d="M 54 165 Q 72 170 80 162" stroke="#783f04" strokeWidth="4" strokeLinecap="round" />
        <path d="M 58 182 Q 74 185 82 178" stroke="#783f04" strokeWidth="3.5" strokeLinecap="round" />

        {/* Left Foot */}
        <ellipse cx="75" cy="195" rx="14" ry="8" fill="#e69138" stroke="#b45f06" strokeWidth="2.5" />
        {/* Right Foot */}
        <ellipse cx="115" cy="195" rx="14" ry="8" fill="#e69138" stroke="#b45f06" strokeWidth="2.5" />

        {/* Head */}
        <ellipse cx="95" cy="80" rx="42" ry="38" fill="url(#tabbyBody)" stroke="#b45f06" strokeWidth="3" />

        {/* Left Ear */}
        <path
          d="M 62 65 Q 52 28 72 40 Z"
          fill="url(#tabbyBody)"
          stroke="#b45f06"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M 64 60 Q 58 36 71 44 Z" fill="url(#tabbyEarInner)" />

        {/* Right Ear */}
        <path
          d="M 118 42 Q 138 30 130 68 Z"
          fill="url(#tabbyBody)"
          stroke="#b45f06"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M 121 47 Q 132 38 126 63 Z" fill="url(#tabbyEarInner)" />

        {/* Head Tabby Stripes */}
        {/* Top forehead stripes */}
        <path d="M 95 45 L 95 56" stroke="#783f04" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 85 47 Q 88 55 86 58" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />
        <path d="M 105 47 Q 102 55 104 58" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />

        {/* Left cheek stripes (prominent like in reference photo) */}
        <path d="M 60 70 Q 74 74 80 72" stroke="#783f04" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 58 82 Q 72 87 78 85" stroke="#783f04" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 62 94 Q 72 98 76 96" stroke="#783f04" strokeWidth="4" strokeLinecap="round" />

        {/* Right eye & cheek (profile/3/4 angle) */}
        {/* Big sparkling brown-black cat eye */}
        <ellipse cx="120" cy="78" rx="8" ry="10" fill="#2d1600" />
        {/* Catchlight sparkles */}
        <circle cx="118" cy="74" r="3.2" fill="#ffffff" />
        <circle cx="123" cy="82" r="1.5" fill="#ffffff" />

        {/* Cute blushing cheek */}
        <ellipse cx="124" cy="90" rx="7" ry="4.5" fill="#ff758f" opacity="0.6" />

        {/* Cute nose & mouth */}
        <ellipse cx="134" cy="85" rx="3.5" ry="2.5" fill="#ff758f" />
        <path d="M 134 87 Q 130 93 125 91" stroke="#5d2e04" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Whiskers */}
        <path d="M 132 88 L 148 85" stroke="#783f04" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 133 91 L 149 93" stroke="#783f04" strokeWidth="1.5" strokeLinecap="round" />

        {/* Left Arm / Paw (Knocking or Resting) */}
        {isKnocking ? (
          <motion.g
            animate={{
              rotate: [-20, 22, -8, 20, -6, 18, 0],
              y: [-6, 6, -3, 5, -2, 4, 0],
            }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            style={{ originX: '110px', originY: '120px' }}
          >
            <path
              d="M 110 120 Q 145 110 168 98 Q 175 110 156 124 Q 130 134 110 128 Z"
              fill="url(#tabbyBody)"
              stroke="#b45f06"
              strokeWidth="2.5"
            />
            {/* White paw knocking fist */}
            <ellipse cx="168" cy="102" rx="8.5" ry="7.5" fill="#fff9f0" stroke="#b45f06" strokeWidth="2" />
            {/* Cute pink paw pad */}
            <ellipse cx="168" cy="102" rx="4" ry="3" fill="#f4cccc" />
            {/* Finger toes accents */}
            <circle cx="163" cy="98" r="1.5" fill="#f4cccc" />
            <circle cx="168" cy="96" r="1.5" fill="#f4cccc" />
            <circle cx="173" cy="98" r="1.5" fill="#f4cccc" />
          </motion.g>
        ) : (
          <path
            d="M 90 125 Q 80 145 92 152 Q 100 150 102 135 Z"
            fill="url(#tabbyBody)"
            stroke="#b45f06"
            strokeWidth="2.5"
          />
        )}

        {/* Right Arm holding Rose flower */}
        {isHoldingRose && (
          <g>
            {/* Paw extending forward */}
            <path
              d="M 105 125 Q 140 135 155 138 Q 158 145 145 150 Q 120 145 100 135 Z"
              fill="url(#tabbyBody)"
              stroke="#b45f06"
              strokeWidth="2.5"
            />
            {/* White paw tip */}
            <ellipse cx="154" cy="141" rx="7" ry="5.5" fill="#fff9f0" stroke="#b45f06" strokeWidth="2" />

            {/* Rose Stem */}
            <line x1="154" y1="140" x2="175" y2="105" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" />
            {/* Green leaves */}
            <path d="M 162 125 Q 170 123 167 130 Z" fill="#52b788" stroke="#2d6a4f" strokeWidth="1" />

            {/* Rose Blossom */}
            <motion.g
              animate={{ rotate: [-2, 3, -2], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ originX: '175px', originY: '105px' }}
            >
              <ellipse cx="177" cy="102" rx="10" ry="11" fill="url(#roseRed)" />
              <path d="M 172 100 Q 177 92 182 100 Q 177 106 172 100 Z" fill="#ff758f" />
              <path d="M 170 105 Q 177 114 184 105" fill="none" stroke="#800f2f" strokeWidth="1.5" />
            </motion.g>
          </g>
        )}
      </svg>
    </div>
  );
};

// Pure White Girl Cat with Pink Collar and Blushing Cheeks
export const GirlCat: React.FC<CatProps> = ({
  className = '',
  pose = 'surprised',
  scale = 1,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: 'bottom center' } : undefined}
    >
      <svg
        viewBox="0 0 200 220"
        className="w-28 h-32 xs:w-36 xs:h-40 sm:w-48 sm:h-52 md:w-56 md:h-60 max-w-full filter drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="whiteCatBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fdfbf7" />
            <stop offset="100%" stopColor="#f5efe6" />
          </linearGradient>
          <linearGradient id="pinkCollar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb3c1" />
            <stop offset="100%" stopColor="#ff758f" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <motion.path
          d="M 140 170 Q 170 180 175 150 Q 180 130 165 135 Q 155 140 150 160 Z"
          fill="url(#whiteCatBody)"
          stroke="#e2d9cc"
          strokeWidth="2.5"
          animate={{ rotate: [4, -6, 4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ originX: '140px', originY: '170px' }}
        />

        {/* Body */}
        <path
          d="M 130 110 Q 155 140 145 190 Q 105 205 65 190 Q 55 140 80 110 Z"
          fill="url(#whiteCatBody)"
          stroke="#ded5c5"
          strokeWidth="2.5"
        />

        {/* Feet */}
        <ellipse cx="85" cy="195" rx="14" ry="8" fill="#f8f4ec" stroke="#ded5c5" strokeWidth="2" />
        <ellipse cx="125" cy="195" rx="14" ry="8" fill="#f8f4ec" stroke="#ded5c5" strokeWidth="2" />

        {/* Pink Collar around neck */}
        <path
          d="M 82 112 Q 105 124 128 112"
          stroke="url(#pinkCollar)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tiny golden heart/bell on collar */}
        <circle cx="105" cy="120" r="3.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />

        {/* Head */}
        <ellipse cx="105" cy="78" rx="42" ry="38" fill="url(#whiteCatBody)" stroke="#ded5c5" strokeWidth="2.5" />

        {/* Left Ear */}
        <path
          d="M 82 68 Q 62 30 70 68 Z"
          fill="url(#whiteCatBody)"
          stroke="#ded5c5"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M 78 64 Q 67 38 73 63 Z" fill="#ffccd5" />

        {/* Right Ear */}
        <path
          d="M 138 40 Q 148 28 128 65 Z"
          fill="url(#whiteCatBody)"
          stroke="#ded5c5"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M 134 45 Q 142 36 130 60 Z" fill="#ffccd5" />

        {/* Sparkly big anime eye looking left towards boy cat */}
        <ellipse cx="80" cy="78" rx="8" ry="10" fill="#2d1600" />
        {/* Catchlights */}
        <circle cx="78" cy="74" r="3.2" fill="#ffffff" />
        <circle cx="83" cy="82" r="1.5" fill="#ffffff" />

        {/* Bright Pink Rosy Blushing Cheek */}
        <ellipse cx="76" cy="90" rx="9" ry="5.5" fill="#ff4d6d" opacity="0.65" />
        {/* Extra blush dashes */}
        <line x1="72" y1="90" x2="80" y2="88" stroke="#c9184a" strokeWidth="1.2" opacity="0.8" />
        <line x1="74" y1="93" x2="82" y2="91" stroke="#c9184a" strokeWidth="1.2" opacity="0.8" />

        {/* Cute nose */}
        <ellipse cx="66" cy="84" rx="3.5" ry="2.5" fill="#ff758f" />

        {/* Whiskers */}
        <path d="M 68 88 L 52 86" stroke="#c4b5a0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 67 91 L 51 93" stroke="#c4b5a0" strokeWidth="1.5" strokeLinecap="round" />

        {/* Paws raised to mouth in surprised delight (exact pose from image!) */}
        <motion.g
          animate={
            pose === 'surprised' || pose === 'happy'
              ? { y: [-1, 2, -1], scale: [1, 1.03, 1] }
              : {}
          }
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          {/* Left paw touching mouth */}
          <path
            d="M 88 120 Q 75 105 68 96 Q 74 90 82 98 Q 94 110 96 122 Z"
            fill="url(#whiteCatBody)"
            stroke="#ded5c5"
            strokeWidth="2"
          />
          <circle cx="70" cy="95" r="7" fill="#ffffff" stroke="#ded5c5" strokeWidth="1.5" />
          <path d="M 68 93 L 68 97" stroke="#e2d9cc" strokeWidth="1.2" />

          {/* Right paw touching mouth */}
          <path
            d="M 100 120 Q 82 108 76 98 Q 83 92 88 102 Q 104 112 108 122 Z"
            fill="url(#whiteCatBody)"
            stroke="#ded5c5"
            strokeWidth="2"
          />
          <circle cx="76" cy="98" r="7" fill="#ffffff" stroke="#ded5c5" strokeWidth="1.5" />
        </motion.g>
      </svg>
    </div>
  );
};

// Two Cats Hugging Together in Love & Celebration
export const CatsHugging: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
      >
        <svg
          viewBox="0 0 320 240"
          className="w-56 h-48 xs:w-64 xs:h-54 sm:w-80 sm:h-68 md:w-88 md:h-72 max-w-full filter drop-shadow-xl overflow-visible"
        >
          <defs>
            <linearGradient id="tabbyHug" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6b26b" />
              <stop offset="100%" stopColor="#d57b22" />
            </linearGradient>
            <linearGradient id="whiteHug" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8f4ec" />
            </linearGradient>
          </defs>

          {/* Floating heart burst above */}
          <motion.g
            animate={{ y: [-4, -14, -4], opacity: [0.8, 1, 0.8], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <path
              d="M 160 40 C 160 30 145 20 135 30 C 120 45 160 70 160 70 C 160 70 200 45 185 30 C 175 20 160 30 160 40 Z"
              fill="#ff4d6d"
              filter="drop-shadow(0 2px 6px rgba(255, 77, 109, 0.5))"
            />
            {/* Sparkles around heart */}
            <circle cx="120" cy="35" r="3" fill="#fbbf24" />
            <circle cx="200" cy="38" r="3.5" fill="#fbbf24" />
            <circle cx="160" cy="18" r="2.5" fill="#fbbf24" />
          </motion.g>

          {/* Tabby Boy Cat (Left) Body */}
          <path
            d="M 80 140 Q 70 210 130 215 Q 165 215 155 150 Q 140 110 115 105 Z"
            fill="url(#tabbyHug)"
            stroke="#b45f06"
            strokeWidth="3"
          />
          {/* Stripes */}
          <path d="M 75 165 Q 95 170 110 165" stroke="#783f04" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 80 185 Q 100 190 115 185" stroke="#783f04" strokeWidth="4" strokeLinecap="round" />

          {/* White Girl Cat (Right) Body */}
          <path
            d="M 240 140 Q 250 210 190 215 Q 155 215 165 150 Q 180 110 205 105 Z"
            fill="url(#whiteHug)"
            stroke="#ded5c5"
            strokeWidth="2.5"
          />

          {/* White Cat Pink Collar */}
          <path d="M 185 130 Q 200 138 215 132" stroke="#ff758f" strokeWidth="6" strokeLinecap="round" />

          {/* Tabby Cat Head (Tilting right happily with closed joy eyes) */}
          <ellipse cx="125" cy="95" rx="35" ry="32" fill="url(#tabbyHug)" stroke="#b45f06" strokeWidth="3" />
          {/* Tabby Ears */}
          <path d="M 98 75 Q 85 45 108 55 Z" fill="url(#tabbyHug)" stroke="#b45f06" strokeWidth="2.5" />
          <path d="M 135 60 Q 155 45 145 75 Z" fill="url(#tabbyHug)" stroke="#b45f06" strokeWidth="2.5" />
          {/* Tabby Head stripes */}
          <path d="M 90 85 Q 102 90 108 88" stroke="#783f04" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 92 98 Q 104 102 108 100" stroke="#783f04" strokeWidth="3.5" strokeLinecap="round" />
          {/* Tabby Happy Closed Eyes (Joy curve ^_^) */}
          <path d="M 132 94 Q 140 86 148 94" fill="none" stroke="#432818" strokeWidth="3" strokeLinecap="round" />
          {/* Tabby Blush */}
          <ellipse cx="140" cy="105" rx="7" ry="4" fill="#ff758f" opacity="0.7" />

          {/* White Cat Head (Tilting left happily leaning against boy cat) */}
          <ellipse cx="195" cy="95" rx="35" ry="32" fill="url(#whiteHug)" stroke="#ded5c5" strokeWidth="2.5" />
          {/* White Ears */}
          <path d="M 185 60 Q 165 45 175 75 Z" fill="url(#whiteHug)" stroke="#ded5c5" strokeWidth="2" />
          <path d="M 222 75 Q 235 45 212 55 Z" fill="url(#whiteHug)" stroke="#ded5c5" strokeWidth="2" />
          {/* White Happy Closed Eyes (Joy curve ^_^) */}
          <path d="M 172 94 Q 180 86 188 94" fill="none" stroke="#432818" strokeWidth="3" strokeLinecap="round" />
          {/* White Blush */}
          <ellipse cx="180" cy="105" rx="8" ry="5" fill="#ff4d6d" opacity="0.8" />

          {/* Boy Cat Arm wrapping around girl cat */}
          <path
            d="M 135 130 Q 180 145 205 135 Q 212 142 195 152 Q 155 155 125 140 Z"
            fill="url(#tabbyHug)"
            stroke="#b45f06"
            strokeWidth="2.5"
          />
          <circle cx="205" cy="138" r="7" fill="#fff9f0" stroke="#b45f06" strokeWidth="2" />

          {/* Girl Cat Arm wrapping around boy cat */}
          <path
            d="M 185 130 Q 140 145 115 135 Q 108 142 125 152 Q 165 155 195 140 Z"
            fill="url(#whiteHug)"
            stroke="#ded5c5"
            strokeWidth="2.5"
          />
          <circle cx="115" cy="138" r="7" fill="#ffffff" stroke="#ded5c5" strokeWidth="2" />

          {/* Cute rose dropped happily between them */}
          <g transform="translate(145, 175) rotate(25)">
            <line x1="0" y1="0" x2="25" y2="10" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="7" fill="#ff4d6d" />
            <circle cx="3" cy="-2" r="5" fill="#c9184a" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

// Two Cats Sleeping Cozy under Blanket in Bed
export const CatsSleeping: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 340 220"
          className="w-72 h-52 sm:w-96 sm:h-64 filter drop-shadow-xl overflow-visible"
        >
          <defs>
            <linearGradient id="pillowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="blanketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Pillow */}
          <rect x="35" y="30" width="270" height="90" rx="35" fill="url(#pillowGrad)" stroke="#cbd5e1" strokeWidth="2" />

          {/* Boy Tabby Cat Head Sleeping */}
          <g transform="translate(100, 75) rotate(-8)">
            <ellipse cx="0" cy="0" rx="32" ry="28" fill="#f6b26b" stroke="#b45f06" strokeWidth="2.5" />
            {/* Ears */}
            <path d="M -22 -18 Q -30 -42 -8 -30 Z" fill="#f6b26b" stroke="#b45f06" strokeWidth="2" />
            <path d="M 8 -30 Q 30 -42 22 -18 Z" fill="#f6b26b" stroke="#b45f06" strokeWidth="2" />
            {/* Head stripes */}
            <path d="M -25 0 Q -15 4 -8 2" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />
            <path d="M -24 10 Q -14 14 -7 11" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />
            {/* Sleeping eyes */}
            <path d="M -12 2 Q -4 8 4 2" fill="none" stroke="#432818" strokeWidth="2.5" strokeLinecap="round" />
            {/* Pink cheek */}
            <ellipse cx="-4" cy="12" rx="6" ry="3.5" fill="#ff758f" opacity="0.7" />
          </g>

          {/* Girl White Cat Head Sleeping cuddled next to tabby */}
          <g transform="translate(175, 76) rotate(10)">
            <ellipse cx="0" cy="0" rx="32" ry="28" fill="#ffffff" stroke="#ded5c5" strokeWidth="2.5" />
            {/* Ears */}
            <path d="M -22 -18 Q -30 -42 -8 -30 Z" fill="#ffffff" stroke="#ded5c5" strokeWidth="2" />
            <path d="M -18 -20 Q -24 -36 -10 -28 Z" fill="#ffccd5" />
            <path d="M 8 -30 Q 30 -42 22 -18 Z" fill="#ffffff" stroke="#ded5c5" strokeWidth="2" />
            {/* Pink Collar visible */}
            <path d="M -18 24 Q 0 30 18 24" stroke="#ff758f" strokeWidth="5" strokeLinecap="round" />
            {/* Sleeping eyes */}
            <path d="M -4 2 Q 4 8 12 2" fill="none" stroke="#432818" strokeWidth="2.5" strokeLinecap="round" />
            {/* Pink cheek */}
            <ellipse cx="4" cy="12" rx="7" ry="4" fill="#ff4d6d" opacity="0.8" />
          </g>

          {/* Fluffy Blanket Covering them */}
          <path
            d="M 30 95 Q 170 80 310 95 L 320 200 Q 170 215 20 200 Z"
            fill="url(#blanketGrad)"
            stroke="#db2777"
            strokeWidth="2.5"
          />

          {/* Blanket folded top border with cute white stitch */}
          <path
            d="M 30 95 Q 170 80 310 95"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 30 95 Q 170 80 310 95"
            fill="none"
            stroke="#f472b6"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Cute Little Paws resting on top of blanket */}
          {/* Tabby paw */}
          <ellipse cx="115" cy="98" rx="8" ry="6" fill="#fff9f0" stroke="#b45f06" strokeWidth="1.8" />
          {/* White paw touching tabby paw */}
          <ellipse cx="132" cy="98" rx="8" ry="6" fill="#ffffff" stroke="#ded5c5" strokeWidth="1.8" />

          {/* Blanket heart & star patterns */}
          <path d="M 80 140 C 80 135 72 130 67 135 C 60 142 80 155 80 155 C 80 155 100 142 93 135 C 88 130 80 135 80 140 Z" fill="#ffffff" opacity="0.5" />
          <path d="M 260 145 C 260 140 252 135 247 140 C 240 147 260 160 260 160 C 260 160 280 147 273 140 C 268 135 260 140 260 145 Z" fill="#ffffff" opacity="0.5" />
          <polygon points="170,140 173,148 181,148 175,153 177,161 170,156 163,161 165,153 159,148 167,148" fill="#fef08a" opacity="0.7" />

          {/* Floating Zzz bubbles */}
          <motion.g
            animate={{ y: [-5, -25, -35], x: [0, 8, 15], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeOut' }}
          >
            <text x="140" y="45" fill="#f43f5e" fontSize="22" fontWeight="bold" fontFamily="Mali, cursive">Z</text>
            <text x="156" y="32" fill="#ec4899" fontSize="17" fontWeight="bold" fontFamily="Mali, cursive">z</text>
            <text x="170" y="22" fill="#db2777" fontSize="13" fontWeight="bold" fontFamily="Mali, cursive">z...</text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

// Hand in hand walking pair
export const CatsWalkingHandInHand: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 260 180"
          className="w-64 h-48 sm:w-80 sm:h-56 filter drop-shadow-md overflow-visible"
        >
          {/* Tabby Boy walking left */}
          <g transform="translate(60, 20)">
            {/* Body & head simplified cute walking profile */}
            <ellipse cx="40" cy="90" rx="22" ry="28" fill="#f6b26b" stroke="#b45f06" strokeWidth="2.5" />
            <path d="M 22 80 Q 35 84 42 82" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />
            <path d="M 24 95 Q 36 99 44 96" stroke="#783f04" strokeWidth="3" strokeLinecap="round" />
            {/* Head */}
            <circle cx="40" cy="45" r="26" fill="#f6b26b" stroke="#b45f06" strokeWidth="2.5" />
            <path d="M 22 28 Q 15 8 30 18 Z" fill="#f6b26b" stroke="#b45f06" strokeWidth="2" />
            <path d="M 48 20 Q 62 10 55 30 Z" fill="#f6b26b" stroke="#b45f06" strokeWidth="2" />
            <ellipse cx="50" cy="42" rx="5" ry="6" fill="#2d1600" />
            <circle cx="48" cy="40" r="2" fill="#ffffff" />
            <ellipse cx="52" cy="50" rx="5" ry="3" fill="#ff758f" opacity="0.6" />
            {/* Walking feet */}
            <ellipse cx="30" cy="120" rx="8" ry="5" fill="#e69138" stroke="#b45f06" strokeWidth="1.5" />
            <ellipse cx="50" cy="118" rx="8" ry="5" fill="#e69138" stroke="#b45f06" strokeWidth="1.5" />
          </g>

          {/* Girl White walking right */}
          <g transform="translate(140, 20)">
            {/* Body */}
            <ellipse cx="30" cy="90" rx="22" ry="28" fill="#ffffff" stroke="#ded5c5" strokeWidth="2" />
            <path d="M 12 70 Q 25 76 38 72" stroke="#ff758f" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head */}
            <circle cx="30" cy="45" r="26" fill="#ffffff" stroke="#ded5c5" strokeWidth="2" />
            <path d="M 15 25 Q 8 8 22 20 Z" fill="#ffffff" stroke="#ded5c5" strokeWidth="1.8" />
            <path d="M 18 24 Q 13 12 21 21 Z" fill="#ffccd5" />
            <path d="M 38 20 Q 52 10 45 30 Z" fill="#ffffff" stroke="#ded5c5" strokeWidth="1.8" />
            <ellipse cx="22" cy="42" rx="5" ry="6" fill="#2d1600" />
            <circle cx="20" cy="40" r="2" fill="#ffffff" />
            <ellipse cx="18" cy="50" rx="6" ry="3.5" fill="#ff4d6d" opacity="0.75" />
            {/* Walking feet */}
            <ellipse cx="20" cy="118" rx="8" ry="5" fill="#f8f4ec" stroke="#ded5c5" strokeWidth="1.5" />
            <ellipse cx="40" cy="120" rx="8" ry="5" fill="#f8f4ec" stroke="#ded5c5" strokeWidth="1.5" />
          </g>

          {/* Holding Paws in the middle */}
          <path d="M 100 100 Q 120 110 140 100" stroke="#f6b26b" strokeWidth="7" strokeLinecap="round" />
          <path d="M 120 105 Q 135 110 145 100" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          {/* Heart floating between paws */}
          <motion.path
            d="M 120 85 C 120 80 114 76 110 80 C 104 86 120 96 120 96 C 120 96 136 86 130 80 C 126 76 120 80 120 85 Z"
            fill="#ff4d6d"
            animate={{ scale: [1, 1.25, 1], y: [-2, -8, -2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
