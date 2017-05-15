let View = require('ampersand-view');
let PassView = require('./pass');


module.exports = View.extend({
    template: document.querySelector('#pass-list-template').innerHTML,
    render: function(){
        this.renderWithTemplate();
        this.renderCollection(this.collection, PassView, this.el.querySelector('ul'));
    },


});