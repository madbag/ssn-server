const router = require("express").Router();
const axios = require ("axios");

router.get("/news", (req, res, next) => {
  axios
  .get("https://newsapi.org/v2/everything?q=goodnews&apiKey=e8f3c465d76a4f438b6bb92cf6370f5b")
  // res.json(theApiResp)
  res.json("All good in here");
});

module.exports = router;
