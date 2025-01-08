import React, { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

const PlotFigure = ({ data }) => {
  const plotRef = useRef(null);

  useEffect(() => {
    const transformedData = data.reduce((acc, curr) => {
      const userKey = curr.userId;
      const date = curr.date;
      const distance = curr.cumulativeKm; // Always use kilometers

      if (!acc[userKey]) acc[userKey] = [];
      acc[userKey].push({ date, cumulativeDistance: distance });

      return acc;
    }, {});

    const marks = Object.keys(transformedData).flatMap(userId => {
      const strokeColor = userId === 'bjossi' ? '#ffffea' : '#0b69ff';

      const lineMark = Plot.line(transformedData[userId], {
        x: 'date',
        y: 'cumulativeDistance',
        stroke: strokeColor,
        title: d => `${userId}: ${d.cumulativeDistance.toFixed(2)} km`,
      });

      const lastDataPoint =
        transformedData[userId][transformedData[userId].length - 1];

      const labelMark = Plot.text([lastDataPoint], {
        x: () => new Date(), // Force x position to the rightmost edge
        y: 'cumulativeDistance',
        text: d => `${d.cumulativeDistance.toFixed(2)} km`, // Display the distance value
        fill: strokeColor,
        dx: 10, // Offset horizontally from the right edge
        fontSize: 14,
        textAnchor: 'start',
      });

      return [lineMark, labelMark];
    });

    const options = {
      marks: marks,
      width: 800,
      height: 500,
      marginLeft: 80,
      marginRight: 100, // Add extra margin to the right for labels
      color: {
        legend: true,
      },
      x: {
        grid: true,
        label: 'Date',
        type: 'utc', // Use 'utc' for consistent time handling
        domain: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      },
      y: {
        grid: true,
        label: 'Distance (km)',
        domain: [
          0,
          Math.ceil(Math.max(...data.map(d => d.cumulativeKm)) * 1.1),
        ],
      },
    };

    const plot = Plot.plot(options);
    plotRef.current.innerHTML = '';
    plotRef.current.appendChild(plot);
  }, [data]);

  return <div ref={plotRef}></div>;
};

export default PlotFigure;
