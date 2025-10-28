import 'phaser'
import { GameObjects } from 'phaser'
export class HVenzel{
    sc:Phaser.Scene
    bcCardsGrp:Phaser.GameObjects.Group
    bcCardsCont:Phaser.GameObjects.Container
    bcCardsArr:Array<Phaser.GameObjects.Image> = []

    constructor(scene:Phaser.Scene){
        this.sc = scene
        let img:Phaser.GameObjects.Image
        this.sc.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            try{
                if(gameObject.texture.key == "backCard"){
                    let ind = gameObject.getData('ind');
                    let card = gameObject.getData('card');
                    if(card == 0) this.addCard(ind);
                }
            }catch(e){}
        });

        img = this.sc.add.image(192,568,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:0, card:0}))

        img = this.sc.add.image(480,568,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:1, card:0}))

        img = this.sc.add.image(192,688,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:2, card:0}))

        img = this.sc.add.image(288,688,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:3, card:0}))

        img = this.sc.add.image(384,688,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:4, card:0}))

        img = this.sc.add.image(480,688,'backCard').setScale(0.8);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:5, card:0}))

        img = this.sc.add.image(192,808,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:6, card:0}))

        img = this.sc.add.image(480,808,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:7, card:0}))

        img = this.sc.add.image(192,928,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:8, card:0}))

        img = this.sc.add.image(480,928,'backCard').setScale(0.8)
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:9, card:0}))
    }

    addCard(ind:number){
        switch(ind){
            case 0:
                if(this.bcCardsArr[2].data["ind"] == 0){

                }
        }
        console.log("add card, ind = "+ind)
    }
}


// this.add.image(192,568,'backCard').setScale(0.8);
//         this.add.image(480,568,'backCard').setScale(0.8);
//         this.add.image(192,688,'backCard').setScale(0.8);
//         this.add.image(480,688,'backCard').setScale(0.8);
//         this.add.image(192,808,'backCard').setScale(0.8);
//         this.add.image(480,808,'backCard').setScale(0.8);
//         this.add.image(192,928,'backCard').setScale(0.8);
//         this.add.image(480,928,'backCard').setScale(0.8);

//         this.add.image(288,688,'backCard').setScale(0.8);
//         this.add.image(384,688,'backCard').setScale(0.8);