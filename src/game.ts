import 'phaser';
import { Krestinol } from './krestinol';

let myGame: Phaser.Game;

export function startGame(){

const config = {
    type: Phaser.CANVAS,
    backgroundColor: '#125555',
    width: 676,
    height: 1200,
    disableContextMenu: true,
    //scene: Krestinol,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
            }
        },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH, 
        mode: Phaser.Scale.FIT  
      },

      scene: [ Krestinol],
};
myGame = new Phaser.Game(config);
//const game = new Phaser.Game(config);
}

