import { useState, useEffect, useCallback } from 'react';

interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
}

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  speaking: boolean;
  paused: boolean;
  supported: boolean;
  voices: Voice[];
  selectedVoice: Voice | null;
  setSelectedVoice: (voice: Voice) => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  // Check if Web Speech API is supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        const voiceList = availableVoices.map(voice => ({
          name: voice.name,
          lang: voice.lang,
          voiceURI: voice.voiceURI
        }));
        setVoices(voiceList);
        
        // Set default voice (prefer English voices)
        const englishVoice = availableVoices.find(voice => 
          voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
        ) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
        
        if (englishVoice && !selectedVoice) {
          setSelectedVoice({
            name: englishVoice.name,
            lang: englishVoice.lang,
            voiceURI: englishVoice.voiceURI
          });
        }
      };

      // Voices might not be loaded immediately
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      // Track speaking state
      const checkSpeaking = () => {
        setSpeaking(window.speechSynthesis.speaking);
        setPaused(window.speechSynthesis.paused);
      };

      const interval = setInterval(checkSpeaking, 100);
      return () => clearInterval(interval);
    }
  }, [selectedVoice]);

  const speak = useCallback((text: string) => {
    if (!supported || !text.trim()) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the actual voice object
    if (selectedVoice) {
      const voice = window.speechSynthesis.getVoices().find(v => 
        v.voiceURI === selectedVoice.voiceURI
      );
      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setSpeaking(false);
      setPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [supported, selectedVoice, rate, pitch]);

  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
    }
  }, [supported]);

  const pause = useCallback(() => {
    if (supported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (supported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    }
  }, [supported]);

  return {
    speak,
    stop,
    pause,
    resume,
    speaking,
    paused,
    supported,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch
  };
};