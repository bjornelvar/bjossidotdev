import React, { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';

const PlotFigure = ({ data, unit }) => {
  const plotRef = useRef(null);

  useEffect(() => {
    // First, transform the data to fit the plotting requirements
    const transformedData = data.reduce((acc, curr) => {
      const userKey = curr.userId; // Use userId to differentiate data
      const date = curr.date;
      const distance =
        unit === 'km' ? curr.cumulativeKm : curr.cumulativeKm * 0.621371; // Convert distance based on unit

      // Initialize array for user if not already present
      if (!acc[userKey]) acc[userKey] = [];
      acc[userKey].push({ date, cumulativeDistance: distance });

      return acc;
    }, {});

    // Then, create line marks for each user's data
    const marks = Object.keys(transformedData).map((userId, index) => {
      // You can customize the stroke color or other properties based on the user
      const strokeColor = userId === 'bjossi' ? '#ccd5ae' : '#d4a373'; // Example color differentiation
      // return Plot.line(transformedData[userId], { x: 'date', y: 'cumulativeDistance', stroke: strokeColor });
      return Plot.line(transformedData[userId], {
        x: 'date',
        y: 'cumulativeDistance',
        stroke: strokeColor,
        title: d => `${userId}: ${d.cumulativeDistance.toFixed(2)} ${unit}`,
      });
    });

    // Plot configuration
    const options = {
      marks: marks,
      width: 800,
      height: 400,
      marginLeft: 50, // Ensure there's enough space for the y-axis labels
      // Remove the tickFormat to avoid the previous error
      color: {
        legend: true, // Display a legend to distinguish users
      },
    };

    // Create the plot and append it to the ref
    const plot = Plot.plot(options);
    plotRef.current.innerHTML = '';
    plotRef.current.appendChild(plot);
  }, [data, unit]);

  return <div ref={plotRef}></div>;
};

export default PlotFigure;
