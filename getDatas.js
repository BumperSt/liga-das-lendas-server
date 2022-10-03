const apiData = require('./api/getData')
const leagues = ['RANKED_SOLO_5x5']
const tier = ['PLATINUM']
const tiers = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER']
const summonerApi = require('./api/summoner')
const matchModel = require('./src/models/matchModel')
const summonerModel = require('./src/models/summonerModel')
const matchApi = require('./api/match')
let page = 7
let summonersCount = 0

const getMatchHistoryAllSummonersByTier = async (tier, queueType) => {
    let summoners = await summonerModel.find({leagues:{$elemMatch:{tier : tier, queueType: queueType}}})
    console.log(summoners.length)
    if(summoners.length > 0){
        awaitToContinueGetMatchList(summoners)
    }
}
// getMatchHistoryAllSummonersByTier('PLATINUM', 'RANKED_SOLO_5x5')

const awaitToContinueGetMatchList = (summoners) => {
    matchApi.getMatchList(summoners[0].puuid, 'ranked', 0, 10).then(({data}) => {
        console.log(data)
        awaitToContinueGetMatch(data)
    })
    if (summoners.length > 1) {
        summonersCount+=1
        setTimeout(() => awaitToContinueGetMatchList(summoners.slice(1)), 1000);
    }
}

const awaitToContinueGetMatch = (matchs) => {
    matchModel.findOne({'metadata.matchId': matchs[0]}, function(err,obj) { 
        if(!err){
             if(obj){
                console.log("Já tem")
             }else{
                matchApi.getMatch(matchs[0])
                  .then(({data}) => {
                      try{
                        let new_match = new matchModel(data)
                        new_match.save()
                        console.log("Adicionado nova partida")
                      }catch(error){
                        console.log("Partida já existe")
                        console.log(error)
                      }
                       
                  })
                  .catch((error) => {
                       console.error(error)
                  })
             }
        }else{
             console.error(err)
        }
    })
    if (matchs.length > 1) {
      setTimeout(() => awaitToContinueGetMatch(matchs.slice(1)), 100);
    }
}

const getSummonerByLeague = () =>{
    leagues.forEach(league => {
        tier.forEach(tier => {
            apiData.getSummonerByLeague({ league, tier, page })
            .then(async data => {
                doSomething(data.data)
            })
            .catch(err => {
                console.log(err)
            })
           
        })
    })
}



const doSomething = async (arr) => {
    let summoner = await  summonerModel.findOne({name:arr[0].summonerName})
    console.log(summoner)
    if(summoner == null){
        summonerApi.getSummonerInfo(arr[0].summonerName).then(({data}) => {
            let summonerData = data
            summonerApi.getSummonerLeague(summonerData.id).then(({data}) =>{
                data = {...summonerData, revisionData:new Date(), leagues:data}
                let new_summoner = new summonerModel(data)
                new_summoner.save().then((response) => {
                    console.log('Salvo com sucesso') 
                }).catch((error) => {
                    setTimeout(() => doSomething(arr.slice(1)), 1);
                    return
                })
            }).catch((error) => {
                setTimeout(() => doSomething(arr.slice(1)), 1);
                return
            })
        }).catch((error) => {
            setTimeout(() => doSomething(arr.slice(1)), 1);
            return
        })
        if (arr.length > 1) {
            setTimeout(() => doSomething(arr.slice(1)), 500);
        }else{
            page += 1
            console.log('page: ' + page)
            getSummonerByLeague()
        }
    }else{
        console.log('Já existe')
        if (arr.length > 1) {
            setTimeout(() => doSomething(arr.slice(1)), 1);
        }else{
            page += 1
            console.log('page: ' + page)
            getSummonerByLeague()
        }
    }
    

    

    
}
getSummonerByLeague()
