const judgeExist = (val) =>{
    let returnStr = false;
    if(val && val != undefined && val != null && val != "undefined" && val != "null"){
        returnStr = true;
    }
    return returnStr
}
module.exports = {
    judgeExist: judgeExist
}