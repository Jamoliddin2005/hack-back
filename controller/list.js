const List = require("../model/list.js");

// module.exports.create = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) return res.status(400).json({ msg: "Body is not valid" });
//     const list = await List.create({ name });
//     await list.save();
//     res.status(201).json(list);
//   } catch (error) {
//     res.status(400).json({ msg: "List is not created" });
//   }
// };

module.exports.find = async (req, res) => {
  const list = await List.find();
  res.status(200).json(list);
};

module.exports.createTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const { teamId, matchCount, score } = req.body;
    if (!teamId || typeof matchCount !== "number" || typeof score !== "number")
      return res.status(400).json({ msg: "Body is not valid" });

    const list = await List.findById(id);

    list.teams.push({ teamId, matchCount, score });
    await list.save();
    return res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ msg: "Team is not added" });
  }
};

module.exports.get = async (req, res) => {
  const list = await List.find().populate("teams.teamId")
  const result = list.map((element) => {
    element.teams = element.teams.sort((a, b) => (a.score - a.matchCount) + (b.score - b.matchCount))
    return element
  })
  res.status(200).json(result);
};
