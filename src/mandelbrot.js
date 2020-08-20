import ProgressBar from "./mandelbrot_progress";

class Mandelbrot {
  constructor(ctx) {
    this.ctx = ctx;
    this.progressBar = new ProgressBar();
    this.init();
  }

  init() {
    this.depth = 350;
    this.imin = -2;
    this.imax = 0.5;
    this.jmin = -1;
    this.jmax = 1;
  }
  reset() {
    this.init();
    this.iterateOverAll();
  }

  update(x0, y0, x1, y1) {
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
    this.iterateOverAll();
  }

  iterateOverAll() {
    let nextCanvas = document.createElement("canvas");
    nextCanvas.width = innerWidth;
    nextCanvas.height = innerHeight;
    let nextContext = nextCanvas.getContext("2d");
    let di = this.imax - this.imin;
    let dj = this.jmax - this.jmin;
    let min_dim = Math.min(innerWidth, innerHeight);
    let step = Math.min(di, dj) / min_dim;

    // run more iterations to get better resolution at deeper levels
    switch (true) {
      case Math.min(di, dj) > 10 ** -2:
        this.depth = 500;
        break;
      case Math.min(di, dj) > 10 ** -3:
        this.depth = 1000;
        break;
      case Math.min(di, dj) > 10 ** -4:
        this.depth = 2000;
        break;
      case Math.min(di, dj) > 10 ** -6:
        this.depth = 3500;
        break;
      case Math.min(di, dj) > 10 ** -7:
        this.depth = 4500;
        break;
      default:
        break;
    }

    // timeout allows to dynamically render the canvas progress bar while
    // computing next frame;
    setTimeout(() => {
      this.progressBar.show();
    }, 0);
    for (let x = 0; x < innerWidth; x++) {
      setTimeout(() => {
        this.progressBar.draw(x / innerWidth);
        for (let y = 0; y < innerHeight; y++) {
          let cx = this.imin + x * step;
          let cy = this.jmin + (innerHeight - y) * step;
          const color = this.calcDepth(cx, cy);
          this.colorPixel(nextContext, x, y, color);
        }
      }, 0);
    }

    // Display the set and hide progress bar when done computing
    setTimeout(() => {
      this.ctx.drawImage(nextCanvas, 0, 0);
      this.progressBar.hide();
    }, 0);
  }

  // Convert the number of iterations it took to find a single pixel's color
  // into a percentage of total iterations.
  calcDepth(x0, y0) {
    let x = x0;
    let y = y0;
    for (let i = 0; i < this.depth; i++) {
      const x1 = x ** 2 - y ** 2 + x0;
      const y1 = 2.0 * x * y + y0;
      x = x1;
      y = y1;
      if (x * y > 4) {
        return (i / this.depth) * 100;
      }
    }
    return 0;
  }

  // Draw pixel on canvas `ctx` at [`x`, `y`] coordinates
  // `color` represents lightness percentage
  colorPixel(ctx, x, y, color) {
    ctx.fillStyle = `hsl(0, 100%, ${color}%)`;
    ctx.fillRect(x, y, 1, 1);
  }
}

export default Mandelbrot;
