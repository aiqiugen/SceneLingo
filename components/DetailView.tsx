import React, { useState, useEffect, useRef } from 'react';
import { ScenarioContent } from '../types';
import { ChevronLeftIcon, Volume2Icon, BookOpenIcon, SparklesIcon } from './Icons';

interface DetailViewProps {
  data: ScenarioContent;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ data, onBack }) => {
  const [activeTab, setActiveTab] = useState<'words' | 'story'>('words');
  const [isPlaying, setIsPlaying] = useState(false);
  // Keep track of the currently playing text to show visual feedback
  const [playingText, setPlayingText] = useState<string | null>(null);

  // Initialize voices
  useEffect(() => {
    const initVoices = () => {
      window.speechSynthesis.getVoices();
    };
    initVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = initVoices;
    }
    
    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const playAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    // 1. Cancel active speech to prevent queuing overlap
    window.speechSynthesis.cancel();

    // 2. Clean text: remove markdown symbols that might confuse the engine
    const cleanText = text.replace(/[*_#\[\]]/g, '').trim();
    if (!cleanText) return;

    setPlayingText(text);
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // 3. Robust Voice Selection Strategy
    const voices = window.speechSynthesis.getVoices();
    
    // Priority: Specific Magnetic Male -> Generic Male -> British English -> US English -> Default
    let targetVoice = 
      voices.find(v => v.name.includes('Google UK English Male')) || 
      voices.find(v => v.name === 'Daniel') || // iOS Premium Male
      voices.find(v => v.name.includes('Microsoft David')) ||
      voices.find(v => v.name.toLowerCase().includes('male') && v.lang.startsWith('en')) ||
      voices.find(v => v.lang === 'en-GB') ||
      voices.find(v => v.lang === 'en-US');

    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    // Always set lang as fallback in case voice object fails
    utterance.lang = 'en-US'; 

    // 4. Conservative Pitch/Rate
    // Aggressive pitch changes (like 0.8) cause silence on some Android WebViews/iOS
    utterance.rate = 0.9; 
    utterance.pitch = 1.0; 

    // If we found a high-quality male voice, we can slightly deepen it
    if (targetVoice && (targetVoice.name.includes('Male') || targetVoice.name === 'Daniel')) {
      utterance.pitch = 0.95;
    }

    // 5. Event Handlers
    utterance.onend = () => {
      setIsPlaying(false);
      setPlayingText(null);
    };
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setIsPlaying(false);
      setPlayingText(null);
    };

    // 6. Speak
    window.speechSynthesis.speak(utterance);

    // 7. Chrome/Safari "Wake Up" Hack
    // Sometimes the engine is in a 'paused' state even after speak() is called.
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => {
            window.speechSynthesis.cancel(); // Stop audio when going back
            onBack();
          }}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 truncate max-w-[70%] text-center">
          {data.topic}
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Tabs */}
      <div className="flex p-2 bg-white shadow-sm mb-2 justify-center">
        <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-md">
          <button
            onClick={() => setActiveTab('words')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'words' 
                ? 'bg-white text-brand-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpenIcon className="w-4 h-4 mr-2" />
            Words
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'story' 
                ? 'bg-white text-brand-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            Scenario Context
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full pb-20">
        
        {activeTab === 'words' && (
          <div className="space-y-3">
            <div className="text-sm text-gray-500 mb-2 px-1">
              {data.words.length} key terms generated for this scenario.
            </div>
            {data.words.map((word, index) => {
              const isThisWordPlaying = playingText === word.english;
              return (
                <div 
                  key={index} 
                  onClick={() => playAudio(word.english)} // Make whole card clickable for easier mobile use
                  className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99] ${
                    isThisWordPlaying ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50' : 'border-gray-100 hover:border-brand-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className={`text-lg font-bold ${isThisWordPlaying ? 'text-brand-800' : 'text-gray-900'}`}>
                        {word.english}
                      </h3>
                      {word.pronunciation && (
                        <span className="text-xs text-gray-400 font-mono">/{word.pronunciation}/</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{word.chinese}</p>
                  </div>
                  <button 
                    className={`p-2 rounded-full transition-colors ${
                      isThisWordPlaying 
                        ? 'text-brand-600 bg-brand-100' 
                        : 'text-gray-400 bg-gray-50 group-hover:text-brand-500 group-hover:bg-brand-50'
                    }`}
                    aria-label="Play pronunciation"
                  >
                    <Volume2Icon className={`w-5 h-5 ${isThisWordPlaying ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'story' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-brand-400">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">English Context</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(data.connectedText);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors active:scale-95 ${
                    playingText === data.connectedText
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-brand-100 text-brand-700 hover:bg-brand-200'
                  }`}
                >
                  <Volume2Icon className={`w-4 h-4 ${playingText === data.connectedText ? 'animate-pulse' : ''}`} />
                  {playingText === data.connectedText ? 'Playing...' : 'Listen'}
                </button>
              </div>
              <p 
                className="text-lg text-gray-700 leading-relaxed font-serif cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => playAudio(data.connectedText)}
              >
                {data.connectedText.split(/(\s+)/).map((part, i) => {
                  const isVocab = data.words.some(w => 
                    part.toLowerCase().includes(w.english.toLowerCase()) || 
                    w.english.toLowerCase().includes(part.toLowerCase().trim())
                  );
                  return isVocab && part.trim().length > 2 ? (
                    <span key={i} className="text-brand-700 font-semibold bg-brand-50 rounded px-0.5">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  );
                })}
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Translation</h3>
              <p className="text-gray-600 leading-relaxed">
                {data.translation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;