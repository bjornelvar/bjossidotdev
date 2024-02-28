// pages/dashboard/strava.tsx

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
// Import Observable's Plot library if you find a way to integrate it directly or use D3 for plotting as shown

const StravaDashboard: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const svgRef = useRef(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/strava');
        if (!res.ok) {
          throw new Error('Failed to fetch activities');
        }
        const activities = await res.json();

        // Process data for cumulative distance in kilometers
        let cumulativeDistance = 0; // in kilometers
        const processedActivities = activities.map((activity: any) => {
          cumulativeDistance += activity.distance / 1000; // Convert meters to kilometers and accumulate
          return {
            date: new Date(activity.start_date), // Convert start_date to Date object
            cumulativeKm: cumulativeDistance, // Accumulated distance in kilometers
          };
        });

        setActivities(processedActivities);
      } catch (error) {
        setError('Error fetching activities');
        console.error('Error:', error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      // Render your plot with D3 here
      // This example assumes you have an SVG element referenced by svgRef in your component
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear SVG content before rendering new plot

      // Define dimensions and scales
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3
        .scaleTime()
        .domain(d3.extent(activities, d => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(activities, d => d.cumulativeKm) as number])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Create line generator
      const line = d3
        .line()
        .x(d => x(d.date))
        .y(d => y(d.cumulativeKm));

      // Add line to SVG
      svg
        .append('path')
        .datum(activities)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      // Add axes
      const xAxis = g =>
        g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x));

      const yAxis = g =>
        g.attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

      svg.append('g').call(xAxis);
      svg.append('g').call(yAxis);

      // Add axis labels
      svg
        .append('text')
        .attr('transform', `translate(${width / 2},${height})`)
        .style('text-anchor', 'middle')
        .text('Date');

      svg
        .append('text')
        .attr(
          'transform',
          `translate(${margin.left / 3},${height / 2}) rotate(-90)`,
        )
        .style('text-anchor', 'middle')
        .text('Cumulative Distance (km)');
    }
  }, [activities]); // Rerun plotting code when activities data is updated

  return (
    <div>
      <h1>Strava Dashboard</h1>
      {error && <p>Error: {error}</p>}
      <svg ref={svgRef} width={960} height={500} />
    </div>
  );
};

export default StravaDashboard;
