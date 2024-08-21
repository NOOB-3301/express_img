import express from "express";
import axios from "axios";

const app = express();

let manga_url = 'https://api.mangadex.org';

app.get("/", (req, res) => {
  res.send("app on vercel");
});

async function fetch_info(url, query) {
    try {
        const resp = await axios.get(`${url}/manga`, {
            params: { title: query }
        });
        console.log(resp.data); // Log the data instead of the entire response
        return resp.data; // Return the actual data
    } catch (error) {
        console.error("Error fetching manga info:", error);
        throw error;
    }
}

app.get("/manga/image/", async (req, res) => {
  const imageUrl = "https://uploads.mangadex.org/covers/8f3e1818-a015-491d-bd81-3addc4d7d56a/26dd2770-d383-42e9-a42b-32765a4d99c8.png";

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Error fetching the image.");
  }
});

app.get("/apiv2/manga/image/:coverid/:filename", async (req, res) => {
    let coverid = req.params.coverid;
    let filename = req.params.filename;

    res.send(`This page is about coverid and filename: ${coverid}, ${filename}`);
});

app.get("/manga/info/:query", async (req, res) => {
    let s_query = req.params.query;
    try {
        let response = await fetch_info(manga_url, s_query);
        res.json(response); // Send the data as JSON
    } catch (error) {
        res.status(500).send("Error fetching manga info.");
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));
