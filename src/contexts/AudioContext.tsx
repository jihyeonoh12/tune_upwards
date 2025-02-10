import { createContext, useContext, useRef, ReactNode } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const currentAudio = useRef(null);

  const playAudio = (audioElement) => {
    if (currentAudio.current && currentAudio.current !== audioElement) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
    currentAudio.current = audioElement;
    audioElement.play();
  };

  return (
    <AudioContext.Provider value={{ playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
