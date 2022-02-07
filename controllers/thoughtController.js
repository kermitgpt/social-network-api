const { User, Thought, Reaction } = require("../models");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET single thought by its _id

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST a new thought
  createThought(req, res) {
    Thought.create(req.body, { $push: { thoughts: req.body } })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // PUT to update a thought by its _id

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove user by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json(res)
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // POST to create reaction stored in thought's reactions array field

  // POST a new reaction
  addReaction(req, res) {
    Thought.findOne(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.params.reactionId } }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    Thought.findOne(
      { _id: req.params.thoughtId },
      { $pullAll: { reaction: [req.params.reactionId] } }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
