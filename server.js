var express= require("express");
var bodyParser=require("body-parser")
var path=require("path")
var axios=require("axios");
require("dotenv").config();
var app= express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const api2Songs =require("./api/api2");
const port =process.env.PORT ||  5000;

app.use(express.json());
app.use(express.static("../public"))

app.post("/contact.html",(req,res)=>{
  const options = {
    method: 'POST',
    url: 'https://mail-sender-api1.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f',
      'X-RapidAPI-Host': 'mail-sender-api1.p.rapidapi.com'
    },
    data: {
      sendto: 'ahitubephraim5@gmail.com',
      ishtml: 'false',
      title: `${req.body.name} with email ${req.body.email}`,
      body: `${req.body.phone} contact.... ${req.body.message}`,
    }
  };  
   app.get('response',async(req,res)=>{
    
      try {
        const response = await axios.request(options);
        res.json(response.data);
      } catch (error) {
        console.error(error);
      }
   })

})
app.get("/joke",async(req,res)=>{
  const options = {
    method: 'GET',
    url: 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes',
    headers: {
      'X-RapidAPI-Key': 'f8f15b92eamsh69750d54920ffb6p11e1b2jsn9c8fab99fa0f',
      'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
})

app.get('/search', async (req, res) => {
  try {
    // Replace YOUR_DEEZER_APP_ID with your Deezer application ID
    const deezerAppId = process.env.Api_Id;
    const query = req.query.q || ''; // Get the search query from the URL parameter

    // Fetch 30 songs from the Deezer API based on the search query
    const response = await axios.get(`https://api.deezer.com/search?q=${query}&limit=30&app_id=${deezerAppId}`);
    const songs = response.data.data;

    // Send the fetched songs as JSON
    res.json({ songs, query });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define a route to render the home.handlebars view

app.use('/',api2Songs);
app.listen(port, () =>console.log(`Server running on port ${port} 🔥`));