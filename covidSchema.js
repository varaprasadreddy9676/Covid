
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema({
    "objectId": {
        "type": "String",
        unique: true
    },
    "date": {
        "__type": {
            "type": "String"
        },
        "iso": {
            "type": "Date"
        }
    },
    "countryPointer": {
        "__type": {
            "type": "String"
        },
        "className": {
            "type": "String"
        },
        "objectId": {
            "type": "String"
        }
    },
    "countryName": {
        "type": "String"
    },
    "cases": {
        "type": "Number"
    },
    "deaths": {
        "type": "Number"
    },
    "recovered": {
        "type": "Number"
    },
    "createdAt": {
        "type": "Date"
    },
    "updatedAt": {
        "type": "Date"
    },

});

schema.plugin(uniqueValidator);
module.exports = schema;
