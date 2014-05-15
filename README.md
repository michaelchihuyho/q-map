```javascript
var Q = require('q')

Q.map = require('q-map').map

var myArray = [1,2,3,4,5,6,7,8]

// Limits promise concurrency to 3

var promiseArray = Q.map(myArray, function(element) {
    return promiseFactory(element)
}, 3)

Q.all(promiseArray)
    .then(function(resolvedArray) {
        doStuff()
    })
```
