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


                         let atualHour = new Date().getHours()
                         let atualMinutes = new Date().getMinutes()
                         let hourObj = new Date(obj.timestamp).getHours()
                         let minuteObj =  new Date(obj.timestamp).getMinutes()

                         console.log(minuteObj)

                         if(atualMinutes > minuteObj+5 || atualHour > hourObj){
                              
                              api.getSummonerInfo(nickName)

                              .then(({data}) => {
        
                                   data.timestamp = new Date()
                                   summonerModel.findOneAndUpdate({_id: obj._id}, data, function(error, result) {
                                        if(!error){
 
                                        }
                                   })
                                   response.status(200).json(data)
                              })

                              .catch((error) => {
                                   response.status(500).json(error);
                              })

                         }else{
                              response.status(200).json(obj)
                         }


                    }else{
                         
                         api.getSummonerInfo(nickName)
                         .then(({data}) => {
                              let new_summoner = new summonerModel(data)
                              new_summoner.save()
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

               response.status(200).json(data);
          })
          .catch((error) => {
               response.status(500).json(error);
          })
     }

     
}

module.exports = summonerController