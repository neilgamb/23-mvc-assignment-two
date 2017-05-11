// Think of app.js as "table of contents" for JS 

window.addEventListener('load', function(){

    let TaxiModel = require('./models/taxi');
    let StartView = require('./views/start');
    let TaxiView = require('./views/taxi');

    let taxi = new TaxiModel({
        x : 9,
        y : 9,
        gas : 200,
        car: null,
        passX: getRandomIntInclusive(0, 19),
        passY: getRandomIntInclusive(0, 19),
        destX: getRandomIntInclusive(0, 19),
        destY: getRandomIntInclusive(0, 19),
        inUse: false,
        tripComplete: false,
    });

    let ShowStart = new StartView({
        el: document.querySelector('#start'),
        model: taxi,
    })

    let ShowTaxi = new TaxiView({
        el: document.querySelector('#game'),
        model: taxi,
    });

    ShowStart.render();
    ShowTaxi.render();

    setupButtons(taxi);
    setupStart(taxi);

    document.querySelector('#grid').rows[taxi.x].cells[taxi.y].classList.add('highlight');
    document.querySelector('#grid').rows[taxi.passX].cells[taxi.passY].classList.add('passhighlight');
    document.querySelector('#grid').rows[taxi.destX].cells[taxi.destY].classList.add('desthighlight');

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

function setupStart(model){

    let hybridBtn = document.querySelector("#hybrid");
    let guzzlerBtn = document.querySelector("#gas-guzzler");

    hybridBtn.addEventListener('click', function (){

        model.car = 'Hybrid';
        model.x = 9;
        model.y = 9;
        model.gas = 200;

    });

    guzzlerBtn.addEventListener('click', function (){

        model.car = 'Gas Guzzler';
        model.x = 9;
        model.y = 9;
        model.gas = 200;

    });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}