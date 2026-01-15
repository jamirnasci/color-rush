import { COLORS } from "../utils/colors"


export class Obstacle extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        const index = Math.floor(Math.random() * COLORS.length)
        this.setTint(COLORS[index].code)
        this.obstacleColorName = COLORS[index].name
        this.obstacleColorCode = COLORS[index].code
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    spawn(x, y) {        
        this.body.reset(x, y)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityY(70)
        this.setSize(70, 3)
    }
    update() {
        if (this.y > this.scene.scale.height + 50) {
            this.kill()
        }
    }
    kill() {
        this.setVisible(false)
        this.setActive(false)
        this.body.enable = false
    }
}