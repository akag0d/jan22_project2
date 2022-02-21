const router = require ('express').Router();
const mongoose = require ('mongoose');

const Playlist = require('../models/Playlist.model');

router.get('/search-playlist', (req, res, next) => {
    res.render('views/list/search-playlist');
});

router.post('/search-playlist', (req, res, next) => {
    const { title, artist, tracks } = req.body;
});

module.exports = router;