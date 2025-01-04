import { BaseBrick } from '@/Brick';
import { WAAL } from '@/data/Bricks';
import { createContext, useContext } from 'react';

export interface Settings {
  wallWidth: number;
  wallHeight: number;
  courseHeight: number;
  bond: 'flemish' | 'stretcher';
  minHeadJointWidth: number;
  brick: BaseBrick;
}

export const DEFAULT_SETTINGS: () => Settings = () => ({
  wallWidth: 1000,
  wallHeight: 800,
  courseHeight: 62.5,
  bond: 'flemish',
  minHeadJointWidth: 10,
  brick: WAAL,
});

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
