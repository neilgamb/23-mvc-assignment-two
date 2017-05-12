let View = require('ampersand-view');

module.exports = View.extend({
    template: document.querySelector('#taxi-template').innerHTML,
    bindings: {
        'model.x': '.xcord',
        'model.y': '.ycord',
        'model.gas': '.gas',
        'model.car': '.car',
        'model.passX': '.passX',
        'model.passY': '.passY',
        'model.destX': '.destX',
        'model.destY': '.destY',
        'model.totalFares': '.totalFares',
        'model.occupied': '.inUse',
    },

    render: function () {

        this.renderWithTemplate();

    },

    removeHighlight: function () {
        document.querySelector('.highlight').classList.remove('highlight');

        if(document.querySelector('.passhighlight') != undefined){
        document.querySelector('.passhighlight').classList.remove('passhighlight');    
        }
        document.querySelector('.desthighlight').classList.remove('desthighlight');

    },

    addHighlight: function () {
        document.querySelector('#grid').rows[this.model.x].cells[this.model.y].classList.add('highlight');
        
        if(!this.model.inUse){
        document.querySelector('#grid').rows[this.model.passX].cells[this.model.passY].classList.add('passhighlight');
        }
        document.querySelector('#grid').rows[this.model.destX].cells[this.model.destY].classList.add('desthighlight');

    },

    gameOver: function(){
        if(this.model.gas === 0){
            console.log("game over");
            document.querySelector('.gameOver').classList.remove('gameOver');    
        }
    },

    initialize: function () {
        let view = this;
        this.addHighlight();

        this.model.on('change', function () {

            view.removeHighlight();
            view.addHighlight();
            view.gameOver();

        });
    },
});