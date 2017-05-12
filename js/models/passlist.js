let Collection = require('ampersand-collection');
let PassModel = require('./pass');

module.exports = Collection.extend({
    model: PassModel,  // what does this collection contain?

});