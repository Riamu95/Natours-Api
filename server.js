const dotenv = require('dotenv');
dotenv.config({ path : './config.env'});

const app = require('./app');

const port = process.env.PORT;
app.listen(3000, () => {
    console.log(`Listening on Port ${port}`);
});