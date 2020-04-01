import BFSTree from "./bfs_tree";

class TreeControls{
    constructor(ctx, configDiv){
        // save context and get input slider elements + output div
        this.ctx = ctx;
        this.startPos = [innerWidth/2, innerHeight - 100]
        this.branchAngleSlider = configDiv.querySelector("#branch-angle-input");
        this.depthSlider = configDiv.querySelector("#depth-input");
        this.output = configDiv.querySelector('#tree-params');
        
        // set event listeners on sliders so the params display in real-time
        this.branchAngleSlider.addEventListener('input', () => this.update());
        this.depthSlider.addEventListener('input', () => this.update());
        
    }

    displayUserInput(depth, angle) {
        this.output.innerHTML = `depth: ${depth} angle: ${angle} nodes: ${2**depth}`
    }

    update(){
        // get user input values
        let angle = this.branchAngleSlider.valueAsNumber;
        let depth = this.depthSlider.valueAsNumber;
        this.displayUserInput(depth, angle);
        this.calculate(depth, angle)
        
    }

    calculate (depth = 9, angle = 20) {
        this.ctx.clearRect(0 ,0 , innerWidth, innerHeight)
        new BFSTree(this.ctx, this.startPos, depth, angle)
    }
}

export default TreeControls;