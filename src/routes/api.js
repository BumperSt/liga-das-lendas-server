const router = require('express').Router()

const champsController = require('../controllers/champsController')
const summonerController =  require('../controllers/summonerController')
const matchController = require('../controllers/matchController')

router.get('/champRotation', champsController.getChampsRotation)

router.post('/summoner', summonerController.getSummoner)

router.post('/getChampsMaestry', champsController.getChampMaestry)

router.post('/getLeague', summonerController.getLeague)

router.post('/getChampMatch', matchController.getChampMatch)

router.post('/getMatch', matchController.getMatch)

router.post('/getMatchList', matchController.getMatchList)


module.exports = router