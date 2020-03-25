import MovingObject from "./moving_object";
import Asteroid from "./asteroid";
import Game from "./game";
import GameView from "./game_view";
import RecTree from "./rec_tree";
import BFSTree from "./bfs_tree";

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById("main-canvas")
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;

    const c = canvasEl.getContext("2d")
    
    let xstart = 0
    let xmid = WIDTH / 2;
    let xend = WIDTH;

    let ystart = HEIGHT;
    let ymid = HEIGHT / 2;
    let yend = 0;
    
    const bt = new BFSTree(c, [xmid,ystart], 8, 10)
    console.log(bt)

    // const t = new RecTree(c)
    // t.drawTree(xmid, ystart, -90, 5, 20)
    
    // const g = new Game(23)
    // const gv = new GameView(g,c)
    // gv.start()

    // c.moveTo(xmid, ystart);
    // c.lineTo(xmid, ymid);
    // c.stroke()
})

export const HEIGHT = window.innerHeight;
export const WIDTH = window.innerWidth ;