const api = require('../../api/champs')


const champsController = {
    getChampsRotation: (request, response) => {
        api.getChampsRotation()
        .then(({data}) => {
             response.status(200).json(data)
        })
        .catch((error) => {
             response.status(500).json(error)
        })
         
     },
     
     getChampMaestry:(request, response) =>{
          let {encryptedSummonerId} = request.body
          api.getChampMaestry(encryptedSummonerId)
          .then(({data}) => {
                response.status(200).json(data);
          })
          .catch((error) =>{
              response.status(500).json(error);
          })
     }
}
module.exports = champsController