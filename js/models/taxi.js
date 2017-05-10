let State = require('ampersand-state');


module.exports = State.extend({
    props: {
        x: "number",
        y: "number",
        gas: "number",
    },

    moveUp: function(){
        if(this.x > 0 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.x --;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');

            this.gas = this.gas - 1;
            console.log(model.car);

        }
    },

    moveDown: function(){
        if(this.x < 19 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.x ++;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');
        
            this.gas = this.gas - 1;

        }
    },

    moveLeft: function(){
        if(this.y > 0 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.y --;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');
        
            this.gas = this.gas - 1;

        }
    },

    moveRight: function(){
        if(this.y < 19 && this.gas > 0){
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.remove('highlight');
            this.y ++;
            document.querySelector('#grid').rows[this.x].cells[this.y].classList.add('highlight');
        
            this.gas = this.gas - 1;
        }
    },
});