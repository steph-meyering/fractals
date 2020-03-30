import ProgressBar from "./mandelbrot_progress";

class Mandelbrot {
    constructor(ctx){
        this.ctx = ctx;
        this.progressBar = new ProgressBar;
        this.depth = 350;
        this.imin = -2;
        this.imax = 0.5;
        this.jmin = -1;
        this.jmax = 1;
        this.iterateOverAll();

    }

    update(x0, y0, x1, y1){
        let xmin = Math.min(x0, x1);
        let ymin = Math.max(y0, y1);
        let xmax = Math.max(x0, x1);
        let ymax = Math.min(y0, y1);
        let di = this.imax - this.imin;
        let dj = this.jmax - this.jmin;
        let min_dim = Math.min(innerWidth, innerHeight);
        let step = Math.min(di, dj) / min_dim;
        this.imax = this.imin + xmax * step;
        this.jmax = this.jmin + (innerHeight - ymax) * step;
        this.imin = this.imin + xmin * step;
        this.jmin = this.jmin + (innerHeight - ymin) * step;
        this.iterateOverAll()
    }
    
    iterateOverAll(){
        let nextCanvas = document.createElement("canvas");
        nextCanvas.width = innerWidth;
        nextCanvas.height = innerHeight;
        let nextContext = nextCanvas.getContext('2d');
        let di = this.imax - this.imin;
        let dj = this.jmax - this.jmin;
        console.log(di, dj)
        let min_dim = Math.min(innerWidth, innerHeight);
        let step = Math.min(di, dj) / min_dim;

        // run more iterations to get better resolution at deeper levels
        switch (true) {
            case (Math.min(di, dj) > 10**-2):
                this.depth = 500
                break;
            case (Math.min(di, dj) > 10 ** -3):
                this.depth = 1000;
                break;
            case (Math.min(di, dj) > 10 ** -4):
                this.depth = 2000;
                break;
            case (Math.min(di, dj) > 10 ** -6):
                this.depth = 5000;
                break;
            default:
                break;
            }
            console.log(this.depth)

        //
        let count50 = 0;
        let count80 = 0;
        let countall = 0;
        //
        setTimeout(() => {
            this.progressBar.show();
        }, 10)
        for (let x = 0; x < innerWidth; x++) {
            setTimeout(() => {
                this.progressBar.draw(x/innerWidth);
                for (let y = 0; y < innerHeight; y++) {
                    let cx = this.imin + x * step;
                    let cy = this.jmin + (innerHeight - y) * step 
                    const color = this.calcDepth(cx, cy);
                    this.colorPixel(nextContext, x, y, color);
                    countall++;
                    if (color !== 0){
                        if (color < 50){
                            count50++
                        } else if (color > 80){
                            count80++
                        }
                    }
                }
            }, 10)
        }

        setTimeout(() => {
            this.ctx.drawImage(nextCanvas, 0, 0)
            this.progressBar.hide();
            console.log("less than 50% ", count50 * 100 / countall);
            console.log("more than 80% ", count80 * 100 / countall)
        }, 20)
    }

    calcDepth(x0, y0){
        let x = x0;
        let y = y0;
        for (let i = 0; i < this.depth; i++) {
            const x1 = x**2 - y**2 + x0;
            const y1 = 2.0 * x * y + y0;
            x = x1;
            y = y1;
            if (x * y > 4) {
                return (i / this.depth * 100);
            }
        }
        return 0;
    }

    colorPixel(ctx, x, y, color){
        // let hue = 0;
        // let intensity = 55;
        // if (color === 0){
        //     intensity = 0;
        // }

        // switch (Math.floor(color) % 3) {
        //     case 1:
        //         hue = 125;
        //         break;
        //     case 2:
        //         hue = 250;
        //     default:
        //         break;
        // }
        ctx.fillStyle = `hsl(0, 100%, ${color}%)`
        ctx.fillRect(x, y, 1, 1)
    }

}

export default Mandelbrot;