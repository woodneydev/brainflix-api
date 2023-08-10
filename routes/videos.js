const router = require("express").Router();
const fs = require("fs");

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

module.exports = router;