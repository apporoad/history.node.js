
var os =require('os')
var path= require('path')
var storage = require('mini-db');

var dbPath = path.join(os.tmpdir() , "history.node.json")

var db = storage(dbPath)

var sys = global.historyNodeSystem || "default"

/*
var historyInfo={
    timeStamp : 11111,
    date : null,
    content: "",
    remark : ""
}

https://github.com/tianmajs/mini-db
*/

exports.getHistory = function(number){
    if(!number || number <10){
        number = 10
    }

}

exports.addHistory = function(){}


exports.setSys = function(sysName){global.historyNodeSystem = sysName; sys= sysName }