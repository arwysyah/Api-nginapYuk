const db = require("../Configs/db");

module.exports = {
//   registers: (data, callBack) => {
//     db.query(
//       `INSERT INTO vendor(email,password,phoneNumber,nama,kota,latitude,longitude,image_name)values (?,?,?,?,?,?,?)`,
//       [data.email,data.password,data.phoneNumber, nama,data.kota,data.latitude,data.longitude,image_name],
//       (error, results) => {
//         if (error) {
//           return callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },
registerUser: (data, callBack) => {
  data.created_at= new Date()
  db.query(
    `INSERT INTO user(id_user,email,password,created_at,username,phoneNumber,city,latitude,longitude,user_image,deviceID)values (?,?,?,?,?,?,?,?,?,?,?)`,
    [data.id_user,data.email,data.password,data.created_at,data.username, data.phoneNumber,data.city,data.latitude,data.longitude,data.user_image,data.deviceID],
    (error, results) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
},
  getUser: callBack => {
    db.query(
      `select * from user`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data,id) => {
    return new Promise ((resolve, reject) => {
db.query(
            `UPDATE user SET ? WHERE id_user = ?`,[data,id],
            (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            }
        );
    });
},

  
updateUserPassword: (data,email) => {
  return new Promise ((resolve, reject) => {
db.query(
          `UPDATE user SET password = ? WHERE email = ?`,[data.password,email],
          (err, response) => {
              if (!err) {
                  resolve (response);
              } else {
                  reject (err);
              }
          }
      );
  });
},
resetPassword: (data,email) => {
  return new Promise ((resolve, reject) => {
db.query(
          `UPDATE user SET password = ? WHERE email = ?`,[data.password,email],
          (err, response) => {
              if (!err) {
                  resolve (response);
              } else {
                  reject (err);
              }
          }
      );
  });
},

  getUserbyEmail: (email, callBack) => {
    db.query(
      `select * from user where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByID: (data,id) => {
    return new Promise ((resolve, reject) => {
db.query(
            `select * from user WHERE id_user = ?`,[data,id],
            (err, response) => {
                if (!err) {
                    resolve (response);
                } else {
                    reject (err);
                }
            }
        );
    });
  }
};
