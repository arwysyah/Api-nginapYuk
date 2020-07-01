const db = require('../Configs/db');//karena ini tempatnya query jadi kita butuh akses database

module.exports = {

getsubTrans:()=>{
  
    return new Promise((resolve,reject)=>{
        db.query('select * from transaction',(error,status1)=>{
            if(!error)
            resolve(status1,200)
            else
            reject(error)
        })
    })
},
getsubTransByDate:(date)=>{
  
  return new Promise((resolve,reject)=>{
      db.query(`SELECT * FROM transaction WHERE date =?`,[date],(error,status1)=>{
          if(!error)
          resolve(status1,200)
          else
          reject(error)
      })
  })
},
postsubTrans: body => {
  console.log(body)
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO transaction SET ?", [body], (err, response) => {
        
        if (!err) {
          resolve(response);
        } else {
          reject(err);
        }
      });
    });
  },

  getsubTransByID: id => {
    return new Promise((resolve,reject)=>{
        db.query('Select * from transaction where id_owner= ?',[id],(error,id1)=>{
    
            if (!error)
            resolve(id1)//mencobanya di console.log dulu
            else
            reject(error)
        });
    })
},
updatesubTransByID: (data,id) => {
  return new Promise ((resolve, reject) => {
db.query(
          `UPDATE transaction SET status= 'closed' WHERE id_transaction = ?`,[data,id],
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
getsubTransByIDCustomer: id => {
  return new Promise((resolve,reject)=>{
      db.query('Select * from transaction where id_user= ?',[id],(error,id1)=>{
  
          if (!error)
          resolve(id1)//mencobanya di console.log dulu
          else
          reject(error)
      });
  })
},
updatesubTransAccept: (data,id) => {
  return new Promise ((resolve, reject) => {
db.query(
          `UPDATE transaction SET status= 'aktif' WHERE id_transaction = ? `,[data,id],
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
selectedbyDate:(date,id)=>{
  
  return new Promise((resolve,reject)=>{
      db.query(`SELECT * FROM transaction WHERE id_user = ? and date= ?`,[date,id],(error,status1)=>{
          if(!error)
          resolve(status1,200)
          else
          reject(error)
      })
  })
},
}