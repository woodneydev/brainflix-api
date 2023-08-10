const router = require("express").Router();
const fs = require("fs");
const crypto = require("crypto");

const readVideoDetails = () => {
    let videos = fs.readFileSync("./data/videos.json");
    videos = JSON.parse(videos);
    return videos;
}

const getVideos = () => {
    let videoDetails = readVideoDetails();
    const result = videoDetails.map( ({id, channel, title, image}) => {
        return {id, channel, title, image}
    });

    return result;
}

const getVideoDetail = (id) => {
    const videoDetails = readVideoDetails();
    const result = videoDetails.find(video => video.id === id)
    return result;
}

const createId = (length) => {
    return crypto.randomBytes(length).toString("hex");
}

//Routes
router.get("/", (req, res) => {
    const videos = getVideos();
    res.status(200).json(videos);
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    const videoDetail = getVideoDetail(id);
    res.status(200).json(videoDetail);
})

router.post("/", (req, res) => {
    const videoDetails = readVideoDetails();
    const {data} = req.body

    const postVideoObj = {
        ...data, 
        id: `${createId(4)}-${createId(2)}-${createId(2)}-${createId(6)}`, 
        channel: "n/a",
        image: " ",
        views: " ",
        likes: " ",
        duration: " ",
        video: " ",
        timestamp: " ",
        comments: []
    }

    videoDetails.push(postVideoObj)
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails));
    res.status(201).json(postVideoObj);

})

module.exports = router;