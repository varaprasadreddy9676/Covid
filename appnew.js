const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require("body-parser");
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

const port = process.env.PORT || 4000;

app.get('/covid', function (req, res) {
    const stat = mongoose.model("covid", schema);
    //Fetching data from MONGODB
    let country = req.query.country;

    stat.find({
            // "deaths":{$lte:10},
            "countryName": country // Search Filters
        },
        ['date', 'countryName', 'cases', 'deaths'], // Columns to Return
        {
            skip: 0, // Starting Row
            limit: 10, // Ending Row
            sort: {
                total: -1 //Sort by TotalDeaths by DESC
            }
        },

        function (err, result) {
         if (err) throw err;
            if (result) {
                res.end("I am from MongoDB..." + JSON.stringify(result, null, 2))
            } else {
                res.send(JSON.stringify({
                    error: 'Error'
                }))
            }
        })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);

});