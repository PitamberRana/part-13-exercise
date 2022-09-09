const router = require("express").Router();
const { Blog, User } = require("../models");
const { SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  console.log(
    JSON.stringify(
      blogs.map((n) => `${n.author}: '${n.title}', ${n.likes} likes`),
      null,
      2
    )
  );
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      userId: req.decodedToken.id,
    });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    (req.blog.likes = req.body.likes), await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(204).end();
  }
});

router.put("/:username", blogFinder, async (req, res) => {
  if (req.blog) {
    (req.blog.username = req.body.username), await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(204).end();
  }
});

module.exports = router;
