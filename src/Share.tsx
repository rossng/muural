import { IconButton } from '@chakra-ui/react';
import { LucideShare2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ClipboardIconButton,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRoot,
} from './components/ui/clipboard';
import { InputGroup } from './components/ui/input-group';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from './components/ui/popover';
import { parseShareUrl, settingsToShareUrl, useSettings } from './contexts/SettingsContext';

export function Share() {
  const [shareUrl, setShareUrl] = useState<string>('');
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const share = params.get('share');
    if (share) {
      const loadedSettings = parseShareUrl(window.location.search);
      if (loadedSettings) {
        updateSettings(loadedSettings);
        // Clean up the URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [updateSettings]);

  return (
    <PopoverRoot positioning={{ placement: 'top' }}>
      <PopoverTrigger>
        <IconButton
          as="div"
          aria-label="Share"
          rounded="full"
          size="lg"
          shadow="lg"
          onClick={() => setShareUrl(settingsToShareUrl(settings))}
        >
          <LucideShare2 />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent zIndex={900}>
        <PopoverBody>
          <ClipboardRoot maxW="300px" value={shareUrl}>
            <ClipboardLabel>Share</ClipboardLabel>
            <InputGroup width="full" endElement={<ClipboardIconButton me="-2" />}>
              <ClipboardInput />
            </InputGroup>
          </ClipboardRoot>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
