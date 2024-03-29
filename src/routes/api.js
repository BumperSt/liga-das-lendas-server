const router = require('express').Router()

const champsController = require('../controllers/champsController')
const summonerController =  require('../controllers/summonerController')
const matchController = require('../controllers/matchController')
const generateStatics = require('../controllers/generateStatics')

router.get('/champRotation', champsController.getChampsRotation)

router.post('/summoner', summonerController.getSummoner)

router.post('/updateSummoner', summonerController.updateSummoner)

router.post('/getChampsMaestry', champsController.getChampMaestry)

router.post('/getChampMatch', matchController.getChampMatch)

router.post('/getMatch', matchController.getMatch)

router.post('/getMatchList', matchController.getMatchList)

router.post('/getStaticByChampion', generateStatics.getStaticByChampion)



module.exports = router