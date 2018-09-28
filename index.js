require('./config')
var os =require('os')
var path= require('path')
var storage = require('mini-db')
var ioc = require('peeriocjs')
var config = ioc.module("history.node").invoke.sync.config()

var sys = global.historyNodeSystem || "default"
var fileName = function(){ return "history." + sys +".json"} 



var isClearing =false;

var clearVerbose = function(){
    if(isClearing == false)
    {
        isClearing =true
        setTimeout(() => {
            var dbPath = path.join(os.tmpdir() , fileName())
            var db = storage(dbPath)

            var items = db.select(sys)
            // items.forEach(element => {
            //     console.log(element.timestamp + " " +  element.date + " " + element.content)
            // });
            if(items.length > config.historyStoreCount){
                var index = items.length - config.historyStoreCount
                var timestamp = items[index].timestamp
                db.remove(sys,'$.timestamp < ' + timestamp ,function(err,removed){
                });

            }
            isClearing = false;
        }, 500);
    }
}

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
    var dbPath = path.join(os.tmpdir() , fileName())
    var db = storage(dbPath)

    var items = db.select(sys)
    items.forEach(element => {
        console.log(element.timestamp + " " +  element.date + " " + element.content)
    });

}

exports.PrintHistory = function(number){
    if(!number || number <10){
        number = 10
    }
    var dbPath = path.join(os.tmpdir() , fileName())
    var db = storage(dbPath)

    var items = db.select(sys)
    items.forEach(element => {
        console.log(element.timestamp + " " +  element.date + " " + element.content)
    });

}


exports.addHistory = function(content,remark){
    //async delete history data
    clearVerbose();
    return new Promise((resolve,reject) => {
        var dbPath = path.join(os.tmpdir() , fileName())
        var db = storage(dbPath)
        //insert
        db.insert(sys, { 
            timestamp: new Date().getTime(),
            date : new Date().toLocaleString(),
            content: content,
             remark: remark 
            },function(err,inserted){
            if(!err) resolve();
            reject();
        });
    })
    
}


exports.setSys = function(sysName){global.historyNodeSystem = sysName; sys= sysName }

exports.clearAll = function(){
    var dbPath = path.join(os.tmpdir() ,  fileName())
    var db = storage(dbPath)
    db.remove(sys,'1=1' ,function(err,removed){
    });
}

exports.count =function(){
    var dbPath = path.join(os.tmpdir() ,  fileName())
    var db = storage(dbPath)
    return db.select(sys).length;
}

exports.clearVerbose = clearVerbose