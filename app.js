require("dotenv").config();
const express = require("express");
//const mysql = require ('mysql');
const bodyparser = require("body-parser");
const db = require("./Configs/db");
const router = require("./Routes/index");
const cors = require("cors");
const helmet = require("helmet");
// const logger = require ('morgan')
const auth = require("./Helpers/Middleware/auth");
const app = express();
const multer = require("multer");
const uuidv4 = require('uuid/v4');
const Speakeasy = require("speakeasy");
const account=require('./account')
const client = require('twilio')(account.accountSID,account.authToken)
// var messagebird = require('messagebird')

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/", router);
// app.use(logger('dev'))
app.use(helmet.xssFilter());
app.use(express.json());
// app.use(express.static(__dirname + '/upload'));
app.use(express.static(__dirname + '/images'));
const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./images");
    },
    filename: function(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: Storage });
app.get("/", (req, res) => {
  res.status(200).send("You can post to /api/upload");
});

app.post('/signotp',(req,res)=>{
  client
  .verify
  .services(account.serviceID)
  .verifications
  .create({
    to: `+62${req.query.phonenumber}`,
    channel:req.query.channel
  })
  .then((data)=>{
    res.status(200).send(data)
  })
.catch((error)=>{
  console.log(error)
})
})
app.get('/verifyotp',(req,res)=>{
  client
  .verify
  .services(account.serviceID)
  .verificationChecks
  .create({
    to: `+62${req.query.phonenumber}`,
    code:req.query.code
  })
  .then((data)=>{
    res.status(200).send(data)
  })
.catch((error)=>{
  console.log(error)
})
})

app.post("/send", (request, response, next) => { 
  client.messages
  .create({
    body:request.body.text,
    from : '+18584295341',
    to:"+6987788742195"
  }).then((message)=>console.log(message))
  .catch((error)=>console.log(error))
});



// // app.post("/totp-secret", (request, response, next) => { });

// app.post("/totp-secret", (request, response, next) => {
//   var secret = Speakeasy.generateSecret({ length: 20 });
//   response.send({ "secret": secret.base32 });
// });
// // app.post("/totp-generate", (request, response, next) => { });
// app.post("/totp-generate", (request, response, next) => {
//   response.send({
//       "token": Speakeasy.totp({
//           secret: request.body.secret,
//           encoding: "base32"
//       }),
//       "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
//   });
//   client.messages
//   .create({
//     body:Speakeasy.totp({
//       secret: request.body.secret,
//       encoding: "base32"
//   }),
    
//     from : '+18584295341',
//     to:request.body.number
//   }).then((message)=>console.log(message))
//   .catch((error)=>console.log(error))
// });

// // app.post("/totp-validate", (request, response, next) => { });
// app.post("/totp-validate", (request, response, next) => {
//   response.send({
//       "valid": Speakeasy.totp.verify({
//           secret: request.body.secret,
//           encoding: "base32",
//           token: request.body.token,
//           window: 1
//       })
     
//   });

// });
app.post("/api/upload", upload.array("image", 5), (req, res) => {
  console.log(upload, "upload");
console.log('body',req.body)
const id_item= req.body
  console.log("file", req.files);
  for (let i = 0; i < req.files.length; i++) {
    var id_image= uuidv4();
    var sql =
      "INSERT INTO picture ( id_image,id_item, image) VALUES ('"+id_image+"', '"+ req.body.id_item  +"','"+req.files[i].filename +"')";

    db.query(sql, function(err, result) {
      if (err) {
        console.log(err +"bbbbb");
      } else {
        console.log("inserted data");
      }
    });
  }

  res.status(200).json({
    message: "success"
  });
});


app.post("/api/driver/upload", upload.array("image", 3), (req, res) => {
  console.log(upload, "upload");
console.log('body',req.body)
const id_driverPicture= req.body
  console.log("file", req.files);
  for (let i = 0; i < req.files.length; i++) {
    var id_image= uuidv4();
    var sql =
      "INSERT INTO driverPicture ( id_image,id_driverPicture, image) VALUES ('"+id_image+"', '"+ req.body.id_driverPicture  +"','"+req.files[i].filename +"')";

    db.query(sql, function(err, result) {
      if (err) {
        console.log(err +"bbbbb");
      } else {
        console.log("inserted data");
      }
    });
  }

  res.status(200).json({
    message: "success"
  });
});


app.listen(process.env.PORT || 3000, () => console.log("express is running"));

// app.use ('/', auth.login, router);
module.exports = app;
