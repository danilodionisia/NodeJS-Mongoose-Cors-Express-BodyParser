const express = require('express');
const router = express.Router();
require('../models/Product');
const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Department = mongoose.model('departments');



router.get('/product', (req, res) => {
    
    Product.find().sort({name: 'ASC'}).then(data => {
        res.status = 200;
        res.json({"Product": data});
    }).catch(error => {
        res.sendStatus(500);
    });

});

router.get('/product/:id', (req, res) => {
    
    let {id} = req.params;
    
    if(id != undefined && id.length >= 24){
        Product.findOne({_id: id}).sort({name: 'ASC'}).then(data => {
            res.status = 200;
            res.json({"Product": data});
        }).catch(error => {
            res.sendStatus(404);
        });
    }else{
        res.sendStatus(400);
    }  

});


router.post('/product', (req, res) => {
    
    const {name, departments, stock, price } = req.body;

    if(name != undefined && departments != undefined && stock != undefined && price != undefined){
        
        var params = [];
        departments.forEach(element => {
            params.push({name: element.name});
        });
        
        var dep = []; 
        Department.find({$or:params}).then((departments) => {
            
            Product({name, departments, stock, price}).save().then(data => {
                
                res.status = 200;
                res.json({"Product": data});

            }).catch(error => {
                res.sendStatus(500);
            });

        }).catch((error) => {
            res.sendStatus(400);
        });
        
    }else{
        res.sendStatus(400);
    }

});


router.delete('/product/:id', (req, res) => {
    
    let {id} = req.params;
    
    if(id != undefined && id.length >= 24){
        
        Product.deleteOne({_id: id}).then(data => {
            
            if(data.deletedCount == 0){
                res.sendStatus(404);
            }else{
                res.status = 200;
                res.json({"Product": data});
            }
            
        }).catch(error => {
            res.sendStatus(404);
        });
    }else{
        res.sendStatus(400);
    }  

});


router.put('/product/:id', (req, res) => {
    
    let {id} = req.params;
    
    if(id != undefined && id.length >= 24){

        const {name, departments, stock, price } = req.body;

        if(name != undefined && departments != undefined && stock != undefined && price != undefined){
            
            var params = [];
            departments.forEach(element => {
                params.push({name: element.name});
            });
            
            var dep = []; 
    
            Department.find({$or:params}).then((departmentsFound) => {
                
                Product.findOne({_id: id}).then(data => {
               
                    let n, d, s, p, i;
    
                    if(name == undefined){
                        n = data.name;
                    }else{
                        n = name;
                    }
    
                    if(departments == undefined){
                        d = data.departments;
                    }else{
                        d = departmentsFound;
                    }
    
                    if(stock == undefined){
                        s = data.stock;
                    }else{
                        s = stock;
                    }
    
                    if(price == undefined){
                        p = data.price;
                    }else{
                        p = price;
                    }
    
                    if(id == undefined){
                        i = data._id;
                    }else{
                        i = id;
                    }
                    
                    Product.updateOne({_id: i}, {
                        "name": n, 
                        "departments": d, 
                        "stock": s, 
                        "price": p
                    }).then(data => {
    
                        res.statusCode = 200;
                        res.json({"Product": data});
    
                    }).catch(error => {
                        res.statusCode = 500;
                    });
    
                }).catch(error => {
                    res.statusCode = 500;
                }); 
    
            }).catch((error) => {
                res.sendStatus(400);
            });
            
        }else{
            res.sendStatus(400);
        }

    }else{
        res.sendStatus(400);
    } 

});





module.exports = router;


