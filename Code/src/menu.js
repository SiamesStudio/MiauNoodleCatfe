class Menu extends Phaser.Scene {
    constructor(){
        super("Menu")
    }

    init(gameData){
        this.gameStrings = new MenuStrings()
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
        var scene = this;
        var background = this.add.image(config.width/2,config.height/2,'bg_interior')//fondo
        //var widthRatio = config.width / background.displayWidth
        //background.displayWidth = config.width;
        //background.displayHeight = background.displayHeight * widthRatio
        this.menuMusic = this.sound.add('snd_music_rainyDay')
        this.menuMusic.play()
        this.menuMusic.setVolume(0.7)
        if(this.playerSettings.audioMuted) this.menuMusic.mute = true

        
        //COIN
        this.add.sprite(config.width/4 ,config.height/13,'assets_atlas','spr_button_babyUI')
        this.add.sprite(config.width*0.145 + 10,config.height/11,'assets_atlas','spr_ui_icon_coin')
        this.numCoins = this.add.text(2*config.width/7 - 10,config.height/13, this.playerSettings.coins, { font: "10px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        //DIAMONDS
        this.add.sprite(config.width*0.5,config.height/13,'assets_atlas','spr_button_babyUI')
        this.add.sprite(config.width*0.4 + 5,config.height/11,'assets_atlas','spr_ui_icon_gem')
        this.numDiamonds = this.add.text(config.width*0.5,config.height/13, this.playerSettings.diamonds, { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        //CHEF POINTS
        this.add.sprite(3*config.width/4 ,config.height/13,'assets_atlas','spr_button_babyUI')
        this.add.sprite(2*config.width/3,config.height/11,'assets_atlas','spr_ui_chefLvl')
        this.numPlayerLevel = this.add.text(2*config.width/3,config.height/11, this.playerSettings.level, { font: "12px PixelFont", fill: "#000000", align: "center" }).setOrigin(0.5).setResolution(10);
        this.numChefPoints = this.add.text(5*config.width/7,config.height/13, this.playerSettings.experience +'/'+ 0, { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setResolution(10);
        this.uploadPlayerLevel(0)

        //FREE DIAMONDS
        this.freeDiamondsButton = this.add.sprite(5.2*config.width/6, 2*config.height/7,'assets_atlas','spr_buttomMenu').setScale(1.15)
        this.add.sprite(4.8*config.width/6, 2*config.height/7,'assets_atlas','spr_ui_icon_gem')
        this.freeGemsTextButton = this.add.text(5.3*config.width/6, 2*config.height/7, this.gameStrings.freeGemsText, { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.freeDiamondsButton.setInteractive().on('pointerdown', () => {console.log("Free diamonds"); this.freeDiamondsPanel();})

        //UPGRADES
        this.UpgradeGroupSelected = 0; //0 = cafe, 1 = pancake, 2= noodle
        this.upgradesButton = this.add.sprite(5.2*config.width/6, 4*config.height/7,'assets_atlas','spr_buttomMenu').setScale(1.15)
        //this.add.sprite(4.8*config.width/6, 4*config.height/7,'assets_atlas','spr_ui_icon_gem')
        this.upgradesTextButton = this.add.text(5.2*config.width/6, 4*config.height/7, this.gameStrings.upgradesButtonText, { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        
        this.upgradesTextButton.setInteractive().on('pointerdown', () => {console.log("Upgrades"); this.upgradesPanel(this.UpgradeGroupSelected);})


        //SHOP
        this.shopButton = this.add.sprite(5.2*config.width/6, 6*config.height/7,'assets_atlas','spr_buttomMenu').setScale(1.15)
        this.add.sprite(4.8*config.width/6, 6*config.height/7,'assets_atlas','spr_ui_icon_shop')
        this.shopTextButton = this.add.text(5.3*config.width/6, 6*config.height/7, this.gameStrings.shopButton, { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.shopButton.setInteractive().on('pointerdown', () => {
            this.menuMusic.stop(), 
            this.scene.start("Shop", { playerInfo: this.playerSettings });
        })

        //OPTIONS
        this.options = this.add.sprite(config.width/14,config.height/13,'assets_atlas','spr_ui_settings')
        this.options.setInteractive().on('pointerdown', () => {console.log("Options"); this.optionsPanel();})

        //LEVEL SELECTION
        this.levelSelection = this.add.sprite(2*config.width/5, 4*config.height/7,'assets_atlas','spr_bck_improvementMenu').setScale(0.8)


        //PLAY -> No aparecera en el juego final
        this.playButton = this.add.sprite(this.levelSelection.x + (this.levelSelection.width/6),this.levelSelection.y,'assets_atlas','spr_buttomMenu').setOrigin(0.5)
        this.playButtonText = this.add.text(this.levelSelection.x + (this.levelSelection.width/6),this.levelSelection.y, "Jugar", { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.playButton.setInteractive().on('pointerdown', () => {
            this.menuMusic.stop()
            this.scene.start("bootGame", { playerInfo: this.playerSettings });
        })

        this.tutorialButton = this.add.sprite(this.levelSelection.x - (this.levelSelection.width/6),this.levelSelection.y,'assets_atlas','spr_buttomMenu').setOrigin(0.5)
        this.tutorialButtonText = this.add.text(this.levelSelection.x - (this.levelSelection.width/6),this.levelSelection.y, "Tutorial", { font: "11px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.tutorialButton.setInteractive().on('pointerdown', () => {
            this.menuMusic.stop()
            this.scene.start("tutorial");
        })

        //BACK
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'assets_atlas','spr_back')
        this.backButton.setInteractive().on('pointerdown', () => {
            this.menuMusic.stop();
            this.scene.start("Inicio", { playerInfo: this.playerSettings });
        })


        //GIVE EXP
        this.expButton = this.add.sprite(config.width/12, config.height/2,'assets_atlas','spr_buttomMenu').setTint(0x123456)
        this.expButton.setInteractive().on('pointerdown', () => {
            
            this.prevPlayerLevel = this.playerSettings.level
            console.log(this.prevPlayerLevel)
            this.currentPlayerLevel = this.uploadPlayerLevel(5)
            this.playerSettings.level = this.currentPlayerLevel;
            this.numPlayerLevel.setText(this.playerSettings.level)
            this.savePlayerSettings()
            console.log(this.currentPlayerLevel)
            if(this.prevPlayerLevel < this.currentPlayerLevel){
                this.levelUpPanel()
            }
        })

        //----------------------------------------------------------------------------------------------------------------------------------------------------------------


        //EXTRAS (Free gems, roulette, options, kitchen custom, interior custom, tasks)
        this.blackScreen = this.add.image(config.width/2, config.height/2, 'blackScreen').setAlpha(0.5);
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'assets_atlas','spr_bck_improvementMenu')
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'spr_closeWindow')
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        
        
        //UseRoulette
        this.rouletteSprite = this.add.sprite(config.width/2, 2*config.height/5,'spr_ui_icon_spin').setScale(0.2).setVisible(false)
        this.rouletteBuyButton = this.add.sprite(config.width/2, 2*config.height/3,'assets_atlas','spr_buttomMenu').setScale(0.8).setVisible(false)
        this.coinRoulette = this.add.sprite(config.width/3, 2*config.height/3,'assets_atlas','spr_ui_icon_coin').setScale(0.08).setVisible(false)
        this.textRoulette = this.add.text(config.width/2, 2*config.height/3,'500',{ font: "30px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        

        //View AD 
        this.ViweAdButton = this.add.sprite(config.width/2, 3*config.height/4,'assets_atlas','spr_buttomMenu').setScale(1.5).setVisible(false)
        this.textAd = this.add.text(config.width/2, 3*config.height/4,this.gameStrings.FreeGems_Button,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        this.textPreAd = this.add.text(config.width/2, 1.75*config.height/4,this.gameStrings.FreeGems_Text,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        this.AdPrize = this.add.sprite(config.width/2-10, 2.5*config.height/4,'assets_atlas','spr_ui_icon_gem').setOrigin(0.5).setVisible(false)
        this.textPrizeAd = this.add.text(config.width/2+10, 2.5*config.height/4,"3",{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        this.titleAd = this.add.text(config.width/2, config.height/4,this.gameStrings.FreeGems_Title,{ font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        
        this.adSprite = this.add.sprite(config.width/2, config.height/2, 'advertising_image').setVisible(false)
        this.adSprite.displayWidth = config.width;
        this.adSprite.displayHeight = config.height;

        this.crossButtonAd = this.add.sprite(11*config.width/12, config.height/12,'spr_closeWindow')
        this.crossButtonAd.setVisible(false)

        this.ViweAdButton.setInteractive().on('pointerdown', () => { //VER ANUNCIO
            this.adSprite.setVisible(true)
            this.ViweAdButton.disableInteractive()
            var button = this.crossButtonAd;
            setTimeout(function(){ 
                button.setVisible(true);
                 }, 5000);
        })


        //ViweConfig
        this.titleOptions = this.add.text(config.width/2, config.height/4, this.gameStrings.OptionMenu_title ,{ font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        this.volumeOptions = this.add.text(3*config.width/7, config.height/2,this.gameStrings.OptionsMenu_text,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        this.empty_Selection = this.add.sprite(2*config.width/3, config.height/2,'tick_empty_button').setVisible(false).setScale(0.5)
        this.tick_Selection = this.add.sprite(2*config.width/3, config.height/2,'tick_button').setVisible(false).setScale(0.5)

        this.languageOptions = this.add.text(3*config.width/7, 2*config.height/3,this.gameStrings.OptionsMenu_language,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        //this.language_empty_Selection = this.add.sprite(2*config.width/3, 2*config.height/3,'tick_empty_button').setVisible(false).setScale(0.5)
        //this.language_tick_Selection = this.add.sprite(2*config.width/3, 2*config.height/3,'tick_button').setVisible(false).setScale(0.5)
        this.language_spanish = this.add.sprite(2*config.width/3, 2*config.height/3,'assets_atlas','spr_espaniol').setVisible(false)
        this.language_english = this.add.sprite(2.2*config.width/3, 2*config.height/3,'assets_atlas','spr_ingles').setVisible(false)


        //Upgrade Panel
        this.UpgradeSelected = 1; 
        
        this.upgradeSlot1 = this.add.sprite(0.85*config.width/3, 2*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false)//Panel opcion
        this.upgradeSlotText1 = this.add.text(0.85*config.width/3, 2*config.height/6,'Mejora 1',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot2 = this.add.sprite(0.85*config.width/3, 2.75*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText2 = this.add.text(0.85*config.width/3, 2.75*config.height/6,'Mejora 2',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        
        this.upgradeSlot3 = this.add.sprite(0.85*config.width/3, 2*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText3 = this.add.text(0.85*config.width/3, 2*config.height/6,'Mejora 3',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot4 = this.add.sprite(0.85*config.width/3, 2.75*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText4 = this.add.text(0.85*config.width/3, 2.75*config.height/6,'Mejora 4',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot5 = this.add.sprite(0.85*config.width/3, 3.5*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText5 = this.add.text(0.85*config.width/3, 3.5*config.height/6,'Mejora 5',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot6 = this.add.sprite(0.85*config.width/3, 4.25*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText6 = this.add.text(0.85*config.width/3, 4.25*config.height/6,'Mejora 6',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        
        this.upgradeSlot7 = this.add.sprite(0.85*config.width/3, 2*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText7 = this.add.text(0.85*config.width/3, 2*config.height/6,'Mejora 7',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot8 = this.add.sprite(0.85*config.width/3, 2.75*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText8 = this.add.text(0.85*config.width/3, 2.75*config.height/6,'Mejora 8',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot9 = this.add.sprite(0.85*config.width/3, 3.5*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText9 = this.add.text(0.85*config.width/3, 3.5*config.height/6,'Mejora 9',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        this.upgradeSlot10 = this.add.sprite(0.85*config.width/3, 4.25*config.height/6, 'assets_atlas','spr_buttomMenu').setVisible(false).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText10 = this.add.text(0.85*config.width/3, 4.25*config.height/6,'Mejora 10',{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto opcion
        
        this.upgradesTextType = this.add.text(0.85*config.width/3, 1.25*config.height/6, "Tipo", { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10);
        
        this.upgradeDescriptionBanner = this.add.sprite(1.8*config.width/3, config.height/2,'assets_atlas','spr_bck_improvementDescription').setVisible(false)//Panel descripcion
        this.upgradeTitleSlotText1 = this.add.text(1.8*config.width/3, config.height/3 , this.gameStrings.upgradesCoffeTime ,{ font: "14px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//.setTint(0x2f214f)//Texto descripcion
        this.upgradeDescriptionSlotText1 = this.add.text(1.8*config.width/3, config.height/2 , this.gameStrings.upgradesCoffeTimeDescription + this.playerSettings.upgrades.coffeeTime,{ font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//.setTint(0x2f214f)//Texto descripcion
        this.buySlot = this.add.sprite(1.8*config.width/3, 2*config.height/3, 'assets_atlas','spr_buttomMenu').setVisible(false)//Boton comprar
        this.buyUpgradeCoin = this.add.sprite(1.5*config.width/3, 2*config.height/3, 'assets_atlas','spr_ui_icon_coin').setVisible(false)
        this.buySlotText = this.add.text(1.8*config.width/3, 2*config.height/3,500 + 500*this.playerSettings.upgrades.coffeeTime ,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)
        
        this.upgradeChangeSection = this.add.sprite(1.2*config.width/3, 1.25*config.height/6, 'assets_atlas','spr_ui_arrow').setVisible(false)//Panel opcion
        this.upgradeChangeSection.setInteractive().on('pointerdown', () => {
            this.UpgradeGroupSelected = (this.UpgradeGroupSelected + 1) % 3
            this.showCurrentUpgrades(this.UpgradeGroupSelected)
        })
        this.upgradeChangeSectionMinus = this.add.sprite(0.5*config.width/3, 1.25*config.height/6, 'assets_atlas','spr_ui_arrow').setVisible(false)//Panel opcion
        this.upgradeChangeSectionMinus.flipX = true
        this.upgradeChangeSectionMinus.setInteractive().on('pointerdown', () => {
            this.UpgradeGroupSelected = this.UpgradeGroupSelected - 1
            if(this.UpgradeGroupSelected < 0) this.UpgradeGroupSelected = 2
            this.showCurrentUpgrades(this.UpgradeGroupSelected)
        })
        


        this.buySlot.setInteractive().on('pointerdown', () => {
            switch(this.UpgradeSelected){
                case 1:
                    //code
                    if(this.playerSettings.upgrades.coffeeTime < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.coffeeTime) ){
                        this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.coffeeTime
                        this.numCoins.setText(this.playerSettings.coins)
                        this.playerSettings.upgrades.coffeeTime += 1
                        this.savePlayerSettings()
                        this.upgradesPanelDescription(1);
                        //this.upgradeDescriptionSlotText1.setText("-2 sec coffee time\nLevel: "+this.playerSettings.upgrades.coffeeTime)
                        //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.coffeeTime)
                    }
                        
                    break;
                case 2:
                    //code
                    if(this.playerSettings.upgrades.coffeeMachineLevel < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.coffeeMachineLevel) ){
                        this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.coffeeMachineLevel
                        this.numCoins.setText(this.playerSettings.coins)
                        this.playerSettings.upgrades.coffeeMachineLevel += 1
                        this.savePlayerSettings()
                        this.upgradesPanelDescription(2);
                        //this.upgradeDescriptionSlotText1.setText("+1 cofee machine\ncapacity\nLevel: "+this.playerSettings.upgrades.coffeMachineLevel)
                        //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.coffeMachineLevel)
                    }
                        
                    break;
                case 3:
                    //code
                    if(this.playerSettings.upgrades.pancakeTime < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.pancakeTime) ){
                        this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.pancakeTime
                        this.numCoins.setText(this.playerSettings.coins)
                        this.playerSettings.upgrades.pancakeTime += 1
                        this.savePlayerSettings()
                        this.upgradesPanelDescription(3);
                        //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                        //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                    }
                        
                    break;
                
                    case 4:
                        //code
                        if(this.playerSettings.upgrades.pancakeBurnTime < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.pancakeBurnTime) ){
                            this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.pancakeBurnTime
                            this.numCoins.setText(this.playerSettings.coins)
                            this.playerSettings.upgrades.pancakeBurnTime += 1
                            this.savePlayerSettings()
                            this.upgradesPanelDescription(4);
                            //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                            //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                        }
                            
                        break;

                    case 5:
                        //code
                        if(this.playerSettings.upgrades.pancakePanLevel < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.pancakePanLevel) ){
                            this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.pancakePanLevel
                            this.numCoins.setText(this.playerSettings.coins)
                            this.playerSettings.upgrades.pancakePanLevel += 1
                            this.savePlayerSettings()
                            this.upgradesPanelDescription(5);
                            //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                            //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                        }
                            
                        break;

                    case 6:
                        //code
                        if(this.playerSettings.upgrades.tableClothPancakeLevel < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.tableClothPancakeLevel) ){
                            this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.tableClothPancakeLevel
                            this.numCoins.setText(this.playerSettings.coins)
                            this.playerSettings.upgrades.tableClothPancakeLevel += 1
                            this.savePlayerSettings()
                            this.upgradesPanelDescription(6);
                            //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                            //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                        }
                            
                        break;

                    case 7:
                       //code
                       if(this.playerSettings.upgrades.noodleTime < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.noodleTime) ){
                           this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.noodleTime
                           this.numCoins.setText(this.playerSettings.coins)
                           this.playerSettings.upgrades.noodleTime += 1
                           this.savePlayerSettings()
                           this.upgradesPanelDescription(7);
                           //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                           //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                       }
                           
                       break;

                    case 8:
                     //code
                     if(this.playerSettings.upgrades.noodleBurnTime < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.noodleBurnTime) ){
                         this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.noodleBurnTime
                         this.numCoins.setText(this.playerSettings.coins)
                         this.playerSettings.upgrades.noodleBurnTime += 1
                         this.savePlayerSettings()
                         this.upgradesPanelDescription(8);
                         //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                         //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                     }
                         
                     break;

                    case 9:
                       //code
                       if(this.playerSettings.upgrades.noodleLevel < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.noodleLevel) ){
                           this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.noodleLevel
                           this.numCoins.setText(this.playerSettings.coins)
                           this.playerSettings.upgrades.noodleLevel += 1
                           this.savePlayerSettings()
                           this.upgradesPanelDescription(9);
                           //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                           //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                       }
                           
                       break;

                    case 10:
                     //code
                     if(this.playerSettings.upgrades.tableClothNoodleLevel < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.tableClothNoodleLevel) ){
                         this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.tableClothNoodleLevel
                         this.numCoins.setText(this.playerSettings.coins)
                         this.playerSettings.upgrades.tableClothNoodleLevel += 1
                         this.savePlayerSettings()
                         this.upgradesPanelDescription(9);
                         //this.upgradeDescriptionSlotText1.setText("-2 sec pancake time\nLevel: "+this.playerSettings.upgrades.pancakeTime)
                         //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                     }
                         
                     break;
                default:
                    //code
                    console.log("default")
            }

        })


        this.makeUpgradesSlotsInteractive();
        
        //LEVEL UP PANEL
        this.levelUpPanelTitle = this.add.text(config.width/2, config.height/4 , this.gameStrings.LevelUpTitle ,{ font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto titulo
        this.levelUpPanelDesc = this.add.text(config.width/2, 1.15*config.height/3 , this.gameStrings.LevelUpDesc ,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false).setResolution(10)//Texto descripcion
        this.levelUpPanelRewardTitle = this.add.text(1.3*config.width/5, config.height/2 , this.gameStrings.LevelUpReward ,{ font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setVisible(false).setResolution(10)//Texto descripcion
        this.levelUpCoinReward = this.add.sprite(1.6*config.width/5, 2*config.height/3,'assets_atlas','spr_ui_icon_coin').setOrigin(1,0.5).setVisible(false)
        this.levelUpCoinRewardText = this.add.text(1.6*config.width/5, 2*config.height/3, 200 ,{ font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setVisible(false).setResolution(10)//Texto titulo
        this.levelUpDiamondReward = this.add.sprite(2.6*config.width/5, 2*config.height/3,'assets_atlas','spr_ui_icon_gem').setOrigin(0,0.5).setVisible(false)
        this.levelUpDiamondRewardText = this.add.text(3*config.width/5, 2*config.height/3, 200 ,{ font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setVisible(false).setResolution(10)//Texto titulo
    }


    freeDiamondsPanel(){
        this.disableAllButtons()
        this.ViweAdButton.setVisible(true)
        this.textAd.setVisible(true)
        this.titleAd.setVisible(true)
        this.textPreAd.setVisible(true)
        this.textPrizeAd.setVisible(true)
        this.AdPrize.setVisible(true)

        this.crossButtonAd.setInteractive().on('pointerdown', () => {//Cerrar anuncio
            this.adSprite.setVisible(false); 
            this.crossButtonAd.setVisible(false); 
            this.ViweAdButton.setTint(0xb0b0b0)
            this.ViweAdButton.disableInteractive()
            this.textAd.setTint(0xb0b0b0)
            this.enableAllButtons(); 
            this.playerSettings.diamonds += 3;
            this.numDiamonds.text = this.playerSettings.diamonds;
            this.savePlayerSettings()
        })

        
    }

    upgradesPanel(number){
        this.disableAllButtons()
        
        this.upgradeSlot1.setVisible(false)
        this.upgradeSlotText1.setVisible(false)
        this.upgradeDescriptionBanner.setVisible(true)
        this.upgradeTitleSlotText1.setVisible(true)
        this.upgradeDescriptionSlotText1.setVisible(true)
        
        this.upgradeSlot2.setVisible(true)
        this.upgradeSlotText2.setVisible(true)
        this.upgradeSlot3.setVisible(false)
        this.upgradeSlotText3.setVisible(false)
        this.upgradeSlot4.setVisible(false)
        this.upgradeSlotText4.setVisible(false)
        this.upgradeSlot5.setVisible(false)
        this.upgradeSlotText5.setVisible(false)
        this.upgradeSlot6.setVisible(false)
        this.upgradeSlotText6.setVisible(false)
        this.upgradeSlot7.setVisible(false)
        this.upgradeSlotText7.setVisible(false)
        this.upgradeSlot8.setVisible(false)
        this.upgradeSlotText8.setVisible(false)
        this.upgradeSlot9.setVisible(false)
        this.upgradeSlotText9.setVisible(false)
        this.upgradeSlot10.setVisible(false)
        this.upgradeSlotText10.setVisible(false)

        this.upgradesTextType.setVisible(true)

        this.upgradeChangeSection.setVisible(true)
        this.upgradeChangeSectionMinus.setVisible(true)

        this.buySlot.setVisible(true)
        this.buyUpgradeCoin.setVisible(true)
        this.buySlotText.setVisible(true)

        this.showCurrentUpgrades(number)
    }

    upgradesPanelDescription(number){
        if(number==1){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesCoffeTime)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesCoffeTimeDescription + this.playerSettings.upgrades.coffeeTime)
            if(this.playerSettings.upgrades.coffeeTime != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.coffeeTime)
                this.buySlot.setTint(0xffffff);
            }
            else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }

        }

        if(number==2){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesCoffeMachine)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesCoffeMachineDescription + this.playerSettings.upgrades.coffeeMachineLevel)
            if(this.playerSettings.upgrades.coffeeMachineLevel != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.coffeeMachineLevel)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
        }

        if(number==3){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesPancakeTime)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesPancakeTimeDescription + this.playerSettings.upgrades.pancakeTime)
            if(this.playerSettings.upgrades.pancakeTime != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeTime)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==4){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesPancakeBurn)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesPancakeBurnDescription + this.playerSettings.upgrades.pancakeBurnTime)
            if(this.playerSettings.upgrades.pancakeBurnTime != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakeBurnTime)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==5){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesPancakePan)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesPancakePanDescription + this.playerSettings.upgrades.pancakePanLevel)
            if(this.playerSettings.upgrades.pancakePanLevel != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.pancakePanLevel)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==6){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesPancakeCloth)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesPancakeClothDescription + this.playerSettings.upgrades.tableClothPancakeLevel)
            if(this.playerSettings.upgrades.tableClothPancakeLevel != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.tableClothPancakeLevel)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==7){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesNoodleTime)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesNoodleTimeDescription + this.playerSettings.upgrades.noodleTime)
            if(this.playerSettings.upgrades.noodleTime != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.noodleTime)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==8){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesNoodleBurn)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesNoodleBurnDescription + this.playerSettings.upgrades.noodleBurnTime)
            if(this.playerSettings.upgrades.noodleBurnTime != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.noodleBurnTime)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==9){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesNoodleBoilLvl)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesNoodleBoilLvlDescription + this.playerSettings.upgrades.noodleLevel)
            if(this.playerSettings.upgrades.noodleLevel != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.noodleLevel)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }

        if(number==10){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesNoodleCloth)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesNoodleClothDescription + this.playerSettings.upgrades.tableClothNoodleLevel)
            if(this.playerSettings.upgrades.tableClothNoodleLevel != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.tableClothNoodleLevel)
                this.buySlot.setTint(0xffffff);
            }else{
                this.buySlotText.setText("MAX")
                this.buySlot.disableInteractive()
                this.buySlot.setTint(0x566b5b);
            }
            
        }
        
    }

    roulettePanel(){
        this.disableAllButtons()
        this.rouletteSprite.setVisible(true)
        this.rouletteBuyButton.setVisible(true)
        this.coinRoulette.setVisible(true)
        this.textRoulette.setVisible(true)

        this.rouletteBuyButton.setInteractive().on('pointerdown', () => {
            //alert("Has tirado de la ruleta!!")
            this.rouletteBuyButton.setTint(0xb0b0b0)
            this.coinRoulette.setTint(0xb0b0b0)
            this.textRoulette.setTint(0xb0b0b0)
            //Calcular premio
            //Quitar monedas al usuario
            this.rouletteBuyButton.disableInteractive()
    })
    }

    levelUpPanel(){
        this.disableAllButtons();
        this.levelUpPanelTitle.setVisible(true)
        this.levelUpPanelDesc.setVisible(true)
        this.levelUpCoinReward.setVisible(true)
        this.levelUpDiamondReward.setVisible(true)
        this.levelUpCoinRewardText.setVisible(true)
        this.levelUpDiamondRewardText.setVisible(true)
        this.levelUpPanelRewardTitle.setVisible(true)
        this.levelUpPanelDesc.setText(this.gameStrings.LevelUpDesc + this.playerSettings.level)
        this.levelUpCoinRewardText.setText(this.playerSettings.level * 100)
        this.levelUpDiamondRewardText.setText(this.playerSettings.level * 10)
        this.playerSettings.coins += this.playerSettings.level * 100
        this.playerSettings.diamonds += this.playerSettings.level * 10
        this.savePlayerSettings()
        this.numCoins.setText(this.playerSettings.coins)
        this.numDiamonds.setText(this.playerSettings.diamonds)
    }

    optionsPanel(){
        this.disableAllButtons()
        this.titleOptions.setVisible(true)
        this.volumeOptions.setVisible(true)
        this.languageOptions.setVisible(true)
        this.language_spanish.setVisible(true)
        this.language_english.setVisible(true)
        
        
        if(this.playerSettings.language){
            this.language_spanish.setTint(0xffffff)
            this.language_english.setTint(0xb0b0b0)
        }else{
            this.language_spanish.setTint(0xb0b0b0)
            this.language_english.setTint(0xffffff)
        }

        if(this.playerSettings.audioMuted){
            this.empty_Selection.setVisible(false)
            this.tick_Selection.setVisible(true)
        }else{
            this.empty_Selection.setVisible(true)
            this.tick_Selection.setVisible(false)
        }
        
        this.empty_Selection.setInteractive().on('pointerdown', () => {
            this.empty_Selection.setVisible(false)
            this.playerSettings.audioMuted = true;
            this.menuMusic.mute = true
            this.savePlayerSettings()
            this.tick_Selection.setVisible(true)
            
        })

        this.tick_Selection.setInteractive().on('pointerdown', () => {
            this.empty_Selection.setVisible(true)
            this.playerSettings.audioMuted = false;
            this.menuMusic.mute = false
            this.savePlayerSettings()
            this.tick_Selection.setVisible(false)
        })

        this.language_spanish.setInteractive().on('pointerdown', () => {
            this.language_spanish.setTint(0xffffff)
            this.language_english.setTint(0xb0b0b0)
            this.playerSettings.language = true;
            this.savePlayerSettings()
            this.gameStrings.convertToSpanish()
            this.changeAllText()
        })

        this.language_english.setInteractive().on('pointerdown', () => {
            this.language_spanish.setTint(0xb0b0b0)
            this.language_english.setTint(0xffffff)
            this.playerSettings.language = false;
            this.savePlayerSettings()
            this.gameStrings.convertToEnglish()
            this.changeAllText()
            
        })
    }


    disableAllButtons(){
        this.blackScreen.setVisible(true)//Oscurecer la pantalla de fondo
        this.freeDiamondsButton.disableInteractive()
        //this.rouletteButton.disableInteractive()
        this.shopButton.disableInteractive()
        this.options.disableInteractive()
        //this.kitchenCustom.disableInteractive()
        //this.interiorCustom.disableInteractive()
        //this.taskButton.disableInteractive()
        this.backButton.disableInteractive()
        this.playButton.disableInteractive()
        this.extraBanner.setVisible(true)//Pintar panel -> Mismo para todas las acciones
        this.crossButton.setVisible(true)//Pintar boton de cerrar panel
        this.expButton.disableInteractive()
        this.upgradesTextButton.disableInteractive()
    }

    enableAllButtons(){
        this.freeDiamondsButton.setInteractive()
        //this.rouletteButton.setInteractive()
        this.shopButton.setInteractive()
        this.options.setInteractive()
        //this.kitchenCustom.setInteractive()
        //this.interiorCustom.setInteractive()
        //this.taskButton.setInteractive()
        this.backButton.setInteractive()
        this.playButton.setInteractive()
        this.blackScreen.setVisible(false)//Desoscurecer la pantalla
        this.extraBanner.setVisible(false)
        this.crossButton.setVisible(false)

        //roulette
        this.rouletteSprite.setVisible(false)
        this.rouletteBuyButton.setVisible(false)
        this.coinRoulette.setVisible(false)
        this.textRoulette.setVisible(false)

        //AD
        this.ViweAdButton.setVisible(false); 
        this.textAd.setVisible(false); 
        this.titleAd.setVisible(false);
        this.textPreAd.setVisible(false);
        this.textPrizeAd.setVisible(false)
        this.AdPrize.setVisible(false)

        //Options
        this.titleOptions.setVisible(false)
        this.volumeOptions.setVisible(false)
        this.empty_Selection.setVisible(false)
        this.tick_Selection.setVisible(false)
        this.languageOptions.setVisible(false)
        this.language_spanish.setVisible(false)
        this.language_english.setVisible(false)

        //Upgrades
        this.upgradesTextButton.setInteractive()

        this.upgradeSlot1.setVisible(false)
        this.upgradeSlotText1.setVisible(false)
        this.upgradeDescriptionBanner.setVisible(false)
        this.upgradeTitleSlotText1.setVisible(false)
        this.upgradeDescriptionSlotText1.setVisible(false)
        this.upgradeSlot2.setVisible(false)
        this.upgradeSlotText2.setVisible(false)
        this.upgradeSlot3.setVisible(false)
        this.upgradeSlotText3.setVisible(false)
        this.upgradeSlot4.setVisible(false)
        this.upgradeSlotText4.setVisible(false)
        this.upgradeSlot5.setVisible(false)
        this.upgradeSlotText5.setVisible(false)
        this.upgradeSlot6.setVisible(false)
        this.upgradeSlotText6.setVisible(false)
        this.upgradeSlot7.setVisible(false)
        this.upgradeSlotText7.setVisible(false)
        this.upgradeSlot8.setVisible(false)
        this.upgradeSlotText8.setVisible(false)
        this.upgradeSlot9.setVisible(false)
        this.upgradeSlotText9.setVisible(false)
        this.upgradeSlot10.setVisible(false)
        this.upgradeSlotText10.setVisible(false)

        this.upgradesTextType.setVisible(false)

        this.upgradeChangeSection.setVisible(false)
        this.upgradeChangeSectionMinus.setVisible(false)


        this.buySlot.setVisible(false)
        this.buyUpgradeCoin.setVisible(false)
        this.buySlotText.setVisible(false)

        //EXP
        this.expButton.setInteractive()
        this.levelUpPanelTitle.setVisible(false)
        this.levelUpPanelDesc.setVisible(false)
        this.levelUpCoinReward.setVisible(false)
        this.levelUpDiamondReward.setVisible(false)
        this.levelUpCoinRewardText.setVisible(false)
        this.levelUpDiamondRewardText.setVisible(false)
        this.levelUpPanelRewardTitle.setVisible(false)

    }

    showCurrentUpgrades(number){
        this.upgradeSlot1.setVisible(false)
        this.upgradeSlotText1.setVisible(false)
        this.upgradeSlot2.setVisible(false)
        this.upgradeSlotText2.setVisible(false)
        this.upgradeSlot3.setVisible(false)
        this.upgradeSlotText3.setVisible(false)
        this.upgradeSlot4.setVisible(false)
        this.upgradeSlotText4.setVisible(false)
        this.upgradeSlot5.setVisible(false)
        this.upgradeSlotText5.setVisible(false)
        this.upgradeSlot6.setVisible(false)
        this.upgradeSlotText6.setVisible(false)
        this.upgradeSlot7.setVisible(false)
        this.upgradeSlotText7.setVisible(false)
        this.upgradeSlot8.setVisible(false)
        this.upgradeSlotText8.setVisible(false)
        this.upgradeSlot9.setVisible(false)
        this.upgradeSlotText9.setVisible(false)
        this.upgradeSlot10.setVisible(false)
        this.upgradeSlotText10.setVisible(false)

        if(number == 0){

            this.UpgradeSelected = 1;
            this.upgradesPanelDescription(this.UpgradeSelected)
            this.upgradeSlot1.setTint(0xffffff)
            this.upgradeSlot1.setVisible(true)
            this.upgradeSlotText1.setVisible(true)
            this.upgradeSlot2.setVisible(true)
            this.upgradeSlotText2.setVisible(true)
            this.upgradeSlot2.setTint(0xb0b0b0)
            this.upgradesTextType.setText(this.gameStrings.upgradesCoffee)
        }
        if(number == 1){

            this.UpgradeSelected = 3;
            this.upgradeSlot3.setTint(0xffffff)
            this.upgradesPanelDescription(this.UpgradeSelected)
            this.upgradeSlot3.setVisible(true)
            this.upgradeSlotText3.setVisible(true)
            this.upgradeSlot4.setVisible(true)
            this.upgradeSlotText4.setVisible(true)
            this.upgradeSlot4.setTint(0xb0b0b0)
            this.upgradeSlot5.setVisible(true)
            this.upgradeSlotText5.setVisible(true)
            this.upgradeSlot5.setTint(0xb0b0b0)
            this.upgradeSlot6.setVisible(true)
            this.upgradeSlotText6.setVisible(true)
            this.upgradeSlot6.setTint(0xb0b0b0)
            this.upgradesTextType.setText(this.gameStrings.upgradesPancake)
        }
        if(number == 2){
            this.UpgradeSelected = 7;
            this.upgradeSlot7.setTint(0xffffff)
            this.upgradesPanelDescription(this.UpgradeSelected)
            this.upgradeSlot7.setVisible(true)
            this.upgradeSlotText7.setVisible(true)
            this.upgradeSlot8.setVisible(true)
            this.upgradeSlotText8.setVisible(true)
            this.upgradeSlot8.setTint(0xb0b0b0)
            this.upgradeSlot9.setVisible(true)
            this.upgradeSlotText9.setVisible(true)
            this.upgradeSlot9.setTint(0xb0b0b0)
            this.upgradeSlot10.setVisible(true)
            this.upgradeSlotText10.setVisible(true)
            this.upgradeSlot10.setTint(0xb0b0b0)
            this.upgradesTextType.setText(this.gameStrings.upgradesNoodles)
        }
    }

    makeUpgradesSlotsInteractive(){
        this.upgradeSlot1.setInteractive().on('pointerdown', () => {
            this.upgradeSlot1.setTint(0xffffff)
            this.upgradeSlot2.setTint(0xb0b0b0)
            this.UpgradeSelected = 1;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot2.setInteractive().on('pointerdown', () => {
            this.upgradeSlot1.setTint(0xb0b0b0)
            this.upgradeSlot2.setTint(0xffffff)
            this.UpgradeSelected = 2;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })


        this.upgradeSlot3.setInteractive().on('pointerdown', () => {
            this.upgradeSlot3.setTint(0xffffff)
            this.upgradeSlot4.setTint(0xb0b0b0)
            this.upgradeSlot5.setTint(0xb0b0b0)
            this.upgradeSlot6.setTint(0xb0b0b0)
            this.UpgradeSelected = 3;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot4.setInteractive().on('pointerdown', () => {
            this.upgradeSlot3.setTint(0xb0b0b0)
            this.upgradeSlot4.setTint(0xffffff)
            this.upgradeSlot5.setTint(0xb0b0b0)
            this.upgradeSlot6.setTint(0xb0b0b0)
            this.UpgradeSelected = 4;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot5.setInteractive().on('pointerdown', () => {
            this.upgradeSlot3.setTint(0xb0b0b0)
            this.upgradeSlot4.setTint(0xb0b0b0)
            this.upgradeSlot5.setTint(0xffffff)
            this.upgradeSlot6.setTint(0xb0b0b0)
            this.UpgradeSelected = 5;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot6.setInteractive().on('pointerdown', () => {
            this.upgradeSlot3.setTint(0xb0b0b0)
            this.upgradeSlot4.setTint(0xb0b0b0)
            this.upgradeSlot5.setTint(0xb0b0b0)
            this.upgradeSlot6.setTint(0xffffff)
            this.UpgradeSelected = 6;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot7.setInteractive().on('pointerdown', () => {
            this.upgradeSlot7.setTint(0xffffff)
            this.upgradeSlot8.setTint(0xb0b0b0)
            this.upgradeSlot9.setTint(0xb0b0b0)
            this.upgradeSlot10.setTint(0xb0b0b0)
            this.UpgradeSelected = 7;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot8.setInteractive().on('pointerdown', () => {
            this.upgradeSlot7.setTint(0xb0b0b0)
            this.upgradeSlot8.setTint(0xffffff)
            this.upgradeSlot9.setTint(0xb0b0b0)
            this.upgradeSlot10.setTint(0xb0b0b0)
            this.UpgradeSelected = 8;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot9.setInteractive().on('pointerdown', () => {
            this.upgradeSlot7.setTint(0xb0b0b0)
            this.upgradeSlot8.setTint(0xb0b0b0)
            this.upgradeSlot9.setTint(0xffffff)
            this.upgradeSlot10.setTint(0xb0b0b0)
            this.UpgradeSelected = 9;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot10.setInteractive().on('pointerdown', () => {
            this.upgradeSlot7.setTint(0xb0b0b0)
            this.upgradeSlot8.setTint(0xb0b0b0)
            this.upgradeSlot9.setTint(0xb0b0b0)
            this.upgradeSlot10.setTint(0xffffff)
            this.UpgradeSelected = 10;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

    }


    changeAllText(){
        //Menu
        this.freeGemsTextButton.text = this.gameStrings.freeGemsText
        this.shopTextButton.text = this.gameStrings.shopButton
        this.upgradesTextButton.text = this.gameStrings.upgradesButtonText
        //AD
        this.textAd.text = this.gameStrings.FreeGems_Button
        this.textPreAd.text = this.gameStrings.FreeGems_Text
        this.titleAd.text = this.gameStrings.FreeGems_Title
        //Options
        this.titleOptions.text = this.gameStrings.OptionMenu_title
        this.volumeOptions.text = this.gameStrings.OptionsMenu_text
        this.languageOptions.text = this.gameStrings.OptionsMenu_language

        //Upgrades
        this.upgradesPanelDescription(this.UpgradeSelected)
    }

    savePlayerSettings(){
        localStorage.setItem('playerSettings_PreRelease', JSON.stringify(this.playerSettings))
    }

    uploadPlayerLevel(number){
        var expPerLevel = [0,200,1200,6200,21200,46200,96200]//[0,10,50,100,200,500]
        //if(this.playerSettings.experience < expPerLevel[expPerLevel.length - 1]){//Comprobamos que 
            if(this.playerSettings.experience + number > expPerLevel[expPerLevel.length - 1]){
                this.playerSettings.experience =  expPerLevel[expPerLevel.length - 1];
            }else{
                this.playerSettings.experience += number;
            }
            
        //}
        

        var currentLevel = this.getLevel(expPerLevel,0,expPerLevel.length, this.playerSettings.experience)
        
        if(currentLevel+1 < expPerLevel.length && currentLevel >0){
            this.numChefPoints.setText( (this.playerSettings.experience - expPerLevel[currentLevel]) +"/"+ (expPerLevel[currentLevel+1] - expPerLevel[currentLevel]) )
        }
        else if(currentLevel == 0){this.numChefPoints.setText( (this.playerSettings.experience - expPerLevel[currentLevel]) +"/"+ expPerLevel[currentLevel+1] )}

        else{
            this.numChefPoints.setText( (expPerLevel[expPerLevel.length - 1] - expPerLevel[expPerLevel.length - 2]) +"/MAX" )
        }

        return currentLevel + 1;
    }

    getLevel(expArray,ini, fin, playerExp){

        var mitad =  Math.floor((ini+fin) /2)

        if (ini>fin){
            return mitad
        }
        else{
            if(expArray[mitad] == playerExp){
                return mitad;
            }
            else{
                if(playerExp < expArray[mitad]){
                    return this.getLevel(expArray, ini , mitad-1, playerExp)
                }
                else{
                    return this.getLevel(expArray, mitad+1, fin, playerExp)
                }
            }
        }

    }

}