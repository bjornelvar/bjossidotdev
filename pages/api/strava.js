// pages/api/strava.js

export default async function handler(req, res) {
  const refreshUrl = 'https://www.strava.com/oauth/token';
  const clientId = process.env.BJOSSI_CLIENT_ID;
  const clientSecret = process.env.BJOSSI_CLIENT_SECRET;
  const refreshToken = process.env.BJOSSI_REFRESH_TOKEN;

  try {
    // Refresh the access token
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
    const after = Math.floor(new Date('2024-01-01T00:00:01Z').getTime() / 1000);
    const activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=1`;

    const activitiesResponse = await fetch(activitiesUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!activitiesResponse.ok) {
      throw new Error('Failed to fetch activities');
    }

    const activities = await activitiesResponse.json();
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
