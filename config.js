var ioc = require('peeriocjs')
var localConfig = require('./config.json')

ioc.module("history.node").reg("config",function(){return localConfig},null,true)

var config = ioc.module("history.node").invoke.sync.config()

config.historyStoreCount = config.historyStoreCount || 300