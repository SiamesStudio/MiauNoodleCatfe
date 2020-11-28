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
        var background = this.add.image(config.width/2,config.height/2,'bg_interior_empty')
        //var background_window = this.add.image(config.width*0.5, config.height*0.5, 'bg_interior_window');
        //var background_interior_back= this.add.image(config.width*0.5, config.height*0.5, 'bg_interior_back');
        //var background_interior_barra = this.add.image(config.width*0.5, config.height*0.715, 'bg_interior_barra');
        //var background_interior_cristal = this.add.image(config.width*0.62, config.height*0.32, 'bg_interior_cristal');


        this.shopBanner = this.add.sprite(config.width/2, config.height/2,'assets_atlas', 'spr_bck_shopMenu')


        this.slot1 = this.add.sprite(config.width/4, 2*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot2 = this.add.sprite(2*config.width/4, 2*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot3 = this.add.sprite(3*config.width/4, 2*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')

        this.slot4 = this.add.sprite(config.width/4, 4*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot5 = this.add.sprite(2*config.width/4, 4*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')
        this.slot6 = this.add.sprite(3*config.width/4, 4*config.height/5,'assets_atlas', 'spr_bck_subShopMenu')

        this.bannerCoins = this.add.sprite(config.width/4, config.height/7,'assets_atlas','spr_buttomMenu')
        this.coinsText = this.add.text(config.width/4, config.height/7, this.gameStrings.Shop_coinsText_singular, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10)
        this.bannerDiamonds = this.add.sprite(config.width/2, config.height/7,'assets_atlas','spr_buttomMenu').setTint(0xb0b0b0)
        this.diamondsText = this.add.text(config.width/2, config.height/7, this.gameStrings.Shop_diamondsText, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setTint(0xb0b0b0).setResolution(10);

        this.bannerCoins.setInteractive().on('pointerdown', () => {this.selectCoins();})
        this.bannerCoins.disableInteractive()
        this.bannerDiamonds.setInteractive().on('pointerdown', () => {this.selectDiamonds();})

        

        this.bannerSlot1 = this.add.sprite(config.width/4, 2.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot1Text = this.add.text(config.width/4, 2.6*config.height/5, "0.99 €", { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_1 = this.add.sprite(0.8*config.width/4, 1.9*config.height/5,'assets_atlas','spr_ui_icon_gem').setVisible(false).setOrigin(0.5)
        this.diamond_ammount_1 = this.add.text( (this.diamond_1.x) + (this.bannerSlot1.width/2), this.diamond_1.y, "10", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false);
        this.coin_1 = this.add.sprite(0.8*config.width/4, 1.9*config.height/5,'assets_atlas','spr_ui_icon_coin')
        this.coin_ammount_1 = this.add.text( (this.coin_1.x) + (this.bannerSlot1.width/2), this.coin_1.y, "100", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);


        this.bannerSlot2 = this.add.sprite(2*config.width/4, 2.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot2Text = this.add.text(2*config.width/4, 2.6*config.height/5, '1.99 €', { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_2 = this.add.sprite(1.8*config.width/4, 1.9*config.height/5,'assets_atlas','spr_ui_icon_gem').setVisible(false).setOrigin(0.5)
        this.diamond_ammount_2 = this.add.text( (this.diamond_2.x) + (this.bannerSlot2.width/2), this.diamond_2.y, "20", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false);
        this.coin_2 = this.add.sprite(1.8*config.width/4, 1.9*config.height/5,'assets_atlas','spr_ui_icon_coin')
        this.coin_ammount_2 = this.add.text( (this.coin_2.x) + (this.bannerSlot2.width/2), this.coin_2.y, "200", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        this.bannerSlot3 = this.add.sprite(3*config.width/4, 2.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot3Text = this.add.text(3*config.width/4, 2.6*config.height/5, '4.99 €', { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_3 = this.add.sprite(2.8*config.width/4, 1.9*config.height/5,'assets_atlas','spr_ui_icon_gem').setVisible(false).setOrigin(0.5)
        this.diamond_ammount_3 = this.add.text( (this.diamond_3.x) + (this.bannerSlot3.width/2), this.diamond_3.y, "30", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false);
        this.coin_3 = this.add.sprite(2.8*config.width/4, 1.9*config.height/5,'assets_atlas','spr_ui_icon_coin')
        this.coin_ammount_3 = this.add.text( (this.coin_3.x) + (this.bannerSlot3.width/2), this.coin_3.y, "300", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        
        this.bannerSlot4 = this.add.sprite(config.width/4, 4.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot4Text = this.add.text(config.width/4, 4.6*config.height/5, '9.99 €', { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_4 = this.add.sprite(0.8*config.width/4, 3.9*config.height/5,'assets_atlas','spr_ui_icon_gem').setVisible(false).setOrigin(0.5)
        this.diamond_ammount_4 = this.add.text( (this.diamond_4.x) + (this.bannerSlot4.width/2), this.diamond_4.y, "40", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false);
        this.coin_4 = this.add.sprite(0.8*config.width/4, 3.9*config.height/5,'assets_atlas','spr_ui_icon_coin')
        this.coin_ammount_4 = this.add.text( (this.coin_4.x) + (this.bannerSlot4.width/2), this.coin_4.y, "400", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        this.bannerSlot5 = this.add.sprite(2*config.width/4, 4.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot5Text = this.add.text(2*config.width/4, 4.6*config.height/5, '49.99 €', { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_5 = this.add.sprite(1.8*config.width/4, 3.9*config.height/5,'assets_atlas','spr_ui_icon_gem').setVisible(false).setOrigin(0.5)
        this.diamond_ammount_5 = this.add.text( (this.diamond_5.x) + (this.bannerSlot5.width/2), this.diamond_5.y, "50", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false);
        this.coin_5 = this.add.sprite(1.8*config.width/4, 3.9*config.height/5,'assets_atlas','spr_ui_icon_coin')
        this.coin_ammount_5 = this.add.text( (this.coin_5.x) + (this.bannerSlot5.width/2), this.coin_5.y, "500", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        this.bannerSlot6 = this.add.sprite(3*config.width/4, 4.6*config.height/5,'assets_atlas','spr_buttomMenu')
        this.bannerDlot6Text = this.add.text(3*config.width/4, 4.6*config.height/5, '99.99 €', { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.diamond_6 = this.add.sprite(2.8*config.width/4, 3.9*config.height/5,'assets_atlas','spr_ui_icon_gem').setVisible(false).setOrigin(0.5)
        this.diamond_ammount_6 = this.add.text( (this.diamond_6.x) + (this.bannerSlot6.width/2), this.diamond_6.y, "60", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false);
        this.coin_6 = this.add.sprite(2.8*config.width/4, 3.9*config.height/5,'assets_atlas','spr_ui_icon_coin')
        this.coin_ammount_6 = this.add.text( (this.coin_6.x) + (this.bannerSlot6.width/2), this.coin_6.y, "600", { font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);


        this.bannerSlot1.setInteractive().on('pointerdown', () => {console.log(1), this.buyScreen(1);})
        this.bannerSlot2.setInteractive().on('pointerdown', () => {console.log(2), this.buyScreen(2);})
        this.bannerSlot3.setInteractive().on('pointerdown', () => {console.log(3), this.buyScreen(3);})
        this.bannerSlot4.setInteractive().on('pointerdown', () => {console.log(4), this.buyScreen(4);})
        this.bannerSlot5.setInteractive().on('pointerdown', () => {console.log(5), this.buyScreen(5);})
        this.bannerSlot6.setInteractive().on('pointerdown', () => {console.log(6), this.buyScreen(6);})


        //BACK
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'spr_back1')
        this.backButton.setInteractive().on('pointerdown', () => {
            
            //this.scene.start("Menu", {playerInfo: this.playerSettings});
            this.scene.resume("Menu")
            this.scene.remove("Shop");
        
        })

        //EXTRA
        this.blackScreen = this.add.sprite(config.width/2, config.height/2,'blackScreen').setAlpha(0.5)
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'assets_atlas','spr_bck_improvementMenu')
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'spr_closeWindow')
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        this.selected_Text = this.add.text(config.width/2, config.height/3, '', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        this.confirmationText = this.add.text(config.width/2, config.height/2, '', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        this.confirmationButton = this.add.image(2.4*config.width/5, 2*config.height/3,'assets_atlas','spr_buttomMenu').setVisible(false).setOrigin(1,0.5)
        this.yes_Text = this.add.text((this.confirmationButton.x) - (this.confirmationButton.width/2), 2*config.height/3, this.gameStrings.Shop_yes, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        
        this.negationButton = this.add.image(2.6*config.width/5, 2*config.height/3,'assets_atlas','spr_buttomMenu').setVisible(false).setOrigin(0,0.5)
        this.no_Text = this.add.text((this.negationButton.x) + (this.negationButton.width/2), 2*config.height/3, this.gameStrings.Shop_no, { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        this.number = 0

        this.snd_purchase = this.sound.add('snd_purchase')
        
        this.confirmationButton.setInteractive().on('pointerdown', () => {
            this.buy_Slot(this.number);
            this.snd_purchase.play()
        })
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
        this.diamond_ammount_1.setVisible(false)
        this.diamond_ammount_2.setVisible(false)
        this.diamond_ammount_3.setVisible(false)
        this.diamond_ammount_4.setVisible(false)
        this.diamond_ammount_5.setVisible(false)
        this.diamond_ammount_6.setVisible(false)
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
        this.coin_ammount_1.setVisible(true)
        this.coin_ammount_2.setVisible(true)
        this.coin_ammount_3.setVisible(true)
        this.coin_ammount_4.setVisible(true)
        this.coin_ammount_5.setVisible(true)
        this.coin_ammount_6.setVisible(true)
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
        this.diamond_ammount_1.setVisible(true)
        this.diamond_ammount_2.setVisible(true)
        this.diamond_ammount_3.setVisible(true)
        this.diamond_ammount_4.setVisible(true)
        this.diamond_ammount_5.setVisible(true)
        this.diamond_ammount_6.setVisible(true)
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
        this.coin_ammount_1.setVisible(false)
        this.coin_ammount_2.setVisible(false)
        this.coin_ammount_3.setVisible(false)
        this.coin_ammount_4.setVisible(false)
        this.coin_ammount_5.setVisible(false)
        this.coin_ammount_6.setVisible(false)
    }

    buyScreen(number){
        this.number = number
        console.log("BuyScreen: "+number)
        this.blackScreen.setVisible(true)
        this.extraBanner.setVisible(true)
        this.crossButton.setVisible(true)
        this.selected_Text.setVisible(true)
        if(this.CoinsSelected) this.selected_Text.setText(this.gameStrings.Shop_selected +' ' +number*100 +' \n' + this.gameStrings.Shop_coinsText)
        else this.selected_Text.setText(this.gameStrings.Shop_selected +' ' +number*10 +' \n' + this.gameStrings.Shop_diamondsText) 
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
            
            if(this.playerSettings.language){
                this.confirmationText.setText('¡Has obtenido '+number*10+' diamantes!');
                this.playerSettings.diamonds += number*10
                this.savePlayerSettings()

            }else{
                this.confirmationText.setText('Obtained '+number*10+' diamonds!');
                this.playerSettings.diamonds += number*10
                this.savePlayerSettings()
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
        this.selected_Text.setVisible(false)
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
        localStorage.setItem('playerSettings_PreRelease', JSON.stringify(this.playerSettings))
    }

    
}