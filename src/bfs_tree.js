class BFSTree {
    constructor(ctx, startPos, maxDepth, branchAngle){
        this.branchAngle = branchAngle
        this.rootAngle = -90;
        this.ctx = ctx;
        this.maxDepth = maxDepth;
        this.startPos = startPos;
        this.root = new Node(this.calcNodePos(startPos, this.rootAngle, 0), this.rootAngle);
        this.buildTree()
        this.drawTree(20)
    }

    drawTree(lw){
        // draw the first line
        let x1 = this.startPos[0];
        let y1 = this.startPos[1];
        let x2 = this.root.pos[0];
        let y2 = this.root.pos[1];

        this.drawLine(x1,y1,x2,y2,lw);
        let queue = [this.root];
        while (queue.length > 0){
            let l = queue.length;

            // decrease lineWidth at each level
            let nxtLw = lw/l;
            for (let i = 0; i < l; i++) {
                let parentNode =  queue.shift();
                let [parentX, parentY] = parentNode.pos;
                parentNode.children.forEach(child => {
                    let [childX, childY] = child.pos;
                    this.drawLine(parentX, parentY, childX, childY, nxtLw)
                    if (child.children.length > 0) queue.push(child)
                })
            }
        }
    }

    drawLine(x1, y1, x2, y2, lw) {
        this.ctx.lineWidth = lw;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    buildTree(){
        let depth = 1;
        let queue = [this.root];
        while (depth < this.maxDepth){
            let l = queue.length;
            for (let i = 0; i < l; i++) {
                let node = queue.shift();
                node.children = this.buildChildren(node.pos, node.angle, depth)
                queue = queue.concat(node.children);
            }
            depth++
        }
    }

    buildChildren(parentPos, parentAngle, depth){
        let child1Angle = parentAngle - this.branchAngle;
        let child1 = new Node(this.calcNodePos(parentPos, child1Angle, depth), child1Angle);
        let child2Angle = parentAngle + this.branchAngle;
        let child2 = new Node(this.calcNodePos(parentPos, child2Angle, depth), child2Angle);
        return [child1, child2]
    }

    degreesToRadians(angle) {
        return (angle * (Math.PI / 180));
    }

    calcNodePos(pos, angle, depth) {
        // let newAngle = angle * depth -90;
        let scale = ((this.maxDepth - depth) / this.maxDepth) * 100;
        const x2 = pos[0] + (Math.cos(this.degreesToRadians(angle))) * scale;
        const y2 = pos[1] + (Math.sin(this.degreesToRadians(angle))) * scale;
        return [x2, y2];
    }
}

class Node {
    constructor(pos, angle){
        this.pos = pos;
        this.angle = angle;
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