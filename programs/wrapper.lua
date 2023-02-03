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

