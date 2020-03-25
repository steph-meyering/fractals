import MovingObject from "./moving_object";

class Asteroid extends MovingObject {
    constructor(props){
        super(props);
        this.color = "red";
        this.radius = 30;
        this.pos = props.pos;
        this.vel = this.randomVec(10)
    }
    // Return a randomly oriented vector with the given length.
    
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return this.scale([Math.sin(deg), Math.cos(deg)], length);
    }

    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    };
}

export default Asteroid;