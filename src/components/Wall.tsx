import { useSettings } from '@/contexts/SettingsContext';
import { parseColor } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Bond, Grid, makeFixedCourse, makeReferenceCourse } from '../Bond';
import { BaseBrick, totalLogicalWidth } from '../Brick';
import { BOND_TYPES } from '../data/Bonds';
import { courseToDrawable, DrawableBrick } from '../Render';
import { Settings } from '../Settings';
import { darkenByBrickSize, makeRandomSequence, offsetColorRandomly } from '../Util';

export const Wall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bricks, setBricks] = useState<DrawableBrick[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    const calculateBricks = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth * (1 / settings.zoom);
      const containerHeight = containerRef.current.clientHeight * (1 / settings.zoom);

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

  const shadowColour = parseColor(settings.mortarColour)
    .toFormat('hsla')
    .withChannelValue(
      'lightness',
      Math.max(
        parseColor(settings.mortarColour).toFormat('hsla').getChannelValue('lightness') - 30,
        0,
      ),
    )
    .toString('rgba');

  const randomSequence = makeRandomSequence();

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
            left: brick.x * settings.zoom,
            top: brick.y * settings.zoom,
            width: brick.width * settings.zoom,
            height: brick.height * settings.zoom,
            border: 'none',
            backgroundColor: offsetColorRandomly(
              darkenByBrickSize(parseColor(brick.colour), brick.width, settings.brick.width),
              randomSequence,
            ).toString('rgba'),
            textAlign: 'center',
            boxShadow: settings.brickShadow
              ? `2px 1px 1px ${shadowColour},
                 1px 2px 1px ${shadowColour},
                 3px 3px 1px ${shadowColour}`
              : 'none',
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

function makeBond(bond: keyof typeof BOND_TYPES, brick: BaseBrick): Bond {
  return BOND_TYPES[bond](brick);
}

function makeGrid(settings: Settings): Grid {
  return {
    courseHeight: settings.courseHeight,
    minHeadJointWidth: settings.minHeadJointWidth,
    baseBrick: settings.brick,
  };
}
