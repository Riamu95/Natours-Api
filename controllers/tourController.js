const fs = require("fs");

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: "success:",
      data: {
        tours,
      },
    });
}
  
exports.addTour = (req,res) => {

const newId = tours[tours.length - 1].id + 1;

const newTour = Object.assign({ id : newId }, req.body);
tours.push(newTour);

fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), ( err) => { 
    if(err)
    {
        console.log(err);
        return;
    }
    else
    {
        res.status(201).json({ 
            satus: 'success',
            tour : newTour });
    }
});
}
  
exports.getTour = (req,res) => {
const id = parseInt(req.params.id);

tours[id] === undefined ? 
res.status(404).send("Tour Does Not Exist")
    :
res.status(200).json({
    status: "success:",
    data: {
    tour :  tours[id],
    },
});
}

/* Takes Updated property key and value and updates object if index and proeprty exist
based on string interpolation of header value*/
exports.updateTour = (req,res) => {
const id = req.params.id;
const key = Object.keys(req.body)[0];

if(id > tours.length -1 ||  !tours[id].hasOwnProperty(`${key}`))
    res.status(404).send("Property Does Not Exist");

const value =  Object.values(req.body)[0];
tours[id][`${key}`] = value;

res.status(201).json({
    status : " Success",
    data : {
    updatedTour : tours[id]
    }
});
}
  
exports.deleteTour = (req,res) =>  {
const id = parseInt(req.params.id);

if(id <= tours.length -1)
{
    tours.splice(id, 1);
    res.status(204).json({
    status : " Success",
    data : null
    }); 
}
else
    res.status(404).send('Tour does not exist');
}