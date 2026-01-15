import { COLORS } from "../utils/colors"

export class Player extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.setActive(true)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setVisible(true)     
        this.colorIndex = 0
        this.colorName = COLORS[this.colorIndex].name
        this.colorCode = COLORS[this.colorIndex].code
        this.setTint(this.colorCode)
        this.keyboard = this.scene.input.keyboard.createCursorKeys()   
        this.setCollideWorldBounds(true)
    }
    kill(){
        this.body.enable = false
        this.setActive(false)
        this.setVisible(false)
    }
    update(){        
        if(this.keyboard.left.isDown){
            this.moveLeft()
        }
        if(this.keyboard.right.isDown){
            this.moveRight()
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyboard.space)){
            this.nextColor()
        }
    }
    nextColor(){
        if(this.colorIndex < COLORS.length - 1){            
            this.colorIndex++
        }else{
            this.colorIndex = 0                        
        }
        this.setTint(COLORS[this.colorIndex].code)
        this.colorName = COLORS[this.colorIndex].name
        this.colorCode = COLORS[this.colorIndex].code
    }
    moveLeft(){
        this.body.x -= 10
    }
    moveRight(){
        this.body.x += 10
    }
}