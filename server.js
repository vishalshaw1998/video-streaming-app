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
            "https://images-na.ssl-images-amazon.com/images/I/71jzMH-kHQL._AC_SL1000_.jpg",
        duration: "3 mins",
        name: "Sample 1",
    },
    {
        id: 1,
        poster:
            "https://www.dccomics.com/sites/default/files/imce/2019/03-MAR/Gotham_S5_1sheet_Finale_F8_lores_5c9d4a749a98c0.81653480.jpg",
        duration: "4 mins",
        name: "Sample 2",
    },
    {
        id: 2,
        poster:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9bf4c176295697.5c65456462366.jpg",
        duration: "2 mins",
        name: "Sample 3",
    },
    {
        id: 3,
        poster:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9bf4c176295697.5c65456462366.jpg",
        duration: "2 mins",
        name: "Sample 4",
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

app.get("/video", (req, res) => {
    res.sendFile("assets/initial.mp4", { root: __dirname });
});

app.get("/api", (req, res) => {
    res.json({
        status: "ok",
    });
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
