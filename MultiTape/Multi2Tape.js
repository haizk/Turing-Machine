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

//buat anim
var tempHead1 = head1;
var tempHead2 = head2;

//ambil div id output yang udah disiapin
var output1 = document.getElementById("output1");
var output2 = document.getElementById("output2");
var stepCountOutput = document.getElementById("stepCountOutput");
var stateOutput = document.getElementById("stateOutput");
var tapeOutput1 = document.getElementById("tapeOutput1");
var tapeOutput2 = document.getElementById("tapeOutput2");
var statusOutput = document.getElementById("statusOutput");

//interval animation
var animationInterval = 1100;

//init tape array
var tape1 = [];
var tape2 = [];

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

    //buat anim
    tempHead1 = head1;
    tempHead2 = head2;

    //init tape array
    tape1 = [];
    tape2 = [];

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
        //matiin tombol step
        document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = true;

        //deteksi animasi ke kiri or tengen
        (tempHead1 > head1 ? animateLeft1() : animateRight1());
        (tempHead2 > head2 ? animateLeft2() : animateRight2());
        setTimeout(() => {
            display();

            //tombol step murop porak mboh, nek reset murop
            document.getElementById("input-step").disabled = (!obah ? true : false);
            document.getElementById("input-reset").disabled = false;
        }, animationInterval);
        anim = 0;
    }
}

function action(replaceWith1, replaceWith2, move1, move2, newState) {
    //mlaku nambah
    stepCount += 1;

    //state ganti
    state = newState;

    //buat anim
    tempHead1 = head1;
    tempHead2 = head2;

    //ganti isi tape, geser kanan kiwo
    tape1[head1] = replaceWith1;
    tape2[head2] = replaceWith2;
    if (move1 === 'L') head1--;
    else if (move1 === 'R') head1++;
    if (move2 === 'L') head2--;
    else if (move2 === 'R') head2++;

    //obah ceker
    obah = (state === acceptingState[document.getElementById("nav").textContent] ? false : true);

    //lanjut anim
    anim = 1;
    document.getElementsByClassName("popUp1")[0].textContent = replaceWith1;
    document.getElementsByClassName("popUp2")[0].textContent = replaceWith2;
    animatePop();
}

//END ALAT//
//START TAMPILAN ANIMASI//

function display() {
    for (let x = 0, y = tempHead1 - 12; x < 25; x++, y++) {
        //add B to new index nek ora ono isine
        if (typeof tape1[y] == "undefined")
            tape1[y] = 'B';

        //output ke masing-masing span
        output1.children[x].children[0].children[0].textContent = tape1[y];
    }
    for (let x = 0, y = tempHead2 - 12; x < 25; x++, y++) {
        //add B to new index nek ora ono isine
        if (typeof tape2[y] == "undefined")
            tape2[y] = 'B';

        //output ke masing-masing span
        output2.children[x].children[0].children[0].textContent = tape2[y];
    }

    //display isi tape ke status bar
    tapeOutput1.textContent = "";
    for (let x = 0; x < tape1.length; x++) {
        if (tape1[x] != 'B');
        tapeOutput1.textContent += " " + tape1[x] + " ";
    }
    tapeOutput2.textContent = "";
    for (let x = 0; x < tape2.length; x++) {
        if (tape2[x] != 'B');
        tapeOutput2.textContent += " " + tape2[x] + " ";
    }


    //tampilin ke status bar nek wes kelar animasi kanan kiwo
    if (anim === 0) {
        //ganti status asep or tidak
        if (state === acceptingState[document.getElementById("nav").textContent] || !obah) {
            statusOutput.style.background = (state === acceptingState[document.getElementById("nav").textContent] ? "green" : "red");
            tapeOutput2.style.background = (state === acceptingState[document.getElementById("nav").textContent] ? "green" : "red");
            statusOutput.textContent = (state === acceptingState[document.getElementById("nav").textContent] ? "Accepted" : "Rejected");
        }
        stepCountOutput.textContent = stepCount;
        stateOutput.textContent = "q" + state;
    }
}

function animatePop() {
    //matiin tombol reset dan step
    document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = true;

    //animasi
    document.getElementsByClassName("point1")[0].classList.toggle("animatePop");
    document.getElementsByClassName("popUp1")[0].classList.toggle("animatePop");
    document.getElementsByClassName("point2")[0].classList.toggle("animatePop");
    document.getElementsByClassName("popUp2")[0].classList.toggle("animatePop");


    //end animasi display yang sebenarnya
    setTimeout(() => {
        document.getElementsByClassName("point1")[0].classList.toggle("animatePop");
        document.getElementsByClassName("popUp1")[0].classList.toggle("animatePop");
        document.getElementsByClassName("point2")[0].classList.toggle("animatePop");
        document.getElementsByClassName("popUp2")[0].classList.toggle("animatePop");
        display();

        //tombol reset dan step murup meneh
        document.getElementById("input-reset").disabled = document.getElementById("input-step").disabled = false;
    }, animationInterval);
}

function animateLeft1() {
    //detek podo pora
    if (tempHead1 == head1) return;

    //animasi
    for (let x = 0; x < document.getElementsByClassName("before1").length; x++)
        document.getElementsByClassName("before1")[x].classList.toggle("animateLeft");
    for (let x = 0; x < document.getElementsByClassName("after1").length; x++)
        document.getElementsByClassName("after1")[x].classList.toggle("animateLeft");
    document.getElementsByClassName("beforePoint1")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("beforeEdge1")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("beforeFade1")[0].textContent = tape1[tempHead1 - 13]; //trick tengen kiwo
    document.getElementsByClassName("beforeFade1")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("afterPoint1")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("afterEdge1")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("point1")[0].classList.toggle("animateLeft");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        for (let x = 0; x < document.getElementsByClassName("before1").length; x++)
            document.getElementsByClassName("before1")[x].classList.toggle("animateLeft");
        for (let x = 0; x < document.getElementsByClassName("after1").length; x++)
            document.getElementsByClassName("after1")[x].classList.toggle("animateLeft");
        document.getElementsByClassName("beforePoint1")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("beforeEdge1")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("beforeFade1")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("afterPoint1")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("afterEdge1")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("point1")[0].classList.toggle("animateLeft");
        tempHead1 = head1; //back to realiti
    }, animationInterval);
}

function animateLeft2() {
    //detek podo pora
    if (tempHead2 == head2) return;

    //animasi
    for (let x = 0; x < document.getElementsByClassName("before2").length; x++)
        document.getElementsByClassName("before2")[x].classList.toggle("animateLeft");
    for (let x = 0; x < document.getElementsByClassName("after2").length; x++)
        document.getElementsByClassName("after2")[x].classList.toggle("animateLeft");
    document.getElementsByClassName("beforePoint2")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("beforeEdge2")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("beforeFade2")[0].textContent = tape2[tempHead2 - 13]; //trick tengen kiwo
    document.getElementsByClassName("beforeFade2")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("afterPoint2")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("afterEdge2")[0].classList.toggle("animateLeft");
    document.getElementsByClassName("point2")[0].classList.toggle("animateLeft");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        for (let x = 0; x < document.getElementsByClassName("before2").length; x++)
            document.getElementsByClassName("before2")[x].classList.toggle("animateLeft");
        for (let x = 0; x < document.getElementsByClassName("after2").length; x++)
            document.getElementsByClassName("after2")[x].classList.toggle("animateLeft");
        document.getElementsByClassName("beforePoint2")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("beforeEdge2")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("beforeFade2")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("afterPoint2")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("afterEdge2")[0].classList.toggle("animateLeft");
        document.getElementsByClassName("point2")[0].classList.toggle("animateLeft");
        tempHead2 = head2; //back to realiti
    }, animationInterval);
}

function animateRight1() {
    //detek podo pora
    if (tempHead1 == head1) return;

    //animasi
    for (let x = 0; x < document.getElementsByClassName("before1").length; x++)
        document.getElementsByClassName("before1")[x].classList.toggle("animateRight");
    for (let x = 0; x < document.getElementsByClassName("after1").length; x++)
        document.getElementsByClassName("after1")[x].classList.toggle("animateRight");
    document.getElementsByClassName("beforePoint1")[0].classList.toggle("animateRight");
    document.getElementsByClassName("beforeEdge1")[0].classList.toggle("animateRight");
    document.getElementsByClassName("afterPoint1")[0].classList.toggle("animateRight");
    document.getElementsByClassName("afterEdge1")[0].classList.toggle("animateRight");
    if (typeof tape1[tempHead1 + 13] == "undefined") tape1[tempHead1 + 13] = 'B'; //jogoni undefined
    document.getElementsByClassName("afterFade1")[0].textContent = tape1[tempHead1 + 13]; //trick tengen kiri
    document.getElementsByClassName("afterFade1")[0].classList.toggle("animateRight");
    document.getElementsByClassName("point1")[0].classList.toggle("animateRight");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        for (let x = 0; x < document.getElementsByClassName("before1").length; x++)
            document.getElementsByClassName("before1")[x].classList.toggle("animateRight");
        for (let x = 0; x < document.getElementsByClassName("after1").length; x++)
            document.getElementsByClassName("after1")[x].classList.toggle("animateRight");
        document.getElementsByClassName("beforePoint1")[0].classList.toggle("animateRight");
        document.getElementsByClassName("beforeEdge1")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterPoint1")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterEdge1")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterFade1")[0].classList.toggle("animateRight");
        document.getElementsByClassName("point1")[0].classList.toggle("animateRight");
        tempHead1 = head1; //back to realiti club
    }, animationInterval);
}

function animateRight2() {
    //detek podo pora
    if (tempHead2 == head2) return;

    //animasi
    for (let x = 0; x < document.getElementsByClassName("before2").length; x++)
        document.getElementsByClassName("before2")[x].classList.toggle("animateRight");
    for (let x = 0; x < document.getElementsByClassName("after2").length; x++)
        document.getElementsByClassName("after2")[x].classList.toggle("animateRight");
    document.getElementsByClassName("beforePoint2")[0].classList.toggle("animateRight");
    document.getElementsByClassName("beforeEdge2")[0].classList.toggle("animateRight");
    document.getElementsByClassName("afterPoint2")[0].classList.toggle("animateRight");
    document.getElementsByClassName("afterEdge2")[0].classList.toggle("animateRight");
    if (typeof tape2[tempHead2 + 13] == "undefined") tape2[tempHead2 + 13] = 'B'; //jogoni undefined
    document.getElementsByClassName("afterFade2")[0].textContent = tape2[tempHead2 + 13]; //trick tengen kiri
    document.getElementsByClassName("afterFade2")[0].classList.toggle("animateRight");
    document.getElementsByClassName("point2")[0].classList.toggle("animateRight");

    //end animasi display yang sebenarnya
    setTimeout(() => {
        for (let x = 0; x < document.getElementsByClassName("before2").length; x++)
            document.getElementsByClassName("before2")[x].classList.toggle("animateRight");
        for (let x = 0; x < document.getElementsByClassName("after2").length; x++)
            document.getElementsByClassName("after2")[x].classList.toggle("animateRight");
        document.getElementsByClassName("beforePoint2")[0].classList.toggle("animateRight");
        document.getElementsByClassName("beforeEdge2")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterPoint2")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterEdge2")[0].classList.toggle("animateRight");
        document.getElementsByClassName("afterFade2")[0].classList.toggle("animateRight");
        document.getElementsByClassName("point2")[0].classList.toggle("animateRight");
        tempHead2 = head2; //back to realiti club
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
        if (x < head1)
            tape1[x] = 'B';
        else {
            //dari input
            for (let y = 0; y < document.getElementById("input-string").value.length; y++, x++) {
                //kalo space diskip gamashok tape
                if (((document.getElementById("input-string").value)[y] != ' '))
                    tape1[x] = (document.getElementById("input-string").value)[y];
                else
                    x--;
            }

            //jogoni setelah input kei B
            for (let y = 0; y < head1; y++, x++)
                tape1[x] = 'B';
            break;
        }
    }
    for (let x = 0; x < 2 * head1; x++)
        tape2[x] = 'B';

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
    tapeOutput1.textContent = "";
    tapeOutput2.textContent = "";
    statusOutput.textContent = "";
    statusOutput.style.background = "";
    tapeOutput2.style.background = "";

    //ora mlayu
    mlayu = false;
    document.getElementById("input-run").style.background = "";

    //ora fast
    animationInterval = 1100;
    document.getElementById("input-fast").style.background = "";

    //apus yang sebelumnya
    for (let x = 0; x < output.children.length; x++)
        output1.children[x].children[0].children[0].textContent = "";
    for (let x = 0; x < output.children.length; x++)
        output2.children[x].children[0].children[0].textContent = "";
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
            if (tape1[head1] === '+' && tape2[head2] === "B" && tape3[head3] === "B") action('+', 'B', 'B', 'R', 'R', 'R', 2);
            else if (tape1[head1] === '+' && tape2[head2] === "B" && tape3[head3] === "B") action('+', 'B', 'B', 'R', 'R', 'R', 2);
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