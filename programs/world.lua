
color_on(COLOR_BLUE, COLOR_WHITE)
puts("\n(c) 2023 - Terminal Game\n")
color_off()

sleep(500)
puts("262140 bytes free")
sleep(2000)
puts("\n\nBooting UNIX...")

sleep(6000)

puts("\n\n\nLogin: ")
user = gets()
puts("\nPassword: ")
password = gets();

puts("\n\nLast Login Sa 21 Jan 2023 23:44:28 UTC\n\n");

while (true)
do
    puts("$ ")

    a = gets()
    puts("\n")
    if (a == "clear") then
        clear();
    elseif (a == "ls") then
puts([[
total 10

drwxr-xr-x@ 39 root  wheel   1.2K Dec  2 12:37 bin
drwxr-xr-x   2 root  wheel    64B Dec  8  2021 cores
dr-xr-xr-x   4 root  wheel   4.6K Jan 13 12:08 dev
drwxr-xr-x@  1 root  wheel    11B Dec  2 12:37 etc
drwxr-xr-x   1 root  wheel    25B Jan 13 12:08 home
drwxr-xr-x   8 root  wheel   256B Dec 25 13:30 opt
drwxr-xr-x   6 root  wheel   192B Jan 13 12:08 private
drwxr-xr-x@ 64 root  wheel   2.0K Dec  2 12:37 sbin
drwxr-xr-x@  1 root  wheel    11B Dec  2 12:37 tmp
drwxr-xr-x@ 11 root  wheel   352B Dec  2 12:37 usr
drwxr-xr-x@  1 root  wheel    11B Dec  2 12:37 var
-rwxr--r--  34 root  wheel    30K Sep 12  2019 vmunix
]]);
    else
        puts(a)
        puts("\n")
    end
end