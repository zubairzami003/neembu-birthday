import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface AudioControllerProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isMuted,
  onToggleMute,
}) => {
  const handleClick = () => {
    sound.unlockAudio();
    if (isMuted) {
      sound.playKnock();
    } else {
      sound.playPop();
    }
    onToggleMute();
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleClick}
        title={isMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড বন্ধ করুন'}
        className={`px-3 py-2.5 rounded-2xl shadow-xl backdrop-blur-md border transition-all flex items-center gap-2 font-bold text-xs ${
          isMuted
            ? 'bg-[#3E2723]/90 text-[#DDA15E] border-[#58311B] hover:bg-[#4A2810]'
            : 'bg-[#B85D43]/95 hover:bg-[#A44A3F] text-[#FAF6F0] border-[#DDB892] shadow-[#B85D43]/25 animate-pulse-soft'
        }`}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden xs:inline">সাউন্ড অফ</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span className="hidden xs:inline">সাউন্ড অন 🎵</span>
          </>
        )}
      </button>
    </div>
  );
};
