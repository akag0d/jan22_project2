const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const axios = require('axios');
const urlParams = require('url-search-params')
const querystring = require('querystring');
const isLoggedIn = require("../middleware/isLoggedIn");
const SpotifyWebApi = require('spotify-web-api-node');
const Playlist = require("../models/Playlist.model");

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

/////         P   R   O   F   I   L   E         ///// 

router.get('/create/access_token=:accessToken&refresh_token=:refreshToken', (req,res,next) => {
    req.app.locals.accessToken = req.params.accessToken
    req.app.locals.refreshToken = req.params.refreshToken

    axios.get('https://api.spotify.com/v1/me', {
            params: { limit: 50, offset: 0 },
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + req.app.locals.accessToken,
                'Content-Type': 'application/json',
            },
        })
    .then((myInfo) => {
        const myProfile = myInfo.data;
        req.app.locals.myProfile = myProfile;
        req.session.myProfile = myProfile;
        res.render('list/create-playlist', {myProfile})
    })
    .catch(err => next(err))
  })


    ////          C R E A T E    P L A Y L I S T              /////


router.post('/create-playlist', async (req,res,next) => {
      const {name, description} = req.body
      const author = await User.findById(req.session.user._id)
      const accessToken = req.app.locals.accessToken
  
       axios({
        method: 'post',
        url: `https://api.spotify.com/v1/users/${req.session.myProfile.id}/playlists`,
        data: {
           name: name,
           description: description,
           public: false
          },
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
          },
      })
      .then((data) => console.log(data.data.error))
      .catch((err) => console.log('------------------------', err))   
  
      Playlist.create({name, description, author})
      .then(playlistCreated => {
          const user = req.app.locals.user._id;
  
          User.findById(user)
          .then((foundUser) => {
            foundUser.playlists.push(playlistCreated._id)
            foundUser.save();
            res.redirect(`/viewplaylist/${playlistCreated._id}`)
          })
      })
      .catch(err => next(err))
    })  

////          S   E    A    R   C   H         T   R   A   C   K   S             /////


router.get('/search-songs', (req,res,next) => {
      const accessToken = req.app.locals.accessToken;
   
       axios.get('https://api.spotify.com/v1/search', { 
               params: { limit: 50, offset: 0 }, //typw: "track,artist"
               headers: {
                   Accept: 'application/json',
                   Authorization: 'Bearer ' + accessToken,
                   'Content-Type': 'application/json',
               },
           })
       .then((data) => {
         /* console.log(data) */
         const searchResults = data.body.artists.items
         res.render('list/search-results', {searchResults})
       })
       .catch(err => next(err))
     })


  /* 
router.post('/search-songs', (req, res, next) => {
    const { name, artist , playlistId } = req.body;
    Tracks.findOne(name)
    .then(tracksFound => {
        res.render('list/search-songs')
    })
}); */

/* router.get('/songs-results', (req,res,next) => {
    Playlist.findByIdAndUpdate(playlistId)
    .then(playlistFound => {
        console.log(playlistFound)
        playlistFound.tracks.push(name)
        res.redirect(`/viewplaylist/${_id}`)
    })
}) */

////          A   D   D         T   R   A   C   K   S             /////


  module.exports = router;