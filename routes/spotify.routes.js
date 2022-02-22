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
        console.log(myInfo.data)
        const myProfile = myInfo.data
        res.render('list/create-playlist', {myProfile})
    })
    .catch(err => next(err))
  })

  router.post('/create-playlist', async (req,res,next) => {
    const {name, description} = req.body
    const author = await User.findById(req.session.user._id)

/*     axios({
        method: 'post',
        url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
        data: querystring.stringify({
           name: {name},
           description: {description},
           public: false
        }),
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
         Authorization: `Basic ${new Buffer.from(`${spotifyApi.clientId}:${spotifyApi.clientSecret}`).toString('base64')}`, 
        },
       }) */

    Playlist.create({name, description, author})
    .then(playlistCreated => {
        const user = req.app.locals.user._id;
        
        User.findById(user)
        .then((foundUser) => {
          foundUser.playlists.push(playlistCreated._id)
          res.redirect(`/viewplaylist/${playlistCreated._id}`, {playlist: playlistCreated})
        })
        
    })
    .catch(err => next(err))
  })

/*   CRIAR LOGOUT DO SPOTIFY?

    router.post('./spotify-logout', isLoggedIn, (req,res,next) =>{
    app.locals.accessToken = ''
    res.redirect('/')
  }) */

  module.exports = router;