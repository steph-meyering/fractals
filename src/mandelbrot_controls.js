class MandelbrotControls {
    constructor(){
        const selectRect = document.getElementById("selection-rectangle");
        selectRect.height = window.innerHeight;
        selectRect.width = window.innerWidth;
        this.canvas = selectRect.getContext("2d");
        this.canvas.strokeStyle = "white"
        this.selectRect = selectRect
        this.selectRect.addEventListener('mousedown', (e) => this.selectStart(e));
        this.selectRect.addEventListener('mousemove', (e) => this.selectMove(e));
        this.selectRect.addEventListener('mouseup', (e) => this.selectEnd(e));
        this.selectionReset();
    }

    selectStart(e) {
        this.active = true;
        this.x1 = e.offsetX;
        this.y1 = e.offsetY;
    }

    selectRender(){
        if (this.active){
            let left = Math.min(this.x1, this.x2);
            let top = Math.min(this.y1, this.y2);
            let width = Math.abs(this.x2 - this.x1);
            let height = Math.abs(this.y2 - this.y1);
            this.canvas.clearRect(0,0,innerWidth, innerHeight)
            this.canvas.strokeRect(left, top, width, height)

        }
    }

    selectMove(e) {
        if (this.active){
            this.x2 = e.offsetX;
            this.y2 = e.offsetY;
            this.selectRender();
        }
    }

    selectEnd(e) {
        this.x2 = e.offsetX;
        this.y2 = e.offsetY;
        console.log(this);
        this.selectionReset();
    }
    
    selectionReset(){
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        this.active = false;
        this.canvas.clearRect(0, 0, innerWidth, innerHeight);
    }
    
    getCurrentPos(e){

    }

    convertCoordinates(x, y) {

    }
}

export default MandelbrotControls;