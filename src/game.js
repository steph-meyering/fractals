import {HEIGHT, WIDTH} from './index'
import Asteroid from './asteroid';

class Game {
    constructor(n){
        this.asteroids = [];
        this.addAsteroids(n)   
    }
    
    addAsteroids(n){
        for (let i = 0; i < n; i++) {
            const pos = this.randomPosition();
            const asteroid = new Asteroid({pos});
            this.asteroids.push(asteroid);
        }
    }
    
    draw(ctx){
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        this.asteroids.forEach(a => a.draw(ctx))
    }

    moveObjects(){
        this.asteroids.forEach(a => a.move())
    }
    // add(object){
    //     if (object instanceof Asteroid){
    //         this.asteroids.push(object)
    //     } else {
    //         throw new Error("unknow object type")
    //     }
    // }

    
    
    randomPosition() {
        return [
            Math.floor(HEIGHT * Math.random()),
            Math.floor(WIDTH * Math.random())
        ];
    };
}

export default Game;