import React from 'react';

const Thermostat = (props) => {
  const getStyles = () => {
    let dialColor = '#222222';
    const difference = props.ambientTemperature - props.desiredTemperature;
    if (props.desiredTemperature > props.ambientTemperature) {
      dialColor = '#E36304';
    } else if (props.desiredTemperature < props.ambientTemperature && difference > 5) {
      dialColor = '#007AF1';
    }

    return {
      dial: {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      },
      circle: {
        fill: dialColor,
        WebkitTransition: 'fill 0.5s',
        transition: 'fill 0.5s',
      },
      target: {
        fill: 'white',
        textAnchor: 'middle',
        fontFamily: 'Helvetica, sans-serif',
        alignmentBaseline: 'central',
        fontSize: '120px',
        fontWeight: 'bold',
        visibility: props.away ? 'hidden' : 'visible',
      },
      ambient: {
        fill: 'white',
        textAnchor: 'middle',
        fontFamily: 'Helvetica, sans-serif',
        alignmentBaseline: 'central',
        fontSize: '22px',
        fontWeight: 'bold',
      },
      away: {
        fill: 'white',
        textAnchor: 'middle',
        fontFamily: 'Helvetica, sans-serif',
        alignmentBaseline: 'central',
        fontSize: '72px',
        fontWeight: 'bold',
        opacity: props.away ? '1' : '0',
        pointerEvents: 'none',
      },
    };
  };

  const pointsToPath = (points) => [
    points
      .map((point, iPoint) => [iPoint > 0 ? 'L' : 'M', point[0], ' ', point[1]].join(''))
      .join(' '),
    'Z',
  ].join('');

  const rotatePoint = (point, angle, origin) => {
    const radians = (angle * Math.PI) / 180;
    const x = point[0] - origin[0];
    const y = point[1] - origin[1];
    const x1 = x * Math.cos(radians) - y * Math.sin(radians) + origin[0];
    const y1 = x * Math.sin(radians) + y * Math.cos(radians) + origin[1];
    return [x1, y1];
  };

  const rotatePoints = (points, angle, origin) => points.map((point) => rotatePoint(point, angle, origin));

  const restrictToRange = (val, min, max) => {
    if (val < min) return min;
    if (val > max) return max;
    return val;
  };

  // Local variables used for rendering
  const diameter = 400;
  const radius = diameter / 2;
  const ticksOuterRadius = diameter / 30;
  const ticksInnerRadius = diameter / 8;
  const tickDegrees = 300;
  const rangeValue = props.maxValue - props.minValue;

  // Determine the maximum and minimum values to display
  let actualMinValue;
  let actualMaxValue;
  if (props.away) {
    actualMinValue = props.ambientTemperature;
    actualMaxValue = actualMinValue;
  } else {
    actualMinValue = Math.min(props.ambientTemperature, props.desiredTemperature);
    actualMaxValue = Math.max(props.ambientTemperature, props.desiredTemperature);
  }
  const min = restrictToRange(
    Math.round(((actualMinValue - props.minValue) / rangeValue) * props.numTicks),
    0,
    props.numTicks - 1,
  );
  const max = restrictToRange(
    Math.round(((actualMaxValue - props.minValue) / rangeValue) * props.numTicks),
    0,
    props.numTicks - 1,
  );

  // Renders the degree ticks around the outside of the thermostat
  const tickPoints = [
    [radius - 1, ticksOuterRadius],
    [radius + 1, ticksOuterRadius],
    [radius + 1, ticksInnerRadius],
    [radius - 1, ticksInnerRadius],
  ];
  const tickPointsLarge = [
    [radius - 1.5, ticksOuterRadius],
    [radius + 1.5, ticksOuterRadius],
    [radius + 1.5, ticksInnerRadius + 20],
    [radius - 1.5, ticksInnerRadius + 20],
  ];
  const theta = tickDegrees / props.numTicks;
  const offsetDegrees = 180 - (360 - tickDegrees) / 2;
  const tickArray = [];
  for (let iTick = 0; iTick < props.numTicks; iTick += 1) {
    const isLarge = iTick === min || iTick === max;
    const isActive = iTick >= min && iTick <= max;
    const tickElement = React.createElement('path', {
      key: ['tick-', iTick].join(''),
      d: pointsToPath(
        rotatePoints(isLarge ? tickPointsLarge : tickPoints, iTick * theta - offsetDegrees, [
          radius,
          radius,
        ]),
      ),
      style: {
        fill: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
      },
    });
    tickArray.push(tickElement);
  }

  // Determines whether the ambient temperature label will be displayed
  // to the left or right of the tick range
  const lblAmbientPosition = [radius, ticksOuterRadius - (ticksOuterRadius - ticksInnerRadius) / 2];
  const peggedValue = restrictToRange(props.ambientTemperature, props.minValue, props.maxValue);
  let degs = (tickDegrees * (peggedValue - props.minValue)) / rangeValue - offsetDegrees;
  if (peggedValue > props.desiredTemperature) {
    degs += 8;
  } else {
    degs -= 8;
  }
  const ambientPosition = rotatePoint(lblAmbientPosition, degs, [radius, radius]);

  // The styles change based on state
  const styles = getStyles();

  // Piece it all together to form the thermostat display
  return (
    <svg
      width={props.width}
      height={props.height}
      style={styles.dial}
      viewBox={['0 0 ', diameter, ' ', diameter].join('')}
    >
      <circle cx={radius} cy={radius} r={radius} style={styles.circle} />
      <g>{tickArray}</g>
      <text x={radius} y={radius} style={styles.target}>
        {`${Math.round(props.desiredTemperature)}`}
      </text>
      <text x={ambientPosition[0]} y={ambientPosition[1]} style={styles.ambient}>
        {`${Math.round(props.ambientTemperature)}°`}
      </text>
      <text x={radius} y={radius} style={styles.away}>
        Away
      </text>
    </svg>
  );
};

Thermostat.defaultProps = {
  height: '90%',
  width: '90%',
  numTicks: 100,
  minValue: 50,
  maxValue: 85,
  away: false,
  ambientTemperature: 74,
  desiredTemperature: 68,
};

export default Thermostat;
