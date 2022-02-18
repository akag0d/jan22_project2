const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('create/:accessToken', (req,res,next) => {
  const accessToken = req.params.accessToken;

  
/*   const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token'); */
  res.render(`profile/${acessToken}`,)
  console.log(accessToken);
  console.log(refreshToken);
})


module.exports = router;


