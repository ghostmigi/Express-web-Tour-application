/* eslint-disable prettier/prettier */
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

// TODO: Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});