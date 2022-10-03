const matchModel = require('../models/matchModel')


const generateStatics = {
    getStaticByChampion:(request, response) => {
        let {champName} = request.body
        let win = 0
        let lost = 0
        let deaths = 0
        let kills = 0
        let assistences = 0
        let gameTime = 0
        let champParticipation = []
        matchModel.find({'info.participants.championName':champName,'info.gameVersion' : '12.10.442.9993'}, function(err,obj) {
            obj.map((match) => {
                match.info.participants.forEach(participant => {
                    if(participant.championName == champName){
                        champParticipation.push(participant)
                        if(participant.win){
                            win += 1
                        }
                        deaths += participant.deaths
                        kills += participant.kills
                        assistences += participant.assists
                        gameTime += (match.info.gameDuration/60)

                    }
                });
            })
            lost = obj.length - win
            let Response = {
                'Win' : win,
                'Lost' : lost,
                'Kills' : kills,
                'Deaths' : deaths,
                'Assistences' : assistences,
                'GameTime' : gameTime,
                'TotalMatchs' :obj.length,
                'WinRate' : (win/obj.length)*100            
            }

            response.status(200).json(Response)
        })
    }
}

module.exports = generateStatics