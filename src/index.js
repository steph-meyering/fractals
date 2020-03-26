import RecTree from "./rec_tree";
import BFSTree from "./bfs_tree";
import BFSInput from "./bfs_controls";

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById("main-canvas")
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    
    let configDiv = document.getElementById('tree-config');

    // let output = document.getElementById('tree-params');
    
    // let branchAngleSlider = document.getElementById("branch-angle-input");
    // let depthSlider = document.getElementById("depth-input");
    
    // const displayUserInput =() => {
    //     let angle = branchAngleSlider.value;
    //     let depth = depthSlider.value
    //     output.innerHTML = `depth: ${depth} angle: ${angle}`
    // }

    branchAngleSlider.oninput = () => {
        displayUserInput();
        calculate();
    }
    depthSlider.oninput = () => {
        displayUserInput();
        calculate();
    } 

    let startX = WIDTH/2;
    let startY = HEIGHT;
    canvasEl.addEventListener("click", e => {
        startX = e.clientX;
        startY = e.clientY + 100;
        calculate()
    })
    
    const calculate = (x=startX, y=startY) => {
        c.clearRect(0, 0, WIDTH, HEIGHT)
        let angle = branchAngleSlider.valueAsNumber
        let depth = depthSlider.valueAsNumber
        new BFSTree(c, [x, y], depth, angle);
    }
    const c = canvasEl.getContext("2d")
    
})

export const HEIGHT = window.innerHeight;
export const WIDTH = window.innerWidth ;