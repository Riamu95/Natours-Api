const fs = require("fs");
const Tour = require("./../models/tour.model");
const tourModel = require("./../models/tour.model");

exports.getAllTours =  async (req, res) => {
    try {
        const result = await Tour.find();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({
            status : 'fail',
            message : err
        });
    }
};
  
exports.addTour = async (req,res) => {
    
    try {
        const newTour = await Tour.create(req.body);
        res.status(200).json({
            status : 'success',
            message : newTour
        });
    }
    catch(err)
    {
        res.status(400).json({
            status : 'fail',
            message : err
        });
    } 
};
  
exports.getTour = async  (req,res) => {
    try {
       const result = await  Tour.findById(req.params.id);
       res.status(200).json({
           status : 'success',
           message : result
       });
    }
    catch(err) {
        res.status(404).json({
            status : 'fail',
            message: err
        });
    }
};

/* Takes Updated property key and value and updates object if index and proeprty exist
based on string interpolation of header value*/
exports.updateTour = async(req,res) => {
    try {
        const result =  await Tour.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true });

        res.status(200).json({
            status: 'success',
            data : result
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message : err
        });
    }
   
};
  
exports.deleteTour = (req,res) =>  {
    
};




//midleware parse code
/*
exports.checkBody = ( req, res, next) => {
   
    if(!req.body.name || !req.body.price)
    {
       return res.status(404).json({
            status : "Failure",
            message : "Please add Name and Price"
        });
    }
    next();
};

exports.checkID = (req,res,next,val) => {
    
    if(val > tours.length -1)
    {
        return res.status(404).json({
            status : ' Fail',
            message : ' Invalid ID'
        });
    }

    next();
};
*/