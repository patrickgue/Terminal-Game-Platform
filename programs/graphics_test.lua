
graphics_mode()

mvputc(0,0,"#", COLOR_WHITE, COLOR_WHITE)
mvputc(0,1,"#", COLOR_BLUE, COLOR_BLUE)
mvputc(0,2,"#", COLOR_RED, COLOR_RED)

for i = 4,14,1
do
    print(i)
    mvputc(i,i,"X", COLOR_RED, COLOR_BLACK)
end

buffer_flush()
