import React, { useEffect, useState } from 'react';
import PlotFigure from '../../components/PlotFigure';
import { Toggle, Text } from '@geist-ui/core';

const StravaBoard: React.FC = () => {
  const [unit, setUnit] = useState('km');
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(''); // Added error state

  const handleToggleChange = () => {
    setUnit(unit === 'km' ? 'miles' : 'km');
  };

  const formatDistance = (distance, unit) => {
    return unit === 'km'
      ? distance.toFixed(2)
      : (distance * 0.621371).toFixed(2);
  };

  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userIds = ['bjossi', 'kris']; // Array of user IDs
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

        const activitiesByUser = allActivities.reduce((acc, activity) => {
          acc[activity.userId] = [...(acc[activity.userId] || []), activity];
          return acc;
        }, {});

        const processedActivities = Object.keys(activitiesByUser).flatMap(
          userId => {
            let cumulativeDistance = 0;
            return activitiesByUser[userId].map(activity => {
              cumulativeDistance += activity.distance / 1000; // Convert to km
              return {
                userId,
                date: new Date(activity.start_date),
                cumulativeKm: cumulativeDistance,
              };
            });
          },
        );

        setActivities(processedActivities);
      } catch (error) {
        setError('Error fetching activities');
        console.error('Error:', error);
      }
    };

    fetchActivities();
  }, []);

  // Handle error in UI, for example
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        <Text font={0.8}>
          Switch to {unit === 'km' ? 'miles' : 'kilometers'}
        </Text>
        <Toggle
          marginBottom={0.5}
          checked={unit === 'miles'}
          onChange={handleToggleChange}
          width={1.5}
          height={1.5}
        />
      </div>
      <PlotFigure data={activities} />
    </div>
  );
};

export default StravaBoard;
