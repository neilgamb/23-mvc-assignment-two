let State = require('ampersand-state');



module.exports = State.extend({
    props: {
        x: "number",
        y: "number",
        gas: "number",
    },

    moveUp: function(){
        if(this.y < 20){
            this.y ++;
        }
    },

    moveDown: function(){
        if(this.y > 1){
            this.y --;
        }
    },

    moveLeft: function(){
        if(this.x > 1){
            this.x --;
        }
    },

    moveRight: function(){
        if(this.x < 20){
            this.x ++;
        }
    },
});