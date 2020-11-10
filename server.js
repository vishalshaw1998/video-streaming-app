const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

app.use(cors());

const port = process.env.PORT || 5000;

const videos = [
    {
        id: 0,
        poster:
            "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/wonder-woman-1984.jpg",
        duration: "2 mins",
        name: "Wonder Woman 1984",
    },
    {
        id: 1,
        poster:
            "https://images-na.ssl-images-amazon.com/images/I/71XL0VLqdtL._AC_SL1500_.jpg",
        duration: "2 mins",
        name: "The Dark Knight",
    },
    {
        id: 2,
        poster:
            "https://i.pinimg.com/originals/64/23/c5/6423c599a024c1e2e008bcba17009d81.jpg",
        duration: "2 mins",
        name: "The Amazing Spider-man",
    },
    {
        id: 3,
        poster:
            "https://images-na.ssl-images-amazon.com/images/I/71j%2BjX%2BnBBL._AC_SL1200_.jpg",
        duration: "3 mins",
        name: "Man Of Steel",
    },
];

app.get("/videos", (req, res) => {
    res.json({
        videos,
    });
});

app.use((req, res, next) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end();
    } else {
        next();
    }
});

app.get("/:id/data", (req, res) => {
    res.json({
        videoData: videos[req.params.id],
    });
});

app.get("/video/:id", (req, res) => {
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
