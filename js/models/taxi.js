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
        totalFares: "number",
        inUse: "boolean",
    },

    derived: {
        occupied: {
            deps: ['inUse'],
            fn: function(){
                if(this.inUse){
                    return "PASSENGER PICKED UP";
                } else {
                    return "EN ROUTE TO PASSENGER";
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

                if(this.car === "Hybrid"){
                    this.totalFares = this.totalFares + 10;
                } else {
                    this.totalFares = this.totalFares + 20;
                }

            this.newTrip();
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

                if(this.car === "Hybrid"){
                    this.totalFares = this.totalFares + 10;
                } else {
                    this.totalFares = this.totalFares + 20;
                }

            this.newTrip();
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

                if(this.car === "Hybrid"){
                    this.totalFares = this.totalFares + 10;
                } else {
                    this.totalFares = this.totalFares + 20;
                }

            this.newTrip();
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

                if(this.car === "Hybrid"){
                    this.totalFares = this.totalFares + 10;
                } else {
                    this.totalFares = this.totalFares + 20;
                }

            this.newTrip();
        }
    },

    newTrip: function(){
        this.x = 9,
        this.y = 9,
        this.passX = getRandomIntInclusive(0, 19),
        this.passY = getRandomIntInclusive(0, 19),
        this.destX = getRandomIntInclusive(0, 19),
        this.destY = getRandomIntInclusive(0, 19),
        this.inUse = false,
        this.tripComplete = false
    },

});


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}