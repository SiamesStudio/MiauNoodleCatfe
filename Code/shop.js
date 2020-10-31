class Shop extends Phaser.Scene {
    constructor(){
        super("Shop")
    }

    init(gameData){
        this.gameStrings = new ShopStrings()
        this.playerSettings = gameData.playerInfo
        console.log(this.playerSettings)

        if(this.playerSettings.language){
            this.gameStrings.convertToSpanish()
        }else{
            this.gameStrings.convertToEnglish()
        }
    }

    preload(){

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


        this.bannerSlot1.setInteractive().on('pointerdown', () => {console.log(1), this.buyScreen(1);})
        this.bannerSlot2.setInteractive().on('pointerdown', () => {console.log(2), this.buyScreen(2);})
        this.bannerSlot3.setInteractive().on('pointerdown', () => {console.log(3), this.buyScreen(3);})
        this.bannerSlot4.setInteractive().on('pointerdown', () => {console.log(4), this.buyScreen(4);})
        this.bannerSlot5.setInteractive().on('pointerdown', () => {console.log(5), this.buyScreen(5);})
        this.bannerSlot6.setInteractive().on('pointerdown', () => {console.log(6), this.buyScreen(6);})


        //BACK
        var backButton = this.add.sprite(config.width/12, 9*config.height/10,'back').setScale(0.08)
        backButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu", {playerInfo: this.playerSettings});})

        //EXTRA
        this.blackScreen = this.add.image(config.width/2, config.height/2, 'blackScreen').setAlpha(0.5);
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'banner_long').setScale(0.2)
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'cross').setScale(0.03)
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        this.confirmationText = this.add.text(config.width/2, config.height/2, '', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false);
        this.confirmationButton = this.add.image(2.4*config.width/5, 2*config.height/3,'banner_light').setScale(0.5).setVisible(false).setTint(0x32a852).setOrigin(1,0.5)
        this.negationButton = this.add.image(2.6*config.width/5, 2*config.height/3,'banner_light').setScale(0.5).setVisible(false).setTint(0xeb4034).setOrigin(0,0.5)
        this.number = 0

        this.confirmationButton.setInteractive().on('pointerdown', () => {this.buy_Slot(this.number);})
        this.negationButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})


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

    buyScreen(number){
        this.number = number
        console.log("BuyScreen: "+number)
        this.blackScreen.setVisible(true)
        this.extraBanner.setVisible(true)
        this.crossButton.setVisible(true)
        this.confirmationText.setVisible(true)
        this.confirmationText.setText(this.gameStrings.Shop_buyConfirmation)
        this.confirmationButton.setVisible(true)
        this.negationButton.setVisible(true)
    }


    buy_Slot(number){
        this.negationButton.setVisible(false)
        this.confirmationButton.setVisible(false)
        //console.log("He entrado "+ number)
        if(this.CoinsSelected){
            this.playerSettings.coins += number
            this.savePlayerSettings()
            if(this.playerSettings.language){
                this.confirmationText.setText('¡Has obtenido '+number+' monedas!');
            }
            else{
                this.confirmationText.setText('Obtained '+number+' coins!');
            }
            
        }
        else{
            this.playerSettings.diamonds += number
            this.savePlayerSettings()
            if(this.playerSettings.language){
                this.confirmationText.setText('¡Has obtenido '+number+' diamantes!');
            }else{
                this.confirmationText.setText('Obtained '+number+' diamonds!');
            }
            
        }
        
    }

    enableAllButtons(){
        this.bannerSlot1.setInteractive()
        this.bannerSlot2.setInteractive()
        this.bannerSlot3.setInteractive()
        this.bannerSlot4.setInteractive()
        this.bannerSlot5.setInteractive()
        this.bannerSlot6.setInteractive()

        this.blackScreen.setVisible(false)
        this.extraBanner.setVisible(false)
        this.crossButton.setVisible(false)
        this.confirmationText.setVisible(false)
        this.confirmationButton.setVisible(false)
        this.negationButton.setVisible(false)
    }

    disableAllButtons(){
        this.bannerSlot1.disableInteractive()
        this.bannerSlot2.disableInteractive()
        this.bannerSlot3.disableInteractive()
        this.bannerSlot4.disableInteractive()
        this.bannerSlot5.disableInteractive()
        this.bannerSlot6.disableInteractive()
    }

    savePlayerSettings(){
        localStorage.setItem('playerSettings', JSON.stringify(this.playerSettings))
    }

    
}