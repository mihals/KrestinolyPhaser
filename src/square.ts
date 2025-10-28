import 'phaser'

export class Square{
    sc:Phaser.Scene
    bcCardsArr:Array<Phaser.GameObjects.Image> = []
    cardsImgArr:Array<Phaser.GameObjects.Image> = []
    cardsArr:Array<number> = []
    card:Phaser.GameObjects.Image
    numUsedCards

    constructor(scene:Phaser.Scene){
        this.sc = scene;
        this.numUsedCards = 0;
        let img:Phaser.GameObjects.Image
        this.sc.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            // if(this.numUsedCards == 10){
            //     this.bcCardsArr.forEach((val) => {
            //         val.destroy();
            //     })
            //     console.log("bcCardsArr.length= "+this.bcCardsArr.length);
            //     this.bcCardsArr = [];
            // }
            try{
                if(gameObject.texture.key == "backCard140"){
                    if(gameObject.getData('card') == 0 && this.numUsedCards < 36){
                        let card = this.cardsImgArr[this.numUsedCards];
                        gameObject.data.values.card = card.data.values.card;
                        console.log(gameObject.data.values.ind);
                        card.setX(gameObject.x).setY(gameObject.y);
                        this.numUsedCards++;
                        this.addCard(gameObject.data.values.ind);
                        console.log('numUsedCards= ' + this.numUsedCards);
                    }
                    
                    //let card = gameObject.getData('card');
                    //if(card == 0) this.addCard(ind);
                }
            }catch(e){}
        });

        img = this.sc.add.image(188,596,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:0, card:0}))

        img = this.sc.add.image(336,596,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:1, card:0}))

        img = this.sc.add.image(484,596,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:2, card:0}))

        img = this.sc.add.image(188,740,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:3, card:0}))

        img = this.sc.add.image(336,740,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:4, card:0}))

        img = this.sc.add.image(484,740,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:5, card:0}))

        img = this.sc.add.image(188,886,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:6, card:0}))

        img = this.sc.add.image(338,886,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:7, card:0}))

        img = this.sc.add.image(486,886,'backCard140');
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:8, card:0}))

        //this.card = this.sc.add.image(188,596,'card3_72');
        //this.card = this.sc.add.image(188,596,'card0').setScale(1.1)

        let cardImg:Phaser.GameObjects.Image

        // номера текстур карт начинаются с 0 и заканчиваются 35,
        // а номера самих карт с 1 и заканчиваются 36, значение 0
        // означает отсутствие карты
        for(let i=8; i>=0; i--){
            cardImg = this.sc.add.image(516,1020,'card'+(27+i)).setScale(1.1);
            cardImg.setData('card', (27+i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(27+i+1)
            cardImg = this.sc.add.image(516,1020,'card'+(18+i)).setScale(1.1);
            cardImg.setData('card', (18+i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(18+i+1)
            cardImg = this.sc.add.image(516,1020,'card'+(9+i)).setScale(1.1);
            cardImg.setData('card', (9+i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(9+i+1)
            cardImg = this.sc.add.image(516,1020,'card'+i).setScale(1.1);
            cardImg.setData('card', (i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(i+1)
        }
    }

    /** методу передаётся индекс ячейки поля для карт */
    addCard(ind:number){
        let clickedCard:number = this.bcCardsArr[ind].data.values.card;
        let suit:number = this.getSuitByNum(clickedCard)
        let indArr:Array<number> = []
        let bcArr:Array<number> = []
        let indInCardArr = -1
        let isLine:boolean = false
        switch(ind){
            case 0:
                // проверяем погоризонтали совпадают ли масти
                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[2].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(2)
                }

                // проверяем по вертикали
                if(this.bcCardsArr[3].data.values.card != 0 &&
                    this.bcCardsArr[6].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                        isLine = true
                        bcArr.push(3)
                        bcArr.push(6)
                }

                // проверяем по диагонали
                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(8)
                }

                if(isLine){
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
            break;
            
            case 1:
                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[2].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(2)
                }

                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[7].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(7)
                }

                if(isLine){
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 2:
                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[1].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(1)
                }

                if(this.bcCardsArr[5].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(5)
                        bcArr.push(8)
                }

                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[6].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(6)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 3:
                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[6].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(6)
                }

                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(5)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 4:
                if(this.bcCardsArr[3].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(3)
                        bcArr.push(5)
                }

                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[7].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(7)
                }

                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(8)
                }

                if(this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[6].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                        isLine = true
                        bcArr.push(2)
                        bcArr.push(6)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 5:
                if(this.bcCardsArr[3].data.values.card != 0 &&
                    this.bcCardsArr[4].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card)){
                        isLine = true
                        bcArr.push(3)
                        bcArr.push(4)
                }

                if(this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(2)
                        bcArr.push(8)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 6:
                if(this.bcCardsArr[7].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(7)
                        bcArr.push(8)
                }

                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[3].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(3)
                }

                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[2].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(2)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 7:
                if(this.bcCardsArr[6].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(6)
                        bcArr.push(8)
                }

                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[4].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(4)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            case 8:
                if(this.bcCardsArr[6].data.values.card != 0 &&
                    this.bcCardsArr[7].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card)){
                        isLine = true
                        bcArr.push(6)
                        bcArr.push(7)
                }

                if(this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(2)
                        bcArr.push(5)
                }

                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[4].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(4)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;
        }
        console.log("add card, ind = "+ind)
    }

    clearLine(bcArr:Array<number>){
        let cardVal:number;
        let cardImg:Phaser.GameObjects.Image;

        bcArr.forEach((val) => {
            cardVal = this.bcCardsArr[val].data.values.card;
            cardImg = this.cardsImgArr.find((img) => {
                if (img.data.values.card == cardVal) return true;
            })
            cardImg.setActive(false).setVisible(false);
            this.bcCardsArr[val].data.values.card = 0;
        })
        console.log("clearLine")
    }

    // возвращает карту по её номеру(номера карт начинаются с 1),
    // номер шестёрки пик = 1
    // getCardByNum( numOfCard:number){
    //     let cardVal = (numOfCard -1)%9 +1
    //     let cardSuit = (numOfCard-1)//9
    //     return (cardSuit*9 + cardVal)
    // }
    
    // возвращает масть по номеру карты, номера карт начинаются с 1 
    getSuitByNum( numOfCard:number){
        if (Math.floor((numOfCard - 1)/9) == 0)
            return 0
        else if (Math.floor((numOfCard - 1)/9) == 1)
            return 1
        else if (Math.floor((numOfCard - 1)/9) == 2)
            return 2
        return 3
    }
}
