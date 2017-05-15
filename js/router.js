let Router = require ('ampersand-router');

module.exports = Router.extend({

    routes: {
        'start': 'ShowStart',
        'game': 'ShowTaxi',
        'end': 'ShowEnd',
    },

    ShowStart: function(){
        console.log('show start');
        document.querySelector('#sectionOne').classList.add('show');
        document.querySelector('#sectionTwo').classList.remove('show');
        document.querySelector('#sectionThree').classList.remove('show');

    },

    ShowTaxi: function(){
        console.log('play game');
        document.querySelector('#sectionOne').classList.remove('show');
        document.querySelector('#sectionTwo').classList.add('show');
        document.querySelector('#sectionThree').classList.remove('show');

    },

    ShowEnd: function(){
        console.log('show end');
        document.querySelector('#sectionOne').classList.remove('show');
        document.querySelector('#sectionTwo').classList.remove('show');
        document.querySelector('#sectionThree').classList.add('show');

    },

});