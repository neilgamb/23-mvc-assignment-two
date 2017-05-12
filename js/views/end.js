let View = require('ampersand-view');

module.exports = View.extend({
    template: document.querySelector('#end-template').innerHTML,
    bindings: {
        'model.totalFares': '.totalFares',
    },

    render: function(){

        this.renderWithTemplate();

    },
});