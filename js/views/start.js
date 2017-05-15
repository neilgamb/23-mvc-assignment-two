let View = require('ampersand-view');

module.exports = View.extend({
    template: document.querySelector('#start-template').innerHTML,
    bindings: {
        'model.car': '.car',
    },

    render: function(){

        this.renderWithTemplate();

    },

    events: {
        'click #hybrid': 'playGame',
        'click #gas-guzzler': 'playGame',

    },

    playGame: function (){
        console.log('next phase')
        this.router.navigate('game');
    },
});