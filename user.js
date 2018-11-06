const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geolocation Schema
const GeoSchema = mongoose.Schema({
    type:{
        type:String,
        default: "Point"
    },
    coordinates:{
        type:[Number],
        index: "2dsphere"
    }
});

// Create user SChema & model
const UserSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name field is required']
    },
    rank:{
        type: String
    },
    available:{
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user',UserSchema);

module.exports = User;