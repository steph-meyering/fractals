class MandelbrotControls {
    constructor(mandel){
        this.mandel = mandel;
        const selectRect = document.getElementById("selection-rectangle");
        selectRect.height = window.innerHeight;
        selectRect.width = window.innerWidth;
        this.canvas = selectRect.getContext("2d");
        this.canvas.strokeStyle = "white";
        this.canvas.lineWidth = 2;
        this.selectRect = selectRect
        this.selectRect.addEventListener('mousedown', (e) => this.selectStart(e));
        this.selectRect.addEventListener('mousemove', (e) => this.selectMove(e));
        this.selectRect.addEventListener('mouseup', (e) => this.selectEnd(e));
        this.selectionReset();

        const resetButton = document.getElementById("reset");
        resetButton.addEventListener('click',() => this.mandel.reset())
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
            this.canvas.strokeStyle = this.validSelection() ? "white" : "#adadad"
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
        if(this.validSelection()){
            this.mandel.update(this.x1, this.y1, this.x2, this.y2);
        }
        this.selectionReset();
    }
    // clear the selection rectangle coordinates
    selectionReset(){
        this.active = false;
        this.canvas.clearRect(0, 0, innerWidth, innerHeight);
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
    }

    // enforce that selection area is at least 20x20px, and rules out accidental clicks
    validSelection(){
        let width = Math.abs(this.x2 - this.x1);
        let height = Math.abs(this.y2 - this.y1);
        return (width >= 20 && height >= 20) ? true : false;
    }
    // animateRect(){
    //     console.log("animating rectangle")
    //     let left = Math.min(this.x1, this.x2);
    //     let top = Math.min(this.y1, this.y2);
    //     let width = Math.abs(this.x2 - this.x1);
    //     let height = Math.abs(this.y2 - this.y1);
    //     const centerx = width/2 + left;
    //     const centery = height/2 + top;
    //     const radius = Math.sqrt((centerx - left)**2 + (centery - top) ** 2);
    //     let angle = 0;
    //     const drawGradient = () => {
    //         this.canvas.clearRect(0, 0, innerWidth, innerHeight);
    //         if (this.active){
    //             console.log("updating gradients")
    //             let offsetx = radius * Math.cos(Math.PI * angle / 180);
    //             let offsety = radius * Math.sin(Math.PI * angle / 180);
    //             let gradient = this.canvas
    //                 .createLinearGradient(
    //                     centerx - offsetx, 
    //                     centery - offsety, 
    //                     centerx + offsetx, 
    //                     centery + offsety
    //                 );
    //             gradient.addColorStop("0", "magenta");
    //             gradient.addColorStop("0.5", "blue");
    //             gradient.addColorStop("1.0", "red");
    //             this.canvas.strokeStyle = gradient;
    //             this.canvas.strokeRect(left, top, width, height)
    //             angle ++
    //             drawGradient();
    //         } else{
    //             console.log("stopping annimation")
    //         }
    //     }
    //     drawGradient();

    // }

}

export default MandelbrotControls;