require("dotenv").config();
const {
  registerUser,
  getUser,
  getUserbyEmail,
  updateUser,
  getUserByID,
  updateUserPassword,
  resetPassword
} = require("../Models/user");
const db = require("../Configs/db"); //karena ini tempatnya query jadi kita butuh akses database
const fs = require("fs");
const form = require("../Helpers/resForm");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const mv = require("mv");
const { sign } = require("jsonwebtoken");
const uuidv4 = require('uuid/v4');
var nodemailer = require('nodemailer');
module.exports = {
  registerUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const email = req.body.email;

    getUserbyEmail(email, (error, results) => {
      if (results) {
        return res.json({
          message: "Email already taken , please use with different email",
        });
      }

      registerUser(body, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: "database connetion error",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    });
  },

  getUser: (req, res) => {
    getUser((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const email = req.body.email;
    getUserbyEmail(email, (error, results) => {
      if (error) {
        return console.log(error);
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Data Not Found, Please Register",
        });
      }
      console.log(results);
      const result = compareSync(req.body.password, results.password);
      console.log("req password dan hash", req.body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        return res.json({
          succes: 1,
          message: "login succesfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: "invalid email or password",
        });
      }
    });
  },
  // updateUser:(req,res)=>{
  //     const body = req.body;
  //     const salt = genSaltSync(10)
  //     body.password = hashSync(body.password,salt)
  // updateUser(body,(error,results)=>{
  //     if(error){
  //         console.log(error)
  //         return;
  //     }
  //     if(!results){
  //         res.json({
  //             succes:'0',
  //             message:"record is not found"
  //         })
  //     }
  //     return res.json({
  //         success: 1,
  //         message:"user success to update"
  //     })

  // })

  // },
  updateUser: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // const salt = genSaltSync(10)
    // data.password = hashSync(data.password,salt)
    updateUser(data, id)
      .then((response) => form.updateUser(res, response, 200))
      .catch((err) => console.log(err));
  },
  updateUserPassword: (req, res) => {
   const email =req.params.email;
   const data = req.body
  //  const password=req.body.password
    const salt = genSaltSync(10)
    data.password = hashSync(data.password,salt)
    
    updateUserPassword(data, email)
      .then((response) => form.updateUserPassword(res, response, 200))
      .catch((err) => console.log(err));
  },
  resetPassword: (req, res) => {
    const email =req.params.email;
    const data = req.body
   //  const password=req.body.password
     const salt = genSaltSync(10)
     const newPassword = uuidv4().substring(1,18);
     data.password = hashSync(newPassword,salt)
     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: process.env.EMAIL,
             pass: process.env.PASS
         }
     });
     const mailOptions = {
      from: process.env.email, // sender address
      to: email, // list of receivers
      subject: 'Reset Password', // Subject line
      html: `<p>Your password has been changed, this is your new password : <b>${newPassword} </b>, you can copy it and paste to change your new password</p><p>please replace this password with a password that you can easily remember
      <p>`// plain text body
    };
    transporter.sendMail(mailOptions,res, function (err, info) {
      if(err)
        console.log(err)
      else
        res.json({info})
    });
     resetPassword(data, email)
       .then((response) => form.resetPassword(res, response, 200),console.log(data.password))
       .catch((err) => console.log(err));
   },
  getUserByID: (req, res) => {
    const id = req.params.id;
    getUserByID(id)
      .then((id1) => form.getUserByID(res, id1, 200))
      .catch((error) => console.log(error));
  },
};
