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
      // const strokeColor = userId === 'bjossi' ? '#ccd5ae' : '#d4a373';
      const strokeColor = userId === 'bjossi' ? '#283618' : '#bc6c25';
      // Create the line mark for the user's data
      const lineMark = Plot.line(transformedData[userId], {
        x: 'date',
        y: 'cumulativeDistance',
        stroke: strokeColor,
        title: d => `${userId}: ${d.cumulativeDistance.toFixed(2)} ${unit}`,
      });

      // Create the crosshair mark for interactive hover details
      // Adjust the crosshair mark based on your needs
      const crosshairMark = Plot.crosshairX(transformedData[userId], {
        x: 'date',
        y: 'cumulativeDistance',
        color: strokeColor,
        title: d => `${userId}: ${d.cumulativeDistance.toFixed(2)} ${unit}`,
      });

      return [lineMark, crosshairMark];
    });

    const options = {
      marks: marks,
      width: 800,
      height: 400,
      marginLeft: 50,
      color: {
        legend: true,
      },
    };

    const plot = Plot.plot(options);
    plotRef.current.innerHTML = '';
    plotRef.current.appendChild(plot);
  }, [data, unit]);

  return <div ref={plotRef}></div>;
};

export default PlotFigure;
