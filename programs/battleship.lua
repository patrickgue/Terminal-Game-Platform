ships = {
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



color_on(COLOR_WHITE, COLOR_BLUE);

puts("\n")
puts([[
                         
   B A T T L E S H I P   
                         
]])
color_off();

puts("\n   ")
letters = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J"}

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

puts("\n")

for i = 1,10,1
do
    puts(tostring(i-1))
    puts(" |")
    for j = 1,10,1
    do
        print(i, j);
        if (ships[i][j] == 0) then
            puts("_|")
        else
            puts("#|")
        end
    end
    puts("\n")
end

puts("\n")
