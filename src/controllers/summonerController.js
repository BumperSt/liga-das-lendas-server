const { request, response } = require('express')
const api = require('../../api/summoner')
const summonerModel = require('../models/summonerModel')

const summonerController = {
     getSummoner: (request, response) =>  {
          let {nickName} = request.body
          summonerModel.findOne({name: nickName}, function(err,obj) { 
               if(err){
                    response.status(500).json(err);

               } else{
                    if(obj){
                         response.status(200).json(obj)

                    }else{
                         console.log("opasss")
                         api.getSummonerInfo(nickName)
                         .then(({data}) => {
                              let new_summoner = new summonerModel(data)
                              new_summoner.save()
                              console.log(data)
                              response.status(200).json(data)
                         })
                         .catch((error) => {
                              response.status(500).json(error);
                         })
                    }
               } 
          });

         
     },
     getLeague: (request, response) => {
     
     let {encryptedSummonerId} = request.body
     api.getSummonerLeague(encryptedSummonerId)
     .then(({data}) =>{
          console.log(data)

          response.status(200).json(data);
     })
     .catch((error) => {
          response.status(500).json(error);
     })
   }
}

module.exports = summonerController