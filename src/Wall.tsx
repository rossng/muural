import { Settings, useSettings } from '@/contexts/SettingsContext';
import { useEffect, useRef, useState } from 'react';
import { Bond, Grid, makeFixedCourse, makeReferenceCourse } from './Bond';
import { BaseBrick, totalLogicalWidth } from './Brick';
import { courseToDrawable, DrawableBrick } from './Render';
import { FLEMISH_BOND, STRETCHER_BOND } from './data/Bonds';

export const Wall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bricks, setBricks] = useState<DrawableBrick[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    const calculateBricks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const allBricks = makeWall(
        makeBond(settings.bond, settings.brick),
        makeGrid(settings),
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
  }, [settings, settings.bond, settings.brick]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: settings.mortarColour,
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
            backgroundColor: brick.colour,
            textAlign: 'center',
          }}
        />
      ))}
    </div>
  );
};

function makeWall(bond: Bond, grid: Grid, width: number, height: number): DrawableBrick[] {
  const coursesCount = Math.ceil(height / grid.courseHeight);

  const allBricks: DrawableBrick[] = [];

  const referenceCourse = makeReferenceCourse(bond.courses[0], width, grid);
  const referenceCourseWidth = totalLogicalWidth(referenceCourse);
  const referenceCourseBricks = courseToDrawable(
    width,
    height - grid.courseHeight,
    referenceCourse,
  );
  allBricks.push(...referenceCourseBricks);

  for (let courseIndex = 1; courseIndex < coursesCount; courseIndex++) {
    const courseBond = bond.courses[courseIndex % bond.courses.length];
    const courseBricks = makeFixedCourse(courseBond, referenceCourseWidth);
    const bricks = courseToDrawable(
      width,
      height - (courseIndex + 1) * grid.courseHeight,
      courseBricks,
    );
    allBricks.push(...bricks);
  }

  return allBricks;
}

function makeBond(bond: 'flemish' | 'stretcher', brick: BaseBrick): Bond {
  return bond === 'flemish' ? FLEMISH_BOND(brick) : STRETCHER_BOND(brick);
}

function makeGrid(settings: Settings): Grid {
  return {
    courseHeight: settings.courseHeight,
    minHeadJointWidth: settings.minHeadJointWidth,
    baseBrick: settings.brick,
  };
}
