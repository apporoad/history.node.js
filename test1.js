// var child = require('child_process')
// , fs = require('fs');
// var childProcess = child.exec("dir", {env: process.env, maxBuffer: 20*1024*1024}, function(err) {
// });
// var stdoutStream = fs.createWriteStream(escape("a"));
// childProcess.stdout.pipe(stdoutStream, {end: false});
// childProcess.stderr.pipe(stdoutStream, {end: false});
// // 使用node的后压机制
// childProcess.stdout.pipe(process.stdout);
// childProcess.stderr.pipe(process.stderr);
// var stdoutEnded = false, stderrEnded = false;

// function tryClosing(){ if(stdoutEnded && stderrEnded){ stdoutStream.end(); } }
// childProcess.stdout.on('end', function(){ stdoutEnded = true; tryClosing(); });
// childProcess.stderr.on('end', function(){ stderrEnded = true; tryClosing(); });


// var spawn = require('child_process').spawn,
// free  = spawn('node', ['F:/workspace/ggenerator/bin/gg', 'testCombo' , '-t', 'F:/tmp']);

// // 捕获标准输出并将其打印到控制台
// free.stdout.on('data', function (data) {
// console.log('标准输出：\n' + data);
// });


// // 捕获标准错误输出并将其打印到控制台
// free.stderr.on('data', function (data) {
// console.log('标准错误输出：\n' + data);
// });

// // 注册子进程关闭事件
// free.on('exit', function (code, signal) {
// console.log('子进程已退出，代码：' + code);
// });

var argv = ['node' ,'F:/workspace/ggenerator/bin/gg', 'testCombo' , '-t', 'F:/tmp']

require('./runChildProcess').run(argv)