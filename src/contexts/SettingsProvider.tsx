import { useState } from 'react';
import { DEFAULT_SETTINGS, Settings, SettingsContext } from './SettingsContext';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS());

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
