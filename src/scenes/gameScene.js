import Phaser from 'phaser'
import { Obstacle } from '../sprites/obstacle'
import { Player } from '../sprites/player'
import { Life } from '../sprites/life'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }
    preload() {
        this.load.image('line', 'assets/img/obstacles/line.png')
        this.load.image('player', 'assets/img/player/player.png')
        this.load.image('purple-bg', 'assets/img/bg/purple-bg.jpg')

        this.load.image('left-btn', 'assets/img/hud/left-btn.png')
        this.load.image('right-btn', 'assets/img/hud/right-btn.png')
        this.load.image('paint-btn', 'assets/img/hud/paint-btn.png')
        this.load.image('pause-btn', 'assets/img/hud/pause-btn.png')
        this.load.image('continue-btn', 'assets/img/hud/continue-btn.png')
        this.load.image('menu-btn', 'assets/img/menu/menu-btn.png')
        this.load.image('pause-txt', 'assets/img/hud/pause-txt.png')

        this.load.image('glass-particle', 'assets/img/particles/glass.jpg')
        this.load.image('life-item', 'assets/img/items/life.png')

        this.load.audio('game-song', 'assets/audio/game-song.mp3')
        this.load.audio('glass-audio-1', 'assets/audio/glass-audio-1.mp3')
        this.load.audio('glass-audio-2', 'assets/audio/glass-audio-2.mp3')
        this.load.audio('glass-audio-3', 'assets/audio/glass-audio-3.mp3')
        this.load.audio('loss-audio', 'assets/audio/loss-audio.mp3')

    }
    create() {
        const width = this.scale.width
        const height = this.scale.height

        const storagedLevel = localStorage.getItem('level')
        this.obstacleDelay = storagedLevel == 'easy' ? 1000 :
            storagedLevel == 'normal' ? 700 :
                storagedLevel == 'hard' ? 500 : 1000

        this.lifes = 3
        this.add.tileSprite(0, 0, 2000, 2000, 'purple-bg')
            .setOrigin(0)

        this.gameSong = this.sound.add('game-song', {
            volume: 0.3,
            loop: true
        })
        this.gameSong.play()
        /*pause menu*/
        this.pauseRectangle = this.add.rectangle(width / 2, height / 2, 350, 400, 0x00330066)
            .setDepth(999)
            .setVisible(false)
            .setRounded(20)

        this.explosionEmitter = this.add.particles(0, 0, 'glass-particle', {
            speed: { min: 100, max: 300 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 600,
            gravityY: 200,
            blendMode: 'ADD',
            active: false
        })
        this.obstacleGroup = this.physics.add.group({
            classType: Obstacle,
            maxSize: 200,
            defaultKey: 'obstacle',
            runChildUpdate: true
        })
        this.obstaclesEvent = this.time.addEvent({
            delay: this.obstacleDelay,
            callback: this.generateObstacle,
            callbackScope: this,
            loop: true
        })
        this.lifeEvent = this.time.addEvent({
            delay: 5000,
            callback: this.spawnLife,
            callbackScope: this,
            loop: true
        })
        this.lifeGroup = this.physics.add.group({
            classType: Life,
            max: 10,
            defaultKey: 'life-item',
        })
        this.player = new Player(this, window.innerWidth / 2, window.innerHeight - 200, 'player')
            .setOrigin(0)

        this.isLeftBtnPressed = false
        this.isRightBtnPressed = false

        this.leftBtn = this.add.image(40, height - 100, 'left-btn')
            .setInteractive()
            .setScale(0.6)
            .on('pointerdown', () => {
                this.isLeftBtnPressed = true
            })
            .on('pointerup', () => {
                this.isLeftBtnPressed = false
            })
            .on('pointerout', () => {
                this.isLeftBtnPressed = false
            })
        this.rightBtn = this.add.image(110, height - 100, 'right-btn')
            .setInteractive()
            .setScale(0.6)
            .on('pointerdown', () => {
                this.isRightBtnPressed = true
            })
            .on('pointerup', () => {
                this.isRightBtnPressed = false
            })
            .on('pointerout', () => {
                this.isRightBtnPressed = false
            })
        this.paintBtn = this.add.image(width - 50, height - 100, 'paint-btn')
            .setInteractive()
            .setScale(0.3)
            .on('pointerdown', () => {
                this.player.nextColor()
            })
        this.pauseTxt = this.add.image(0, -70, 'pause-txt')
        this.menuBtn = this.add.image(0, 70, 'menu-btn')
            .setInteractive()
            .on('pointerdown', () => {
                this.gameSong.destroy()
                this.scene.start('MenuScene')
            })
        this.pauseBtnsContainer = this.add.container(width / 2, height / 2)
            .setDepth(999)
            .setVisible(false)

        this.pauseBtn = this.add.image(width - 40, 40, 'pause-btn')
            .setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.togglePauseMenu()
            })

        this.continueBtn = this.add.image(0, 0, 'continue-btn')
            .setInteractive()
            .on('pointerdown', () => {
                this.togglePauseMenu()
            })

        this.pauseBtnsContainer.add([
            this.pauseTxt,
            this.continueBtn,
            this.menuBtn
        ])
        this.physics.add.overlap(this.player, this.obstacleGroup, this.playerObstacleCollision, null, this)
        this.physics.add.overlap(this.player, this.lifeGroup, this.addLife, null, this)
        this.lifeHud = this.add.text(10, 10, '❤️❤️❤️', {
            fontSize: 30,
            padding: 10
        })
        this.scoreHud = this.add.text(width / 2, 10, '0', {
            fontSize: 30,
            color: '#ffbb00ff',
            fontStyle: 'bold',
            padding: 10
        }).setStroke('black', 3)
        this.scoreHud.x -= this.scoreHud.width / 2
    }
    update() {
        this.player.update()
        if (this.isLeftBtnPressed) {
            this.player.moveLeft()
        }
        if (this.isRightBtnPressed) {
            this.player.moveRight()
        }
    }
    /**
     * 
     * @param {Player} player 
     * @param {Obstacle} obstacle 
     */
    playerObstacleCollision(player, obstacle) {
        const audios = ['glass-audio-1', 'glass-audio-2', 'glass-audio-3']
        this.explosionEmitter.setActive(true)
        if (player.colorName == obstacle.obstacleColorName) {
            const aIndex = Phaser.Math.Between(0, 2)
            this.sound.play(audios[aIndex], { loop: false })
            this.explosionEmitter
                .setPosition(obstacle.x, obstacle.y)
                .setParticleTint(obstacle.obstacleColorCode)
                .explode(50)
            this.scoreHud.setText(Number(this.scoreHud.text) + 10)
        } else {
            this.sound.play('loss-audio', { loop: false })            
            this.lifes -= 1            
            this.updateLifeHud()
            if (this.lifes <= 0) {
                this.explosionEmitter
                    .setPosition(player.x, player.y)
                    .setParticleTint(player.colorCode)
                    .explode(50)
                this.player.kill()
                this.obstaclesEvent.destroy()
                this.time.delayedCall(2000, () => {
                    this.endGame()
                })
            }
        }
        obstacle.kill()
    }
    togglePauseMenu() {
        this.pauseRectangle.setVisible(!this.pauseRectangle.visible)
        this.obstaclesEvent.paused = !this.obstaclesEvent.paused
        this.lifeEvent.paused = !this.lifeEvent.paused
        
        if (this.physics.world.isPaused) {
            this.physics.world.resume()
        } else {
            this.physics.world.pause()
        }
        this.pauseBtnsContainer.setVisible(!this.pauseBtnsContainer.visible)
    }
    generateObstacle() {
        const x = Phaser.Math.Between(50, this.scale.width - 50)
        const y = -50

        /**
         * @type {Obstacle}
         */
        const o = this.obstacleGroup.get(x, y, 'line')
        if (o) {
            o.spawn(x, y)
        }

    }
    endGame() {
        this.gameSong.destroy()
        this.scene.start('EndScene', {
            score: this.scoreHud.text
        })
    }
    spawnLife() {
        const x = Math.floor(Math.random() * window.innerWidth - 20)
        const y = -20

        /** @type {Life} */
        const life = this.lifeGroup.get(x, y)
        life.spawn()
    }
    /**
     * 
     * @param {Player} player 
     * @param {Life} life 
     */
    addLife(player, life) {
        life.kill()
        if (this.lifes < 3) {            
            this.lifes += 1
            this.updateLifeHud()
        }
    }
    updateLifeHud() {
        this.lifeHud.setText('')
        for (let i = 0; i < this.lifes; i++) {
            this.lifeHud.setText(this.lifeHud.text + '❤️')
        }
    }
}