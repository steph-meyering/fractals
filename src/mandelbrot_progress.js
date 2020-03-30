class ProgressBar{
    constructor(){
        let element = document.getElementById("progress-bar");
        element.width = innerWidth;
        element.height = 30;
        this.ctx = element.getContext("2d");
        this.ctx.globalAlpha = 0
    }

    draw(percentage){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0,0, percentage * innerWidth, 30);
    }
    
    show() {
        this.ctx.globalAlpha = 1;
        //show it
    }
    
    hide() {
        this.ctx.globalAlpha = 0;
        this.ctx.clearRect(0,0, innerWidth, 30)
    }
}

export default ProgressBar;