class MandelbrotControls {
    constructor(){
        this.canvas = document.getElementById("main-canvas");
        this.canvas.addEventListener('mousedown', (e) => this.selectStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.selectMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.selectEnd(e));
        this.selectionRect = document.getElementById("selection-rectangle");
        // this.ctx = this.selectionRect.getContext("2d");
        // this.ctx.height = window.innerHeight;
        // this.ctx.width = window.innerWidth;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.active = false;
        // console.log(this.ctx.height)
    }
    selectStart(e) {
        this.active = true;
        this.x1 = e.clientX;
        this.y1 = e.clientY;
        this.selectRender();
    }

    selectRender(){
        if (this.active){
            let left = Math.min(this.x1, this.x2);
            let top = Math.min(this.y1, this.y2);
            this.selectionRect.style.left = left + 'px';
            this.selectionRect.style.top = top + 'px';
            this.selectionRect.style.width = Math.abs(this.x2 - this.x1) + 'px';
            this.selectionRect.style.height = Math.abs(this.y2 - this.y1) + 'px';
            // this.ctx.strokeRect(left, top, Math.abs(this.x2 - this.x1), Math.abs(this.y2 - this.y1))

        }
    }

    selectMove(e) {
        if (this.active){
            this.selectionRect.className = "revealed";
            this.x2 = e.clientX;
            this.y2 = e.clientY;
            this.selectRender();
        }
    }

    selectEnd(e) {
        this.x2 = e.clientX;
        this.y2 = e.clientY;
        this.active = false;
        this.selectionRect.className = "hidden";
    }

    showRect(){
        this.selectionRect.className = "revealed";
    }
    
    getCurrentPos(e){

    }

    convertCoordinates(x, y) {

    }
}

export default MandelbrotControls;