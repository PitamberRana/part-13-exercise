const router = require("express").Router();
const { Blog } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("count", sequelize.col("title")), "articles"],
      [sequelize.fn("count", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
  });
  res.json(authors);
});

module.exports = router;
