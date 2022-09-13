const Blog = require("./Blog");
const User = require("./User");
const Author = require("./Authors");

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  Author,
};
