function factorial() {
    switch (state) {
        case 1:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'R', 'S', 2);
            break;
        case 2:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 3);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'R', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 3:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('X', '0', 'R', 'R', 4);
            break;
        case 4:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('Y', '0', 'R', 'R', 4);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'S', 'L', 5);
            break;
        case 5:
            if (tape1[head1] === '1' && tape2[head2] === "0") action('1', '1', 'L', 'R', 6);
            break;
        case 6:
            if (tape1[head1] === 'X' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 6);
            else if (tape1[head1] === 'Y' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 7);
            else if (tape1[head1] === 'B' && tape2[head2] === 'B') action('B', 'B', 'R', 'L', 8);
            break;
        case 7:
            if (tape1[head1] === 'Y' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 7);
            else if (tape1[head1] === 'X' && tape2[head2] === 'B') action('X', 'B', 'R', 'S', 3);
            break;
        case 8:
            if (tape1[head1] === '0' && tape2[head2] === '0') action('0', '0', 'S', 'L', 8);
            else if (tape1[head1] === '0' && tape2[head2] === '1') action('0', '1', 'S', 'L', 8);
            else if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'S', 'R', 9);
            break;
        case 9:
            if (tape1[head1] === '0' && tape2[head2] === '1') action('B', 'B', 'R', 'R', 14);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'L', 'S', 13);
            else if (tape1[head1] === '0' && tape2[head2] === 'B') action('X', 'B', 'R', 'S', 10);
            else if (tape1[head1] === '0' && tape2[head2] === '0') action('X', 'B', 'R', 'S', 10);
            break;
        case 10:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'R', 'S', 10);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'R', 'S', 11);
            break;
        case 11:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'R', 'S', 11);
            else if (tape1[head1] === 'B' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 12);
            break;
        case 12:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 12);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'L', 'S', 12);
            else if (tape1[head1] === 'X' && tape2[head2] === 'B') action('X', 'B', 'R', 'S', 9);
            break;
        case 13:
            if (tape1[head1] === 'X' && tape2[head2] === 'B') action('0', 'B', 'L', 'S', 13);
            else if (tape1[head1] === 'B' && tape2[head2] === 'B') action('B', 'B', 'R', 'R', 9);
            break;
        case 14:
            if (tape1[head1] === '0' && tape2[head2] === '0') action('B', '0', 'R', 'S', 14);
            else if (tape1[head1] === '0' && tape2[head2] === '1') action('B', '1', 'R', 'S', 14);
            else if (tape1[head1] === '1' && tape2[head2] === '0') action('B', '0', 'R', 'S', 15);
            else if (tape1[head1] === '1' && tape2[head2] === '1') action('B', 'B', 'R', 'S', 15);
            break;
        case 15:
            if (tape1[head1] === '0' && tape2[head2] === '0') action('0', '0', 'R', 'S', 15);
            else if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'R', 'S', 15);
            else if (tape1[head1] === 'B' && tape2[head2] === '0') action('1', '0', 'L', 'S', 16);
            else if (tape1[head1] === 'B' && tape2[head2] === 'B') action('1', 'B', 'L', 'S', 16);
            break;
        case 16:
            if (tape1[head1] === '0' && tape2[head2] === '0') action('0', '0', 'L', 'S', 16);
            else if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'R', 'S', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}
