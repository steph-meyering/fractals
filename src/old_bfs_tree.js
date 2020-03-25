class BFSTree {
    constructor(startPos, maxDepth, angle, lw){
        this.startPos = startPos;
        this.lw = lw;
        this.root = new Node(this.calcNodePos(startPos, 0, -90));
        this.nodes = this.buildTree(maxDepth, angle,)
    }

    buildTree(maxDepth, angle){
        let queue = [this.root];
        let depth = 1;
        while (depth < maxDepth) {
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                node.left = new Node(this.calcNodePos(node.pos, depth, -angle));
                queue.push(node.left);
                node.right = new Node(this.calcNodePos(node.pos, depth, angle));
                queue.push(node.right);
            }
            depth += 1;
        }
    }

    degreesToRadians(angle) {
        return (angle * (Math.PI / 180));
    }

    calcNodePos(pos, depth, angle){
        const x2 = pos[0] + (Math.cos(this.degreesToRadians(angle))) * depth * 10.0;
        const y2 = pos[1] + (Math.sin(this.degreesToRadians(angle))) * depth * 10.0;
        return [x2, y2];
    }

    drawTree(){

    }
}

class Node {
    constructor(pos){
        this.pos = pos;
        this.children = [];
    }
}

export default BFSTree;