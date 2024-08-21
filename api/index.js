import express from "express";
import axios from "axios";
import cors from "cors"; // Import the CORS package

const app = express();

let manga_url = 'https://api.mangadex.org';
let cover_url = 'https://api.mangadex.org/cover/';


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

async function fetch_file_id(url, id) {
    let full2 = `https://api.mangadex.org/cover?manga%5B%5D=${id}&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc`;
    
    try {
        const resp = await axios.get(full2);
        return resp.data;
    } catch (err) {
        console.error("Error fetching manga info:", err);
        throw err;
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

// For manga info
app.get("/aviv2/manga/info/:query", async (req, res) => {
    let s_query = req.params.query;
    try {
        let response = await fetch_info(manga_url, s_query);
        res.json(response); // Send the data as JSON
    } catch (error) {
        res.status(500).send("Error fetching manga info.");
    }
});

// For cover related info
app.get('/aviv2/manga/cover/:manga_id', async(req, res) => {
    let id = req.params.manga_id;
    try {
        let resp = await fetch_file_id(cover_url, id);
        res.json(resp);
    } catch(err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));
