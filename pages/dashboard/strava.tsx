import React, { useEffect, useState } from 'react';
import PlotFigure from '../../components/PlotFigure';

const StravaBoard: React.FC = () => {
  const [unit, setUnit] = useState('km');
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(''); // Added error state

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
              activities.map(activity => ({
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
    console.log(activities);
  }, []);

  // Handle error in UI, for example
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>
        Please do not refresh a lot, I only get 50 requests per 15 minutes!!!!
      </h1>
      <button onClick={() => setUnit(unit === 'km' ? 'miles' : 'km')}>
        Switch to {unit === 'km' ? 'Miles' : 'Kilometers'}
      </button>
      <PlotFigure data={activities} unit={unit} />
    </div>
  );
};

export default StravaBoard;
