function binaryLogarithm() {
    switch (state) {
        case 1:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('B', '1', 'B', 'R', 'R', 'S', 2);
            else if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 2:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('B', '0', 'B', 'R', 'R', 'S', 3);
            else if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 3:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', 'B', 'R', 'S', 'S', 4);
            else if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '0', 'S', 'L', 'R', 5);
            break;
        case 4:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('B', '0', 'B', 'R', 'R', 'S', 3);
            else if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '0', 'S', 'L', 'R', 5);
            break;
        case 5:
            if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('1', 'B', 'B', 'L', 'L', 'S', 6);
            else if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
        case 6:
            if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            else if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('0', 'B', 'B', 'L', 'L', 'S', 7);
            break;
        case 7:
            if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('B', 'B', 'B', 'S', 'L', 'S', 8);
            else if (tape1[head1] === 'B' && tape2[head2] === "1" && tape3[head3] === "B") action('B', 'B', '0', 'R', 'S', 'R', 1);
            break;
        case 8:
            if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('0', 'B', 'B', 'L', 'L', 'S', 7);
            else if (tape1[head1] === 'B' && tape2[head2] === "1" && tape3[head3] === "B") action('B', 'B', '0', 'R', 'S', 'R', 1);
            break;
    }
}