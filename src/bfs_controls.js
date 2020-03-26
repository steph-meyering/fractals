class BFSInput{
    constructor(configDiv){
        this.output = configDiv.querySelector('#tree-params');
        this.branchAngleSlider = configDiv.querySelector("#branch-angle-input");
        this.depthSlider = configDiv.querySelector("#depth-input");
    }

    displayUserInput (configDiv) {
        let output = configDiv.querySelector('#tree-params');
        let branchAngleSlider = configDiv.querySelector("#branch-angle-input");
        let depthSlider = configDiv.querySelector("#depth-input");
        let angle = branchAngleSlider.value;
        let depth = depthSlider.value
        output.innerHTML = `depth: ${depth} angle: ${angle}`
    }

    // branchAngleSlider.oninput = () => {
    //     displayUserInput();
    //     calculate();
    // };
    // depthSlider.oninput = () => {
    //     displayUserInput();
    //     calculate();
    // } 

}

export default BFSInput;