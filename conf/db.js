//configuração do mongodb
const mongoose = require('mongoose');
const uri = "";
mongoose.Promise = global.Promise;

const db = () => {
        mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
        console.log("connected to mongodb");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = db;