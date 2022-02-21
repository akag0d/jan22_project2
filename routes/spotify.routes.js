const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const axios = require('axios');
const urlParams = require('url-search-params')
const querystring = require('querystring');


router.get('create/:accessToken&:refreshToken', (req,res,next) => {
    /* const {accessToken, refreshToken} = req.params; */
    
 const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token'); 
    console.log(accessToken, 'refresh: ', refreshToken)
    /* res.render(`profile/${acessToken}&${refreshToken}`,) */
  })

  module.exports = router;