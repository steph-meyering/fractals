import Mandelbrot from "./mandelbrot";
import MandelbrotControls from "./mandelbrot_controls";
import BFSInput from "./bfs_controls";

class AppControls {
    constructor(){
        this.show = "mandelbrot";
        const canvasEl = document.getElementById("main-canvas");
        canvasEl.height = window.innerHeight;
        canvasEl.width = window.innerWidth;
        this.ctx = canvasEl.getContext("2d"); 
        this.configDiv = document.getElementById('tree-config');
        this.mandel = new Mandelbrot(this.ctx);
        this.mandelcontrols = new MandelbrotControls(this.mandel);
        
        const toggle = document.getElementById('toggle');
        
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
    
    display(){
        const selectRect = document.getElementById("selection-rectangle");
        const treeConfig = document.getElementById('tree-config');
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        switch (this.show) {
            case "mandelbrot":
                treeConfig.className = 'hidden';
                selectRect.className = 'revealed';
                this.mandel.iterateOverAll()
                break;
            case "tree":
                treeConfig.className = 'revealed';
                selectRect.className = 'hidden';
                let input = new BFSInput(this.ctx, this.configDiv)
                input.calculate()
                break;
            default:
                break;
        }
    }
}

export default AppControls;

// export const displayTreeParams = () => {
//     const treeConfig = document.getElementById('tree-config');
//     const canvasEl = document.getElementById("main-canvas");
//     const selectRect = document.getElementById("selection-rectangle")
//     const ctx = canvasEl.getContext("2d");
//     const toggle = document.getElementById("toggle");
//     switch (treeConfig.className) {
//         case "revealed":
//             ctx.clearRect(0, 0, innerWidth, innerHeight);
//             treeConfig.className = 'hidden';
//             selectRect.className = 'revealed';
//             toggle.innerHTML = "Switch to Tree"
//             break
//         case "hidden":
//             treeConfig.className = 'revealed';
//             selectRect.className = 'hidden';
//             toggle.innerHTML = "Switch to Mandelbrot";
//             break;
//         default:
//             console.log(treeConfig.className);
//     }
// }
