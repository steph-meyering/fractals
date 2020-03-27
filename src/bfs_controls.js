import BFSTree from "./bfs_tree";
import { WIDTH, HEIGHT } from ".";

class BFSInput{
    constructor(ctx, configDiv){
        // save context and get input slider elements + output div
        this.ctx = ctx;
        this.startPos = [WIDTH/2, HEIGHT]
        this.branchAngleSlider = configDiv.querySelector("#branch-angle-input");
        this.depthSlider = configDiv.querySelector("#depth-input");
        this.output = configDiv.querySelector('#tree-params');
        
        // set event listeners on sliders so the params display in real-time
        this.branchAngleSlider.addEventListener('input', () => this.update());
        this.depthSlider.addEventListener('input', () => this.update());
    }

    displayUserInput(depth, angle) {
        this.output.innerHTML = `depth: ${depth} angle: ${angle} nodes generated on each render: ${2** depth}`
    }

    update(){
        // get user input values
        let angle = this.branchAngleSlider.valueAsNumber;
        let depth = this.depthSlider.valueAsNumber;
        this.displayUserInput(depth, angle);
        this.calculate(depth, angle)
        
    }

    
    calculate (depth, angle) {
        this.ctx.clearRect(0 ,0 , WIDTH, HEIGHT)
        new BFSTree(this.ctx, this.startPos, depth, angle)
    }
}

export default BFSInput;