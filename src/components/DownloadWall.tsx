import { Tooltip } from '@/components/ui/tooltip';
import { IconButton } from '@chakra-ui/react';
import { LucideDownload } from 'lucide-react';
import { domToPng } from 'modern-screenshot';

interface DownloadWallProps {
  wallRef: React.RefObject<HTMLDivElement | null>;
}

export const DownloadWall: React.FC<DownloadWallProps> = ({ wallRef }) => {
  const handleDownload = async () => {
    if (!wallRef.current) return;

    try {
      const image = await domToPng(wallRef.current);

      const link = document.createElement('a');
      link.download = `wall-${new Date().toISOString()}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Failed to download wall:', error);
    }
  };

  return (
    <Tooltip content="Download wall as png">
      <IconButton
        aria-label="Download wall as image"
        rounded="full"
        size="lg"
        shadow="lg"
        onClick={handleDownload}
      >
        <LucideDownload />
      </IconButton>
    </Tooltip>
  );
};
