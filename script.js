console.log("Number Speech Recognition App");

const msgEle = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log("Number speak: " + randomNum);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognition and game
recognition.start();


//capture user speak
function onSpeak(e){
    console.log(e);
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMsg(msg);
    checkNumber(msg);
}


//generate random number
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

//display msg user speak
function writeMsg(msg){
    msgEle.innerHTML=`
    <div>You said: <span class="box">${msg}</span></div>
    `
}

function checkNumber(msg){
    const num = +msg;   // here we are converting string to number 
    console.log("number: " + num);
    if(Number.isNaN(num)){
        msgEle.innerHTML += `
        <div>This is not a number</div>`;
        return;
    }

    //range number
    if(num> 100 || num<1){
        msgEle.innerHTML = `<div>Number must be between 1 to 100</div>`;
        return;
    }

    if(num === randomNum){
        document.body.innerHTML = `
        <h2>Congrats! you guess the number.<br><br>
        It was  ${num}</h2>
        <button class="play-again" id="play-again" >Play again</button>`;
    }
    else if(num>randomNum){
    msgEle.innerHTML += `<div> GO LOWER</div`
    }
    else{
        msgEle.innerHTML += `<div>GO HIGHER</div>`
    }
}

// speak result 
recognition.addEventListener('result', onSpeak);

//end SR service
recognition.addEventListener('end', ()=> recognition.start());

document.body.addEventListener('click', function(e ){
    if(e.target.id=='play-again'){
        window.location.reload();
    }
})