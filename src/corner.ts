export class Corner{
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
            try{
                if(gameObject.texture.key == "backCard140"){
                    if(
                        //TODO раскоментировать после отладки
                        //gameObject.getData('card') == 0 && 
                        this.numUsedCards < 36){
                        let card = this.cardsImgArr[this.numUsedCards];
                        gameObject.data.values.card = card.data.values.card;
                        console.log(gameObject.data.values.ind);
                        card.setX(gameObject.x).setY(gameObject.y);
                        this.numUsedCards++;
                        this.addCard(gameObject.data.values.ind);
                        console.log('numUsedCards= ' + this.numUsedCards);
                    }
                }
            }catch(e){}
        });

        img = this.sc.add.image(176,586,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:0, card:0}))

        img = this.sc.add.image(176,694,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:1, card:0}))

        img = this.sc.add.image(286,694,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:2, card:0}))

        img = this.sc.add.image(176,804,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:3, card:0}))

        img = this.sc.add.image(286,804,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:4, card:0}))

        img = this.sc.add.image(396,804,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:5, card:0}))

        img = this.sc.add.image(176,914,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:6, card:0}))

        img = this.sc.add.image(286,914,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:7, card:0}))

        img = this.sc.add.image(396,914,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:8, card:0}))

        img = this.sc.add.image(506,914,'backCard140').setScale(0.7);
        img.setInteractive().setDataEnabled();
        this.bcCardsArr.push(img.setData({ind:9, card:0}))

        let cardImg:Phaser.GameObjects.Image

        // номера текстур карт начинаются с 0 и заканчиваются 35,
        // а номера самих карт с 1 и заканчиваются 36, значение 0
        // означает отсутствие карты
        for(let i=8; i>=0; i--){
            cardImg = this.sc.add.image(520,1028,'card'+(27+i)).setScale(0.8);
            cardImg.setData('card', (27+i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(27+i+1)
            cardImg = this.sc.add.image(520,1028,'card'+(18+i)).setScale(0.8);
            cardImg.setData('card', (18+i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(18+i+1)
            cardImg = this.sc.add.image(520,1028,'card'+(9+i)).setScale(0.8);
            cardImg.setData('card', (9+i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(9+i+1)
            cardImg = this.sc.add.image(520,1028,'card'+i).setScale(0.8);
            cardImg.setData('card', (i+1))
            this.cardsImgArr.unshift(cardImg)
            this.cardsArr.unshift(i+1)
        }
    }

    /** методу передаётся индекс ячейки поля для карт */
    addCard(ind:number){
        let clickedCard:number = this.bcCardsArr[ind].data.values.card;
        let suit:number = this.getSuitByNum(clickedCard)
        let bcArr:Array<number> = []
        let isLine:boolean = false
        switch(ind){
            // верхняя точка угла
            case 0:
                // проверяем есть ли вертикальный ряд из трёх карт
                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[3].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(3)

                        // проверяем на четверной ряд
                        if(this.bcCardsArr[6].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                                bcArr.push(6)
                            }
                }

                // проверяем  диагональ на тройной ряд
                if(this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(2)
                        bcArr.push(5)

                        // проверяем диагональ на четверной ряд
                        if(this.bcCardsArr[9].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                                bcArr.push(9)
                            }
                }
            break;
            
            // второй ряд левая точка
            case 1:
                // проверяем есть ли вертикальный ряд с ячейкой в центре из трёх карт
                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[3].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(3)

                        // проверяем на четверной ряд
                        if(this.bcCardsArr[6].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                                bcArr.push(6)
                            }
                }

                // проверяем есть ли тройной вертикальный ряд с ячейкой сверху
                if(this.bcCardsArr[3].data.values.card != 0 &&
                    this.bcCardsArr[6].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                        isLine = true
                        bcArr.push(3)
                        bcArr.push(6)

                        // проверяем на четверной ряд
                        if(this.bcCardsArr[0].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card)){
                                bcArr.push(0)
                            }
                }

                // проверяем диагональ
                if (this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)) {
                    isLine = true
                    bcArr.push(4)
                    bcArr.push(8)
                }

                if(isLine){
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // второй ряд правая точка
            case 2:
                // проверяем есть ли вертикальный ряд из трёх карт
                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[7].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(7)
                }

                // проверяем диагональ из трёх карт с картой в центре
                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(5)

                        // проверяем диагональ на четверной ряд
                        if(this.bcCardsArr[9].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                                bcArr.push(9)
                            }
                }

                // проверяем диагональ из трёх карт с картой сверху слева
                if(this.bcCardsArr[5].data.values.card != 0 &&
                    this.bcCardsArr[9].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                        isLine = true
                        bcArr.push(5)
                        bcArr.push(9)

                        // проверяем диагональ на четверной ряд
                        if(this.bcCardsArr[0].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card)){
                                bcArr.push(0)
                            }
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // левая точка третьего сверху ряда
            case 3:
                // проверяем горизонталь
                if(this.bcCardsArr[4].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(4)
                        bcArr.push(5)
                }

                // проверяем вертикаль на тройной ряд с картой в центре
                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[6].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(6)

                        // проверяем вертикаль на четверной ряд
                        if(this.bcCardsArr[0].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card)){
                                bcArr.push(0)
                            }
                }

                // проверяем вертикаль на тройной ряд с картой снизу
                if(this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[1].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card)){
                        isLine = true
                        bcArr.push(0)
                        bcArr.push(1)

                        // проверяем вертикаль на четверной ряд
                        if(this.bcCardsArr[6].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                                bcArr.push(6)
                            }
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // средняя точка третьего сверху ряда
            case 4:
                // проверяем горизонталь
                if(this.bcCardsArr[3].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(3)
                        bcArr.push(5)
                }

                // проверяем вертикаль
                if(this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[7].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card)){
                        isLine = true
                        bcArr.push(2)
                        bcArr.push(7)
                }

                // проверяем диагональ
                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(8)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // правая точка третьего ряда
            case 5:
                // проверяем тройной ряд по горизонтали
                if (this.bcCardsArr[3].data.values.card != 0 &&
                    this.bcCardsArr[4].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card)) {
                    isLine = true
                    bcArr.push(3)
                    bcArr.push(4)
                }

                // проверяем тройной ряд по диагонали с точкой в центре 
                if (this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[9].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)) {
                    isLine = true
                    bcArr.push(2)
                    bcArr.push(9)

                    // проверяем на четверной ряд
                    if (this.bcCardsArr[0].data.values.card != 0 &&
                        suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card)) {
                        bcArr.push(0)
                    }
                }

                // проверяем тройной ряд по диагонали с точкой справа внизу
                if (this.bcCardsArr[0].data.values.card != 0 &&
                    this.bcCardsArr[2].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card)) {
                    isLine = true
                    bcArr.push(0)
                    bcArr.push(2)

                    // проверяем на четверной ряд по диагонали
                    if (this.bcCardsArr[9].data.values.card != 0 &&
                        suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)) {
                        bcArr.push(9)
                    }
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // третья слева точка нижнего ряда
            case 6:
                // проверяем тройной ряд по вертикали 
                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[3].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[3].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(3)

                        // проверяем на четверной ряд
                        if(this.bcCardsArr[0].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card)){
                                bcArr.push(0)
                            }
                }

                // проверяем тройной ряд по горизонтали
                if(this.bcCardsArr[7].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(7)
                        bcArr.push(8)

                        // проверяем на четверной ряд
                        if(this.bcCardsArr[9].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                                bcArr.push(9)
                        }
                }
                
                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // вторая справа точка нижнего ряда
            case 7:
                // проверяем тройной ряд по горизонтали, где точка в центре 
                if(this.bcCardsArr[6].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(6)
                        bcArr.push(8)

                        // проверяем продолжение ряда вправо до четверного 
                        if(this.bcCardsArr[9].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                                bcArr.push(9)
                        }
                }

                // проверяем тройной ряд по горизонтали, где точка слева от ряда 
                if(this.bcCardsArr[8].data.values.card != 0 &&
                    this.bcCardsArr[9].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                        isLine = true
                        bcArr.push(8)
                        bcArr.push(9)

                        // проверяем продолжение ряда вправо до четверного 
                        if(this.bcCardsArr[6].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                                bcArr.push(6)
                        }
                }

                // проверяем тройной ряд по вертикали 
                if (this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[4].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card)) {
                    isLine = true
                    bcArr.push(2)
                    bcArr.push(4)
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // третья слева точка нижнего ряда
            case 8:
                // проверяем тройной ряд по диагонали 
                if(this.bcCardsArr[1].data.values.card != 0 &&
                    this.bcCardsArr[4].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[1].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[4].data.values.card)){
                        isLine = true
                        bcArr.push(1)
                        bcArr.push(4)
                }

                // проверяем тройной ряд по горизонтали 
                if(this.bcCardsArr[7].data.values.card != 0 &&
                    this.bcCardsArr[9].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[9].data.values.card)){
                        isLine = true
                        bcArr.push(7)
                        bcArr.push(9)

                        // проверяем продолжение ряда влево до четверного 
                        if(this.bcCardsArr[6].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                                bcArr.push(6)
                        }
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;

            // крайняя правая точка нижнего ряда
            case 9:
                // проверяем тройной ряд по диагонали 
                if(this.bcCardsArr[2].data.values.card != 0 &&
                    this.bcCardsArr[5].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[2].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[5].data.values.card)){
                        isLine = true
                        bcArr.push(2)
                        bcArr.push(5)

                        // проверяем продолжение диагонали до четверного ряда
                        if(this.bcCardsArr[0].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[0].data.values.card)){
                                bcArr.push(0)
                        }
                }

                // проверяем тройной ряд по горизонтали 
                if(this.bcCardsArr[7].data.values.card != 0 &&
                    this.bcCardsArr[8].data.values.card != 0 &&
                    suit == this.getSuitByNum(this.bcCardsArr[7].data.values.card) &&
                    suit == this.getSuitByNum(this.bcCardsArr[8].data.values.card)){
                        isLine = true
                        bcArr.push(7)
                        bcArr.push(8)

                        // проверяем продолжение влево до четверного ряда
                        if(this.bcCardsArr[6].data.values.card != 0 &&
                            suit == this.getSuitByNum(this.bcCardsArr[6].data.values.card)){
                                bcArr.push(6)
                        }
                }

                if (isLine) {
                    bcArr.push(ind)
                    this.clearLine(bcArr)
                }
                break;
        }
        console.log("add card, ind = "+ind)
    }

    /** возвращает масть по номеру карты, номера карт начинаются с 1 */
    getSuitByNum( numOfCard:number){
        if (Math.floor((numOfCard - 1)/9) == 0)
            return 0
        else if (Math.floor((numOfCard - 1)/9) == 1)
            return 1
        else if (Math.floor((numOfCard - 1)/9) == 2)
            return 2
        return 3
    }

    clearLine(bcArr:Array<number>){
        let cardVal:number;
        let cardImg:Phaser.GameObjects.Image;

        for (let i = 0; i < bcArr.length; i++) {
            cardVal = this.bcCardsArr[bcArr[i]].data.values.card;
            if (cardVal != 0) {
                cardImg = this.cardsImgArr.find(
                    (img) => {
                        if (img.data.values.card == cardVal) return true;
                    })
                cardImg.setActive(false).setVisible(false);
                this.bcCardsArr[bcArr[i]].data.values.card = 0;
            }
        }
    }

}