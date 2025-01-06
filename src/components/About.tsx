import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip } from '@/components/ui/tooltip';
import { IconButton, Link, Text, VStack } from '@chakra-ui/react';
import { LucideInfo } from 'lucide-react';
import { useRef, useState } from 'react';
import { SiGithub } from 'react-icons/si';

export function About() {
  const [infoOpen, setInfoOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <DialogRoot
      lazyMount
      open={infoOpen}
      onOpenChange={(e) => setInfoOpen(e.open)}
      initialFocusEl={() => ref.current}
    >
      <Tooltip content="About this app">
        <DialogTrigger asChild>
          <IconButton aria-label="About" rounded="full" size="lg" shadow="lg" onClick={() => {}}>
            <LucideInfo />
          </IconButton>
        </DialogTrigger>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack spaceY={2} alignItems="flex-start">
            <Text>A small experiment in generating brick wall bonds.</Text>
            <Text>Not all bonds are accurate (and they are of course only in 2D).</Text>
            <Text>
              Blog post:&nbsp;
              <Link
                colorPalette="red"
                href="https://www.rossng.eu/posts/2025-01-05-muural/"
                target="_blank"
              >
                Generating brick walls
              </Link>
            </Text>
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
        <DialogCloseTrigger ref={ref} />
      </DialogContent>
    </DialogRoot>
  );
}
