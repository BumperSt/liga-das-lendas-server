const { request, response } = require('express')
const api = require('../../api/match')
const matchModel = require('../models/matchModel')


const matchController = {

     getChampMatch: (request, response) =>{
          console.log(request.body)
        let {puuid, championID,beginIndex} = request.body
        api.getChampMatch(puuid, championID, beginIndex)
        .then(({data}) => {
             response.status(200).json(data)
        })
        .catch((error) => {
             console.log(error)
             response.status(error.response.status).json(error)
        })
    },
    getMatchList: (request, response)=>{
         let { puuid} = request.body
         console.log(puuid)
         api.getMatchList(puuid)
          .then(({data}) => {
               response.status(200).json(data)
          })
          .catch((error) =>{
               console.log(error.response)
               response.status(error.response.status).json(error)
          })
    },
    getMatch: (request, response) =>{

        let {matchId} = request.body

        matchModel.findOne({'metadata.matchId': matchId}, function(err,obj) { 
               if(!err){
                    if(obj){
                         console.log(obj)
                         response.status(200).json(obj)
                         
                    }else{

                         api.getMatch(matchId)
                         .then(({data}) => {
                              console.log(data)
                              let new_match = new matchModel(data)
                              new_match.save()
                              response.status(200).json(data)
                         })
                         .catch((error) => {
                              console.log(error)
                              response.status(500).json(error)
                         })


                    }
               }else{
                    console.log(err)
               }
        })



    },
}
module.exports = matchController
