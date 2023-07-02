function division() {
    switch (state) {
        case 1:
            if (tape1[head1] === '+' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', 'B', 'R', 'S', 'S', 2);
            else if (tape1[head1] === '-' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', 'B', 'R', 'S', 'S', 3);
            break;
        case 2:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('0', 'B', 'B', 'R', 'S', 'S', 2);
            else if (tape1[head1] === '+' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '+', 'R', 'S', 'R', 4);
            else if (tape1[head1] === '-' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '-', 'R', 'S', 'R', 4);
            break;
        case 3:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('0', 'B', 'B', 'R', 'S', 'S', 3);
            else if (tape1[head1] === '+' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '-', 'R', 'S', 'R', 4);
            else if (tape1[head1] === '-' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '+', 'R', 'S', 'R', 4);
            break;
        case 4:
            if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('0', '0', 'B', 'R', 'R', 'S', 4);
            else if (tape1[head1] === '1' && tape2[head2] === "B" && tape3[head3] === "B") action('1', 'B', 'B', 'L', 'L', 'S', 6);
            break;
        case 6:
            if (tape1[head1] === '0' && tape2[head2] === "0" && tape3[head3] === "B") action('0', '0', 'B', 'L', 'S', 'S', 6);
            else if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('B', '0', 'B', 'L', 'S', 'S', 7);
            break;
        case 7:
            if (tape1[head1] === '0' && tape2[head2] === "0" && tape3[head3] === "B") action('0', '0', 'B', 'L', 'L', 'S', 7);
            else if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('B', '0', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            else if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('0', 'B', '0', 'S', 'R', 'R', 8);
            else if (tape1[head1] === 'B' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '0', 'S', 'S', 'R', 9);
            break;
        case 8:
            if (tape1[head1] === '0' && tape2[head2] === "0" && tape3[head3] === "B") action('0', '0', 'B', 'L', 'R', 'S', 8);
            else if (tape1[head1] === 'B' && tape2[head2] === "0" && tape3[head3] === "B") action('B', 'B', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            else if (tape1[head1] === '0' && tape2[head2] === "B" && tape3[head3] === "B") action('0', 'B', '0', 'S', 'L', 'R', 7);
            else if (tape1[head1] === 'B' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '0', 'S', 'S', 'R', 9);
            break;
        case 9:
            if (tape1[head1] === 'B' && tape2[head2] === "B" && tape3[head3] === "B") action('B', 'B', '1', 'S', 'S', 'R', acceptingState[document.getElementById("nav").textContent]);
            break;
    }
}