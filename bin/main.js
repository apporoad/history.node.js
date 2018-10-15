#!/usr/bin/env node
var program = require('commander');
var hist = require('../')

program.version('1.0.0')
.usage('\r\n\thist -n 10 -p <yourProgram>'
+ '\r\n\thist last'
+ '\r\n\thist last -i 2'
+ '\r\n\thist --number 10 --program <yourProgram>'
+ '\r\n\thist [ls] -n 10'
+ '\r\n\thist [list] -n 10')
.option('-n --number [value]', '数量', 10)
.option('-i --index [value]', '命令所在位置',1)
.option('-p --program [value]', '项目名称' ,"all")
.parse(process.argv);

/*
hist -n 10 -p yourProgram
hist last
hist last -i 2
hist --number 10 --program yourProgram
hist [ls] -n 10
*/
program.parse(process.argv)

//hist
if(program.args.length == 0){
    //console.log(program.number + " " +program.program)
    hist.printHistory(program.number,program.program)
}
else
{
    switch(program.args[0]){
        case 'ls':
        case 'list':
            hist.printHistory(program.number,program.program)
            break;
        case 'last':
            hist.last(program.program,program.index)
            break;
        default:
            console.log('unknow cmd:' +  program.args[0])
            break;
    }
}