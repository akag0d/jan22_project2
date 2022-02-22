const router = require ('express').Router();
const mongoose = require ('mongoose');

const Playlist = require('../models/Playlist.model');
const User = require("../models/User.model");

router.get('/profile/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .then(user => {
        console.log(user)
        res.render('profile', user);
    })
    
});

router.get('/search-playlist', (req, res, next) => {
    res.render('list/search-playlist');
});

router.post('/search-playlist', (req, res, next) => {
    const { title, author } = req.body;

    Playlist.findOne({title})
    .then(playlistFound => {
        const {_id} = playlistFound;
        res.redirect(`/viewplaylist/${_id}`)
    })
});

router.get('/viewplaylist/:_id', (req,res,next) => {
    const {_id} = req.params

    Playlist.findById(_id)
    .populate('author')
    .then(playlist => {
        res.render('list/view-playlist', {playlist})
    })
    .catch(err => {next(err)})
})

/* router.get('/search-songs', (req, res, next) => {
    res.render('list/search-songs');
}); */

router.post('/search-songs', (req, res, next) => {
    const { name, artist } = req.body;

    Playlist.findByIdAndUpdate
    .then(playlistFound => {
        const {_id} = playlistFound;
        res.redirect(`/viewplaylist/${_id}`)
    })
});

router.get('/myplaylists/:userId', (req,res,next) => {
    const user = req.params.userId
    User.findById(user)
 /* .populate('playlists')            CANT POPULATE PLAYLIST????  MongooseError: Cannot populate path `playlists` because it is not in your schema. Set the `strictPopulate` option to false to override. */
    .then(user => {
        console.log(user)
        const userPlaylists = user.playlists
        res.render('list/my-playlists', {userPlaylists} )
    })
    
})

module.exports = router;
