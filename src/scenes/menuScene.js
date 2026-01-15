import Phaser from 'phaser'
import { banner } from '../ads/banner'
import { AdMob } from '@capacitor-community/admob'

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' })
    }
    preload() {
        this.load.image('play-btn', 'assets/img/menu/play-btn.png')
        this.load.image('settings-btn', 'assets/img/menu/settings-btn.png')
        this.load.image('app-logo', 'assets/img/menu/app-logo.png')
        this.load.image('purple-bg', 'assets/img/bg/purple-bg.jpg')
        this.load.image('exit-btn', 'assets/img/menu/exit-btn.png')
    }
    async create() {
        await banner()
        const width = this.scale.width
        const height = this.scale.height
        this.add.tileSprite(0, 0, 2000, 2000, 'purple-bg')
            .setTileScale(1, 1)
            .setAlpha(0.8)
            .setOrigin(0)

        const storageRecord = localStorage.getItem('record')
        if (storageRecord) {
            this.recordTxt = this.add.text(width / 2, height - 200, 'Record', {
                fontSize: 40,
                color: '#ffbb00ff',
                fontStyle: 'bold',
                padding: 10,
                fontFamily: 'Arial'
            }).setStroke('black', 3)
            this.recordTxt.x -= this.recordTxt.width / 2
            this.recordValue = this.add.text(width / 2, height - 150, storageRecord, {
                fontSize: 40,
                color: '#ffbb00ff',
                fontStyle: 'bold',
                padding: 10,
                fontFamily: 'Arial'
            }).setStroke('black', 3)
            this.recordValue.x -= this.recordValue.width / 2
        }

        //const rectangle = this.add.rectangle(width / 2, height / 2, 350, 400, 0x006600FF).setRounded(20)

        this.add.image(width / 2, 150, 'app-logo')
            .setScale(0.8)

        this.btnsContainer = this.add.container(width / 2, height / 2)

        this.playBtn = this.add.image(0, 0, 'play-btn')
            .setInteractive()
            .setScale(0.5)
            .on('pointerdown', () => {
                AdMob.removeBanner()
                this.scene.start('GameScene')
            })

        this.settingsBtn = this.add.image(0, 70, 'settings-btn')
            .setInteractive()
            .setScale(0.2)
            .on('pointerdown', () => {
                this.scene.start('SettingsScene')
            })
        this.exitBtn = this.add.image(0, 140, 'exit-btn')
            .setInteractive()
            .setScale(0.1)
            .on('pointerdown', () => {

            })
        this.tweens.add({
            targets: [this.playBtn, this.settingsBtn, this.exitBtn],
            scale: 1,
            duration: 500,
            ease: 'Bounce.Out'
        })
        this.btnsContainer.add([
            this.playBtn,
            this.settingsBtn,
            this.exitBtn
        ])

    }
    update() {

    }
}