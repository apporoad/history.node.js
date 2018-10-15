
var hist = require('./')

console.log(require('os').tmpdir())

// for(var i=0;i<1000;i++)
//     hist.addHistory("abc","cd")

var i =0;

var x = function(){
    if(i++ >= 100)
        return
    
    hist.addHistory("abc","cd")
    
    setTimeout(x, 10);
}


//x();
//hist.clearAll();
//hist.getHistory();

// var a = [1,2,3,4,5];   
// var b = a.slice(2);

// console.log(b)

//hist.clearVerbose();

//console.log(hist.count())


//hist.printHistory(10)

//hist.addHistory("ssssssssssssssssss","remark","test",{abc : " sfs"})

//hist.printHistory(1,"test")

console.log(hist.getHistory(2,"all"))
