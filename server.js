const dotenv = require('dotenv');
dotenv.config({ path : './config.env'});

const mongoose = require('mongoose');

const db = process.env.DATABASE_CONNECTION.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(db, {}).then( con => console.log('Successfully connected to DB'));


const app = require('./app');

const port = process.env.PORT;
app.listen(3000, () => {
    console.log(`Listening on Port ${port}`);
});