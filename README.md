# history.node.js
history utils for node


## how to use
    npm i --save history.node

```js
var hist = require('history.node')

// set your history's system first ,default system name is "default"
hist.setSys('yourSysName')

// add history
hist.addHistory("cmd","remark")

// print history of 10 lines
hist.printHistory(10)
```
