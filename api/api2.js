const router=require("express").Router();
const axios = require('axios');
require("dotenv").config();


// Replace these with your own Deezer API credentials
const DEEZER_APP_ID = process.env.Api_Id;
const DEEZER_APP_SECRET = process.env.Api_Key;

// Deezer API URLs
const DEEZER_API_URL = 'https://api.deezer.com/';
const DEEZER_AUTH_URL = 'https://connect.deezer.com/oauth/auth.php';
const DEEZER_TOKEN_URL = 'https://connect.deezer.com/oauth/access_token.php';

// Get the access token using your credentials
async function getAccessToken() {
  try {
    const authResponse = await axios.post(DEEZER_TOKEN_URL, {
      app_id: DEEZER_APP_ID,
      secret: DEEZER_APP_SECRET,
      output: 'json',
    });

    return authResponse.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Search for tracks and return the 30 most recently updated ones
async function getRecentTracks(accessToken) {
  try {
    const searchResponse = await axios.get(`${DEEZER_API_URL}search`, {
      params: {
        q: 'track:',
        order: 'time',
        limit: 20,
        access_token: accessToken,
      },
    });

    return searchResponse.data.data;
  } catch (error) {
    console.error('Error getting recent tracks:', error.response ? error.response.data : error.message);
    throw error;
  }
}

router.get('/tracks', async (req, res) => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    // Get the 30 most recently updated tracks
    const recentTracks = await getRecentTracks(accessToken);
        var data=[];
    // Respond with the track information
        recentTracks.forEach( async element => {
			 data.push({image: element.artist,title: element.album.title,song: element.preview,name: element.artist.name});
		});
		res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports =router;