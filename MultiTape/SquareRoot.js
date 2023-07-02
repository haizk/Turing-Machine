function squareRoot() {
    switch (state) {
        case 1:
            if (tape1[head1] === '0' && tape2[head2] === 'B') action('B', '0', 'R', 'L', 2);
            else if (tape1[head1] === '0' && tape2[head2] === '0') action('B', 'X', 'R', 'S', 3);
            else if (tape1[head1] === '1' && tape2[head2] === '0') action('1', '0', 'R', 'L', 4);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'R', 'L', 4);
            break;
        case 2:
            if (tape1[head1] === '0' && tape2[head2] === 'X') action('0', '0', 'S', 'L', 2);
            else if (tape1[head1] === '0' && tape2[head2] === 'B') action('0', 'B', 'S', 'R', 1);
            else if (tape1[head1] === '1' && tape2[head2] === 'X') action('1', '0', 'R', 'L', 4);
            else if (tape1[head1] === '1' && tape2[head2] === 'B') action('1', 'B', 'R', 'S', 4);
            break;
        case 3:
            if (tape1[head1] === '0' && tape2[head2] === 'X') action('B', 'X', 'R', 'R', 1);
            else if (tape1[head1] === '1' && tape2[head2] === 'X') action('1', '0', 'R', 'L', 4);
            break;
        case 4:
            if (tape1[head1] === 'B' && tape2[head2] === 'X') action('B', '0', 'S', 'L', 4);
            else if (tape1[head1] === 'B' && tape2[head2] === 'B') action('B', 'B', 'S', 'R', 5);
            break;
        case 5:
            if (tape1[head1] === 'B' && tape2[head2] === "0") action('B', '0', 'S', 'R', 5);
            else if (tape1[head1] === 'B' && tape2[head2] === 'B') action('B', '1', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}