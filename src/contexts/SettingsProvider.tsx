import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, loadStoredSettings, Settings } from '../Settings';
import { SettingsContext } from './SettingsContext';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    // Load settings from localStorage on initial render
    const stored = loadStoredSettings();
    return stored ?? DEFAULT_SETTINGS();
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('muural-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((current) => ({
      ...current,
      ...newSettings,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS());
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
