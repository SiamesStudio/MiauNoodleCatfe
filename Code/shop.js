class Shop extends Phaser.Scene {
    constructor(){
        super("Shop")
    }

    init(gameData){
        this.gameStrings = new GameStrings()
        this.currentLanguage = gameData.language
        if(gameData.language){
            this.gameStrings.convertToSpanish()
        }else{
            this.gameStrings.convertToEnglish()
        }
    }

    preload(){
        this.load.image('coin_1','assets/UI/coin_1.png');
        this.load.image('coin_2','assets/UI/coin_2.png');
        this.load.image('coin_3','assets/UI/coin_3.png');
        this.load.image('coin_4','assets/UI/coin_4.png');
        this.load.image('coin_5','assets/UI/coin_5.png');
        this.load.image('coin_6','assets/UI/coin_6.png');

        this.load.image('diamond_1','assets/UI/diamond_1.png');
        this.load.image('diamond_2','assets/UI/diamond_2.png');
        this.load.image('diamond_3','assets/UI/diamond_3.png');
        this.load.image('diamond_4','assets/UI/diamond_4.png');
        this.load.image('diamond_5','assets/UI/diamond_5.png');
        this.load.image('diamond_6','assets/UI/diamond_6.png');
    }

    create(){
        this.CoinsSelected = true;
        var scene = this;
        var background = this.add.image(config.width/2,config.height/2,'selection_menu_background')//fondo
        background.displayWidth = config.width;
        background.displayHeight = config.height;


        this.shopBanner = this.add.sprite(config.width/2, config.height/2,'banner_long').setScale(0.3)

        this.slot1 = this.add.sprite(config.width/4, 2*config.height/5,'banner_big').setScale(0.065)
        this.slot2 = this.add.sprite(2*config.width/4, 2*config.height/5,'banner_big').setScale(0.065)
        this.slot3 = this.add.sprite(3*config.width/4, 2*config.height/5,'banner_big').setScale(0.065)

        this.slot4 = this.add.sprite(config.width/4, 4*config.height/5,'banner_big').setScale(0.065)
        this.slot5 = this.add.sprite(2*config.width/4, 4*config.height/5,'banner_big').setScale(0.065)
        this.slot6 = this.add.sprite(3*config.width/4, 4*config.height/5,'banner_big').setScale(0.065)

        this.bannerCoins = this.add.sprite(config.width/4, config.height/7,'banner_light').setScale(0.5)
        this.coinsText = this.add.text(config.width/4, config.height/7, this.gameStrings.Shop_coinsText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5)
        this.bannerDiamonds = this.add.sprite(config.width/2, config.height/7,'banner_light').setScale(0.5).setTint(0xb0b0b0)
        this.diamondsText = this.add.text(config.width/2, config.height/7, this.gameStrings.Shop_diamondsText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setTint(0xb0b0b0);;

        this.bannerCoins.setInteractive().on('pointerdown', () => {this.selectCoins();})
        this.bannerCoins.disableInteractive()
        this.bannerDiamonds.setInteractive().on('pointerdown', () => {this.selectDiamonds();})

        

        this.bannerSlot1 = this.add.sprite(config.width/4, 2.6*config.height/5,'banner_light').setScale(0.5).setTint(0x32a852)
        this.bannerDlot1Text = this.add.text(config.width/4, 2.6*config.height/5, this.gameStrings.Shop_freeText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.diamond_1 = this.add.sprite(config.width/4, 1.8*config.height/5,'diamond_1').setVisible(false)
        this.coin_1 = this.add.sprite(config.width/4, 1.8*config.height/5,'coin_1')

        this.bannerSlot2 = this.add.sprite(2*config.width/4, 2.6*config.height/5,'banner_light').setScale(0.5).setTint(0x32a852)
        this.bannerDlot2Text = this.add.text(2*config.width/4, 2.6*config.height/5, '1.99 €', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.diamond_2 = this.add.sprite(2*config.width/4, 1.8*config.height/5,'diamond_2').setVisible(false)
        this.coin_2 = this.add.sprite(2*config.width/4, 1.8*config.height/5,'coin_2')

        this.bannerSlot3 = this.add.sprite(3*config.width/4, 2.6*config.height/5,'banner_light').setScale(0.5).setTint(0x32a852)
        this.bannerDlot3Text = this.add.text(3*config.width/4, 2.6*config.height/5, '4.99 €', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.diamond_3 = this.add.sprite(3*config.width/4, 1.8*config.height/5,'diamond_3').setVisible(false)
        this.coin_3 = this.add.sprite(3*config.width/4, 1.8*config.height/5,'coin_3')
        
        this.bannerSlot4 = this.add.sprite(config.width/4, 4.6*config.height/5,'banner_light').setScale(0.5).setTint(0x32a852)
        this.bannerDlot4Text = this.add.text(config.width/4, 4.6*config.height/5, '9.99 €', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.diamond_4 = this.add.sprite(config.width/4, 3.8*config.height/5,'diamond_4').setVisible(false)
        this.coin_4 = this.add.sprite(config.width/4, 3.8*config.height/5,'coin_4')

        this.bannerSlot5 = this.add.sprite(2*config.width/4, 4.6*config.height/5,'banner_light').setScale(0.5).setTint(0x32a852)
        this.bannerDlot5Text = this.add.text(2*config.width/4, 4.6*config.height/5, '49.99 €', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.diamond_5 = this.add.sprite(2*config.width/4, 3.8*config.height/5,'diamond_5').setVisible(false)
        this.coin_5 = this.add.sprite(2*config.width/4, 3.8*config.height/5,'coin_5')

        this.bannerSlot6 = this.add.sprite(3*config.width/4, 4.6*config.height/5,'banner_light').setScale(0.5).setTint(0x32a852)
        this.bannerDlot6Text = this.add.text(3*config.width/4, 4.6*config.height/5, '99.99 €', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.diamond_6 = this.add.sprite(3*config.width/4, 3.8*config.height/5,'diamond_6').setVisible(false)
        this.coin_6 = this.add.sprite(3*config.width/4, 3.8*config.height/5,'coin_6')


        this.bannerSlot1.setInteractive().on('pointerdown', () => {this.buy_Slot(1);})
        this.bannerSlot2.setInteractive().on('pointerdown', () => {this.buy_Slot(2);})
        this.bannerSlot3.setInteractive().on('pointerdown', () => {this.buy_Slot(3);})
        this.bannerSlot4.setInteractive().on('pointerdown', () => {this.buy_Slot(4);})
        this.bannerSlot5.setInteractive().on('pointerdown', () => {this.buy_Slot(5);})
        this.bannerSlot6.setInteractive().on('pointerdown', () => {this.buy_Slot(6);})


        //BACK
        var backButton = this.add.sprite(config.width/12, 9*config.height/10,'back').setScale(0.08)
        backButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu", {language: this.currentLanguage});})

    }

    selectCoins(){
        this.bannerCoins.disableInteractive()
        this.bannerCoins.setTint(0xffffff)
        this.coinsText.setTint(0xffffff)
        this.bannerDiamonds.setInteractive()
        this.bannerDiamonds.setTint(0xb0b0b0)
        this.diamondsText.setTint(0xb0b0b0)
        this.CoinsSelected = true;
        this.diamond_1.setVisible(false)
        this.diamond_2.setVisible(false)
        this.diamond_3.setVisible(false)
        this.diamond_4.setVisible(false)
        this.diamond_5.setVisible(false)
        this.diamond_6.setVisible(false)
        this.coin_1.setVisible(true)
        this.coin_2.setVisible(true)
        this.coin_3.setVisible(true)
        this.coin_4.setVisible(true)
        this.coin_5.setVisible(true)
        this.coin_6.setVisible(true)
    }

    selectDiamonds(){
        this.CoinsSelected = false
        this.bannerDiamonds.disableInteractive()
        this.bannerDiamonds.setTint(0xffffff)
        this.diamondsText.setTint(0xffffff)
        this.bannerCoins.setInteractive()
        this.bannerCoins.setTint(0xb0b0b0)
        this.coinsText.setTint(0xb0b0b0)
        this.diamond_1.setVisible(true)
        this.diamond_2.setVisible(true)
        this.diamond_3.setVisible(true)
        this.diamond_4.setVisible(true)
        this.diamond_5.setVisible(true)
        this.diamond_6.setVisible(true)
        this.coin_1.setVisible(false)
        this.coin_2.setVisible(false)
        this.coin_3.setVisible(false)
        this.coin_4.setVisible(false)
        this.coin_5.setVisible(false)
        this.coin_6.setVisible(false)
    }

    buy_Slot(number){
        if(this.CoinsSelected){
            alert("Has comprado monedas : " + number)
            totalCoins += number;
        }
        else{
            alert("Has comprado diamantes : " + number)
            totalDiamonds += number;
        }
    }

    
}