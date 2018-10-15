var spawn = require('child_process').spawn


exports.run = function(argv){
    if(!argv || argv.length == 0)
        return
    var any  = spawn(argv[0], argv.slice(1));
    
    // 捕获标准输出并将其打印到控制台
    any.stdout.on('data', function (data) {
    console.log(('' +data).trim('\r\n'));
    });
    
    // 捕获标准错误输出并将其打印到控制台
    any.stderr.on('data', function (data) {
    console.log(('' +data).trim('\r\n'));
    });
    
    // 注册子进程关闭事件
    any.on('exit', function (code, signal) {
     //console.log(('' +code).trim('\r\n'));
    });

    
}