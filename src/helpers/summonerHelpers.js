const summonerHelpers = {
    timeDiference:(insertDate) => {
        let difference =  new Date().getTime() - new Date(insertDate).getTime();
    
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24
    
        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
    
        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
    
        var secondsDifference = Math.floor(difference/1000);

        return minutesDifference
    },
}


module.exports = summonerHelpers