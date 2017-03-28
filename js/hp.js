


var screen = 0;
var lastScreen = 4;


function goToScreen(num){
    document.querySelector('#wrapper').className = 'slide-' + num;
    if(num == 0 || num > 4) return;
    goo.SystemBus.emit('setCameraPosition'+(num-1))
}



// ------------------------- INIT -------------------- //
// ------------------------- INIT -------------------- //
function init(){
    console.log('init');

}


var wrapper = document.querySelector('#wrapper');

wrapper.addEventListener('mousewheel', wheelHandler, false);

wrapper.addEventListener('DOMMouseScroll', wheelHandler, false);



var debounceCalculate = _.debounce(wheelDirection, 50, {leading: true, trailing: false});


function wheelDirection(event) {
    var rolled = 0;

    if ('wheelDelta' in event) {
        rolled = event.wheelDelta;
    }
    else {  // Firefox
        // The measurement units of the detail and wheelDelta properties are different.
        rolled = -40 * event.detail;
    }

    var dir = rolled < 0 && rolled !== 0 ?  'down' : 'up';
    console.log(dir);



    //return;
    if(dir == "up" && screen > 0){
        screen = screen-1;
        console.log("up", screen);

        goToScreen(screen);
    }
    if(dir == "down" && screen < lastScreen){
        screen = screen+1;
        console.log("down",screen);

        goToScreen(screen);
    }

    if(screen > 0 && screen < 4){
        goo.SystemBus.emit('showNumbers')
    }
    else{
        goo.SystemBus.emit('hideNumbers')
    }


    if(screen > 0){
        document.getElementById('hero').classList.add('fold');
    }
    else{
        document.getElementById('hero').classList.remove('fold');
    }

}


function wheelHandler(event) {
    debounceCalculate(event);
    event.preventDefault();
}


