'use strict'

const DELAY = 100

const simDB = {
  // Synchronous Initialize
  initialize: function(data) {
    this.data = data.map(item => {

      return item
    })
    return this
  },

  // Asynchronous CRUD operations
  create: function(newItem, callback) {
    setTimeout(() => {
      try {
        
        this.data.push(newItem)
        callback(null, newItem)
      } catch (err) {
        callback(err)
      }
    }, DELAY)
  },


}

module.exports = Object.create(simDB)
