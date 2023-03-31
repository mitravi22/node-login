const route = require('express').Router()
//const homeController = require("../controllers/home");
const uploadController = require("../controller/upload");
const upload = require("../middleware/upload");



  route.post("/upload", upload.single("file"), uploadController.uploadFiles);


module.exports = route;