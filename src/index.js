import RecTree from "./rec_tree";
import BFSTree from "./bfs_tree";
import BFSInput from "./bfs_controls";

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById("main-canvas")
    const ctx = canvasEl.getContext("2d")
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    
    let configDiv = document.getElementById('tree-config');

    let input = new BFSInput(ctx, configDiv)


    // let startX = WIDTH/2;
    // let startY = HEIGHT;
    // canvasEl.addEventListener("click", e => {
    //     startX = e.clientX;
    //     startY = e.clientY + 100;
    //     calculate()
    // })
    
    // const calculate = (x=startX, y=startY) => {
    //     c.clearRect(0, 0, WIDTH, HEIGHT)
    //     let angle = branchAngleSlider.valueAsNumber
    //     let depth = depthSlider.valueAsNumber
    //     new BFSTree(c, [x, y], depth, angle);
    // }
    
})

export const HEIGHT = window.innerHeight;
export const WIDTH = window.innerWidth ;