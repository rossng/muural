import { BaseBrick } from '@/Brick';
import { BOND_TYPES } from '@/data/Bonds';
import { WAAL } from '@/data/Bricks';
import { assign } from 'radashi';

export interface Settings {
  wallWidth: number;
  wallHeight: number;
  courseHeight: number;
  bond: keyof typeof BOND_TYPES;
  minHeadJointWidth: number;
  brick: BaseBrick;
  mortarColour: string;
  brickShadow: boolean;
  zoom: number;
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
  zoom: 0.5,
});

export function loadStoredSettings(): Settings | null {
  const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!stored) return null;

  try {
    return combineWithDefault(JSON.parse(stored) as Settings);
  } catch {
    return null;
  }
}

export const SETTINGS_STORAGE_KEY = 'muural-settings';

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
    return combineWithDefault(settings);
  } catch {
    return null;
  }
}

export function combineWithDefault(settings: Settings): Settings {
  return assign(DEFAULT_SETTINGS(), settings);
}
