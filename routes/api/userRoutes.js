const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// /api/users/:userId
router.route("/:user").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
