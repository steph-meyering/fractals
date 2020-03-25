import RecTree from "./rec_tree";
import BFSTree from "./bfs_tree";

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById("main-canvas")
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    
    
    let branchAngleSlider = document.getElementById("branch-angle-input");
    let depthSlider = document.getElementById("depth-input");
    let button = document.getElementById("calculate");
    

    const displayUserInput =() => {
        let angle = branchAngleSlider.value;
        let depth = depthSlider.value
        let output = document.getElementById('tree-params');
        output.innerHTML = `depth: ${depth} angle: ${angle}`
    }

    branchAngleSlider.oninput = () => displayUserInput();
    depthSlider.oninput = () => displayUserInput()
    button.onclick = () => calculate();
    
    const calculate = () => {
        c.clearRect(0, 0, WIDTH, HEIGHT)
        let angle = branchAngleSlider.valueAsNumber
        let depth = depthSlider.valueAsNumber
        new BFSTree(c, [xmid, ystart], depth, angle);
    }
    const c = canvasEl.getContext("2d")
    
    let xstart = 0
    let xmid = WIDTH / 2;
    let xend = WIDTH;

    let ystart = HEIGHT;
    let ymid = HEIGHT / 2;
    let yend = 0;
    
    // const bt = new BFSTree(c, [xmid,ystart], 13, 20)




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