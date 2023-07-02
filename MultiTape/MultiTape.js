//START VARIABEL GLOBAL//

//list regex
var regex = [];
regex["Addition"] = new RegExp(/^(\s*[+-][\s0]*[+-][\s0]*)$/); //[+-]0*[+-]0*
regex["Subtraction"] = new RegExp(/^(\s*[+-][\s0]*[+-][\s0]*)$/); //[+-]0*[+-]0*
regex["Multiplication"] = new RegExp(/^\s*[+-]\s*0[\s0]*[+-]\s*0[\s0]*1\s*$/); //[+-]00*[+-]00*1
regex["Division"] = new RegExp(/^\s*[+-]\s*0[\s0]*[+-]\s*0[\s0]*1\s*$/); //[+-]00*[+-]00*1
regex["Factorial"] = new RegExp(/^\s*0[\s0]*1\s*$/); //00*1
regex["Power"] = new RegExp(/^\s*0[\s0]*1\s*0[\s0]*1\s*$/); //00*00*1
regex["Square Root"] = new RegExp(/^\s*0[\s0]*1\s*$/); //00*1
regex["Binary Logarithm"] = new RegExp(/^\s*0[\s0]*1\s*$/); //00*1

//list asep setate
var acceptingState = [];
acceptingState["Addition"] = 4;
acceptingState["Subtraction"] = 4;
acceptingState["Multiplication"] = 10;
acceptingState["Division"] = 10;
acceptingState["Factorial"] = 17;
acceptingState["Power"] = 20;
acceptingState["Square Root"] = 6;
acceptingState["Binary Logarithm"] = 9;

//head index mulai dari 15 biar kirinya ada B
var head1 = 15;
var head2 = 15;
var head3 = 15;

//buat anim
var tempHead1 = head1;
var tempHead2 = head2;
var tempHead3 = head3;

//ambil div id output yang udah disiapin
var output1 = document.getElementById("output1");
var output2 = document.getElementById("output2");
var output3 = document.getElementById("output3");
var stepCountOutput = document.getElementById("stepCountOutput");
var stateOutput = document.getElementById("stateOutput");
var tapeOutput1 = document.getElementById("tapeOutput1");
var tapeOutput2 = document.getElementById("tapeOutput2");
var tapeOutput3 = document.getElementById("tapeOutput3");
var statusOutput = document.getElementById("statusOutput");

//interval animation
var animationInterval = 1100;

//init tape array
var tape1 = [];
var tape2 = [];
var tape3 = [];

//steps count
var stepCount = 0;

//state
var state = 1;

//obah indikator
var obah = true;

//step anim indikator
var anim = 0;

//run indikator
var mlayu = false;

//END VARIABEL GLOBAL//
//START ALAT//

function init() {
    //head index mulai dari 15 biar kirinya ada B
    head1 = 15;
    head2 = 15;
    head3 = 15;

    //buat anim
    tempHead1 = head1;
    tempHead2 = head2;
    tempHead3 = head3;

    //init tape array
    tape1 = [];
    tape2 = [];
    tape3 = [];

    //steps count
    stepCount = 0;

    //state
    state = 1;

    //obah indikator
    obah = true;

    //step anim indikator
    anim = 0;

    //run indikator
    mlayu = false;

    //fast
    animationInterval = 1100;
}

function step() {
    //deteksi anim
    if (anim === 0) {
        //mandek
        if (state === acceptingState[document.getElementById("nav").textContent])
            document.getElementById("input-step").disabled = true;
        else {
            //detek ora obah
            obah = false;

            //lakoni algoritma
            switch (document.getElementById("nav").textContent) {
                case "Addition":
                    addition();
                    break;
                case "Subtraction":
                    subtraction();
                    break;
                case "Multiplication":
                    multiplication();
                    break;
                case "Division":
                    division();
                    break;
                case "Factorial":
                    factorial();
                    break;
                case "Power":
                    power();
                    break;
                case "Square Root":
                    squareRoot();
                    break;
                case "Binary Logarithm":
                    binaryLogarithm();
                    break;
            }

            //mandek ditolak
            if (!obah && !(state === acceptingState[document.getElementById("nav").textContent])) {
                document.getElementById("input-step").disabled = true;
                statusOutput.textContent = "Rejected";
            }
        }
    } else {
        //deteksi animasi ke kiri or tengen
        (tempHead1 > head1 ? animateLeft1() : animateRight1());
        (tempHead2 > head2 ? animateLeft2() : animateRight2());
        (tempHead3 > head3 ? animateLeft3() : animateRight3());
        anim = 0;
    }
}

function action(replaceWith1, replaceWith2, replaceWith3, move1, move2, move3, newState) {
    //mlaku nambah
    stepCount += 1;

    //state ganti
    state = newState;

    //buat anim
    tempHead1 = head1;
    tempHead2 = head2;
    tempHead3 = head3;

    //ganti isi tape, geser kanan kiwo
    tape1[(move1 === 'L' ? head1-- : head1++)] = replaceWith1;
    tape1[(move2 === 'L' ? head2-- : head2++)] = replaceWith2;
    tape1[(move3 === 'L' ? head3-- : head3++)] = replaceWith3;

    //obah ceker
    obah = (state === acceptingState[document.getElementById("nav").textContent] ? false : true);

    //lanjut anim
    anim = 1;
    document.getElementsByClassName("popUp1")[0].textContent = replaceWith1;
    document.getElementsByClassName("popUp2")[0].textContent = replaceWith2;
    document.getElementsByClassName("popUp3")[0].textContent = replaceWith3;
    animatePop();
}

//END ALAT//
//START TAMPILAN ANIMASI//

function display() {
    for (let x = 0, y = tempHead1 - 12; x < 25; x++, y++) {
        //add B to new index nek ora ono isine
        if (typeof tape1[y] == "undefined")
            tape1[y] = 'B'

        //output ke masing-masing span
        output1.children[x].children[0].children[0].textContent = tape1[y];
    }
    for (let x = 0, y = tempHead2 - 12; x < 25; x++, y++) {
        //add B to new index nek ora ono isine
        if (typeof tape2[y] == "undefined")
            tape2[y] = 'B'

        //output ke masing-masing span
        output2.children[x].children[0].children[0].textContent = tape2[y];
    }
    for (let x = 0, y = tempHead3 - 12; x < 25; x++, y++) {
        //add B to new index nek ora ono isine
        if (typeof tape3[y] == "undefined")
            tape3[y] = 'B'

        //output ke masing-masing span
        output3.children[x].children[0].children[0].textContent = tape3[y];
    }

    //display isi tape ke status bar
    tapeOutput1.textContent = "";
    for (let x = 0; x < tape1.length; x++) {
        if (tape1[x] != 'B')
            tapeOutput1.textContent += " " + tape1[x] + " ";
    }
    for (let x = 0; x < tape2.length; x++) {
        if (tape2[x] != 'B')
            tapeOutput2.textContent += " " + tape2[x] + " ";
    }
    for (let x = 0; x < tape3.length; x++) {
        if (tape3[x] != 'B')
            tapeOutput3.textContent += " " + tape3[x] + " ";
    }

    //tampilin ke status bar nek wes kelar animasi kanan kiwo
    if (anim === 0) {
        //ganti status asep or tidak
        if (state === acceptingState[document.getElementById("nav").textContent] || !obah)
            statusOutput.textContent = (state === acceptingState[document.getElementById("nav").textContent] ? "Accepted" : "Rejected");
        stepCountOutput.textContent = stepCount;
        stateOutput.textContent = "q" + state;
    }
}

function animatePop() {
    //matiin tombol reset dan step
    document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = true;

    //animasi
    document.getElementsByClassName("point")[0].classList.toggle("animatePop");
    document.getElementsByClassName("popUp")[0].classList.toggle("animatePop");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        document.getElementsByClassName("point")[0].classList.toggle("animatePop");
        document.getElementsByClassName("popUp")[0].classList.toggle("animatePop");
        display();

        //tombol reset dan step murup meneh
       document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = false;
    }, animationInterval);
}

function animateLeft() {
    //matiin tombol reset dan step
    document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = true;

    //animasi
    for (let x = 0; x < document.getElementsByClassName("before").length; x++)
        document.getElementsByClassName("before")[x].classList.toggle("animateLeft");
    for (let x = 0; x < document.getElementsByClassName("after").length; x++)
        document.getElementsByClassName("after")[x].classList.toggle("animateLeft");
    document.getElementsByClassName("beforePoint")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("beforeEdge")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("beforeFade")[0].textContent = tape[tempHead - 13]; //trick tengen kiwo
    document.getElementsByClassName("beforeFade")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("afterPoint")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("afterEdge")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("point")[0].classList.toggle("animateLeft");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        for (let x = 0; x < document.getElementsByClassName("before").length; x++)
            document.getElementsByClassName("before")[x].classList.toggle("animateLeft");
        for (let x = 0; x < document.getElementsByClassName("after").length; x++)
            document.getElementsByClassName("after")[x].classList.toggle("animateLeft");
        document.getElementsByClassName("beforePoint")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("beforeEdge")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("beforeFade")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("afterPoint")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("afterEdge")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("point")[0].classList.toggle("animateLeft");
        tempHead = head; //back to realiti
        display();

        //tombol step murop porak mboh, nek reset murop
        document.getElementById("input-step").disabled = (!obah ? true : false);
        document.getElementById("input-reset").disabled = false;
    }, animationInterval);
}

function animateRight() {
    //matiin tombol step
    document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = true;

    //animasi
    for (let x = 0; x < document.getElementsByClassName("before").length; x++)
        document.getElementsByClassName("before")[x].classList.toggle("animateRight");
    for (let x = 0; x < document.getElementsByClassName("after").length; x++)
        document.getElementsByClassName("after")[x].classList.toggle("animateRight");
    document.getElementsByClassName("beforePoint")[0].classList.toggle("animateRight");
    document.getElementsByClassName("beforeEdge")[0].classList.toggle("animateRight");
    document.getElementsByClassName("afterPoint")[0].classList.toggle("animateRight");
    document.getElementsByClassName("afterEdge")[0].classList.toggle("animateRight");
    if (typeof tape[tempHead + 13] == "undefined") tape[tempHead + 13] = 'B'; //jogoni undefined
    document.getElementsByClassName("afterFade")[0].textContent = tape[tempHead + 13]; //trick tengen kiri
    document.getElementsByClassName("afterFade")[0].classList.toggle("animateRight");
    document.getElementsByClassName("point")[0].classList.toggle("animateRight");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        for (let x = 0; x < document.getElementsByClassName("before").length; x++)
            document.getElementsByClassName("before")[x].classList.toggle("animateRight");
        for (let x = 0; x < document.getElementsByClassName("after").length; x++)
            document.getElementsByClassName("after")[x].classList.toggle("animateRight");
        document.getElementsByClassName("beforePoint")[0].classList.toggle("animateRight");
        document.getElementsByClassName("beforeEdge")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterPoint")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterEdge")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterFade")[0].classList.toggle("animateRight");
        document.getElementsByClassName("point")[0].classList.toggle("animateRight");
        tempHead = head; //back to realiti club
        display();

        //tombol step murop porak mboh, nek reset murop
        document.getElementById("input-step").disabled = (!obah ? true : false);
        document.getElementById("input-reset").disabled = false;
    }, animationInterval);
}

//END TAMPILAN ANIMASI//
//START TOMBOL//

function simulate() {
    //detek regex
    if (!(regex[document.getElementById("nav").textContent].test(document.getElementById("input-string").value))) {
        alert("Format string tidak sesuai!\nFormat: " + document.getElementById("input-string").getAttribute("placeholder"));
        return;
    }

    //enable-disable button
    document.getElementById("input-string").disabled = true;
    document.getElementById("input-sim").disabled = true;
    document.getElementById("input-step").disabled = false;
    document.getElementById("input-reset").disabled = false;
    document.getElementById("input-run").disabled = false;
    document.getElementById("input-fast").disabled = false;

    //init
    init();

    //taruh input ke tape
    for (let x = 0;; x++) {
        //sebelum head B kabeh
        if (x < head)
            tape[x] = 'B';
        else {
            //dari input
            for (let y = 0; y < document.getElementById("input-string").value.length; y++, x++) {
                //kalo space diskip gamashok tape
                if (((document.getElementById("input-string").value)[y] != ' '))
                    tape[x] = (document.getElementById("input-string").value)[y];
                else
                    x--;
            }

            //jogoni setelah input kei B
            for (let y = 0; y < head; y++, x++)
                tape[x] = 'B';
            break;
        }
    }

    //mendelik
    display();
}

function reset() {
    //enable-disable button
    document.getElementById("input-fast").disabled = true;
    document.getElementById("input-run").disabled = true;
    document.getElementById("input-reset").disabled = true;
    document.getElementById("input-step").disabled = true;
    document.getElementById("input-sim").disabled = false;
    document.getElementById("input-string").disabled = false;

    //reset status
    stepCountOutput.textContent = "";
    stateOutput.textContent = "";
    tapeOutput.textContent = "";
    statusOutput.textContent = "";

    //ora mlayu
    mlayu = false;
    document.getElementById("input-run").style.background = "";

    //ora fast
    animationInterval = 1100;
    document.getElementById("input-fast").style.background = "";

    //apus yang sebelumnya
    for (let x = 0; x < output.children.length; x++)
        output.children[x].children[0].children[0].textContent = "";
}

function run() {
    //pokoe mlayu
    mlayu = !mlayu;
    document.getElementById("input-run").style.background = (mlayu ? "green" : "");
}

function fast() {
    //ai em spiid
    animationInterval = (animationInterval === 1100 ? 50 : 1100);
    document.getElementById("input-fast").style.background = (animationInterval === 1100 ? "" : "green");
}

//END TOMBOL//
//START TAMBAHAN//

//Enter bikin submit
document.getElementById("input-string").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("input-sim").click();
    }
});

//mlayu detektor
setInterval(() => {
    if (mlayu && !(document.getElementById("input-step").disabled)) step();
}, 50);

//END TAMBAHAN//
//FUNGSI UTAMA ALGORITMA//

function addition() {
    switch (state) {
        case 1:
            if (tape[head] === '+') action('+', 'R', 2);
            else if (tape[head] === '-') action('-', 'R', 3);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 2);
            else if (tape[head] === '+') action('+', 'L', 4);
            else if (tape[head] === '-') action('-', 'L', 9);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '-') action('-', 'L', 4);
            else if (tape[head] === '+') action('+', 'L', 9);
            break;
        case 4:
            if (tape[head] === '0') action('0', 'L', 4);
            else if (tape[head] === '+') action('B', 'R', 5);
            else if (tape[head] === '-') action('B', 'R', 5);
            break;
        case 5:
            if (tape[head] === '+') action('+', 'R', 8);
            else if (tape[head] === '-') action('-', 'R', 8);
            else if (tape[head] === '0') action('B', 'R', 6);
            break;
        case 6:
            if (tape[head] === '0') action('0', 'R', 6);
            else if (tape[head] === '+') action('+', 'R', 6);
            else if (tape[head] === '-') action('-', 'R', 6);
            else if (tape[head] === 'B') action('0', 'L', 7);
            break;
        case 7:
            if (tape[head] === '0') action('0', 'L', 7);
            else if (tape[head] === '+') action('+', 'L', 7);
            else if (tape[head] === '-') action('-', 'L', 7);
            else if (tape[head] === 'B') action('B', 'R', 5);
            break;
        case 8:
            if (tape[head] === '0') action('0', 'R', 8);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 9:
            if (tape[head] === 'B') action('B', 'L', 9);
            else if (tape[head] === '0') action('B', 'R', 10);
            else if (tape[head] === '-') action('B', 'R', 17);
            else if (tape[head] === '+') action('B', 'R', 17);
            break;
        case 10:
            if (tape[head] === 'B') action('B', 'R', 10);
            else if (tape[head] === '+') action('+', 'R', 11);
            else if (tape[head] === '-') action('-', 'R', 11);
            break;
        case 11:
            if (tape[head] === '0') action('0', 'R', 11);
            else if (tape[head] === 'B') action('B', 'L', 12);
            break;
        case 12:
            if (tape[head] === '0') action('B', 'L', 13);
            else if (tape[head] === '+') action('B', 'L', 14);
            else if (tape[head] === '-') action('B', 'L', 14);
            break;
        case 13:
            if (tape[head] === '0') action('0', 'L', 13);
            else if (tape[head] === '+') action('+', 'L', 13);
            else if (tape[head] === '-') action('-', 'L', 13);
            else if (tape[head] === 'B') action('B', 'L', 9);
            break;
        case 14:
            if (tape[head] === 'B') action('B', 'L', 14);
            else if (tape[head] === '+') action('+', 'R', 15);
            else if (tape[head] === '-') action('-', 'R', 15);
            else if (tape[head] === '0') action('0', 'R', 15);
            break;
        case 15:
            if (tape[head] === 'B') action('0', 'R', 16);
            break;
        case 16:
            if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 17:
            if (tape[head] === 'B') action('B', 'R', 17);
            else if (tape[head] === '+') action('+', 'R', 18);
            else if (tape[head] === '-') action('-', 'R', 18);
            break;
        case 18:
            if (tape[head] === 'B') action('B', 'L', 19);
            else if (tape[head] === '0') action('0', 'R', 20);
            break;
        case 19:
            if (tape[head] === '-') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            else if (tape[head] === '+') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 20:
            if (tape[head] === '0') action('0', 'R', 20);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function subtraction() {
    switch (state) {
        case 1:
            if (tape[head] === '+') action('+', 'R', 2);
            else if (tape[head] === '-') action('-', 'R', 3);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 2);
            else if (tape[head] === '+') action('+', 'L', 9);
            else if (tape[head] === '-') action('-', 'L', 4);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '-') action('-', 'L', 9);
            else if (tape[head] === '+') action('+', 'L', 4);
            break;
        case 4:
            if (tape[head] === '0') action('0', 'L', 4);
            else if (tape[head] === '+') action('B', 'R', 5);
            else if (tape[head] === '-') action('B', 'R', 5);
            break;
        case 5:
            if (tape[head] === '+') action('-', 'R', 8);
            else if (tape[head] === '-') action('+', 'R', 8);
            else if (tape[head] === '0') action('B', 'R', 6);
            break;
        case 6:
            if (tape[head] === '0') action('0', 'R', 6);
            else if (tape[head] === '+') action('+', 'R', 6);
            else if (tape[head] === '-') action('-', 'R', 6);
            else if (tape[head] === 'B') action('0', 'L', 7);
            break;
        case 7:
            if (tape[head] === '0') action('0', 'L', 7);
            else if (tape[head] === '+') action('+', 'L', 7);
            else if (tape[head] === '-') action('-', 'L', 7);
            else if (tape[head] === 'B') action('B', 'R', 5);
            break;
        case 8:
            if (tape[head] === '0') action('0', 'R', 8);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 9:
            if (tape[head] === 'B') action('B', 'L', 9);
            else if (tape[head] === '0') action('B', 'R', 10);
            else if (tape[head] === '-') action('B', 'R', 17);
            else if (tape[head] === '+') action('B', 'R', 17);
            break;
        case 10:
            if (tape[head] === 'B') action('B', 'R', 10);
            else if (tape[head] === '+') action('-', 'R', 11);
            else if (tape[head] === '-') action('+', 'R', 11);
            break;
        case 11:
            if (tape[head] === '0') action('0', 'R', 11);
            else if (tape[head] === 'B') action('B', 'L', 12);
            break;
        case 12:
            if (tape[head] === '0') action('B', 'L', 13);
            else if (tape[head] === '+') action('B', 'L', 14);
            else if (tape[head] === '-') action('B', 'L', 14);
            break;
        case 13:
            if (tape[head] === '0') action('0', 'L', 13);
            else if (tape[head] === '+') action('+', 'L', 13);
            else if (tape[head] === '-') action('-', 'L', 13);
            else if (tape[head] === 'B') action('B', 'L', 9);
            break;
        case 14:
            if (tape[head] === 'B') action('B', 'L', 14);
            else if (tape[head] === '+') action('+', 'R', 15);
            else if (tape[head] === '-') action('-', 'R', 15);
            else if (tape[head] === '0') action('0', 'R', 15);
            break;
        case 15:
            if (tape[head] === 'B') action('0', 'R', 16);
            break;
        case 16:
            if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 17:
            if (tape[head] === 'B') action('B', 'R', 17);
            else if (tape[head] === '-') action('+', 'R', 18);
            else if (tape[head] === '+') action('-', 'R', 18);
            break;
        case 18:
            if (tape[head] === 'B') action('B', 'L', 19);
            else if (tape[head] === '0') action('0', 'R', 20);
            break;
        case 19:
            if (tape[head] === '-') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            else if (tape[head] === '+') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 20:
            if (tape[head] === '0') action('0', 'R', 20);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function multiplication() {
    switch (state) {
        case 1:
            if (tape[head] === '+') action('B', 'R', 2);
            else if (tape[head] === '-') action('B', 'R', 3);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 2);
            else if (tape[head] === '+') action('1', 'R', 4);
            else if (tape[head] === '-') action('1', 'R', 5);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '+') action('1', 'R', 5);
            else if (tape[head] === '-') action('1', 'R', 4);
            break;
        case 4:
            if (tape[head] === '1') action('1', 'R', 4);
            else if (tape[head] === '0') action('0', 'R', 4);
            else if (tape[head] === 'B') action('+', 'L', 6);
            break;
        case 5:
            if (tape[head] === '1') action('1', 'R', 5);
            else if (tape[head] === '0') action('0', 'R', 5);
            else if (tape[head] === 'B') action('-', 'L', 6);
            break;
        case 6:
            if (tape[head] === '1') action('1', 'L', 6);
            else if (tape[head] === '0') action('0', 'L', 6);
            else if (tape[head] === 'B') action('B', 'R', 7);
            break;
        case 7:
            if (tape[head] === '1') action('B', 'R', 16);
            else if (tape[head] === '0') action('B', 'R', 8);
            break;
        case 8:
            if (tape[head] === '0') action('0', 'R', 8);
            else if (tape[head] === '1') action('1', 'R', 9);
            break;
        case 9:
            if (tape[head] === '0') action('X', 'R', 10);
            else if (tape[head] === '1') action('1', 'L', 14);
            break;
        case 10:
            if (tape[head] === '0') action('0', 'R', 10);
            else if (tape[head] === '1') action('1', 'R', 11);
            break;
        case 11:
            if (tape[head] === '0') action('0', 'R', 11);
            else if (tape[head] === '+') action('+', 'R', 11);
            else if (tape[head] === '-') action('-', 'R', 11);
            else if (tape[head] === 'B') action('0', 'L', 12);
            break;
        case 12:
            if (tape[head] === '0') action('0', 'L', 12);
            else if (tape[head] === '+') action('+', 'L', 12);
            else if (tape[head] === '-') action('-', 'L', 12);
            else if (tape[head] === '1') action('1', 'L', 13);
            break;
        case 13:
            if (tape[head] === '0') action('0', 'L', 13);
            else if (tape[head] === 'X') action('X', 'R', 9);
            break;
        case 14:
            if (tape[head] === 'X') action('0', 'L', 14);
            else if (tape[head] === '1') action('1', 'L', 15);
            break;
        case 15:
            if (tape[head] === '0') action('0', 'L', 15);
            else if (tape[head] === 'B') action('B', 'R', 7);
            break;
        case 16:
            if (tape[head] === '0') action('B', 'R', 16);
            else if (tape[head] === '1') action('B', 'R', 17);
            break;
        case 17:
            if (tape[head] === '0') action('0', 'R', 17);
            else if (tape[head] === '+') action('+', 'R', 17);
            else if (tape[head] === '-') action('-', 'R', 17);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function division() {
    switch (state) {
        case 1:
            if (tape[head] === '+') action('B', 'R', 2);
            else if (tape[head] === '-') action('B', 'R', 3);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 2);
            else if (tape[head] === '+') action('1', 'R', 4);
            else if (tape[head] === '-') action('1', 'R', 5);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '+') action('1', 'R', 5);
            else if (tape[head] === '-') action('1', 'R', 4);
            break;
        case 4:
            if (tape[head] === '1') action('1', 'R', 4);
            else if (tape[head] === '0') action('0', 'R', 4);
            else if (tape[head] === 'B') action('+', 'L', 6);
            break;
        case 5:
            if (tape[head] === '1') action('1', 'R', 5);
            else if (tape[head] === '0') action('0', 'R', 5);
            else if (tape[head] === 'B') action('-', 'L', 6);
            break;
        case 6:
            if (tape[head] === '1') action('1', 'L', 7);
            break;
        case 7:
            if (tape[head] === '0') action('0', 'L', 7);
            else if (tape[head] === '1') action('1', 'R', 8);
            break;
        case 8:
            if (tape[head] === 'X') action('X', 'R', 8);
            else if (tape[head] === '0') action('X', 'L', 9);
            else if (tape[head] === '1') action('1', 'R', 12);
            break;
        case 9:
            if (tape[head] === '0') action('0', 'L', 9);
            else if (tape[head] === '1') action('1', 'L', 9);
            else if (tape[head] === 'X') action('X', 'L', 9);
            else if (tape[head] === 'B') action('B', 'R', 10);
            break;
        case 10:
            if (tape[head] === '0') action('B', 'R', 11);
            else if (tape[head] === '1') action('B', 'R', 15);
            break;
        case 11:
            if (tape[head] === '0') action('0', 'R', 11);
            else if (tape[head] === '1') action('1', 'R', 8);
            break;
        case 12:
            if (tape[head] === '+') action('+', 'R', 12);
            else if (tape[head] === '-') action('-', 'R', 12);
            else if (tape[head] === '0') action('0', 'R', 12);
            else if (tape[head] === 'B') action('0', 'L', 13);
            break;
        case 13:
            if (tape[head] === '+') action('+', 'L', 13);
            else if (tape[head] === '-') action('-', 'L', 13);
            else if (tape[head] === '0') action('0', 'L', 13);
            else if (tape[head] === '1') action('1', 'L', 14);
            break;
        case 14:
            if (tape[head] === 'X') action('0', 'L', 14);
            else if (tape[head] === '1') action('1', 'R', 8);
            break;
        case 15:
            if (tape[head] === 'X') action('B', 'R', 15);
            else if (tape[head] === '0') action('B', 'R', 15);
            else if (tape[head] === '1') action('B', 'R', 16);
            break;
        case 16:
            if (tape[head] === '+') action('+', 'R', 16);
            else if (tape[head] === '-') action('-', 'R', 16);
            else if (tape[head] === '0') action('0', 'R', 16);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function factorial() {
    switch (state) {
        case 1:
            if (tape[head] === '0') action('X', 'R', 2);
            else if (tape[head] === '1') action('1', 'R', 6);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 2);
            else if (tape[head] === '1') action('1', 'R', 3);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === 'B') action('0', 'L', 4);
            break;
        case 4:
            if (tape[head] === '0') action('0', 'L', 4);
            else if (tape[head] === '1') action('1', 'L', 5);
            break;
        case 5:
            if (tape[head] === '0') action('0', 'L', 5);
            else if (tape[head] === 'X') action('X', 'R', 1);
            break;
        case 6:
            if (tape[head] === '0') action('0', 'R', 6);
            else if (tape[head] === 'B') action('B', 'L', 7);
            break;
        case 7:
            if (tape[head] === '0') action('1', 'L', 8);
            break;
        case 8:
            if (tape[head] === '0') action('0', 'L', 9);
            else if (tape[head] === '1') action('1', 'R', 10);
            break;
        case 9:
            if (tape[head] === '0') action('0', 'L', 9);
            else if (tape[head] === '1') action('1', 'R', 1);
            break;
        case 10:
            if (tape[head] === '1') action('B', 'L', 11);
            break;
        case 11:
            if (tape[head] === '1') action('1', 'L', 11);
            else if (tape[head] === 'X') action('0', 'L', 11);
            else if (tape[head] === 'B') action('B', 'R', 12);
            break;
        case 12:
            if (tape[head] === '0') action('B', 'R', 13);
            else if (tape[head] === '1') action('B', 'R', 19);
            break;
        case 13:
            if (tape[head] === '0') action('0', 'R', 13);
            else if (tape[head] === '1') action('1', 'R', 14);
            break;
        case 14:
            if (tape[head] === '0') action('X', 'R', 15);
            else if (tape[head] === '1') action('1', 'L', 17);
            else if (tape[head] === 'B') action('1', 'L', 23);
            break;
        case 15:
            if (tape[head] === '0') action('0', 'R', 15);
            else if (tape[head] === '1') action('1', 'R', 15);
            else if (tape[head] === 'B') action('0', 'L', 16);
            break;
        case 16:
            if (tape[head] === '0') action('0', 'L', 16);
            else if (tape[head] === '1') action('1', 'L', 16);
            else if (tape[head] === 'X') action('X', 'R', 14);
            break;
        case 17:
            if (tape[head] === 'X') action('0', 'L', 17);
            else if (tape[head] === '1') action('1', 'L', 18);
            break;
        case 18:
            if (tape[head] === '0') action('0', 'L', 18);
            else if (tape[head] === 'B') action('B', 'R', 12);
            break;
        case 19:
            if (tape[head] === '0') action('B', 'R', 19);
            else if (tape[head] === '1') action('B', 'R', 20);
            break;
        case 20:
            if (tape[head] === '0') action('0', 'R', 20);
            else if (tape[head] === '1') action('1', 'R', 20);
            else if (tape[head] === 'B') action('1', 'L', 21);
            break;
        case 21:
            if (tape[head] === '0') action('0', 'L', 21);
            else if (tape[head] === '1') action('1', 'L', 21);
            else if (tape[head] === 'B') action('B', 'R', 12);
            break;
        case 23:
            if (tape[head] === '1') action('0', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function power() {
    switch (state) {
        case 1:
            if (tape[head] === '0') action('0', 'R', 2);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '1') action('1', 'L', 10);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '1') action('1', 'R', 4);
            break;
        case 4:
            if (tape[head] === '0') action('X', 'R', 5);
            else if (tape[head] === '1') action('1', 'R', 7);
            break;
        case 5:
            if (tape[head] === '0') action('0', 'R', 5);
            else if (tape[head] === '1') action('1', 'R', 5);
            else if (tape[head] === 'B') action('0', 'L', 6);
            break;
        case 6:
            if (tape[head] === '0') action('0', 'L', 6);
            else if (tape[head] === '1') action('1', 'L', 6);
            else if (tape[head] === 'X') action('X', 'R', 4);
            break;
        case 7:
            if (tape[head] === '0') action('0', 'R', 7);
            else if (tape[head] === '1') action('1', 'R', 7);
            else if (tape[head] === 'B') action('1', 'L', 8);
            break;
        case 8:
            if (tape[head] === '0') action('0', 'L', 8);
            else if (tape[head] === '1') action('1', 'L', 8);
            else if (tape[head] === 'X') action('0', 'L', 8);
            else if (tape[head] === 'B') action('B', 'R', 9);
            break;
        case 9:
            if (tape[head] === '0') action('B', 'R', 1);
            break;
        case 10:
            if (tape[head] === '0') action('B', 'R', 11);
            break;
        case 11:
            if (tape[head] === '1') action('B', 'R', 12);
            break;
        case 12:
            if (tape[head] === '1') action('B', 'R', 19);
            else if (tape[head] === '0') action('B', 'R', 13);
            break;
        case 13:
            if (tape[head] === '0') action('0', 'R', 13);
            else if (tape[head] === '1') action('1', 'R', 14);
            break;
        case 14:
            if (tape[head] === '0') action('X', 'R', 15);
            else if (tape[head] === '1') action('1', 'L', 17);
            else if (tape[head] === 'B') action('1', 'L', 22);
            break;
        case 15:
            if (tape[head] === '0') action('0', 'R', 15);
            else if (tape[head] === '1') action('1', 'R', 15);
            else if (tape[head] === 'B') action('0', 'L', 16);
            break;
        case 16:
            if (tape[head] === '0') action('0', 'L', 16);
            else if (tape[head] === '1') action('1', 'L', 16);
            else if (tape[head] === 'X') action('X', 'R', 14);
            break;
        case 17:
            if (tape[head] === 'X') action('0', 'L', 17);
            else if (tape[head] === '1') action('1', 'L', 18);
            break;
        case 18:
            if (tape[head] === '0') action('0', 'L', 18);
            else if (tape[head] === 'B') action('B', 'R', 12);
            break;
        case 19:
            if (tape[head] === '0') action('B', 'R', 19);
            else if (tape[head] === '1') action('B', 'R', 20);
            break;
        case 20:
            if (tape[head] === '0') action('0', 'R', 20);
            else if (tape[head] === '1') action('1', 'R', 20);
            else if (tape[head] === 'B') action('1', 'L', 21);
            break;
        case 21:
            if (tape[head] === '0') action('0', 'L', 21);
            else if (tape[head] === '1') action('1', 'L', 21);
            else if (tape[head] === 'B') action('B', 'R', 12);
            break;
        case 22:
            if (tape[head] === '1') action('0', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function squareRoot() {
    switch (state) {
        case 1:
            if (tape[head] === '0') action('B', 'R', 2);
            else if (tape[head] === '1') action('B', 'R', 7);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 2);
            else if (tape[head] === '1') action('1', 'R', 3);
            break;
        case 3:
            if (tape[head] === 'X') action('X', 'R', 3);
            else if (tape[head] === '0') action('X', 'L', 4);
            else if (tape[head] === 'B') action('0', 'L', 6);
            break;
        case 4:
            if (tape[head] === 'X') action('X', 'L', 4);
            else if (tape[head] === '0') action('0', 'L', 4);
            else if (tape[head] === '1') action('1', 'L', 4);
            else if (tape[head] === 'B') action('B', 'R', 5);
            break;
        case 5:
            if (tape[head] === '0') action('B', 'R', 1);
            else if (tape[head] === '1') action('B', 'R', 7);
            break;
        case 6:
            if (tape[head] === 'X') action('X', 'L', 6);
            else if (tape[head] === '0') action('0', 'L', 6);
            else if (tape[head] === '1') action('1', 'L', 6);
            else if (tape[head] === 'B') action('B', 'R', 1);
            break;
        case 7:
            if (tape[head] === 'X') action('0', 'R', 7);
            else if (tape[head] === '0') action('0', 'R', 7);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

function binaryLogarithm() {
    switch (state) {
        case 1:
            if (tape[head] === '0') action('X', 'R', 2);
            else if (tape[head] === 'Y') action('Y', 'L', 6);
            break;
        case 2:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === 'Y') action('Y', 'L', 6);
            else if (tape[head] === '1') action('1', 'L', 9);
            break;
        case 3:
            if (tape[head] === '0') action('0', 'R', 3);
            else if (tape[head] === '1') action('1', 'L', 4);
            else if (tape[head] === 'Y') action('Y', 'L', 4);
            break;
        case 4:
            if (tape[head] === '0') action('Y', 'L', 5);
            break;
        case 5:
            if (tape[head] === '0') action('0', 'L', 5);
            else if (tape[head] === 'X') action('X', 'R', 1);
            break;
        case 6:
            if (tape[head] === 'X') action('X', 'L', 6);
            else if (tape[head] === 'B') action('B', 'R', 7);
            break;
        case 7:
            if (tape[head] === 'X') action('B', 'R', 7);
            else if (tape[head] === 'Y') action('0', 'R', 7);
            else if (tape[head] === '0') action('0', 'R', 7);
            else if (tape[head] === '1') action('1', 'R', 7);
            else if (tape[head] === 'B') action('0', 'L', 8);
            break;
        case 8:
            if (tape[head] === '0') action('0', 'L', 8);
            else if (tape[head] === '1') action('1', 'L', 8);
            else if (tape[head] === 'B') action('B', 'R', 1);
            break;
        case 9:
            if (tape[head] === 'X') action('B', 'R', 9);
            else if (tape[head] === '0') action('0', 'R', 9);
            else if (tape[head] === '1') action('B', 'R', 9);
            else if (tape[head] === 'B') action('1', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}

//END FUNGSI UTAMA ALGORITMA