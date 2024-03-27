import React, { useState, useEffect } from 'react';
import { Button, Text } from '@geist-ui/core';

export default function Day() {
  const [selectedEvents, setSelectedEvents] = useState(null); // Change to null to better represent uninitialized state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Calculate the min and max dates allowed for navigation
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 3);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 2);

  // Generate a unique cache key based on the current date
  const CACHE_LIMIT = 7; // Limit the cache to store data for 7 days

  // Generate a unique cache key based on the current date
  const getCacheKey = date =>
    `events_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;

  const updateCache = (key, data) => {
    // Only update cache if data contains selected facts
    if (data && data.length) {
      // Fetch the current cache index or initialize it
      const cacheIndex = JSON.parse(localStorage.getItem('cacheIndex')) || [];
      if (!cacheIndex.includes(key)) {
        cacheIndex.push(key);
        // Maintain a limit on the number of cached entries
        while (cacheIndex.length > 7) {
          // Assuming a limit of 7 days
          const oldestKey = cacheIndex.shift(); // Remove the oldest entry
          localStorage.removeItem(oldestKey); // Delete the oldest cached data
        }
      }
      // Update the cache index and the data in localStorage
      localStorage.setItem('cacheIndex', JSON.stringify(cacheIndex));
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const cacheKey = getCacheKey(currentDate);

      // Attempt to load cached data
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData && parsedData.length) {
          setSelectedEvents(parsedData);
          setIsLoading(false);
          return;
        } else {
          // If cached data is invalid, remove it
          localStorage.removeItem(cacheKey);
        }
      }

      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.selected && data.selected.length > 0) {
          setSelectedEvents(data.selected);
          updateCache(cacheKey, data.selected); // Cache valid data
        } else {
          setSelectedEvents(null); // Handle cases with no events
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSelectedEvents(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    if (newDate >= minDate) {
      setCurrentDate(newDate);
    }
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    if (newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  const getMonthName = month => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  };

  const monthName = getMonthName(currentDate.getMonth() + 1);
  const day = currentDate.getDate();

  return (
    <div>
      <Button onClick={goToPreviousDay} disabled={currentDate <= minDate}>
        Previous Day
      </Button>
      <Button onClick={goToNextDay} disabled={currentDate >= maxDate}>
        Next Day
      </Button>
      <Text style={{ marginBottom: '30px' }} h1>
        What happened on {monthName} {day}?
      </Text>
      {isLoading ? (
        <Text h2>Loading...</Text>
      ) : selectedEvents && selectedEvents.length > 0 ? ( // Check if selectedEvents is truthy and has items
        selectedEvents.map((event, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <Text h2>
              {event.year}: {event.text}
            </Text>
          </div>
        ))
      ) : (
        <Text>Wikipedia API is being slow.</Text>
      )}
    </div>
  );
}
