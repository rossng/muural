import { describe, expect, test } from 'vitest';
import { parseShareUrl } from './Settings';
import { WAAL } from './data/Bricks';

describe('Settings', () => {
  test('parse v1 share url', () => {
    const settings = parseShareUrl(
      '?share=eyJ3YWxsV2lkdGgiOjEwMDAsIndhbGxIZWlnaHQiOjgwMCwiY291cnNlSGVpZ2h0Ijo2Mi41LCJib25kIjoiRmxlbWlzaCIsIm1pbkhlYWRKb2ludFdpZHRoIjoxMCwiYnJpY2siOnsiY29sb3VyIjoiI2M3NWQ0ZCIsIndpZHRoIjoyMTAsImhlaWdodCI6NTAsImV4cGVjdGVkSGVhZEpvaW50V2lkdGgiOjEwfSwibW9ydGFyQ29sb3VyIjoiI2NjYyIsImJyaWNrU2hhZG93Ijp0cnVlfQ%3D%3D&v=1',
    );
    expect(settings).toEqual({
      wallWidth: 1000,
      wallHeight: 800,
      courseHeight: 62.5,
      bond: 'Flemish',
      minHeadJointWidth: 10,
      brick: WAAL,
      mortarColour: '#ccc',
      brickShadow: true,
      colourBricksBySize: true,
      zoom: 0.5,
    });
  });
});
