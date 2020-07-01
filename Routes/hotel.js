const express = require ('express');
const Router = express.Router() // manggil router
const productController = require ('../Controllers/hotel');


Router.get('/',productController.getAll);

Router.get('/filter/car',productController.getCar)
Router.get('/filter/moto',productController.getMoto)
Router.get('/data/:id',productController.getData)
Router.post('/',productController.postProduct);
Router.post('/api',productController.addProduct);
Router.delete('/:id', productController.deleteProduct);
Router.put('/:id',productController.putProduct);



module.exports = Router
