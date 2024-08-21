const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/image/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const imageUrl = "https://uploads.mangadex.org/covers/80487517-0144-45dc-acb4-f44582bf7a67/32ea5f1f-fac7-4301-a9eb-a14d42e98f9e.jpg";
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Set the correct content-type header for the image
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching the image');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
