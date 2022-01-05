const mongoose = require('mongoose')


const Schema = mongoose.Schema;


const matchModel = new Schema({
    metadata:{
        dataVersion:String,
        matchId: {type : String , unique : true, index: true},    
        participants: Array,
    },
    info:{
        gameCreation: Number,
        gameDuration: Number,
        gameEndTimestamp:Number,
        gameId: {type : Number , unique : true},
        gameMode: String,
        gameName: String,
        gameType: String,
        gameVersion: String,
        mapId: Number,
        participantIdentities: Object,
        participants: Object,
        platformId: String,
        queueId: Number,
        teams: Object,
        tournamentCode:String
    }

});


module.exports = mongoose.model('match', matchModel );
