const db = require('../Configs/db');//karena ini tempatnya query jadi kita butuh akses database
const fs = require('fs')
const mv = require('mv')
const uuidv1 = require('uuid/v1');
module.exports = {
    getAll : ()=> { 
        return new Promise((resolve,reject)=>{
            db.query('SELECT * from item ',(error, status1)=>{
                if (!error)
                    resolve(status1,200)//mencobanya di console.log dulu
                 else
                   reject(error)
                });
        })
    },


getCar : ()=> { 
    return new Promise((resolve,reject)=>{
        db.query(`SELECT * FROM item WHERE category = 'Car'`,(error, status1)=>{
            if (!error)
            
                resolve(status1)//mencobanya di console.log dulu
             else
               reject(error)
            });
    })
  },
  getMoto : ()=> { 
    return new Promise((resolve,reject)=>{
        db.query(`SELECT * FROM item WHERE category = 'Motocycle'`,(error, status1)=>{
            if (!error)
            
                resolve(status1)//mencobanya di console.log dulu
                
             else
               reject(error)
            });
    })
  },
  getDataPic : ()=> { 
    return new Promise((resolve,reject)=>{
        db.query( `SELECT * FROM item `,(error, status1)=>{
            if (!error)
            
                resolve(status1)//mencobanya di console.log dulu
                
             else
               reject(error)
            });
    })
  },
//   SELECT item.id_item,item.product_name,item.merk,item.years,item.fuel_type,item.transmission,item.color,item.seats,item.plat_number,item.plat_type,item.price,item.category,item.city,item.latitude,item.longitude,picture.id_item,picture.image from item JOIN picture ON item.id_item=picture.id_item
getData : id => {
    return new Promise((resolve,reject)=>{
        db.query('Select image from picture where id_item= ?',[id],(error,id1)=>{
    
            if (!error)
            resolve(id1)//mencobanya di console.log dulu
            else
            reject(error)
        });
    })
},
    deleteProduct : id => {
        return new Promise((resolve,reject)=>{
            db.query('DELETE FROM product where id_product = ?',[id],(error,id1)=>{
        
                if (!error)
                resolve("Delete Succesfully",id1)//mencobanya di console.log dulu
                else
                reject(error)
            });
        })
    },
    addProduct : body =>{
        return new Promise((resolve,reject)=> {
            db.query('INSERT INTO item  set ?', [body],(error,body1)=>{
                if (!error)
                resolve(body1)
                else
                reject(error)
            });
        })
    },
    postProduct : (body,img) =>{
        return new Promise((resolve,reject)=> {
            img.mv('upload/' + body.image_name, (err) => {
                if (err) return 
                console.log('upload success')
              })
            db.query('INSERT INTO hotel  set ?', [body],(error,body1)=>{
                if (!error)
                resolve(body1)
                else
                reject(error)
            });
        })
    },
    putProduct :(body,id,img)=>{
        return new Promise ((resolve,reject)=>{
            if (body.image_name) {
                db.query('select * from item where id_item = ?', id, (err, img) => {
                  fs.unlink('upload/' + img[0].image_name, (err) => {
                    if (err) {
                      reject(err)
                    }
                  })
                })
            }
            img.mv('upload/' + body.image_name, (err) => {
                if (err) return 
                console.log('upload success')
              })
            db.query('UPDATE  item  set ? where id_item = ?', [body,id],(error,results)=>{
            if (!error)
                resolve(results)
            else
            reject(error)
        });
        
        })
    },

    
};