const { User, Thought, Reaction } = require("../models");

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET single user by its _id w/ populated thought & friend data

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST a new user
  // PUT to update a user by its _id
  // DELETE to remove user by its _id
};
