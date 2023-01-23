
graphics_mode()

mvputc(1,1,"X", COLOR_BLUE, COLOR_WHITE)

for i = 4,14,1
do
    print(i)
    mvputc(i,i,"X", COLOR_BLUE, COLOR_WHITE)

end

buffer_flush()