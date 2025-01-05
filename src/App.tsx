import { Box, Heading, HStack, IconButton, Link, Text, VStack } from '@chakra-ui/react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { LucideInfo, LucideMaximize2, LucideMinimize2, LucideSettings } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

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
          <Wall />
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
          <DialogRoot lazyMount open={infoOpen} onOpenChange={(e) => setInfoOpen(e.open)}>
            <DialogTrigger asChild>
              <IconButton
                aria-label="About"
                rounded="full"
                size="lg"
                shadow="lg"
                onClick={() => {}}
              >
                <LucideInfo />
              </IconButton>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>About</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack spaceY={2} alignItems="flex-start">
                  <Text>A small experiment in generating brick wall bonds.</Text>
                  <Text>Not all bonds are accurate (and they are of course only in 2D).</Text>
                  <Link
                    href="https://github.com/rossng/muural"
                    target="_blank"
                    rel="noopener noreferrer"
                    display="flex"
                    alignItems="center"
                    alignSelf="center"
                    gap={2}
                    title="View source on GitHub"
                  >
                    <SiGithub />
                  </Link>
                </VStack>
              </DialogBody>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

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

          <PopoverRoot
            positioning={{ placement: 'top' }}
            onOpenChange={({ open }) => setSettingsOpen(open)}
          >
            <PopoverTrigger>
              <IconButton as="div" aria-label="Settings" rounded="full" size="lg" shadow="lg">
                <LucideSettings />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent zIndex={900}>
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
