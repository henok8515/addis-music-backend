const Music = require("../model/musicSchema");

module.exports.getMusics = async (req, res) => {
  const musics = await Music.find();
  res.json(musics);
};
module.exports.createMusic = async (req, res) => {
  console.log(req.body);

  const music = new Music({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    album: req.body.album,
  });
  console.log(music);
  try {
    await music.save();
    res.json(music);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.updateMusic = async (req, res) => {
  const { id, title, artist, genre, album } = req.body;
  Music.findByIdAndUpdate(id, { title, artist, genre, album })
    .then(() => res.json("updated successfully"))
    .catch((err) => {
      res.json(err);
    });
};
module.exports.deleteMusic = async (req, res) => {
  const id = req.body.id;
  Music.findByIdAndDelete(id)
    .then(() => res.json("delete sucess"))
    .catch((err) => {
      res.json(err, "err here");
    });
};
