// Think of app.js as "table of contents" for JS 

window.addEventListener('load', function(){
    document.querySelector('#navs').classList.add('hide');
    document.querySelector('#grid').classList.add('hide');
    document.querySelector('#game').classList.add('hide');

    start();
    playGame();

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

    document.querySelector('#navs').classList.remove('hide');
    document.querySelector('#grid').classList.remove('hide');
    document.querySelector('#cars').classList.add('hide');

    model.car = 'Hybrid';

    });

    guzzlerBtn.addEventListener('click', function (){

    document.querySelector('#navs').classList.remove('hide');
    document.querySelector('#grid').classList.remove('hide');
    document.querySelector('#cars').classList.add('hide');

    model.car = 'Gas Guzzler';

    });
}

function start(){

    let StartView = require('./views/start');
    let StartModel = require('./models/start');

    let start = new StartModel();
    start.car = null;

    let view = new StartView({
        el: document.querySelector('#start'),
        model: start,
    });

    view.render();

    setupStart(start);


}

function playGame(){

    let TaxiView = require('./views/taxi');
    let TaxiModel = require('./models/taxi');

    let taxi = new TaxiModel();
    taxi.x = 9;
    taxi.y = 9;
    taxi.gas = 200;

    let view = new TaxiView({
        el: document.querySelector('#game'),
        model: taxi,
    });

    view.render();

    setupButtons(taxi);

    document.querySelector('#grid').rows[taxi.x].cells[taxi.y].classList.add('highlight');

}