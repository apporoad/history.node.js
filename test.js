
var hist = require('./')


    // for(var i=0;i<10;i++)
    //    hist.addHistory("abc","cd")
var i =0;

var x = function(){
    if(i++ >= 100)
        return
    
    hist.addHistory("abc","cd")
    
    setTimeout(x, 10);
}


x();
//hist.clearAll();
//hist.getHistory();

// var a = [1,2,3,4,5];   
// var b = a.slice(2);

// console.log(b)

//hist.clearVerbose();

console.log(hist.count())