export class Life extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.setTexture(texture)
        this.setScale(0.5)
    }
    spawn() {
        this.setActive(true)
        this.body.enable = true
        this.setVisible(true)
        this.setVelocityY(50)
    }
    kill(){
        this.setVisible(false)
        this.setActive(false)
        this.body.enable = false
    }
}