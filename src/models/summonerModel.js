const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const summonerModel = new Schema({
    accountId: String,
    id: String,
    name: { type : String , unique : true, index: true},
    profileIconId: Number,
    puuid: String,
    revisionData: Number,
    summonerLevel: Number
});

// Compile model from schema
module.exports = mongoose.model('summoner', summonerModel );

