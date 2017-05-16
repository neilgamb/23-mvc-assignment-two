// Think of app.js as "table of contents" for JS 


window.addEventListener('load', function(){

    let passNum = 0;

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

    // Setup Collection
    let PassModel = require('./models/pass');
    let PassView = require('./views/pass');
    let PassCollection = require('./models/passlist');
    let PassListView = require('./views/passlist');

    let pass1 = new PassModel({
        passNum : passNum,
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
    
    function addNewPassenger(){

    passNum++;

    let request = new XMLHttpRequest(); 
    request.open('GET', 'https://randomuser.me/api/');  
    request.addEventListener('load', function(){


        let response = JSON.parse(request.responseText);

        let newPass = new PassModel({
        passNum : passNum,
        name : response.results[0].name.first,
        occupation: getRandomOccupation(jobArray),
        status: "Waiting",
    });
    
    list.add(newPass);


    });                 
    request.send();

}

    // Setup Router
    let AppRouter = require('./router');

    let router = new AppRouter();
    router.views = {
            start: ShowStart,
            game: ShowTaxi,
            end: ShowEnd,
    };

    ShowStart.router = router;
    ShowTaxi.router = router;
    ShowEnd.router = router;

    router.history.start({
        pushState: false,
    });     

    taxi.on('change:gas', function(){
        if (taxi.x === taxi.passX && taxi.y === taxi.passY && taxi.inUse === false) {
            list.models[passNum].status = "Picked Up";
            
        }
        if (taxi.x === taxi.destX && taxi.y === taxi.destY && taxi.inUse === true) {
            list.models[passNum].status = "Dropped Off";
            addNewPassenger();
        }
    });


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

function getRandomOccupation (array){
    let rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

let jobArray = ["Coder", "Banker", "Florist", "Artist", "Designer", "Plumber", "Cop", "Teacher", "Baker", "Mechanic", "Lawyer"];




