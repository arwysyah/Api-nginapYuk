const db = require("../Configs/db");

module.exports = {

registerOwner: (data, callBack) => {
    
  db.query(
    `INSERT INTO owner(id_owner,owner_Name,email,password,phoneNumber,city,latitude,longitude,status,deviceID,owner_image)values (?,?,?,?,?,?,?,?,?,?,?)`,
    [data.id_owner,data.owner_Name,data.email,data.password,data.phoneNumber,data.city,data.latitude,data.longitude,data.status,data.deviceID,data.owner_image],
    (error, results) => {
      console.log(data.email)
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
},
  getOwner: callBack => {
    db.query(
      `select * from owner`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getOwnerStatus: callBack => {
    db.query(
      `select * from owner where status= 'aktif'`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getOwnerCar: callBack => {
    db.query(
      `select * from Owner where category='mobil' and status= "aktif"`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  

  
  getOwnerbyEmail: (email, callBack) => {
    db.query(
      `select * from owner where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateOwner: (data,id) => {
    return new Promise ((resolve, reject) => {
db.query(
            `UPDATE owner SET ? WHERE id_Owner = ?`,[data,id],
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
  getOwnerByID: (data,id) => {
    return new Promise ((resolve, reject) => {
db.query(
            `select * from owner WHERE id_Owner = ?`,[data,id],
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

updateOwnerPassword: (data,email) => {
  return new Promise ((resolve, reject) => {
db.query(
          `UPDATE owner SET password = ? WHERE email = ?`,[data.password,email],
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
          `UPDATE Owner SET password = ? WHERE email = ?`,[data.password,email],
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

}
