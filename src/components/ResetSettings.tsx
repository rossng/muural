import { useSettings } from '@/contexts/SettingsContext';
import { DEFAULT_SETTINGS } from '@/Settings';
import { IconButton } from '@chakra-ui/react';
import { LucideRotateCcw } from 'lucide-react';

export function ResetSettings() {
  const { updateSettings } = useSettings();
  return (
    <IconButton
      onClick={() => updateSettings(DEFAULT_SETTINGS())}
      size="2xs"
      title="Reset to default settings"
    >
      <LucideRotateCcw />
    </IconButton>
  );
}
