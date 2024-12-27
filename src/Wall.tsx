import { useEffect, useRef, useState } from 'react';
import {
  Brick,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  calculateBricksForContainer,
  STRETCHER_BOND,
} from './Bond';

export const Wall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bricks, setBricks] = useState<Brick[]>([]);

  useEffect(() => {
    const calculateBricks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const allBricks = calculateBricksForContainer(
        STRETCHER_BOND,
        containerWidth,
        containerHeight,
      );
      setBricks(allBricks);
    };

    // Calculate initial bricks
    calculateBricks();

    // Recalculate on window resize
    const resizeObserver = new ResizeObserver(calculateBricks);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#8B8B8B',
      }}
    >
      {bricks.map((brick) => (
        <div
          key={brick.id}
          style={{
            position: 'absolute',
            left: brick.x,
            top: brick.y,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            border: 'none',
            backgroundColor: '#c75d4d',
          }}
        />
      ))}
    </div>
  );
};
