let View = require('ampersand-view');
let PassView = require('./pass');


module.exports = View.extend({
    template: document.querySelector('#pass-list-template').innerHTML,
    render: function(){
        // render the <h2> and <ul> (stuff for the collection)
        this.renderWithTemplate();
        // render each item in the collection
        this.renderCollection(this.collection, PassView, this.el.querySelector('ul'));
    },
});