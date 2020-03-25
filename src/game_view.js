class GameView {
    constructor(game, ctx){
        this.game = game;
        this.ctx = ctx;
    }

    start(){
        setInterval(() => {
            this.game.moveObjects();
            this.game.draw(this.ctx)
        },20)
    }
}

export default GameView;