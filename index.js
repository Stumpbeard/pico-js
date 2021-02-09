function _init() {
    guy = {
        x: 0,
        y: 60,
        spd: 2
    }
}

function _update() {
    guy.x += guy.spd
    if (guy.x == 120 || guy.x == 0) {
        guy.spd *= -1
    }
}

function _draw() {
    cls()
    camera(8,-16)
    if (guy.x <= 60) {
        spr(1, guy.x, guy.y)
    } else {
        spr(2, guy.x, guy.y)
    }
    camera()
    if (guy.x <= 60) {
        spr(1, guy.x, guy.y)
    } else {
        spr(2, guy.x, guy.y)
    }
}
