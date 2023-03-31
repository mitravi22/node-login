const fs = require("fs");

const { db } = require("../models");
const Image = db.images;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    var data = await Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync("./resource/assets/uploads/" + req.file.filename),
    }).then((image) => {
      fs.writeFileSync("./resource/assets/temp/" + image.name, image.data);

      return res.send(data);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
