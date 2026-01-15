import { interstitial } from "../ads/interstitial"

export class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' })
    }
    init(data) {
        const storedRecord = Number(localStorage.getItem('record'))
        this.currentScore = Number(data.score)

        if (!storedRecord || this.currentScore > storedRecord) {
            localStorage.setItem('record', this.currentScore)
        }
    }
    preload() {
        this.load.image('menu-btn', 'assets/img/menu/menu-btn.png')
        this.load.image('score-txt', 'assets/img/menu/score.png')
        this.load.image('play-again-btn', 'assets/img/menu/play-again-btn.png')
        this.load.image('play-again-btn', 'assets/img/menu/score.png')
        this.load.image('purple-bg', 'assets/img/bg/purple-bg.jpg')
    }
    async create() {
        await interstitial()
        const width = this.scale.width
        const height = this.scale.height

        this.add.tileSprite(0, 0, 2000, 2000, 'purple-bg')
            .setAlpha(0.8)
            .setOrigin(0)

        const rectangle = this.add.rectangle(width / 2, height / 2, 350, 400, 0x00330066)
            .setRounded(20)

        this.btnsContainer = this.add.container(width / 2, height / 2)

        this.scoreTxt = this.add.image(0, -140, 'score-txt')
        this.scoreValue = this.add.text(0, -110, this.currentScore, {
            fontSize: 40,
            color: '#ffbb00ff',
            fontStyle: 'bold',
            padding: 10,
            fontFamily: 'Arial'
        }).setStroke('black', 3)
        this.scoreValue.x -= this.scoreValue.width / 2

        this.playAgainBtn = this.add.image(0, 0, 'play-again-btn')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene')
            })
        this.menuBtn = this.add.image(0, 70, 'menu-btn')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MenuScene')
            })

        this.btnsContainer.add([
            this.scoreTxt,
            this.scoreValue,
            this.playAgainBtn,
            this.menuBtn,
        ])
    }
    update() {

    }
}