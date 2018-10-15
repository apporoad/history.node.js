# history.node.js
history utils for node


## how to use
    npm i --save history.node

```js
//record your cli history
require('history.node').record('yourSysName')

// set your history's system first ,default system name is "default"
//hist.setSys('yourSysName')

// add history manumal
//hist.addHistory("cmd","remark")

// print history of 10 lines
hist.printHistory(10)

//get history
hist.getHistory(1)

```



## cli
    npm i history.node -g

```Shell
hist -n 10 -p yourProgram
hist last
hist last -i 2
hist --number 10 --program yourProgram
hist [ls] -n 10

```