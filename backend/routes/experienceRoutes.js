const express = require("express");
const {
  createExperience,
  getExperiences,
  likeExperience,
} = require("../controllers/experienceController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, createExperience);
router.get("/", getExperiences);
router.put("/like/:id", likeExperience);

module.exports = router;
