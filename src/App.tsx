import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';
import { LucideMaximize2, LucideMinimize2, LucideSettings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { DownloadWall } from './components/DownloadWall';
import { ResetSettings } from './components/ResetSettings';
import { Settings } from './components/Settings';
import { Share } from './components/Share';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from './components/ui/popover';
import { Tooltip } from './components/ui/tooltip';
import { Wall } from './components/Wall';
import { SettingsProvider } from './contexts/SettingsProvider';
import { useMouseActivity } from './hooks/useMouseActivity';

function App() {
  const isMouseActive = useMouseActivity();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const wallRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        document.body.style.cursor = 'default';
      }
    };
  }, []);

  useEffect(() => {
    if (document.fullscreenElement) {
      document.body.style.cursor = isMouseActive || settingsOpen ? 'default' : 'none';
    }
  }, [isMouseActive, settingsOpen]);

  return (
    <SettingsProvider>
      <Box width="100%" height="100%">
        <Box position="absolute" top="0" left="0" width="100vw" height="100vh">
          <Wall containerRef={wallRef} />
        </Box>

        <HStack
          position="absolute"
          bottom="4"
          right="4"
          display="flex"
          gap="2"
          opacity={isMouseActive || settingsOpen ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
        >
          <DownloadWall wallRef={wallRef} />

          <About />

          <Tooltip content="Toggle fullscreen">
            <IconButton
              aria-label="Toggle fullscreen"
              rounded="full"
              size="lg"
              shadow="lg"
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document
                    .exitFullscreen()
                    .then(() => {
                      document.body.style.cursor = 'default';
                    })
                    .catch(() => {});
                }
              }}
            >
              {!document.fullscreenElement ? <LucideMaximize2 /> : <LucideMinimize2 />}
            </IconButton>
          </Tooltip>

          <Share />

          <PopoverRoot
            positioning={{ placement: 'top' }}
            onOpenChange={({ open }) => setSettingsOpen(open)}
          >
            <PopoverTrigger>
              <Tooltip content="Settings">
                <IconButton as="div" aria-label="Settings" rounded="full" size="lg" shadow="lg">
                  <LucideSettings />
                </IconButton>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent zIndex={900}>
              <PopoverBody>
                <PopoverTitle>
                  <HStack justifyContent="space-between">
                    <Heading as="h2">Settings</Heading>
                    <ResetSettings />
                  </HStack>
                </PopoverTitle>
                <Settings />
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </HStack>
      </Box>
    </SettingsProvider>
  );
}

export default App;
