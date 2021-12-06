const fs = require("fs");
const Tour = require("./../models/tour.model");
const tourModel = require("./../models/tour.model");




class APIFeatures {
    
    constructor(query, queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }

    filter()
    {
        const queryObj = {...this.queryString};
        //REMOVE INITAL POST QUERY FILTERS
        const excludedFields = ['page', 'sort','limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
       
       //FILTER QUERY STRING TO ALLOW OPERATORS IN QUERY COMMAND, i.e. add '$' to OPERATOR QUERY STRING
        let queryStr  = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort()
    {
        if(this.queryString.sort) {
            const queryObj = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(queryObj);

        }else 
        {
           this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields()
    {
        if(this.queryString.fields)
        {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    pagination()
    {
         //4) Pagination
         const page = this.queryString.page * 1 || 1;
         const limit = this.queryString.limit * 1 || 100;
 
         const skip = (page - 1) * limit;
       
         this.query = this.query.skip(skip).limit(limit);
         
        return this;
    }
} 


exports.getAllTours =  async (req, res) => {
    
    try {
        //RETURNS QUERY OBJECT
        const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();
        /*
        const numberOfDocs = await Tour.count();
 
        if(skip >= numberOfDocs)
        {
            throw new Error('No Documents left');
        }
        */

        //EXECUTES QUERY OBJECT
        const result = await features.query;
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
  
exports.deleteTour = async (req,res) =>  {
    try {
        const result = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status : 'Success',
            data : result
        });
    }
    catch(err){
        res.status(404).json({
            status : 'Success',
            data : err
        });
    };
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