export class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' })
    }
    preload() {
        this.load.image('purple-bg', 'assets/img/bg/purple-bg.jpg')
        this.load.image('sound-on', 'assets/img/menu/sound-on.png')
        this.load.image('sound-off', 'assets/img/menu/sound-off.png')
        this.load.image('sound-txt', 'assets/img/menu/sound-txt.png')
        this.load.image('left-btn', 'assets/img/hud/left-btn.png')
        this.load.image('easy-btn', 'assets/img/menu/easy-btn.png')
        this.load.image('normal-btn', 'assets/img/menu/normal-btn.png')
        this.load.image('hard-btn', 'assets/img/menu/hard-btn.png')
        this.load.image('level-txt', 'assets/img/menu/level-txt.png')
    }
    create() {
        const width = this.scale.width
        const height = this.scale.height

        this.add.tileSprite(0, 0, 2000, 2000, 'purple-bg')
            .setAlpha(0.8)
            .setOrigin(0)

        const rectangle = this.add.rectangle(width / 2, height / 2, 350, 400, 0x00330066)
            .setRounded(20)

        this.soundTxt = this.add.image(0, -140, 'sound-txt')
        this.leftBtn = this.add.image(-130, -140, 'left-btn')
            .setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MenuScene')
            })

        const storageSoundPref = localStorage.getItem('sound') || 'sound-on'
        this.soundBtn = this.add.image(0, -50, storageSoundPref)
        this.soundBtn.setInteractive()
        this.soundBtn.setScale(0.15)
        this.soundBtn.on('pointerdown', () => {
            this.sound.mute = !this.sound.mute
            const value = localStorage.getItem('sound') == 'sound-on' ? 'sound-off' : 'sound-on'
            localStorage.setItem('sound', value)
            this.soundBtn.setTexture(value)
        })
        this.levelTxt = this.add.image(0, 50, 'level-txt')
        this.levelBtn = this.add.image(0, 120, 'easy-btn')
            .setInteractive()
        this.levelBtn.on('pointerdown', () => {
            const currentLevel = localStorage.getItem('level')
            if (currentLevel) {
                if (currentLevel == 'easy') {
                    localStorage.setItem('level', 'normal')
                    this.levelBtn.setTexture('normal-btn')
                } else if (currentLevel == 'normal') {
                    localStorage.setItem('level', 'hard')
                    this.levelBtn.setTexture('hard-btn')
                } else {
                    localStorage.setItem('level', 'easy')
                    this.levelBtn.setTexture('easy-btn')
                }
            } else {
                localStorage.setItem('level', 'easy')
                this.levelBtn.setTexture('easy-btn')
            }
        })
        this.btnsContainer = this.add.container(width / 2, height / 2)

        this.btnsContainer.add([
            this.leftBtn,
            this.soundTxt,
            this.soundBtn,
            this.levelTxt,
            this.levelBtn
        ])
    }
    update() {

    }
}