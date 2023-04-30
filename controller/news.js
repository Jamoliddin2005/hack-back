const News = require("../model/news.js");
const toDelete = require("../middleware/toDelete.js");
module.exports.create = async (req, res) => {
  try {
    if (req.file) {
      const { data, title } = req.body;
      if (!data || !title)
        return res.status(400).json({ msg: "Body is not valid" });

      const newNews = await News.create({
        body: data,
        title,
        img: req.file.filename,
        date: new Date().toLocaleString(),
      });

      await newNews.save();
      res.json({ newNews });
    } else {
      res.status(400).json({ msg: "News can not be created" });
    }
  } catch (error) {
    res.status(400).json({ msg: "News can not be created" });
  }
};



module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const { img } = await News.findById(id);
    toDelete(img);
    await News.findByIdAndDelete(id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Not deleted" });
  }
};

module.exports.getNews = async (req, res) => {
  const news = await News.find();
  return res.json(news);
};

module.exports.getNewsFirst = async (req, res) => {
  const news = (await News.find().limit(7)).reverse();
  return res.json(news);
};
module.exports.getById = async (req, res) => {
  const id = req.params.id;
  const newNews = await News.findById(id);
  res.json({ newNews });
};