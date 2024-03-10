const express = require("express");
const {
  getMe,
  updateMe,
  updatePassword,
  deleteMe,
} = require("../controllers/userController");

const router = express.Router();

router.route("/:id").get(getMe).patch(updateMe).delete(deleteMe);
router.patch("/:id/pasword", updatePassword);

module.exports = router;
