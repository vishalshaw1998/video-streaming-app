const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const mongodb = require("mongodb");
const cors = require("cors");

app.use(cors());

const port = process.env.PORT || 5000;

const URL =
    "mongodb+srv://vishal:vishal@cluster0.4ipdu.mongodb.net/moviesData?retryWrites=true&w=majority";

app.get("/api/videos", async (req, res) => {
    try {
        let client = await mongodb.connect(URL);
        let db = client.db("moviesData");
        let data = await db.collection("movies").find().toArray();
        lengthData = data.length;
        res.json({
            lengthData,
            data,
        });
    } catch (err) {
        console.log(err);
    }
});

app.use((req, res, next) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end();
    } else {
        next();
    }
});

app.get("/api/:id/data", async (req, res) => {
    try {
        let client = await mongodb.connect(URL);
        let db = client.db("moviesData");
        let data = await db
            .collection("movies")
            .findOne({ _id: parseInt(req.params.id) });
        res.json({
            videoData: data,
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/video/:id", (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
