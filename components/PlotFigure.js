import React, { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

const PlotFigure = ({ data, unit }) => {
  const plotRef = useRef(null);

  useEffect(() => {
    const transformedData = data.reduce((acc, curr) => {
      const userKey = curr.userId;
      const date = curr.date;
      const distance =
        unit === 'km' ? curr.cumulativeKm : curr.cumulativeKm * 0.621371;

      if (!acc[userKey]) acc[userKey] = [];
      acc[userKey].push({ date, cumulativeDistance: distance });

      return acc;
    }, {});

    const marks = Object.keys(transformedData).flatMap(userId => {
      const strokeColor = userId === 'bjossi' ? 'blue' : '#bc6c25';

      // Existing line and crosshair marks
      const lineMark = Plot.line(transformedData[userId], {
        x: 'date',
        y: 'cumulativeDistance',
        stroke: strokeColor,
        title: d => `${userId}: ${d.cumulativeDistance.toFixed(2)} ${unit}`,
      });
      const crosshairMark = Plot.crosshairX(transformedData[userId], {
        x: 'date',
        y: 'cumulativeDistance',
        color: strokeColor,
        title: d => `${userId}: ${d.cumulativeDistance.toFixed(2)} ${unit}`,
      });

      // Calculate the position for the label (using the last point in the dataset for this user)
      const lastDataPoint =
        transformedData[userId][transformedData[userId].length - 1];
      const labelMark = Plot.text([lastDataPoint], {
        x: 'date',
        y: 'cumulativeDistance',
        text: d => userId, // This sets the text of the label to the userId, modify as needed
        fill: strokeColor,
        dx: 5, // Adjust the label position horizontally
        dy: -5, // Adjust the label position vertically
        fontSize: 20,
      });

      return [lineMark, crosshairMark, labelMark];
    });

    const options = {
      marks: marks,
      width: 800,
      height: 500,
      marginLeft: 80,
      marginRight: 80,
      color: {
        legend: true,
      },
      x: {
        grid: true,
        label: 'Date',
      },

      y: {
        grid: true,
        label: `Distance (${unit})`,
      },
    };

    const plot = Plot.plot(options);
    plotRef.current.innerHTML = '';
    plotRef.current.appendChild(plot);
  }, [data, unit]);

  return <div ref={plotRef}></div>;
};

export default PlotFigure;
