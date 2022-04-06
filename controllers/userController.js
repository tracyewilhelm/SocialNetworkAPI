const { User, Thought } = require("../models");
//export all of these functions. We are sending them to the users routes
module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user based on the userId that is provided in the url
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user - requires username and email in the body of the post
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and their associated thoughts based on the userId provided in the url
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({
          message:
            "You've hit the delete user route - User and associated Thoughts deleted!",
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  //update a user where you find the user by the url and provide the updated information in the body
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add a friend - the id in the url is the user you want to add the friend to; the id in the body is the friend you want to add to the user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //remove a friend - _id is userId provided in the url; friendsId is friend you want to remove, and the id is also provided in the url
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friends: req.params.friendsId } } },
      { runValidators: true, new: true }
    )
      .then(() =>
        res.json({
          message: "This is the removeFriend route - Friend has been removed!",
        })
      )
      .catch((err) => res.status(500).json(err));
  },
};
