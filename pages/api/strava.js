// pages/api/strava.js

export default async function handler(req, res) {
  const userId = req.query.userId;
  const refreshUrl = 'https://www.strava.com/oauth/token';
  // const clientId = process.env.BJOSSI_CLIENT_ID;
  // const clientSecret = process.env.BJOSSI_CLIENT_SECRET;
  // const refreshToken = process.env.BJOSSI_REFRESH_TOKEN;

  try {
    console.log('userId: ', userId);
    const { clientId, clientSecret, refreshToken } = getUserCredentials(userId);
    const refreshResponse = await fetch(refreshUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!refreshResponse.ok) {
      throw new Error('Failed to refresh access token');
    }

    const { access_token } = await refreshResponse.json();

    // Fetch activities with the new access token
    const after = Math.floor(new Date('2025-01-01T00:00:01Z').getTime() / 1000);
    const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=1`;

    const activitiesResponse = await fetch(activitiesUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!activitiesResponse.ok) {
      throw new Error('Failed to fetch activities');
    }

    const activities = await activitiesResponse.json();
    console.log('activities: ', activities);
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

function getUserCredentials(userId) {
  if (userId === 'bjossi') {
    return {
      clientId: process.env.BJOSSI_CLIENT_ID,
      clientSecret: process.env.BJOSSI_CLIENT_SECRET,
      refreshToken: process.env.BJOSSI_REFRESH_TOKEN,
    };
  }
  if (userId === 'kris') {
    return {
      clientId: process.env.KRIS_CLIENT_ID,
      clientSecret: process.env.KRIS_CLIENT_SECRET,
      refreshToken: process.env.KRIS_REFRESH_TOKEN,
    };
  }
  throw new Error('Invalid user');
}
