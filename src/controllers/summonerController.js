const { request, response } = require('express')
const api = require('../../api/summoner')
const summonerModel = require('../models/summonerModel')
const {timeDiference} = require('../helpers/summonerHelpers')
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
                         api.getSummonerInfo(nickName)
                         .then(({data}) => {
                              let summonerData = data
                              api.getSummonerLeague(summonerData.id)
                              .then(({data}) =>{
                                   data = {...summonerData, revisionData:new Date(), leagues:data}
                                   let new_summoner = new summonerModel(data)
                                   new_summoner.save()
                                   response.status(200).json(data)
                              })
                              .catch((error) => {
                                   console.error(error)
                                   response.status(500).json(error);
                              })
                         })
                         .catch((error) => {
                              console.error(error)
                              response.status(500).json(error);
                         })
                    }
               } 
          });

         
     },
     updateSummoner: (request, response) => {
          let {nickName} = request.body
          summonerModel.findOne({name: nickName}, function(err,obj) { 
               if(!err){
                    let diference = timeDiference(obj.revisionData)
                    console.log(diference)
                    if(parseInt(diference) > 10){
                         api.getSummonerInfo(nickName)
                         .then(({data}) => {
                              let summonerData = data
                              api.getSummonerLeague(summonerData.id)
                              .then(({data}) =>{
                                   data = {...summonerData, revisionData:new Date(), leagues:data}
                                   summonerModel.findOneAndUpdate({_id: obj._id}, data, function(error, result) {
                                        if(!error){
                                             response.status(200).json(data)
                                        }
                                   })
                              })
                              .catch((error) => {
                                   console.error(error)
                                   response.status(500).json(error);
                              })
                             
                         })
                         .catch((error) => {
                              response.status(500).json(error);
                         })
                    }else{
                         response.status(401).json({'error':`Você não pode autualizar agora, aguarde ${10 - diference} minutos`} )

                    }
               }
          })
     },
}

module.exports = summonerController