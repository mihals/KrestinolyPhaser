import 'phaser';
import { Square } from './square';

export  class Krestinol extends Phaser.Scene
{
    leftLeaf:Phaser.GameObjects.Image;
    rightLeaf:Phaser.GameObjects.Image;
    cornerShld:Phaser.GameObjects.Image;
    card0:Phaser.GameObjects.Image;
    backCard:Phaser.GameObjects.Image;
    soliterField:Phaser.GameObjects.Image;

    backCardArr:Array<Phaser.GameObjects.Image> = []

    constructor ()
    {
        super('krestinol');
    }

    preload ()
    {
        for(let i = 0; i<36; i++){
            this.load.image('card'+i, './assets/cards/card'+i+'.png');
        }

        this.load.image('cornerShld', './assets/cornerShld.png');
        this.load.image('leftLeaf','./assets/leftLeaf.png');
        this.load.image('rightLeaf','./assets/rightLeaf.png');
        this.load.image('hole', './assets/hole.png');
        this.load.image('soliterField','./assets/soliterField.png');
        this.load.image('card0','./assets/card0.png');
        this.load.image('card3_72','./assets/card3_72.png');
        this.load.image('backCard','./assets/backCard.png');
        this.load.image('backCard140','./assets/backCard140.png');
    }

    create ()
    {
        //this.add.image(338,725,'cornerShld').setOrigin(0.5,0.5);
        //this.add.image(338,600,'hole').setScale(0.25)

        this.leftLeaf = this.add.image(279,733,'leftLeaf');
        this.rightLeaf = this.add.image(398,734,'rightLeaf');
        
        let leftLeafDelta = this.leftLeaf.x - this.leftLeaf.width/4
        let rightLeafDelta = this.rightLeaf.x + this.rightLeaf.width/4
        
        this.add.image(338,600,'hole');

        this.cornerShld = this.add.image(340,770,'cornerShld');

        this.soliterField = this.add.image(338,796,'soliterField');

        let square:Square = new Square(this)

        // this.add.image(192,568,'backCard').setScale(0.8);
        // this.add.image(480,568,'backCard').setScale(0.8);
        // this.add.image(192,688,'backCard').setScale(0.8);
        // this.add.image(480,688,'backCard').setScale(0.8);
        // this.add.image(192,808,'backCard').setScale(0.8);
        // this.add.image(480,808,'backCard').setScale(0.8);
        // this.add.image(192,928,'backCard').setScale(0.8);
        // this.add.image(480,928,'backCard').setScale(0.8);

        // this.add.image(288,688,'backCard').setScale(0.8);
        // this.add.image(384,688,'backCard').setScale(0.8);

        //this.card0 = this.add.image(182,574,'card0').setInteractive();

        //this.backCardArr.push(this.add.image(192,574,'backCard').setScale(0.75))

        this.tweens.add({
            targets: this.leftLeaf,
            x: { value: leftLeafDelta, duration: 4000, ease: 'Power2' },
            scaleX: { value: 0.5, duration: 4000, ease: 'Power2' }
        });

        this.tweens.add({
            targets: this.rightLeaf,
            x: { value: rightLeafDelta, duration: 4000, ease: 'Power2' },
            scaleX: { value: 0.5, duration: 4000, ease: 'Power2' }
        });

        //this.cameras.main.setZoom(4)
    }

    update(time: number, delta: number): void {
        
    }
}