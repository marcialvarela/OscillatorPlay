/* URL DELEAY Y Cosillas para oscilator:
 * http://www.html5rocks.com/en/tutorials/casestudies/jamwithchrome-audio/?redirect_from_locale=es */


var context = null;
var iOn = false;
var osc = null;
var note = null;
var octave = 0;
var wave = 'sine';

window.addEventListener('load', init, false);

// *************************************************************
//Funcion de inicio
// *************************************************************
function init() {
    try {
        // creamos el contexto de audio
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
        //alert('Web Audio API es sorportado');
    }
    catch(e) {
        alert('Web Audio API no es soportado por el explorador.');
    }
}

function onOff() {
    try {
        if(iOn){
            iOn = false;
            document.getElementById('1btnOnOff').style.backgroundColor="gray";
        }
        else{
            iOn = true;
            document.getElementById('1btnOnOff').style.backgroundColor="orangered";
        }
    }
    catch (ex){alert('ERROR onOff. Exception: '+ex.message);}
}

// *************************************************************
//funciones de control de sonido
// *************************************************************
function playFreq(nFreq) {
    try {
        if (iOn){
            // Crear Oscilador
            osc = context.createOscillator();
            //osc.frequency.value = nFreq;
            var mynote = returnNote(nFreq, octave);
            osc.type = wave;
            osc.frequency.value = mynote;
            osc.connect(context.destination);

            //Inicia la reproduccion de la frecuencia
            osc.start(0);
        }
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function stopFreq(){
    try {
        if (iOn){
            // Detiene la reproduccion de la frecuencia
            osc.stop(0);
        }
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function returnNote(nFreq, octave){
    if (octave == 0){
        osc.frequency.value = nFreq; //osc.frequency.value;
        note  = nFreq; //osc.frequency.value;
    }
    else if (octave > 0){
        //osc.frequency.value = nFreq*(octave*2);
        note = nFreq*(octave*2);
    }
    else if (octave < 0){
        var nOct = octave;
        nOct = (nOct * -1);
        note = nFreq/(2*nOct);
    }

    return(note);
}

<!-- -------------------------------------------------------------------------------------- -->
<!--                    P A R A M E T R O S    P O R    D E F E C T O                       -->
<!-- -------------------------------------------------------------------------------------- -->
function paramDefault()
{
    octave = 0;
    wave = 'sine';
    squareActiveButton('1sino');
    octaveActiveButton('');

}




function reproducirFrecuencia() {
    try {
        // Crear Oscilador
        osc = context.createOscillator();
        osc.frequency.value = 261.63;   //Noda DO standard
        //osc.frequency.value = 440.00;   //Noda LA
        osc.connect(context.destination);

        //Inicia la reproduccion de la frecuencia
        osc.start(0);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

/*************************** STOP ***************************/
function detenerFrecuencia(){
    try {
        // Detiene la reproduccion de la frecuencia
        osc.stop(0);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}



<!-- -------------------------------------------------------------------------------------- -->
<!--                    A S I G N A C I O N    D E    O C T A V A S                         -->
<!-- -------------------------------------------------------------------------------------- -->
function octaveActiveButton(pButtonName){
    document.getElementById('1btnOctUp').style.backgroundColor="#a6b779";
    document.getElementById('1btnOctDown').style.backgroundColor="#a6b779";
    if(octave==0){
        document.getElementById('1btnOctUp').style.backgroundColor="#a6b779";
        document.getElementById('1btnOctDown').style.backgroundColor="#a6b779";
    }
    else{
        document.getElementById(pButtonName).style.backgroundColor="#FFFF00";
    }
    //octNumber_lbl.innerHTML = octave;
    if (octave >= 0){
        Volume.innerHTML = '&nbsp;' + octave + '&nbsp';
    }else{
        Volume.innerHTML = octave + '&nbsp';
    }
}

function octUP(pButtonName){
    try {
        //subimos una octava
        if(octave < 4)
            octave = octave +1;
        else
            octave=4;
        octaveActiveButton(pButtonName);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function octDOWN(pButtonName){
    try {
        //bajamos una octava
        if(octave > -3)
            octave = octave -1;
        else
            octave = -3;
        octaveActiveButton(pButtonName);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

/*************************** SUBIR OCTAVA ***************************/
function subirOctava(){
    try {
        //subimos una octava
        osc.frequency.value = osc.frequency.value*2;

    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

/*************************** BAJAR OCTAVA ***************************/
function bajarOctava(){
    try {
        //Bajamos una octava
        osc.frequency.value = osc.frequency.value/2;
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}



<!-- -------------------------------------------------------------------------------------- -->
<!--                    A S I G N A C I O N    T I P O S    D E    O N D A                  -->
<!-- -------------------------------------------------------------------------------------- -->
// Diferentes ondas de oscilador, acepta 5 valores:
//      sine, square, triangle sawtooth (onda con diente de sierra) y custom (onda personalizada).
function squareActiveButton(pButtonName){
    document.getElementById('1sino').style.backgroundColor="#a6b779";
    document.getElementById('1square').style.backgroundColor="#a6b779";
    document.getElementById('1triangle').style.backgroundColor="#a6b779";
    document.getElementById('1sawtooth').style.backgroundColor="#a6b779";
    document.getElementById(pButtonName).style.backgroundColor="#FFEE00";
}

function triangle(pButtonName){
    try {
        //Onda triangular
        //osc.type = 'triangle';
        wave = 'triangle';
        squareActiveButton(pButtonName);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function square(pButtonName){
    try {
        //Onda cuadrada
        //osc.type = 'square';
        wave = 'square';
        squareActiveButton(pButtonName);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function sine(pButtonName){
    try {
        //Onda sinusoidal
        //osc.type = 'sine';
        wave = 'sine';
        squareActiveButton(pButtonName);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function sawtooth(pButtonName){
    try {
        //Onda de sierra
        //osc.type = 'sawtooth';
        wave ='sawtooth';
        squareActiveButton(pButtonName);
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}

function custom(){
    try {
        //Onda personalizada
        osc.type = 'custom';
    }
    catch (ex){alert('ERROR. Exception: '+ex.message);}
}




/*------------------------------------------------------------------------------------ */
/* ------------------------------- S L A P   B A C K   ------------------------------- */
/*------------------------------------------------------------------------------------ */
// Example: http://www.html5rocks.com/en/tutorials/casestudies/jamwithchrome-audio/?redirect_from_locale=es

var SlapbackDelayNode = function(){
    //create the nodes we’ll use
    this.input = audioContext.createGain();
    var output = audioContext.createGain(),
        delay = audioContext.createDelay(),
        feedback = audioContext.createGain(),
        wetLevel = audioContext.createGain();

    //set some decent values
    delay.delayTime.value = 0.15; //150 ms delay
    feedback.gain.value = 0.25;
    wetLevel.gain.value = 0.25;

    //set up the routing
    this.input.connect(delay);
    this.input.connect(output);
    delay.connect(feedback);
    delay.connect(wetLevel);
    feedback.connect(delay);
    wetLevel.connect(output);

    this.connect = function(target){
        output.connect(target);
    };
};
