import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';
import { LucideMaximize2, LucideMinimize2, LucideSettings } from 'lucide-react';
import { useEffect } from 'react';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from './components/ui/popover';
import { SettingsProvider } from './contexts/SettingsProvider';
import { useMouseActivity } from './hooks/useMouseActivity';
import { Settings } from './Settings';
import { Wall } from './Wall';

function App() {
  const isMouseActive = useMouseActivity();

  useEffect(() => {
    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        document.body.style.cursor = 'default';
      }
    };
  }, []);

  useEffect(() => {
    if (document.fullscreenElement) {
      document.body.style.cursor = isMouseActive ? 'default' : 'none';
    }
  }, [isMouseActive]);

  return (
    <SettingsProvider>
      <Box width="100%" height="100%">
        <Box position="absolute" top="0" left="0" width="100vw" height="100vh">
          <Wall />
        </Box>

        <HStack
          position="absolute"
          bottom="4"
          right="4"
          display="flex"
          gap="2"
          opacity={isMouseActive ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
        >
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

          <PopoverRoot positioning={{ placement: 'top' }}>
            <PopoverTrigger>
              <IconButton as="div" aria-label="Settings" rounded="full" size="lg" shadow="lg">
                <LucideSettings />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <PopoverTitle>
                  <Heading as="h2">Settings</Heading>
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
