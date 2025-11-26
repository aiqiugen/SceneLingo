import React, { useState, useCallback } from 'react';
import HomeView from './components/HomeView';
import DetailView from './components/DetailView';
import { generateScenarioData } from './services/geminiService';
import { AppView, ScenarioContent } from './types';
import { SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scenarioData, setScenarioData] = useState<ScenarioContent | null>(null);

  const handleSelectScenario = useCallback(async (scenarioName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateScenarioData(scenarioName);
      setScenarioData(data);
      setCurrentView(AppView.DETAIL);
    } catch (err) {
      console.error(err);
      setError("Failed to generate content. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView(AppView.HOME);
    setScenarioData(null);
    setError(null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
          <SparklesIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand-600 w-6 h-6" />
        </div>
        <h2 className="mt-8 text-xl font-bold text-gray-800">Consulting AI Teacher...</h2>
        <p className="text-gray-500 mt-2">Generating vocabulary and context for your scenario.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500 text-3xl font-bold">!</div>
        <h2 className="text-xl font-bold text-gray-800">Oops!</h2>
        <p className="text-gray-600 mt-2 mb-6">{error}</p>
        <button 
          onClick={() => { setError(null); setLoading(false); }}
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative sm:my-8 sm:rounded-[30px] sm:h-[800px] sm:border-8 sm:border-gray-800">
      {/* Mobile status bar simulation for aesthetics on desktop mock */}
      <div className="hidden sm:block absolute top-0 left-0 right-0 h-7 bg-gray-800 rounded-t-[20px] z-50 flex items-center justify-center">
        <div className="w-20 h-4 bg-gray-700 rounded-b-xl"></div>
      </div>

      <div className="h-full pt-0 sm:pt-7 bg-white">
        {currentView === AppView.HOME && (
          <HomeView onSelectScenario={handleSelectScenario} />
        )}
        {currentView === AppView.DETAIL && scenarioData && (
          <DetailView data={scenarioData} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default App;
