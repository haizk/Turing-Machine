function addition() {
    switch (state) {
        case 1:
            if (tape1[head1] === '+' && tape2[head2] === "B") action('+', '+', 'R', 'R', 2);
            else if (tape1[head1] === '-' && tape2[head2] === "B") action('-', '-', 'R', 'R', 9);
            break;
        case 2:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', '0', 'R', 'R', 2);
            else if (tape1[head1] === '+' && tape2[head2] === "B") action('+', 'B', 'R', 'S', 3);
            else if (tape1[head1] === '-' && tape2[head2] === "B") action('-', 'B', 'L', 'S', 5);
            break;
        case 3:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', '0', 'R', 'R', 3);
            else if (tape1[head1] === 'B' && tape2[head2] === "B") action('B', '1', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 5:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', 'B', 'L', 'S', 5);
            else if (tape1[head1] === '+' && tape2[head2] === "B") action('B', 'B', 'R', 'S', 6);
            break;
        case 6:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('B', 'B', 'R', 'S', 6);
            else if (tape1[head1] === '-' && tape2[head2] === "B") action('-', 'B', 'R', 'S', 7);
            break;
        case 7:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', 'B', 'R', 'S', 7);
            else if (tape1[head1] === 'B' && tape2[head2] === "B") action('B', 'B', 'L', 'L', 8);
            break;
        case 8:
            if (tape1[head1] === '0' && tape2[head2] === "0") action('B', 'B', 'L', 'L', 8);
            else if (tape1[head1] === '-' && tape2[head2] === "0") action('B', '0', 'S', 'R', 15);
            else if (tape1[head1] === '0' && tape2[head2] === "+") action('0', 'B', 'R', 'S', 16);
            else if (tape1[head1] === '-' && tape2[head2] === "+") action('B', '1', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 9:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', '0', 'R', 'R', 9);
            else if (tape1[head1] === '-' && tape2[head2] === "B") action('-', 'B', 'R', 'S',10);
            else if (tape1[head1] === '+' && tape2[head2] === "B") action('+', 'B', 'L', 'S', 11);
            break;
        case 10:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', '0', 'R', 'R', 10);
            else if (tape1[head1] === 'B' && tape2[head2] === "B") action('B', '1', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 12:
            if (tape1[head1] === '0' && tape2[head2] === "B") action('B', 'B', 'R', 'S', 12);
            else if (tape1[head1] === '+' && tape2[head2] === "B") action('+', 'B', 'R', 'S', 13);
            break; 
        case 13: 
            if (tape1[head1] === '0' && tape2[head2] === "B") action('0', 'B', 'R', 'S', 13);
            else if (tape1[head1] === 'B' && tape2[head2] === "B") action('B', 'B', 'L', 'L',14);
            break;
        case 14:
            if (tape1[head1] === '0' && tape2[head2] === "0") action('B', 'B', 'L', 'L', 14);
            else if (tape1[head1] === '+' && tape2[head2] === "0") action('B', '0', 'S', 'R', 17);
            else if (tape1[head1] === '0' && tape2[head2] === "-") action('0', 'B', 'R', 'S', 18);
            else if (tape1[head1] === '+' && tape2[head2] === "-") action('B', '1', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 15:
            if (tape1[head1] === 'B' && tape2[head2] === "B") action('B', '1', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 16:
            if (tape1[head1] === 'B' && tape2[head2] === "B") action('1', 'B', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 17:
            if (tape1[head1] === 'B' && tape2[head2] === "B") action('B', '1', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 18:
            if (tape1[head1] === 'B' && tape2[head2] === "B") action('1', 'B', 'S', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
    
    }
}
