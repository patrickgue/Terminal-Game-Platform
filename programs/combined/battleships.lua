function puts(str)
    io.write(str)
end

function gets()
    return io.read()
end

function sleep(millis)
    -- local co = coroutine.running()
    -- js.global:setTimeout(function ()
    --    coroutine.resume(co)
    -- end, millis)

    -- coroutine.yield()
end

function color_on(fg, bg)
    -- js.global:color_on(fg, bg)
end

function color_off()
    
end

function clear()
    
end

function mvputc(x,y,c,f,b)
    -- js.global:mvputc(x,y,c,f,b)
end

function graphics_mode()
    -- js.global:init_graphics_mode()
end

function buffer_flush()
    -- js.global:_render()
end


COLOR_BLACK='#272C2B'
COLOR_WHITE='#EEEEEE';
COLOR_RED='#FF0000';
COLOR_BLUE='#1471AA';
COLOR_GREEN='#06B46B';

TERM_MODE_SERIAL = 0
TERM_MODE_GRAPH = 1

letters = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J"}

local function has_value (tab, val)
    for index, value in ipairs(tab) do
        if value == val then
            return true
        end
    end

    return false
end

function index_of(array, value)
    for i, v in ipairs(array) do
        if v == value then
            return i
        end
    end
    return nil
end


function print_boards(both)
    spacing = "     "
    
    puts("          OWN")
    if both then
        puts("                         ENEMY")
    end
    puts("\n\n   ")

    for i = 1,10,1
    do
        puts(letters[i])
        puts(" ")
    end

    if both then
        puts("   ")
        puts(spacing)

        for i = 1,10,1
        do
            puts(letters[i])
            puts(" ")
        end
    end


    puts("\n   ")

    for i = 1,10,1
    do
        puts("_ ")
    end

    if both then
        puts(spacing)
        puts("   ")
        for i = 1,10,1
        do
            puts("_ ")
        end
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
            elseif (p == 1) then
                puts("#|")
            elseif (p == 2) then
                puts("x|")
            elseif (p == 3) then
                puts("o|")
            end
        end

        if both then
            puts(spacing)
            puts(tostring(i-1))
            puts(" |")
            for j = 1,10,1
            do
                p = enemy[i][j]
                if (p == 0) then
                    puts("_|")
                elseif (p == 1) then
                    puts("#|")
                elseif (p == 2) then
                    puts("x|")
                elseif (p == 3) then
                    puts("o|")
                end
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
    puts("(c) '23 Patrick Guenthard")
    puts("                         \n")
    puts("                         ")
    puts("                         ")
    puts("                         \n")
    color_off();

end

own = {
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

enemy = {
    {0,0,0,0,0,0,0,0,0,0},
    {0,1,1,1,1,1,0,0,0,0},
    {0,0,0,0,0,0,0,0,1,0},
    {1,1,1,0,0,1,0,0,1,0},
    {0,0,0,0,0,1,0,0,1,0},
    {0,0,0,0,0,1,0,0,1,0},
    {0,0,0,0,0,0,0,0,0,0},
    {0,1,0,1,1,1,0,0,0,0},
    {0,1,0,0,0,0,0,0,0,0},
    {0,0,0,0,0,0,0,0,0,0}
}

ships = {
    ["Carrier"] = 5,
    ["Battleship"] = 4,
    ["Cruiser"] = 3,
    ["Submarine"] = 3,
    ["Destroyer"] = 2
}

show_init_screen()

puts("\n\nWelcome to Battleships!\n\nBefore you start you have to position your ships: \n\n")
color_on(COLOR_BLUE, COLOR_WHITE)
puts("  Ship\t\tLength  ")
color_off();
for ship, length in pairs(ships) do
    puts("  " .. ship .. "\t" .. length .. "\n")
end

puts("\n  To place the ship, enter the column, row and direction H(orizontal) or \n  V(ertical) without space. \n  Example: A4H")

puts("\n\nPress Enter to continue...")
gets()
clear()

for ship, length in pairs(ships) do
    puts("\n")
    print_boards(false)
    entry_correct = false

    while not(entry_correct) do
        puts("\n\nPlace the " .. ship .. " (" .. length .. ")\n> ")
        input = gets()
        x_index = 0
        y = 0
        x = string.sub(input, 1, 1)
        y_str = string.sub(input, 2, 2)
        d = string.sub(input, 3, 3)
        
        if not(x == nil or y_str == nil or d == nil) 
        then
            x_index = index_of(letters, x)
            y = tonumber(y_str)

            if has_value(letters, x) and y >= 0 and y <= 9 and (d == "H" or d == "V") 
            then
                entry_correct = true
            end
        end

        if not(entry_correct) 
        then
            puts("\nEntry is invalid. Try again\n");
        else
            if d == "H" then
                for i = 0, length - 1, 1 do
                    own[y + 1][x_index + i] = 1
                end
            else
                for i = 0, length - 1, 1 do
                    print (y, i, x_index)
                    own[y + 1 + i][x_index] = 1
                end
            end
        end
    end

end