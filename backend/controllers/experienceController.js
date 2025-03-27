const Experience = require("../models/Experience");

exports.createExperience = async (req, res) => {
  const { title, content } = req.body;
  const experience = await Experience.create({
    user: req.user.id,
    title,
    content,
  });
  res.json(experience);
};

exports.getExperiences = async (_, res) => {
  const experiences = await Experience.find().populate("user", "name");
  res.json(experiences);
};

exports.likeExperience = async (req, res) => {
  try {
    const { userId } = req.body;
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Toggle like/unlike
    if (experience.likes.includes(userId)) {
      experience.likes = experience.likes.filter((id) => id !== userId);
    } else {
      experience.likes.push(userId);
    }

    await experience.save();
    res
      .status(200)
      .json({ message: "Like updated successfully", likes: experience.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
