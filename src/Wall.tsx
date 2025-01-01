import { useEffect, useRef, useState } from 'react';
import { Brick, calculateBricksForContainer, FLEMISH_BOND, WAAL } from './Bond';

export const Wall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bricks, setBricks] = useState<Brick[]>([]);

  useEffect(() => {
    const calculateBricks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const allBricks = calculateBricksForContainer(
        FLEMISH_BOND(WAAL),
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
      {bricks.map((brick, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: brick.x,
            top: brick.y,
            width: brick.width,
            height: brick.height,
            border: 'none',
            backgroundColor: '#c75d4d',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#ccc',
              fontFamily: 'sans-serif',
              fontSize: '10px',
              marginTop: '10px',
            }}
          >
            {brick.width}
          </div>
        </div>
      ))}
    </div>
  );
};
