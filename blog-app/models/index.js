const Blog = require("./Blog");
const User = require("./User");

Blog.sync();
User.sync();

module.exports = {
  Blog,
  User,
};
