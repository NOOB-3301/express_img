import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("app on vercel");
});

app.get("/manga/image/", async (req, res) => {
  const imageUrl = "https://uploads.mangadex.org/covers/8f3e1818-a015-491d-bd81-3addc4d7d56a/26dd2770-d383-42e9-a42b-32765a4d99c8.png";

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Error fetching the image.");
  }
});

app.get("/manga/image/:coverid/:filename", async (req, res) => {
    // const imageUrl = "https://uploads.mangadex.org/covers/8f3e1818-a015-491d-bd81-3addc4d7d56a/26dd2770-d383-42e9-a42b-32765a4d99c8.png";
    let coverid = req.params.coverid
    let filename = req.params.filename
    
    res.send('this page is about coverid and filename')
})
app.listen(3000, () => console.log("Server ready on port 3000."));
