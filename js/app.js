// Think of app.js as "table of contents" for JS 

window.addEventListener('load', function(){

    let TaxiModel = require('./models/taxi');
    let StartView = require('./views/start');
    let TaxiView = require('./views/taxi');
    let EndView = require('./views/end');

    // Models //////////////////////////////////////////
    let taxi = new TaxiModel({
        x : 9,
        y : 9,
        gas : 200,
        car: null,
        passX: getRandomIntInclusive(0, 19),
        passY: getRandomIntInclusive(0, 19),
        destX: getRandomIntInclusive(0, 19),
        destY: getRandomIntInclusive(0, 19),
        totalFares: 0,
        inUse: false,
    });

    let ShowStart = new StartView({
        el: document.querySelector('#start'),
        model: taxi,
    });

    let ShowTaxi = new TaxiView({
        el: document.querySelector('#game'),
        model: taxi,
    });

    let ShowEnd = new EndView({
        el: document.querySelector('#end'),
        model: taxi,
    });

    ShowStart.render();
    ShowTaxi.render();
    ShowEnd.render();

    setupButtons(taxi);
    setupStart(taxi);

    let PassModel = require('./models/pass');
    let PassView = require('./views/pass');
    let PassCollection = require('./models/passlist');
    let PassListView = require('./views/passlist');

    let pass1 = new PassModel({
        name : "Neilson",
        occupation: "Developer",
        status: "Waiting",
    });

    let list = new PassCollection([pass1]);

    let listView = new PassListView({
        el: document.querySelector('#passenger'),
        collection: list,
    });

    listView.render();
    

    changeStatus(taxi, list);


});

function setupButtons(model){

    let upBtn = document.querySelector("#move-up");
    let downBtn = document.querySelector("#move-down");
    let leftBtn = document.querySelector("#move-left");
    let rightBtn = document.querySelector("#move-right");
    
    upBtn.addEventListener('click', function (){
        if(model.car === null){
            console.log('Please Pick Vehicle Type');
            document.querySelector('.pickCar').classList.remove('pickCar');
        } else {
            model.moveUp();
        }
    });

    downBtn.addEventListener('click', function (){
        if(model.car === null){
            console.log('Please Pick Vehicle Type');
            document.querySelector('.pickCar').classList.remove('pickCar');
        } else {
            model.moveDown();
        }    });

    leftBtn.addEventListener('click', function (){
        if(model.car === null){
            console.log('Please Pick Vehicle Type');
            document.querySelector('.pickCar').classList.remove('pickCar');
        } else {
            model.moveLeft();
        }    });

    rightBtn.addEventListener('click', function (){
        if(model.car === null){
            console.log('Please Pick Vehicle Type');
            document.querySelector('.pickCar').classList.remove('pickCar');
        } else {
            model.moveRight();
        }    });

}

function setupStart(model){

    let hybridBtn = document.querySelector("#hybrid");
    let guzzlerBtn = document.querySelector("#gas-guzzler");

    hybridBtn.addEventListener('click', function (){

        model.car = 'Hybrid';
        model.x = 9;
        model.y = 9;

        if(!document.querySelector('pickCar') === undefined){
            document.querySelector('pickCar').classList.add('pickCar');
        }    });

    guzzlerBtn.addEventListener('click', function (){

        model.car = 'Gas Guzzler';
        model.x = 9;
        model.y = 9;

        if(!document.querySelector('pickCar') === undefined){
            document.querySelector('pickCar').classList.add('pickCar');
        }
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeStatus(model, collection){
    model.on('change', function(){
        let currentPass = 0;
        if (model.x === model.passX && model.y === model.passY) {
            collection.models[currentPass].status = "Picked Up";
            console.log(collection.models[currentPass].status);
            
        }
        if (model.x === model.destX && model.y === model.destY) {
            collection.models[currentPass].status = "Dropped Off";
            console.log(collection.models[currentPass].status);
            
        }
    });
}


