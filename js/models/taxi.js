let State = require('ampersand-state');


module.exports = State.extend({
    props: {
        x: "number",
        y: "number",
        gas: "number",
        car: "string",
        passX: "number",
        passY: "number",
        destX: "number",
        destY: "number",
        inUse: "boolean",
        tripComplete: "boolean",
    },

    derived: {
        occupied: {
            deps: ['inUse'],
            fn: function(){
                if(this.inUse){
                    return "Passenger Picked Up";
                } else {
                    return "En Route to Passenger";
                }
            }
        }, 
        success: {
            deps: ['tripComplete'],
            fn: function(){
                if(this.tripComplete){
                    return "Trip Complete!";
                } else {
                    return "Trip In Progress";
                }
            }
        }, 
    },

    moveUp: function(){
        if(this.x > 0 && this.gas > 0){
            this.x --;

                if(this.car === "Hybrid"){
                    this.gas = this.gas - 1;
                } else {
                    this.gas = this.gas - 2;
                }
        }

       if(this.x === this.passX && this.y === this.passY){
            this.inUse = true;
        }

        if(this.inUse === true && this.x === this.destX && this.y === this.destY){
            this.tripComplete = true;
        }
    },

    moveDown: function(){
        if(this.x < 19 && this.gas > 0){
            this.x ++;
        
                if(this.car === "Hybrid"){
                    this.gas = this.gas - 1;
                } else {
                    this.gas = this.gas - 2;
                }
        }

       if(this.x === this.passX && this.y === this.passY){
            this.inUse = true;
        }

        if(this.inUse === true && this.x === this.destX && this.y === this.destY){
            this.tripComplete = true;
        }

    },

    moveLeft: function(){
        if(this.y > 0 && this.gas > 0){
            this.y --;
        
                if(this.car === "Hybrid"){
                    this.gas = this.gas - 1;
                } else {
                    this.gas = this.gas - 2;
                }
        }

       if(this.x === this.passX && this.y === this.passY){
            this.inUse = true;
        }

        if(this.inUse === true && this.x === this.destX && this.y === this.destY){
            this.tripComplete = true;
        }
    },

    moveRight: function(){
        if(this.y < 19 && this.gas > 0){
            this.y ++;
        
                if(this.car === "Hybrid"){
                    this.gas = this.gas - 1;
                } else {
                    this.gas = this.gas - 2;
                }
        }

       if(this.x === this.passX && this.y === this.passY){
            this.inUse = true;
        }

        if(this.inUse === true && this.x === this.destX && this.y === this.destY){
            this.tripComplete = true;
        }
    },
});