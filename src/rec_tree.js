class RecTree {
    constructor(ctx){
        this.ctx = ctx
    }
    
    
    drawLine(x1, y1, x2, y2, lw){
        this.ctx.lineWidth = lw;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath()
        this.ctx.stroke();
        console.log("drawing line:" + x2 + " " + y2)
    }

    degreesToRadians(angle){
        return (angle * (Math.PI /180))
    }

    drawTree(x1, y1, angle, depth, lw){
        if (depth > 0){
            const x2 = x1 + (Math.cos(this.degreesToRadians(angle))) * depth * 10.0;
            const y2 = y1 + (Math.sin(this.degreesToRadians(angle))) * depth * 10.0;
            this.drawLine(x1, y1, x2, y2, lw);
            this.drawTree(x2, y2, angle - 40, depth - 1, lw/2);
            this.drawTree(x2, y2, angle + 40, depth - 1, lw/2);
            console.log('branch drawn depth: ' + depth)
        } 
    }
}

export default RecTree;