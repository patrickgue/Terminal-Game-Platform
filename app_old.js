initterm(80,25);

const test = `x 
            ^I^C4 Ships ^C0^I
  
      A   B   C   D   E   F   G  
    +---+---+---+---+---+---+---+
  0 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  1 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  2 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  3 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  4 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  5 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  6 |   |   |   |   |   |   |   |
    |---+---+---+---+---+---+---|
  7 |   |   |   |   |   |   |   |
    +---+---+---+---+---+---+---+`


let index = 0;

/*let interval = setInterval(() => {
  let c = test.charAt(index);

  if (c === '^' && ['I', 'C'].includes(test.charAt(index+1))) {
    index++;
    if (test.charAt(index) === 'C') {
      index++;
      switch (test.charAt(index)) {
        case '0':
          color_off(); break;
        case '1': 
          color_on(COLOR_BLACK); break;
        case '2': 
          color_on(COLOR_RED); break;
        case '3': 
          color_on(COLOR_GREEN); break;
        case '4': 
          color_on(COLOR_BLUE); break;
      }
      
    } else if (test.charAt(index) == 'I') {
      inverse_toggle(); 
    }
  } else {
    putc(c);
  }
  
  if (index > test.length)
    clearInterval(interval);
  index++;
}, 10);*/

for (let i = 0; i < 80; i++) {
  puts("A");
}

for (let i = 0; i < 24; i++) {
    for (let j = 0; j < i; j++) {
        puts("  ");
    }
    puts("*");
    if (i != 23)
    puts("\n");
}


/*
puts(test + '\n');
for(i = 0; i < 2; i++) {

    color_on(COLOR_RED);
    puts(" Red \n")
    color_off();
    color_on(COLOR_BLUE);
    puts(" Blue \n");
    color_off();
    color_on(COLOR_GREEN);
    puts(" Green \n");
    color_off();
    inverse_on();
}

puts("Hello\n")

inverse_off();



for (i = 0; i < 80; i++) {
    putc('#');
}

for (j = 0; j < 23; j++) {
    putc('#')
    for (i = 0; i < 78; i++) {
        putc(' ');
    }
    putc('#');
}

for (i = 0; i < 80; i++) {
    putc('#');
}

*/


