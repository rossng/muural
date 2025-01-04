import { Box, Heading, IconButton } from '@chakra-ui/react';
import { LucideSettings } from 'lucide-react';
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

  return (
    <SettingsProvider>
      <Box width="100%" height="100%">
        <Box position="absolute" top="0" left="0" width="100vw" height="100vh">
          <Wall />
        </Box>

        <PopoverRoot positioning={{ placement: 'top' }}>
          <PopoverTrigger
            position="absolute"
            bottom="4"
            right="4"
            opacity={isMouseActive ? 1 : 0}
            transition="opacity 0.3s ease-in-out"
          >
            <IconButton aria-label="Settings" rounded="full" size="lg" shadow="lg">
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
      </Box>
    </SettingsProvider>
  );
}

export default App;
