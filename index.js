require('./config')
var os =require('os')
var path= require('path')
var storage = require('mini-dbx')
var ioc = require('peeriocjs')
var config = ioc.module("history.node").invoke.sync.config()
var runC = require('./runChildProcess')

var sys = global.historyNodeSystem || "default"
var fileName = function(systemName){ return "history." + (systemName || sys) +".json"} 



var isClearing =false;

var clearVerbose = function(systemName){
    if(isClearing == false)
    {
        isClearing =true
        setTimeout(() => {
            var dbPath = path.join(os.tmpdir() , fileName(systemName))
            var db = storage(dbPath)

            var items = db.select(systemName || sys)
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

var getHistory = function(number,systemName){
    if(!number || number < 1){
        number = 10
    }
    var dbPath = path.join(os.tmpdir() , fileName(systemName))
    var db = storage(dbPath)

    var items = db.select(systemName || sys)
    var index = items.length > number ? items.length - number : 0;
    return items.slice(index)

}

exports.getHistory = getHistory

exports.printHistory = function(number,systemName){
    if(!number || number <1){
        number = 10
    }
    var dbPath = path.join(os.tmpdir() , fileName(systemName))
    var db = storage(dbPath)

    var items = db.select(systemName || sys)
    var index = items.length > number ? items.length - number : 0;
    items.slice(index).forEach(element => {
        console.log( element.date + " [ " + element.content + " ] " +element.remark)
    });

}

exports.record = function(systemName){
    addHistory(process.argv.join(' '),"auto record",systemName,process.argv)
}


exports.last = function(systemName,index,runOrNot){
    systemName = systemName || "all"
    index  = index || 1
    runOrNot = runOrNot || true

    var items = getHistory(index,systemName)
    if(!items || items.length==0) {
        console.log("no history")
        return
    }
    var item = items[0]
    console.log('hist is : ' + item.date + " [ " + item.content + " ] " +item.remark)
    if(runOrNot && Array.isArray(item.ext)){
        console.log('rerun...')
        runC.run(item.ext)
    }
    //Array.isArray(
    //runC
}

var addHistory = function(content,remark,systemName,ext){
    //async delete history data
    clearVerbose(systemName);
    if(systemName!=="all"){
        clearVerbose("all")
    }
    return new Promise((resolve,reject) => {
        var dbPath = path.join(os.tmpdir() , fileName(systemName))
        var db = storage(dbPath)
        //insert
        db.insert(systemName || sys, { 
            timestamp: new Date().getTime(),
            date : new Date().toLocaleString(),
            content: content,
             remark: remark,
             ext: ext
            },function(err,inserted){
                if(systemName!== "all"){
                    var dbPath = path.join(os.tmpdir() , fileName("all"))
                    var db = storage(dbPath)
                    //console.log("--here go:" + dbPath)
                    //insert
                    db.insert("all", { 
                        timestamp: new Date().getTime(),
                        date : new Date().toLocaleString(),
                        content: content,
                         remark: remark,
                         ext : ext
                        },function(err,inserted){
                            if(!err) resolve();
                            reject();
                    });
                }
                else
                {
                    if(!err) resolve();
                    reject();
                }

        });
        
    })
    
}

exports.addHistory = addHistory
exports.setSys = function(sysName){global.historyNodeSystem = sysName; sys= sysName }

exports.clearAll = function(systemName){
    var dbPath = path.join(os.tmpdir() ,  fileName(systemName))
    var db = storage(dbPath)
    db.remove(systemName || sys,'1=1' ,function(err,removed){
    });
}

exports.count =function(systemName){
    var dbPath = path.join(os.tmpdir() ,  fileName(systemName))
    var db = storage(dbPath)
    return db.select(systemName || sys).length;
}

exports.clearVerbose = clearVerbose