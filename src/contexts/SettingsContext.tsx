import { BaseBrick } from '@/Brick';
import { BOND_TYPES } from '@/data/Bonds';
import { WAAL } from '@/data/Bricks';
import { createContext, useContext } from 'react';

export interface Settings {
  wallWidth: number;
  wallHeight: number;
  courseHeight: number;
  bond: keyof typeof BOND_TYPES;
  minHeadJointWidth: number;
  brick: BaseBrick;
  mortarColour: string;
  brickShadow: boolean;
}

export const DEFAULT_SETTINGS: () => Settings = () => ({
  wallWidth: 1000,
  wallHeight: 800,
  courseHeight: 62.5,
  bond: 'Flemish',
  minHeadJointWidth: 10,
  brick: WAAL,
  mortarColour: '#ccc',
  brickShadow: true,
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

const SETTINGS_STORAGE_KEY = 'muural-settings';

export function loadStoredSettings(): Settings | null {
  const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as Settings;
  } catch {
    return null;
  }
}

export function settingsToShareUrl(settings: Settings): string {
  const baseUrl = window.location.origin + window.location.pathname;
  const encoded = encodeURIComponent(btoa(JSON.stringify(settings)));
  return `${baseUrl}?share=${encoded}&v=1`;
}

export function parseShareUrl(url: string): Settings | null {
  const params = new URLSearchParams(url);
  const share = params.get('share');
  const version = params.get('v');

  if (!share || version !== '1') return null;

  try {
    const decoded = atob(decodeURIComponent(share));
    const settings = JSON.parse(decoded) as Settings;
    return settings;
  } catch {
    return null;
  }
}
