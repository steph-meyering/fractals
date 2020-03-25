class BFSTree {
    constructor(ctx, startPos, maxDepth, branchAngle){
        this.branchAngle = branchAngle
        this.rootAngle = -90;
        this.ctx = ctx;
        this.maxDepth = maxDepth;
        this.startPos = startPos;
        this.root = new Node(this.calcNodePos(startPos, 0, this.rootAngle));
        this.buildTree(branchAngle)
        this.drawTree()
    }

    drawTree(){
        // draw the first line
        let x1 = this.startPos[0];
        let y1 = this.startPos[1];
        let x2 = this.root.pos[0];
        let y2 = this.root.pos[1];

        this.drawLine(x1,y1,x2,y2);
        let queue = [this.root];
        while (queue.length > 0){
            let l = queue.length;
            for (let i = 0; i < l; i++) {
                let parentNode =  queue.shift();
                let [parentX, parentY] = parentNode.pos;
                parentNode.children.forEach(child => {
                    let [childX, childY] = child.pos;
                    this.drawLine(parentX, parentY, childX, childY)
                    if (child.children.length > 0) queue.push(child)
                })
            }
        }
    }

    drawLine(x1, y1, x2, y2) {
        // this.ctx.lineWidth = lw;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
        console.log("drawing line:" + x2 + " " + y2);
    }
    
    buildTree(angle){
        let depth = 1;
        let queue = [this.root];
        while (depth < this.maxDepth){
            let l = queue.length;
            for (let i = 0; i < l; i++) {
                let node = queue.shift();
                node.children = this.buildChildren(node.pos, depth, angle + 13)
                queue = queue.concat(node.children);
            }
            depth++
        }
    }

    buildChildren(pos, depth, angle){
        let child1 = new Node(this.calcNodePos(pos, depth, -angle))
        let child2 = new Node(this.calcNodePos(pos, depth, angle));
        return [child1, child2]
    }

    degreesToRadians(angle) {
        return (angle * (Math.PI / 180));
    }

    calcNodePos(pos, depth, angle) {
        let newAngle = angle * depth -90;
        let scale = ((this.maxDepth - depth) / this.maxDepth) * 100;
        const x2 = pos[0] + (Math.cos(this.degreesToRadians(newAngle))) * scale;
        const y2 = pos[1] + (Math.sin(this.degreesToRadians(newAngle))) * scale;
        return [x2, y2];
    }
}

class Node {
    constructor(pos){
        this.pos = pos;
        this.children = [];
    }
}

// class Node {
//     constructor(pos, angle) {
//         this.pos = pos;
//         this.angle = angle;
//         this.children = [];
//     }
// }


export default BFSTree;