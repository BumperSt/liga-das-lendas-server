const { request, response } = require('express')
const api = require('../../api/match')
const matchModel = require('../models/matchModel')


const matchController = {

     getChampMatch: (request, response) =>{
        let {encryptedAccountId, championID,beginIndex} = request.body
        api.getChampMatch(encryptedAccountId, championID, beginIndex)
        .then(({data}) => {
             response.status(200).json(data)
        })
        .catch((error) => {
             response.status(500).json(error)
        })
    },
    getMatchList: (request, response)=>{
         let {encryptedAccountId} = request.body
         api.getMatchList(encryptedAccountId)
          .then(({data}) => {
               response.status(200).json(data)
          })
          .catch((error) =>{
               response.status(500).json(error)
          })
    },
    getMatch: (request, response) =>{

        let {matchId} = request.body

        matchModel.findOne({gameId: matchId}, function(err,obj) { 
               if(!err){
                    if(obj){

                         response.status(200).json(obj)
                         
                    }else{


                         api.getMatch(matchId)
                         .then(({data}) => {
                              let new_match = new matchModel(data)
                              new_match.save()
                              response.status(200).json(data)
                         })
                         .catch((error) => {
                              response.status(500).json(error)
                         })


                    }
               }
        })



    },
}
module.exports = matchController
