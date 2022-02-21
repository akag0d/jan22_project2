const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const axios = require('axios');
const urlParams = require('url-search-params')
const querystring = require('querystring');
const isLoggedIn = require("../middleware/isLoggedIn");


  router.get('/create/access_token=:accessToken&refresh_token=:refreshToken', (req,res,next) => {
    req.app.locals.accessToken = req.params.accessToken
    req.app.locals.refreshToken = req.params.refreshToken
    
    res.render('list/create-playlist')
  })

  router.post('/create/logout', isLoggedIn, (req,res,next) =>{
    app.locals.accessToken = ''
    res.redirect('/')
  })

  module.exports = router;