const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.send("app on vercel");
});

app.get("/manga/image/:title", async (req, res) => {
  const imageUrl = "https://uploads.mangadex.org/covers/8f3e1818-a015-491d-bd81-3addc4d7d56a/26dd2770-d383-42e9-a42b-32765a4d99c8.png";

  try {
    // Fetch the image from the external URL
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    // Set the appropriate content type
    res.set("Content-Type", "image/png");

    // Send the image as the response
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Error fetching the image.");
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
