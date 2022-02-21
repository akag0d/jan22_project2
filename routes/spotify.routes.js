const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const axios = require('axios');
const urlParams = require('url-search-params')
const querystring = require('querystring');

const baseUrl = 'https://api.spotify.com/v1'

router.get('/create/access_token=:accessToken&refresh_token=:refreshToken', (req,res,next) => {
    
    const accessToken = req.params.accessToken;
    const refreshToken = req.params.refreshToken

    console.log('access', req.params.accessToken, 'refresh: ', refreshToken)
    res.render('profile')

    return {accessToken, refreshToken}
})

  module.exports = router;