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
        'model.occupied': '.inUse',
        'model.success': '.tripComplete',
    },

    render: function(){

        this.renderWithTemplate();

    },

    initialize: function(){

        this.model.on('change', function(){
            document.querySelector('.highlight').classList.remove('highlight');
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');

            if(this.inUse === true){
                document.querySelector('.passhighlight').classList.add('yellow');
                document.querySelector('.highlight').classList.add('green');
            } 

            if(this.tripComplete === true){

                for(let i = 0; i < 20; i++){
                    for(let p = 0; p < 20; p++){
                        document.querySelector('#grid').rows[i].cells[p].classList.add('green');
                    }
                }

            } 
        });


    },
});