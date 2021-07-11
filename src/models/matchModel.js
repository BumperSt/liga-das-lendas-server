const mongoose = require('mongoose')


const Schema = mongoose.Schema;


const matchModel = new Schema({
    gameCreation: Number,
    gameDuration: Number,
    gameId: { type : Number , unique : true, index: true},
    gameMode: String,
    gameType: String,
    gameVersion: String,
    mapId: Number,
    participantIdentities: Object,
    participants: Object,
    platformId: String,
    queueId: Number,
    seasonId: Number,
    teams: Object   
});


module.exports = mongoose.model('match', matchModel );
