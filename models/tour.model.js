const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'A Tour must have a name'],
        unique : [ true, ' A Tour must have a unique name']
    },
    price : {
        type : Number,
        required : [true, ' A Tour must have a price'], 
    },
    rating : {
        type : Number,
        required : false
    }
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;