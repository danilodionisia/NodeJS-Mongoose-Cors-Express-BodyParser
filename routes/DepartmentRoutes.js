const express = require('express');
const router = express.Router();
require('../models/Department');
const mongoose = require('mongoose');
const Department = mongoose.model('departments');


/**
 * @swagger
 * /departments:
 *  get:
 *      description: Return all departments
 *      responses:
 *          '200':
 *              description: Success to get departments
 *          '500':
 *              description: Fail to get departments
 */
router.get('/department', (req, res) => {
    
    Department.find().sort({name: 'ASC'}).then(data => {
        res.status = 200;
        res.json({"Department": data});
    }).catch(error => {
        res.sendStatus(500);
    });
});

/**
 *  @swagger
 *      /department/{id}:
 *          get:
 *              description: If found the department by id sended returns data by json
 *              consumes:
 *                  - application/x-www-form-url-encoded
 *              produces:
 *                  - application/json
 *              parameters:
 *                  - name: id
 *                    in: path  
 *                    type: string
 *                    required: true         
 *              responses:
 *                  400:
 *                      description: invalid request
 *                  200:
 *                      description: department sucessfully verified
 */
router.get('/department/:id', (req, res) => {
    
    let {id} = req.params;
    
    if(id != undefined && id.length >= 24){
        Department.findOne({_id: id}).sort({name: 'ASC'}).then(data => {
            res.status = 200;
            res.json({"Department": data});
        }).catch(error => {
            res.sendStatus(404);
        });
    }else{
        res.sendStatus(400);
    }  

});


/**
 *  @swagger
 *      /department:
 *          post:
 *              summary: Adds a new department
 *              description: If found the department by id sended returns data by json
 *              consumes:
 *                  - application/x-www-form-url-encoded
 *              produces:
 *                  - application/json
 *              parameters:
 *                  - name: name
 *                    in: body
 *                    required: true 
 *                    schema:
 *                      type: string        
 *              responses:
 *                  400:
 *                      description: invalid request
 *                  200:
 *                      description: department sucessfully verified
 */
router.post('/department', (req, res) => {

    const {name} = req.body;
    
    if(name == undefined){
        res.sendStatus(400);
    }else{

        Department({name: name}).save().then(data => {
            res.status = 200;
            res.json({"Department": data});
        }).catch(error => {
            res.status = 500;
            console.log(error);
        });
    }

});


router.delete('/department/:id', (req, res) => {
    
    let {id} = req.params;
    
    if(id != undefined && id.length >= 24){
        Department.deleteOne({_id: id}).then(data => {
            if(data.deletedCount == 0){
                res.sendStatus(404);
            }else{
                res.status = 200;
                res.json({"Department": data});
            }
            
        }).catch(error => {
            res.sendStatus(404);
        });
    }else{
        res.sendStatus(400);
    } 

});



router.put('/department/:id', (req, res) => {
    
    let {id} = req.params;
    
    if(id != undefined && id.length >= 24){

        const {name } = req.body;
        
        
        if(name != undefined){
            
            Department.findOne({_id: id}).then(data => {
               
                let n;

                if(name == undefined){
                    n = data.name;
                }else{
                    n = name;
                }
                
                Department.updateOne({_id: i}, {
                    "name": n
                }).then(data => {

                    res.statusCode = 200;
                    res.json({"Department": data});

                }).catch(error => {
                    res.statusCode = 500;
                    res.json({"error": "dentro"});
                });

            }).catch(error => {
                res.statusCode = 500;
                res.json({"error": "fora"});
            });   
                  

        }else{
            res.sendStatus(400);
        }

    }else{
        res.sendStatus(400);
    } 

});





module.exports = router;