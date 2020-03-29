class ProgressBar{
    constructor(){
        let element = document.getElementById("progress-bar");
        element.width = innerWidth;
        element.height = 30;
        this.ctx = element.getContext("2d");
    }
}

export default ProgressBar;