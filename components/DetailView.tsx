import React, { useState, useEffect } from 'react';
import { ScenarioContent, WordItem } from '../types';
import { ChevronLeftIcon, Volume2Icon, BookOpenIcon, SparklesIcon } from './Icons';

interface DetailViewProps {
  data: ScenarioContent;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ data, onBack }) => {
  const [activeTab, setActiveTab] = useState<'words' | 'story'>('words');

  // Ensure voices are loaded when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      // Calling getVoices triggers the browser to load them
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    
    // Chrome requires this event listener to ensure voices are populated
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const playAudio = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any currently playing audio
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Priority List for "Magnetic Male Voice"
    // 1. "Google UK English Male" - Excellent quality, deep, magnetic (Chrome/Android)
    // 2. "Daniel" - High quality British Male (iOS/macOS)
    // 3. "Microsoft David" - Standard Male (Windows)
    // 4. Any voice explicitly named "Male"
    // 5. Fallback: "en-GB" (British accents often sound more 'magnetic'/formal than US default)
    
    let targetVoice = voices.find(v => v.name.includes('Google UK English Male'));
    
    if (!targetVoice) {
      targetVoice = voices.find(v => v.name === 'Daniel'); // iOS
    }
    if (!targetVoice) {
      targetVoice = voices.find(v => v.name.includes('Microsoft David')); // Windows
    }
    if (!targetVoice) {
      // Search for any English voice with "Male" in the name
      targetVoice = voices.find(v => 
        v.lang.startsWith('en') && v.name.toLowerCase().includes('male')
      );
    }
    
    // Fallback strategy if no specific male voice is found
    if (!targetVoice) {
      // Prefer British English as fallback (often sounds better than default US)
      targetVoice = voices.find(v => v.lang === 'en-GB');
    }
    if (!targetVoice) {
      // Final fallback
      targetVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (targetVoice) {
      utterance.voice = targetVoice;

      // Pitch Adjustment Strategy:
      // If we found a known Male voice, use a natural slightly low pitch (0.9).
      // If we are using a fallback (which might be female), use a lower pitch (0.8) to simulate a deeper tone.
      const isKnownMale = targetVoice.name.includes('Male') || 
                          targetVoice.name.includes('Daniel') || 
                          targetVoice.name.includes('David');

      if (isKnownMale) {
        utterance.pitch = 0.9; // Natural male depth
      } else {
        // Artificially deepen the voice if we suspect it might be the default female voice
        utterance.pitch = 0.8; 
      }
    }

    // Rate: 0.85 is a moderate, clear speed for learning
    utterance.rate = 0.85; 

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 truncate max-w-[70%] text-center">
          {data.topic}
        </h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
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
            {data.words.map((word, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-brand-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{word.english}</h3>
                    {word.pronunciation && (
                      <span className="text-xs text-gray-400 font-mono">/{word.pronunciation}/</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{word.chinese}</p>
                </div>
                <button 
                  onClick={() => playAudio(word.english)}
                  className="p-2 text-brand-500 bg-brand-50 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity active:scale-95 hover:bg-brand-100"
                  aria-label="Play pronunciation"
                >
                  <Volume2Icon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'story' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-brand-400">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">English Context</h3>
                <button 
                  onClick={() => playAudio(data.connectedText)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-brand-100 text-brand-700 rounded-lg text-sm font-medium hover:bg-brand-200 transition-colors active:scale-95"
                >
                  <Volume2Icon className="w-4 h-4" />
                  Listen
                </button>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-serif">
                {data.connectedText.split(/(\s+)/).map((part, i) => {
                  // Simple highlighting check: if the word stem matches one of our vocab words
                  const isVocab = data.words.some(w => 
                    part.toLowerCase().includes(w.english.toLowerCase()) || 
                    w.english.toLowerCase().includes(part.toLowerCase().trim())
                  );
                  return isVocab && part.trim().length > 3 ? (
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