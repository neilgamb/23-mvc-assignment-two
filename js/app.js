// Think of app.js as "table of contents" for JS 

window.addEventListener('load', function(){
    let TaxiView = require('./views/taxi');
    let TaxiModel = require('./models/taxi');


    let rowIndex = 0;
    let cellIndex = 0;
    document.querySelector('#table').rows[rowIndex].cells[cellIndex].classList.add('highlight');

    let taxi = new TaxiModel();
    taxi.x = 1;
    taxi.y = 1;
    taxi.gas = 200;

    let view = new TaxiView({
        el: document.querySelector('main'),
        model: taxi,
    });

    view.render();

    setupButtons(taxi);


});

function setupButtons(model){

    let upBtn = document.querySelector("#move-up");
    let downBtn = document.querySelector("#move-down");
    let leftBtn = document.querySelector("#move-left");
    let rightBtn = document.querySelector("#move-right");
    

    upBtn.addEventListener('click', function (){
        model.moveUp();
    });

    downBtn.addEventListener('click', function (){
        model.moveDown();
    });

    leftBtn.addEventListener('click', function (){
        model.moveLeft();
    });

    rightBtn.addEventListener('click', function (){
        model.moveRight();
    });

}