class Mandelbrot {
    constructor(ctx){
        this.ctx = ctx;
        this.depth = 100;
    }

    iterateOverAll(cx, cy, zoom){
        let count100 = 0;
        let count50 = 0;
        let count200 = 0;
        for (let x = innerWidth - 1; x >= 0; x--) {
            for (let y = 0; y < innerHeight; y++) {
                const color = this.calcDepth(x/zoom + cx , y/zoom + cy);
                switch (true) {
                    case (color<50):
                        count50++;
                        break;
                    case (50 <= color < 100):
                        count100++;
                        break;
                    case (color >= 100):
                        count200++;
                        break;
                    default:
                        break;
                }
                this.colorPixel(x, y, color)
            }
        }
        console.log("count50: " + count50, "count50-100: " + count100, "count200+: " + count200 )
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

    colorPixel(x, y, color){
        if (color === 0) {
            this.ctx.fillStyle = '#000'
            this.ctx.fillRect(x, y, 1, 1)
        } else {
            this.ctx.fillStyle = `hsl(250, 100%, ${color}%)`
            this.ctx.fillRect(x, y, 1 ,1)
        }
    }

    getCoordinates(){
        const canvasEl = document.getElementById("main-canvas");
        canvasEl.addEventListener('')
    }

    convertCoordinates(x, y){
        
    }
}

export default Mandelbrot;