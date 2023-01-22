function print_boards()
    letters = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J"}
    spacing = "     "
    
    puts("      OWN                         ENEMY\n\n   ")

    for i = 1,10,1
    do
        puts(letters[i])
        puts(" ")
    end

    puts("   ")
    puts(spacing)

    for i = 1,10,1
    do
        puts(letters[i])
        puts(" ")
    end


    puts("\n   ")

    for i = 1,10,1
    do
        puts("_ ")
    end

    puts(spacing)
    puts("   ")
    for i = 1,10,1
    do
        puts("_ ")
    end

    puts("\n")

    for i = 1,10,1
    do
        puts(tostring(i-1))
        puts(" |")
        for j = 1,10,1
        do
            p = own[i][j]
            if (p == 0) then
                puts("_|")
            else
                puts("#|")
            end
        end

        puts(spacing)

        puts(tostring(i-1))
        puts(" |")
        for j = 1,10,1
        do
            p = enemy[i][j]
            if (p == 0) then
                puts("_|")
            elseif (i == 1) then
                puts("#|")
            end
        end
        puts("\n")
    end

    puts("\n")
end


function show_init_screen()
    clear()
    color_on(COLOR_WHITE, COLOR_BLUE)
    puts("\n")
    puts("                         ")
    puts("                         ")
    puts("                         \n")
    puts("                         ")
    puts("   B A T T L E S H I P   ")
    puts("                         \n")
    puts("                         ")
    puts("                         ")
    puts("                         \n")
    color_off();

end





own = {
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,1,0,0,0,0,0,0},
    {0,0,0,1,0,0,0,0,0,0},
    {0,0,0,1,0,0,1,0,0,0},
    {0,0,0,1,0,0,1,0,0,0},
    {0,0,0,0,0,0,1,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,1,1,1,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0}
}


enemy = {
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0}
}


show_init_screen()

puts("\n   ")

print_boards()

gets()











