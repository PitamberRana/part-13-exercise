const router = require("express").Router();
const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
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

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (request, response) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
});
//   await Blog.destroy({
//     where: {
//       author: blog.author,
//     },
//   });
//   response.status(200).json({ message: "blog deleted" });
// });

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    (req.blog.likes = req.body.likes), await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(204).end();
  }
});

module.exports = router;
