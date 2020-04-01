import Mandelbrot from "./mandelbrot";
import MandelbrotControls from "./mandelbrot_controls";
import TreeControls from "./bfs_controls";

class AppControls {
    constructor(){
        this.show = "mandelbrot";
        this.displayingInfo = false;
        const canvasEl = document.getElementById("main-canvas");
        canvasEl.height = window.innerHeight;
        canvasEl.width = window.innerWidth;
        this.ctx = canvasEl.getContext("2d"); 
        this.configDiv = document.getElementById('tree-config');
        this.mandel = new Mandelbrot(this.ctx);
        this.mandelcontrols = new MandelbrotControls(this.mandel);
        const toggle = document.getElementById('toggle');
        const infoButton = document.getElementById("info-button");
        infoButton.addEventListener('click', () => this.toggleInstructions())
        const closeInstructionsButton = document.getElementById("hide-instructions");
        closeInstructionsButton.addEventListener('click', () => this.toggleInstructions())

        
        toggle.addEventListener('click', () => {
            switch (this.show) {
                case "mandelbrot":
                    toggle.innerHTML = `switch to mandelbrot`;
                    this.show = "tree";
                    break;
                case "tree":
                    toggle.innerHTML = `switch to tree`
                    this.show = "mandelbrot";
                    break;
                default:
                    break;
            }
            this.display();
        })
        this.display()
    }

    toggleInstructions(){
        const instructions = document.getElementById("instructions")
        const selectRect = document.getElementById("selection-rectangle");
        if (this.displayingInfo){
            this.displayingInfo = false;
            instructions.className = 'hidden';
            selectRect.className = 'revealed';
        } else {
            this.displayingInfo = true;
            instructions.className = 'instructions';
            selectRect.className = 'hidden';
        }
    }
    
    display(){
        const selectRect = document.getElementById("selection-rectangle");
        const resetButton = document.getElementById("reset");
        const treeConfig = document.getElementById('tree-config');
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        switch (this.show) {
            case "mandelbrot":
                treeConfig.className = 'hidden';
                selectRect.className = 'revealed';
                resetButton.className = 'revealed';
                this.mandel.iterateOverAll();
                break;
            case "tree":
                treeConfig.className = 'revealed';
                selectRect.className = 'hidden';
                resetButton.className = 'hidden';
                let input = new TreeControls(this.ctx, this.configDiv)
                input.calculate();
                break;
            default:
                break;
        }
    }

    info(){

    }
}

export default AppControls;
