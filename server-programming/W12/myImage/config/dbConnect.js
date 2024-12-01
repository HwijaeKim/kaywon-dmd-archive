const mongooes = require('mongoose');
require('dotenv').config();
// async, await
const dbConnect = async() => {
    try {
        const connect = await mongooes.connect(process.env.DB_CONNECT);
        console.log('DB Connected');
    } catch(err) {
        console.log(err);
    }
}
module.exports = dbConnect;