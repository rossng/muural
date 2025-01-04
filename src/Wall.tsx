import { useEffect, useRef, useState } from 'react';
import { Bond, GRID, makeFixedCourse, makeReferenceCourse } from './Bond';
import { totalLogicalWidth } from './Brick';
import { courseToDrawable, DrawableBrick } from './Render';
import { FLEMISH_BOND } from './data/Bonds';
import { WAAL } from './data/Bricks';

export const Wall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bricks, setBricks] = useState<DrawableBrick[]>([]);

  useEffect(() => {
    const calculateBricks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const allBricks = makeWall(FLEMISH_BOND(WAAL), containerWidth, containerHeight);
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

function makeWall(bond: Bond, width: number, height: number): DrawableBrick[] {
  const coursesCount = Math.ceil(height / GRID.courseHeight);

  const allBricks: DrawableBrick[] = [];

  const referenceCourse = makeReferenceCourse(bond.courses[0], width, GRID);
  const referenceCourseWidth = totalLogicalWidth(referenceCourse);
  const referenceCourseBricks = courseToDrawable(
    width,
    height - GRID.courseHeight,
    referenceCourse,
  );
  allBricks.push(...referenceCourseBricks);

  for (let courseIndex = 1; courseIndex < coursesCount; courseIndex++) {
    const courseBond = bond.courses[courseIndex % bond.courses.length];
    const courseBricks = makeFixedCourse(courseBond, referenceCourseWidth);
    const bricks = courseToDrawable(
      width,
      height - (courseIndex + 1) * GRID.courseHeight,
      courseBricks,
    );
    allBricks.push(...bricks);
  }

  return allBricks;
}
