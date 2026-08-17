import React from 'react';
import { StoryScene } from '../types';

interface StoryProgressProps {
  currentScene: StoryScene;
}

const sceneOrder: StoryScene[] = [
  'knock',
  'door_open',
  'hug_celebration',
  'notebook_letter',
  'sleeping',
];

export const StoryProgress: React.FC<StoryProgressProps> = ({ currentScene }) => {
  const currentIndex = sceneOrder.indexOf(currentScene);

  return (
    <div className="w-full max-w-xs mx-auto mb-3 flex items-center justify-center gap-2 select-none">
      {sceneOrder.map((scene, idx) => {
        const isActive = idx === currentIndex;
        const isPast = idx < currentIndex;

        return (
          <div
            key={scene}
            className={`h-2 rounded-full transition-all duration-500 ${
              isActive
                ? 'w-8 bg-[#B85D43] shadow-sm shadow-[#B85D43]/40'
                : isPast
                ? 'w-2.5 bg-[#8C5E3D]'
                : 'w-2 bg-[#DDB892]/60'
            }`}
          />
        );
      })}
    </div>
  );
};
