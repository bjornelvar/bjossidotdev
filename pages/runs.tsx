import React, { useEffect, useState } from 'react';
import PlotFigure from '@/components/PlotFigure';

const StravaBoard: React.FC = () => {
  const [activities, setActivities] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);
  const [error, setError] = useState('');

  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const calculatePace = (distance, time) => {
    if (!distance || !time) return '-';
    const pace = time / 60 / (distance / 1000); // Minutes per km
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')} min/km`;
  };

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userIds = ['bjossi'];
        const fetchPromises = userIds.map(userId =>
          fetch(`/api/strava?userId=${userId}`).then(res => {
            if (!res.ok) {
              throw new Error(
                `Failed to fetch activities for userId=${userId}`,
              );
            }
            return res.json().then(activities =>
              activities
                .filter(activity => activity.type === 'Run') // Filter only runs
                .map(activity => ({
                  ...activity,
                  userId, // Add userId to each activity
                })),
            );
          }),
        );

        const results = await Promise.all(fetchPromises);
        const allActivities = [].concat(...results); // Flatten the array of arrays

        // Process data for the table
        const processedActivities = allActivities.map(activity => ({
          userId: activity.userId,
          date: new Date(activity.start_date),
          start_date: formatDate(activity.start_date), // Format date as "YYYY/MM/DD"
          distance: activity.distance / 1000, // Convert to km
          duration: activity.moving_time,
          pace: calculatePace(activity.distance, activity.moving_time),
          avgHr: activity.average_heartrate || '-',
          maxHr: activity.max_heartrate || '-',
        }));

        // Process data for the cumulative plot
        const cumulativeByUser = Object.keys(
          allActivities.reduce((acc, cur) => {
            acc[cur.userId] = acc[cur.userId] || [];
            acc[cur.userId].push(cur);
            return acc;
          }, {}),
        ).flatMap(userId => {
          let cumulativeDistance = 0;
          return allActivities
            .filter(activity => activity.userId === userId)
            .sort(
              (a, b) =>
                new Date(a.start_date).getTime() -
                new Date(b.start_date).getTime(),
            ) // Ensure ascending order for the plot
            .map(activity => {
              cumulativeDistance += activity.distance / 1000; // Convert to km
              return {
                userId,
                date: new Date(activity.start_date),
                cumulativeKm: cumulativeDistance,
              };
            });
        });

        setActivities(
          processedActivities.sort(
            (a, b) => b.date.getTime() - a.date.getTime(),
          ), // Sort table data by most recent date
        );
        setCumulativeData(cumulativeByUser); // Keep plot data in ascending date order
      } catch (error) {
        setError('Error fetching activities');
        console.error('Error:', error);
      }
    };

    fetchActivities();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <PlotFigure data={cumulativeData} />
      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#000000',
              textAlign: 'left',
              color: '#ffffff',
            }}
          >
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Km</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>
              Duration
            </th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Pace</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Avg HR</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Max HR</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {activity.distance.toFixed(2)}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {formatDuration(activity.duration)}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {activity.pace}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {activity.avgHr}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {activity.maxHr}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {activity.start_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StravaBoard;
