export interface WordItem {
  english: string;
  chinese: string;
  pronunciation?: string; // IPA or simple phonetic
}

export interface ScenarioContent {
  topic: string;
  words: WordItem[];
  connectedText: string; // The story/dialogue connecting the words
  translation: string; // Translation of the connected text
}

export enum AppView {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
}

export interface ScenarioCategory {
  id: string;
  name: string;
  nameCN: string; // Chinese name of the scenario
  category: string; // Category ID for filtering
  icon: string; // Basic icon name to map to SVG
  description: string;
}