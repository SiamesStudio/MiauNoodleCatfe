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
        var background = this.add.image(config.width/2,config.height/2,'spr_bck_mainMenu')//fondo
        background.displayWidth = config.width;
        background.displayHeight = config.height;


        this.shopBanner = this.add.sprite(config.width/2, config.height/2,'assets_atlas', 'spr_bck_shopMenu')


        this.slot1 = this.add.sprite(config.width/4, 2*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot2 = this.add.sprite(2*config.width/4, 2*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot3 = this.add.sprite(3*config.width/4, 2*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')

        this.slot4 = this.add.sprite(config.width/4, 4*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot5 = this.add.sprite(2*config.width/4, 4*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot6 = this.add.sprite(3*config.width/4, 4*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')

        this.bannerCoins = this.add.sprite(config.width/4, config.height/7,'assets_atlas','spr_buttomMenu')
        this.coinsText = this.add.text(config.width/4, config.height/7, this.gameStrings.Shop_coinsText, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10)
        this.bannerDiamonds = this.add.sprite(config.width/2, config.height/7,'assets_atlas','spr_buttomMenu').setTint(0xb0b0b0)
        this.diamondsText = this.add.text(config.width/2, config.height/7, this.gameStrings.Shop_diamondsText, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setTint(0xb0b0b0).setResolution(10);

        this.bannerCoins.setInteractive().on('pointerdown', () => {this.selectCoins();})
        this.bannerCoins.disableInteractive()
        this.bannerDiamonds.setInteractive().on('pointerdown', () => {this.selectDiamonds();})

        

        this.bannerSlot1 = this.add.sprite(config.width/4, 2.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot1Text = this.add.text(config.width/4, 2.6*config.height/5, this.gameStrings.Shop_freeText, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_1 = this.add.sprite(config.width/4, 1.9*config.height/5,'diamond_1').setVisible(false).setOrigin(0.5)
        this.coin_1 = this.add.sprite(config.width/4, 1.9*config.height/5,'coin_1')

        this.bannerSlot2 = this.add.sprite(2*config.width/4, 2.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot2Text = this.add.text(2*config.width/4, 2.6*config.height/5, '1.99 €', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_2 = this.add.sprite(2*config.width/4, 1.9*config.height/5,'diamond_2').setVisible(false).setOrigin(0.5)
        this.coin_2 = this.add.sprite(2*config.width/4, 1.9*config.height/5,'coin_2')

        this.bannerSlot3 = this.add.sprite(3*config.width/4, 2.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot3Text = this.add.text(3*config.width/4, 2.6*config.height/5, '4.99 €', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_3 = this.add.sprite(3*config.width/4, 1.9*config.height/5,'diamond_3').setVisible(false).setOrigin(0.5)
        this.coin_3 = this.add.sprite(3*config.width/4, 1.9*config.height/5,'coin_3')
        
        this.bannerSlot4 = this.add.sprite(config.width/4, 4.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot4Text = this.add.text(config.width/4, 4.6*config.height/5, '9.99 €', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_4 = this.add.sprite(config.width/4, 3.9*config.height/5,'diamond_4').setVisible(false).setOrigin(0.5)
        this.coin_4 = this.add.sprite(config.width/4, 3.9*config.height/5,'coin_4')

        this.bannerSlot5 = this.add.sprite(2*config.width/4, 4.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot5Text = this.add.text(2*config.width/4, 4.6*config.height/5, '49.99 €', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_5 = this.add.sprite(2*config.width/4, 3.9*config.height/5,'diamond_5').setVisible(false).setOrigin(0.5)
        this.coin_5 = this.add.sprite(2*config.width/4, 3.9*config.height/5,'coin_5')

        this.bannerSlot6 = this.add.sprite(3*config.width/4, 4.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot6Text = this.add.text(3*config.width/4, 4.6*config.height/5, '99.99 €', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_6 = this.add.sprite(3*config.width/4, 3.9*config.height/5,'diamond_6').setVisible(false).setOrigin(0.5)
        this.coin_6 = this.add.sprite(3*config.width/4, 3.9*config.height/5,'coin_6')


        this.bannerSlot1.setInteractive().on('pointerdown', () => {console.log(1), this.buyScreen(1);})
        this.bannerSlot2.setInteractive().on('pointerdown', () => {console.log(2), this.buyScreen(2);})
        this.bannerSlot3.setInteractive().on('pointerdown', () => {console.log(3), this.buyScreen(3);})
        this.bannerSlot4.setInteractive().on('pointerdown', () => {console.log(4), this.buyScreen(4);})
        this.bannerSlot5.setInteractive().on('pointerdown', () => {console.log(5), this.buyScreen(5);})
        this.bannerSlot6.setInteractive().on('pointerdown', () => {console.log(6), this.buyScreen(6);})


        //BACK
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'assets_atlas','spr_back')
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu", {playerInfo: this.playerSettings});})

        //EXTRA
        this.blackScreen = this.add.sprite(config.width/2, config.height/2,'blackScreen').setAlpha(0.5)
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'assets_atlas','spr_bck_improvementMenu')
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'spr_closeWindow')
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        this.confirmationText = this.add.text(config.width/2, config.height/2, '', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        this.confirmationButton = this.add.image(2.4*config.width/5, 2*config.height/3,'assets_atlas','spr_buttomMenu').setVisible(false).setOrigin(1,0.5)
        this.yes_Text = this.add.text(1.85*config.width/5, 2*config.height/3, this.gameStrings.Shop_yes, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        
        this.negationButton = this.add.image(2.6*config.width/5, 2*config.height/3,'assets_atlas','spr_buttomMenu').setVisible(false).setOrigin(0,0.5)
        this.no_Text = this.add.text(3.15*config.width/5, 2*config.height/3, this.gameStrings.Shop_no, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
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
        this.no_Text.setVisible(true)
        this.yes_Text.setVisible(true)
        this.confirmationButton.setVisible(true)
        this.negationButton.setVisible(true)
        this.disableAllButtons()
    }


    buy_Slot(number){
        this.negationButton.setVisible(false)
        this.confirmationButton.setVisible(false)
        this.no_Text.setVisible(false)
        this.yes_Text.setVisible(false)
        if(this.CoinsSelected){
            this.playerSettings.coins += number*100
            this.savePlayerSettings()
            if(this.playerSettings.language){
                this.confirmationText.setText('¡Has obtenido '+number*100+' monedas!');
            }
            else{
                this.confirmationText.setText('Obtained '+number*100+' coins!');
            }
            
        }
        else{
            this.playerSettings.diamonds += number*100
            this.savePlayerSettings()
            if(this.playerSettings.language){
                this.confirmationText.setText('¡Has obtenido '+number*100+' diamantes!');
            }else{
                this.confirmationText.setText('Obtained '+number*100+' diamonds!');
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
        this.no_Text.setVisible(false)
        this.yes_Text.setVisible(false)
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