const express = require('express');
const request = require('request');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const schema = require('./models/countryModel');

app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/corona", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Parameters to get the data from remote URL

let dateObj = new Date();
//let days = req.query.days;
dateObj.setDate(dateObj.getDate() - 1);

const where = encodeURIComponent(JSON.stringify({
    "date": {
        "$gte": {
            "__type": "Date",
            "iso": dateObj
        }
    },
    // "countryName": country
}));

let options = {
    method: 'GET',
    url: `https://parseapi.back4app.com/classes/Covid19Case?where=${where}`,
    headers: {
        'X-Parse-Application-Id': 'zoZ3zW1YABEWJMPInMwruD5XHgqT4QluDAAVx0Zz',
        'X-Parse-Master-Key': 'gIo7p0nTyt72aROJqf0ronfzxGKw8Unjw0Zk6qFm',
    }
};

request(options, async function (error, response, body) {

    if (error) throw new Error(error);

    let co = JSON.parse(body);
    let covid19Stats = co.results;
    const stat = mongoose.model("covid", schema);

    // To insert data from Remote URL

    try {
        for(let s of covid19Stats) {

            stat.findOneAndUpdate({objectId: s.objectId}, s, {upsert: true, new: true})
        }

        console.log('Hurray!!! Sucesfully uploaded to MongoDB');
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit();
    }

});
