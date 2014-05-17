var Q = require('q')
  , async = require('async')
  , _ = require('underscore')

module.exports.map = function(myArray, iterator, limit) {

    var queue
      , promiseArray

    limit = limit === undefined ? 1 : limit

    queue = async.queue(function(task, callback) {
        iterator(task.elem)
            .then(function(result) {
                task.deferred.resolve(result)
                callback()
            })
            .fail(function(error) {
                task.deferred.reject(error)
                callback()
            })
    }, limit)

    promiseArray = _.map(myArray, function(elem) {
        var deferred = Q.defer()

        queue.push({
            deferred: deferred
          , elem: elem
        })

        return deferred.promise
    })

    return Q.all(promiseArray)
}
