const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: String,
    description:String,
    releaseDate: Number,
    length:  Number,
    imbdRating: Number,
    suspense: Number,
    gore: Number,
    spookiness: Number,
    imageURL: String,
});


module.exports = mongoose.model('Movie', MovieSchema);