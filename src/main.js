import Phaser, { Scale } from 'phaser'
import { MenuScene } from './scenes/menuScene'
import { GameScene } from './scenes/gameScene'
import { EndScene } from './scenes/endScene'
import { SettingsScene } from './scenes/settingsScene'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  autoCenter: Phaser.Scale.CENTER_BOTH,
  scene: [MenuScene, GameScene, EndScene, SettingsScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  }
})