import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryScene, LetterData } from './types';
import { Scene1Knock } from './components/scenes/Scene1Knock';
import { Scene2DoorOpen } from './components/scenes/Scene2DoorOpen';
import { Scene3CelebrationHug } from './components/scenes/Scene3CelebrationHug';
import { Scene4NotebookLetter } from './components/scenes/Scene4NotebookLetter';
import { Scene5Sleeping } from './components/scenes/Scene5Sleeping';
import { StoryProgress } from './components/StoryProgress';
import { AudioController } from './components/AudioController';
import { EditNamesModal } from './components/EditNamesModal';
import { sound } from './utils/audio';
import { decodeDataFromUrl, generateSurpriseShareUrl } from './utils/share';
import { Heart, Edit3, Share2, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'birthday_surprise_letter_data';

const DEFAULT_LETTER: LetterData = {
  recipientName: 'মিসেস ডোরেমন',
  senderName: 'তোমার জাম্বু',
  date: '১৮ আগস্ট ২০২৬',
  message: `আজ ১৮ আগস্ট ২০২৬ — তোমার এই পরম আনন্দের জন্মদিনে জানাই হৃদয়ের গভীর থেকে অজস্র ভালোবাসা ও রক্তগোলাপের শুভকামনা! 🌹🎂

তোমার প্রতিটি দিন ভরে উঠুক নির্মল হাসি, অফুরন্ত আনন্দ আর অনাবিল শান্তিতে। পৃথিবীর সমস্ত সুন্দর মুহূর্ত আর ভালোবাসা যেন সবসময় তোমার ছায়া হয়ে থাকে।

জীবনের প্রতিটি পদক্ষেপে অনেক সফল হও, আর সবসময় এভাবেই মিষ্টি হাসিমুখে থেকো... 💖`,
};

export default function App() {
  const [currentScene, setCurrentScene] = useState<StoryScene>('knock');
  const [isMuted, setIsMuted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copiedHeader, setCopiedHeader] = useState(false);

  // Check URL parameters for view-only mode & encoded shared payload
  const [isViewOnly, setIsViewOnly] = useState<boolean>(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const isV = searchParams.get('v') === '1' || searchParams.get('view') === 'true' || searchParams.get('mode') === 'view';
      return isV;
    } catch {
      return false;
    }
  });

  const [letterData, setLetterData] = useState<LetterData>(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const encodedParam = searchParams.get('d') || searchParams.get('data');
      if (encodedParam) {
        const decoded = decodeDataFromUrl(encodedParam);
        if (decoded && decoded.recipientName) {
          return decoded;
        }
      }
    } catch {
      // ignore
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_LETTER;
  });

  useEffect(() => {
    // Only save to localStorage if not in temporary view-only shared mode
    if (!isViewOnly) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(letterData));
      } catch {
        // ignore
      }
    }
  }, [letterData, isViewOnly]);

  const handleCopyShareLink = async () => {
    const shareUrl = generateSurpriseShareUrl(letterData);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedHeader(true);
      setTimeout(() => setCopiedHeader(false), 3000);
    } catch {
      window.prompt('নিচের লিংকটি কপি করে প্রিয়জনকে পাঠিয়ে দিন:', shareUrl);
    }
  };

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
    if (!nextState && currentScene === 'sleeping') {
      sound.startLullaby();
    }
  };

  const handleNextScene = () => {
    switch (currentScene) {
      case 'knock':
        setCurrentScene('door_open');
        break;
      case 'door_open':
        setCurrentScene('hug_celebration');
        break;
      case 'hug_celebration':
        setCurrentScene('notebook_letter');
        break;
      case 'notebook_letter':
        setCurrentScene('sleeping');
        break;
      case 'sleeping':
        setCurrentScene('knock');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F0] via-[#F3ECE0] to-[#E9DFCF] text-[#3D342C] flex flex-col justify-between p-2 sm:p-4 select-none font-cute">
      {/* Top Header Bar */}
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between gap-2 mb-1 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-lg sm:text-xl">🐾</span>
          <h1 className="text-base sm:text-xl font-black bg-gradient-to-r from-[#B85D43] via-[#9C6644] to-[#606C38] bg-clip-text text-transparent tracking-wide">
            বার্থডে সারপ্রাইজ
          </h1>
        </div>

        {/* Creator Controls: ONLY shown to creator, HIDDEN for recipient in view mode! */}
        {!isViewOnly && (
          <div className="flex items-center gap-1.5">
            {/* Quick Share Link Copy Button */}
            <button
              onClick={handleCopyShareLink}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02] ${
                copiedHeader
                  ? 'bg-[#606C38] text-white border-[#606C38]'
                  : 'bg-[#FCFAF5] hover:bg-[#F0E6D8] text-[#58311B] border-[#DDB892]'
              }`}
              title="প্রিয়জনকে পাঠানোর জন্য সারপ্রাইজ লিংক কপি করুন (যাতে তিনি কোনো এডিট অপশন না পান)"
            >
              {copiedHeader ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>লিংক কপি হয়েছে! 💖</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#B85D43]" />
                  <span className="hidden sm:inline">সারপ্রাইজ লিংক</span>
                  <span className="sm:hidden">লিংক</span>
                </>
              )}
            </button>

            {/* Quick Edit Name & Message Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3 py-1 rounded-xl bg-[#FCFAF5] hover:bg-[#F0E6D8] text-[#58311B] text-xs font-bold border border-[#DDB892] shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              title="নাম ও চিঠি পরিবর্তন করুন"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#B85D43]" />
              <span>এডিট</span>
            </button>
          </div>
        )}
      </header>

      {/* Subtle Progress Dots (No Spoilers) */}
      <StoryProgress currentScene={currentScene} />

      {/* Main Interactive Story Scene with Animated Transitions */}
      <main className="flex-1 flex items-center justify-center my-1 w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {currentScene === 'knock' && (
            <motion.div
              key="knock"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene1Knock onNext={handleNextScene} />
            </motion.div>
          )}

          {currentScene === 'door_open' && (
            <motion.div
              key="door_open"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene2DoorOpen onNext={handleNextScene} date={letterData.date} />
            </motion.div>
          )}

          {currentScene === 'hug_celebration' && (
            <motion.div
              key="hug_celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene3CelebrationHug onNext={handleNextScene} />
            </motion.div>
          )}

          {currentScene === 'notebook_letter' && (
            <motion.div
              key="notebook_letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene4NotebookLetter
                onNext={handleNextScene}
                letterData={letterData}
                onUpdateLetter={setLetterData}
                isViewOnly={isViewOnly}
              />
            </motion.div>
          )}

          {currentScene === 'sleeping' && (
            <motion.div
              key="sleeping"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <Scene5Sleeping
                onRestart={() => setCurrentScene('knock')}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                date={letterData.date}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Name and Message Edit Modal (Creator only) */}
      {!isViewOnly && (
        <EditNamesModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          letterData={letterData}
          onSave={setLetterData}
        />
      )}

      {/* Floating Audio Controller */}
      <AudioController isMuted={isMuted} onToggleMute={handleToggleMute} />

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center py-2 text-xs text-[#7F6F62] flex items-center justify-center gap-1 font-bengali-clear">
        <span>তৈরি করা হয়েছে ভালোবাসা দিয়ে</span>
        <Heart className="w-3 h-3 text-[#B85D43] fill-[#B85D43] inline" />
        <span>• {letterData.date}</span>
      </footer>
    </div>
  );
}
