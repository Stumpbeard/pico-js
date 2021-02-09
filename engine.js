const WIDTH = 128
const HEIGHT = 128
const FRAME_CAP = 30
const TILE_SIZE = 8

const canvas = document.getElementById("canvas")
canvas.height = HEIGHT
canvas.width = WIDTH
const ctx = canvas.getContext("2d")

const spriteSheet = document.getElementById("spritesheet")
const SPRITES = []
let previousTick = 0
let frameTotal = 0
const FPS = 1000/FRAME_CAP
let lastFrame = 0

let HIDE_FPS = false

let cameraOffset = {
    x: 0,
    y: 0,
}

const fps = document.getElementById("fps")
fps.hidden = HIDE_FPS

const buttons = {}
const buttonsJustPressed = {}
const buttonHasUpped = {}

function start() {
    if (!spriteSheet.complete) {
        window.requestAnimationFrame(start)
        return
    }
    for (y = 0; y < spriteSheet.height; y += TILE_SIZE) {
        for(x = 0; x < spriteSheet.width; x += TILE_SIZE) {
            SPRITES.push({x:x, y:y})
        }
    }
    
    _init()
    window.requestAnimationFrame(tick)
}

function tick(delta) {
    frameTotal += delta - previousTick
    previousTick = delta
    if (frameTotal < FPS) {
        window.requestAnimationFrame(tick)
        return
    }
    let fram = 1000/(delta-lastFrame)
    lastFrame = delta
    fps.innerHTML = "fps: " + fram
    frameTotal = Math.min(frameTotal - FPS, FPS)
    _update()
    for (const key in buttonsJustPressed) {
        if (Object.hasOwnProperty.call(buttonsJustPressed, key)) {
            buttonsJustPressed[key] = false; 
        }
    }
    _draw()
    window.requestAnimationFrame(tick)
}

function cls() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function spr(i, x, y) {
    let sprite = SPRITES[i]
    ctx.drawImage(spriteSheet, sprite.x, sprite.y, TILE_SIZE, TILE_SIZE, Math.floor(x) - cameraOffset.x, Math.floor(y) - cameraOffset.y, TILE_SIZE, TILE_SIZE)
}

function btn(button) {
    return Boolean(buttons[button.toLowerCase()])
}

function btnp(button) {
    return Boolean(buttonsJustPressed[button.toLowerCase()])
}

function camera(x=0, y=0) {
    cameraOffset = {
        x: x,
        y: y,
    }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key.toLowerCase();
  
    buttons[keyName] = true
    if (buttonHasUpped[keyName] || buttonHasUpped[keyName] == undefined) {
        buttonsJustPressed[keyName] = true
        buttonHasUpped[keyName] = false
    }
}, false);

document.addEventListener('keyup', (event) => {
    const keyName = event.key.toLowerCase();
  
    buttons[keyName] = false
    buttonHasUpped[keyName] = true
}, false);
  

document.addEventListener('DOMContentLoaded', start, false);