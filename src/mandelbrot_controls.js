class MandelbrotControls {
  constructor(mandelbrot) {
    this.mandelbrot = mandelbrot;
    const selectRect = document.getElementById("selection-box");
    selectRect.height = window.innerHeight;
    selectRect.width = window.innerWidth;
    const resetButton = document.getElementById("reset");
    this.canvas = selectRect.getContext("2d");
    this.canvas.strokeStyle = "white";
    this.canvas.lineWidth = 2;
    this.selectRect = selectRect;
    this.selectRect.addEventListener("mousedown", (e) => this.selectStart(e));
    this.selectRect.addEventListener("mousemove", (e) => this.selectMove(e));
    this.selectRect.addEventListener("mouseup", (e) => this.selectEnd(e));
    resetButton.addEventListener("click", () => this.mandelbrot.reset());
    this.selectionReset();
  }

  selectStart(e) {
    this.active = true;
    this.x1 = e.offsetX;
    this.y1 = e.offsetY;
  }

  selectMove(e) {
    if (this.active) {
      this.x2 = e.offsetX;
      this.y2 = e.offsetY;
      this.selectRender();
    }
  }

  selectEnd(e) {
    this.x2 = e.offsetX;
    this.y2 = e.offsetY;
    if (this.validSelection()) {
      this.mandelbrot.update(this.x1, this.y1, this.x2, this.y2);
    }
    this.selectionReset();
  }

  selectRender() {
    if (this.active) {
      let left = Math.min(this.x1, this.x2);
      let top = Math.min(this.y1, this.y2);
      let width = Math.abs(this.x2 - this.x1);
      let height = Math.abs(this.y2 - this.y1);
      // Change selection box color from grey to solid-white if valid
      this.canvas.strokeStyle = this.validSelection() ? "white" : "#adadad";
      this.canvas.clearRect(0, 0, innerWidth, innerHeight);
      this.canvas.strokeRect(left, top, width, height);
    }
  }

  // clear the selection rectangle coordinates
  selectionReset() {
    this.active = false;
    this.canvas.clearRect(0, 0, innerWidth, innerHeight);
    this.x1 = null;
    this.y1 = null;
    this.x2 = null;
    this.y2 = null;
  }

  // enforce that selection area is at least 20x20px, prevents zooming-in on an
  // accidental click
  validSelection() {
    let width = Math.abs(this.x2 - this.x1);
    let height = Math.abs(this.y2 - this.y1);
    return width >= 20 && height >= 20 ? true : false;
  }
}

export default MandelbrotControls;
