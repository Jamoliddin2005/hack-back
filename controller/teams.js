const Teams = require("../model/teams.js");
const Category = require("../model/category.js");
const toDelete = require("../middleware/toDelete.js");

module.exports.create = async (req, res) => {
  try {
    if (req.file) {
      const { name } = req.body;
      if (!name) return res.status(400).json({ msg: "Body is not valid" });
      const team = await Teams.create({ name, img: req.file.filename });
      await team.save();
      return res.status(201).json({ team });
    } else {
      return res.status(400).json({ msg: "Img not found" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Team is not saved.It might be exist" });
  }
};

module.exports.find = async (req, res) => {
  const teams = await Teams.find();
  res.status(200).json(teams);
};

module.exports.update = async (req, res) => {
  try {
    if (req.file) {
      const id = req.params.id;
      const { img } = await Teams.findById(id);
      const { name } = req.body;
      if (!name) return res.status(400).json({ msg: "Body is not valid" });

      await Teams.findByIdAndUpdate(id, {
        $set: {
          name: name,
          img: req.file.filename,
        },
      });

      toDelete(img);

      res.status(200).json({ msg: "Team has been changed" });
    }
    res.status(400).json({ msg: "Team has not been changed" });
  } catch (error) {
    res.status(400).json({ msg: "Can not be changed" });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const team = await Category.findOne({
      $or: [{ "teams.team1": id }, { "teams.team2": id }],
    });

    if (team) return res.json({ msg: "Team can not be deleted" });

    const { img } = await Teams.findById(id);
    toDelete(img);
    await Teams.findByIdAndDelete(id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Not deleted" });
  }
};
