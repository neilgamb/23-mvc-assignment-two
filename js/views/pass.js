let View = require('ampersand-view');  

module.exports = View.extend({

    template: document.querySelector('#pass-template').innerHTML,

    bindings: {
        'model.passNum': '.passNum',
        'model.name': '.name',
        'model.occupation': '.occupation',
        'model.status': '.status',
    },

    render: function(){
        this.renderWithTemplate();
    },

});

