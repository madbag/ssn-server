const router = require("express").Router();
  
const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model");
 
//  POST /api/projects  -  Creates a new project
router.post("/article", (req, res, next) => {
  const { title, content} = req.body;
 
  Article.create({ title, content, comment: [] })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});
 
module.exports = router;