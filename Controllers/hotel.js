const Model = require("../Models/hotel");
const form = require("../Helpers/resForm");

const mv = require("mv");
module.exports = {
  getAll: (req, res) => {
    Model.getAll()
      .then(status1 => form.getAll(res, status1, 200)) //langsung diubah ke JSON
      .catch(error => console.log(error));
  },

  getMoto: (req, res) => {
    Model.getMoto()
      .then(response => form.getMoto(res, response, 200)) //langsung diubah ke JSON
      .catch(error => console.log(error));
  },
  getCar: (req, res) => {
    Model.getCar()
      .then(response => form.getCar(res, response, 200)) //langsung diubah ke JSON
      .catch(error => console.log(error));
  },
  // getData: (req, res) => {
  //   Model.getData()
  //     .then(response => form.getData(res, response, 200)) //langsung diubah ke JSON
  //     .catch(error => console.log(error));
  // },
  getData: (req, res) => {
    const id=req.params.id
    Model.getData(id)
      .then(id1 => form.getData(res, id1, 200)) //langsung diubah ke JSON
      .catch(error => console.log(error));
  },
  getDataPic: (req, res) => {
    const id=req.params.id
    Model.getDataPic(id)
      .then(id1 => form.getData(res, id1, 200)) //langsung diubah ke JSON
      .catch(error => console.log(error));
  },

  deleteProduct: (req, res) => {
    const id = req.params.id;
    Model.deleteProduct(id)
      .then(id1 => form.deleteProduct(res, id1, 200))
      .catch(error => console.log(error));
  },

  addProduct: (req, res) => {
    //  const bodyReq = req.body;

    const body = {
      ...req.body,
   
    };
    // console.log(body)
    Model.addProduct(body)
      .then(results => form.addProduct(res, results, 200))
      .catch(error => console.log(error));
  },



  
  postProduct: (req, res) => {
    var img = req.files.image_name;
    const fileType = img.mimetype;
    var type = "";

    if (
      fileType !== "image/png" &&
      fileType !== "image/gif" &&
      fileType !== "image/jpeg"
    ) {
      return res.status(400).send("file is not in image format");
    }

    if (fileType === "image/png") {
      type = "png";
    }
    if (fileType === "image/gif") {
      type = "gif";
    }
    if (fileType === "image/jpeg") {
      type = "jpg";
    }

    var random_id = Math.floor(Math.random() * 10) + 4;

    const image_name = "img-" + Date.now() + "-" + random_id + "." + type;
    const {
    id_room,
      id_owner,
     
      hotel_name,
      contact_number,
      location,
      latitude,
      longitude,
      status,
      room_category,
      price,
      star,
      created_At
    } = req.body;
    const data = {
      id_room,
      id_owner,
     
      hotel_name,
      contact_number,
      location,
      latitude,
      longitude,
      status,
      room_category,
      price,
      star,
      created_At,
      image_name
    };

    Model.postProduct(data, img)
      .then(body1 => form.postProduct(res, body1, 200))
      .catch(error => console.log(error));
  },
  putProduct: (req, res) => {
    var img = req.files.image_name;
    const fileType = img.mimetype;
    var type = "";

    if (
      fileType !== "image/png" &&
      fileType !== "image/gif" &&
      fileType !== "image/jpeg"
    ) {
      return res.status(400).send("file is not in image format");
    }

    if (fileType === "image/png") {
      type = "png";
    }
    if (fileType === "image/gif") {
      type = "gif";
    }
    if (fileType === "image/jpeg") {
      type = "jpg";
    }

    var random_id = Math.floor(Math.random() * 10) + 4;

    const image_name = "img-" + Date.now() + "-" + random_id + "." + type;
    const {
      product_name,
      merk,
      years,
      fuel_type,
      transmission,
      color,
      seats,
      plat_number,
      plat_type,
      price,
      category,
      city,
      latitude,
      longitude
    } = req.body;
    const data = {
      product_name,
      merk,
      years,
      fuel_type,
      transmission,
      color,
      seats,
      plat_number,
      plat_type,
      price,
      category,
      city,
      latitude,
      longitude,
      image_name
    };

    const id = req.params.id;
    Model.putProduct(data, id, img)
      .then(results => form.putProduct(res, results, 200))
      .catch(error => console.log(error));
  }
};
