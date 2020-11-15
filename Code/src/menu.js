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
        var background = this.add.image(config.width/2,config.height/2,'spr_bck_mainMenu')//fondo
        var widthRatio = config.width / background.displayWidth
        background.displayWidth = config.width;
        background.displayHeight = background.displayHeight * widthRatio


        //COIN
        this.add.sprite(config.width/4,config.height/12,'banner').setScale(0.5)
        this.add.sprite(config.width/5,config.height/12,'spr_ui_icon_coin').setScale(0.05)
        this.numCoins = this.add.text(2*config.width/7,config.height/12, this.playerSettings.coins, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);

        //DIAMONDS
        this.add.sprite(config.width/2,config.height/12,'banner').setScale(0.5)
        this.add.sprite(2*config.width/5,config.height/12,'spr_ui_icon_gem').setScale(0.05)
        this.numDiamonds = this.add.text(3.5*config.width/7,config.height/12, this.playerSettings.diamonds, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);

        //CHEF POINTS
        this.add.sprite(3*config.width/4 ,config.height/12,'banner').setScale(0.5)
        this.add.sprite(2*config.width/3,config.height/12,'spr_ui_chefLvl').setScale(0.1)
        this.numPlayerLevel = this.add.text(2*config.width/3,config.height/12, this.playerSettings.level, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
        this.numChefPoints = this.add.text(5*config.width/7,config.height/12, this.playerSettings.experience +'/'+ 0, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5);
        this.uploadPlayerLevel(0)

        //FREE DIAMONDS
        this.freeDiamondsButton = this.add.sprite(5.2*config.width/6, 2*config.height/7,'banner').setScale(0.5)
        this.add.sprite(4.8*config.width/6, 2*config.height/7,'spr_ui_icon_gem').setScale(0.05)
        this.freeGemsTextButton = this.add.text(5.3*config.width/6, 2*config.height/7, this.gameStrings.freeGemsText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.freeDiamondsButton.setInteractive().on('pointerdown', () => {console.log("Free diamonds"); this.freeDiamondsPanel();})

        //UPGRADES
        this.upgradesButton = this.add.sprite(5.2*config.width/6, config.height/2,'banner').setScale(0.5)
        this.add.sprite(4.8*config.width/6, config.height/2,'spr_ui_icon_gem').setScale(0.05)
        this.upgradesTextButton = this.add.text(5.3*config.width/6, config.height/2, this.gameStrings.upgradesButtonText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.upgradesTextButton.setInteractive().on('pointerdown', () => {console.log("Upgrades"); this.upgradesPanel();})

        //ROULETTE
        this.rouletteButton = this.add.sprite(5.2*config.width/6, 5*config.height/7,'banner').setScale(0.5)
        this.add.sprite(5.5*config.width/7, 5*config.height/7,'spr_ui_icon_spin').setScale(0.05)
        this.rouletteTextButton = this.add.text(5.3*config.width/6, 5*config.height/7, this.gameStrings.spinButtonText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.rouletteButton.setInteractive().on('pointerdown', () => {this.roulettePanel();})

        //SHOP
        this.shopButton = this.add.sprite(6*config.width/7, 6*config.height/7,'banner').setScale(0.5)
        this.add.sprite(5.5*config.width/7, 6*config.height/7,'spr_ui_icon_shop').setScale(0.02)
        this.shopTextButton = this.add.text(5.3*config.width/6, 6*config.height/7, this.gameStrings.shopButton, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.shopButton.setInteractive().on('pointerdown', () => {this.scene.start("Shop", { playerInfo: this.playerSettings });})

        //OPTIONS
        //this.add.sprite(config.width/14 - 200,config.height/10 - 10,'banner').setScale(4)
        this.options = this.add.sprite(config.width/14,config.height/10,'spr_ui_icon_settings').setScale(0.04).setTint(0xa3a3a3)
        this.options.setInteractive().on('pointerdown', () => {console.log("Options"); this.optionsPanel();})

        //LEVEL SELECTION
        this.add.sprite(2*config.width/5, 4*config.height/7,'banner_long').setScale(0.2)

        //this.kitchenCustom = this.add.sprite(config.width/4, 2*config.height/5,'banner_light').setScale(0.5)
        //this.add.text(config.width/4, 2*config.height/5, 'Kitchen', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.kitchenCustom.setInteractive().on('pointerdown', () => {console.log("Vamos a cambiar la cocina"); this.kitchenCustomPanel();})

        //this.interiorCustom = this.add.sprite(config.width/4, 3*config.height/5,'banner_light').setScale(0.5)
        //this.add.text(config.width/4, 3*config.height/5, 'Interior', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.interiorCustom.setInteractive().on('pointerdown', () => {console.log("Igual meto mas mesas"); this.interiorCustomPanel();})

        //this.taskButton = this.add.sprite(config.width/4, 4*config.height/5,'banner_light').setScale(0.5)
        //this.add.text(config.width/4, 4*config.height/5, 'Tasks', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.taskButton.setInteractive().on('pointerdown', () => {console.log("Vamos a hacer las tareaas"); this.taskPanel();})
        

        this.add.sprite(9*config.width/17, 4*config.height/7,'banner_big').setScale(0.1)

        //PLAY -> No aparecera en el juego final
        this.playButton = this.add.sprite(config.width/2,config.height/2,'playButton').setScale(0.3)
        this.playButton.setInteractive().on('pointerdown', () => {this.scene.start("bootGame", { playerInfo: this.playerSettings });})

        //BACK
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'spr_back').setScale(0.08)
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Inicio", { playerInfo: this.playerSettings });})


        //GIVE EXP
        this.expButton = this.add.sprite(config.width/12, config.height/2,'banner_light').setScale(0.5).setTint(0x123456)
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
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'banner_long').setScale(0.2)
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'spr_closeWindow').setScale(0.03)
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        
        
        //UseRoulette
        this.rouletteSprite = this.add.sprite(config.width/2, 2*config.height/5,'spr_ui_icon_spin').setScale(0.2).setVisible(false)
        this.rouletteBuyButton = this.add.sprite(config.width/2, 2*config.height/3,'banner_light').setScale(0.8).setVisible(false)
        this.coinRoulette = this.add.sprite(config.width/3, 2*config.height/3,'spr_ui_icon_coin').setScale(0.08).setVisible(false)
        this.textRoulette = this.add.text(config.width/2, 2*config.height/3,'500',{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        

        //View AD 
        this.ViweAdButton = this.add.sprite(config.width/2, 3*config.height/4,'banner_light').setScale(1).setVisible(false)
        this.textAd = this.add.text(config.width/2, 3*config.height/4,this.gameStrings.FreeGems_Button,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.textPreAd = this.add.text(config.width/2, config.height/2,this.gameStrings.FreeGems_Text,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.titleAd = this.add.text(config.width/2, config.height/4,this.gameStrings.FreeGems_Title,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        
        this.adSprite = this.add.sprite(config.width/2, config.height/2, 'advertising_image').setVisible(false)
        this.adSprite.displayWidth = config.width;
        this.adSprite.displayHeight = config.height;

        this.crossButtonAd = this.add.sprite(11*config.width/12, config.height/12,'spr_closeWindow').setScale(0.02)
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
        this.titleOptions = this.add.text(config.width/2, config.height/4, this.gameStrings.OptionMenu_title ,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.volumeOptions = this.add.text(3*config.width/7, config.height/2,this.gameStrings.OptionsMenu_text,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.empty_Selection = this.add.sprite(2*config.width/3, config.height/2,'tick_empty_button').setVisible(false).setScale(0.5)
        this.tick_Selection = this.add.sprite(2*config.width/3, config.height/2,'tick_button').setVisible(false).setScale(0.5)

        this.languageOptions = this.add.text(3*config.width/7, 2*config.height/3,this.gameStrings.OptionsMenu_language,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.language_empty_Selection = this.add.sprite(2*config.width/3, 2*config.height/3,'tick_empty_button').setVisible(false).setScale(0.5)
        this.language_tick_Selection = this.add.sprite(2*config.width/3, 2*config.height/3,'tick_button').setVisible(false).setScale(0.5)


        //Upgrade Panel
        this.UpgradeSelected = 1;
        this.upgradeSlot1 = this.add.sprite(config.width/3, 2*config.height/6, 'banner_light').setVisible(false).setScale(0.5)//Panel opcion
        this.upgradeSlotText1 = this.add.text(config.width/3, 2*config.height/6,'Mejora 1',{ font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto opcion
        this.upgradeSlot2 = this.add.sprite(config.width/3, 3*config.height/6, 'banner_light').setVisible(false).setScale(0.5).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText2 = this.add.text(config.width/3, 3*config.height/6,'Mejora 2',{ font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto opcion
        this.upgradeSlot3 = this.add.sprite(config.width/3, 4*config.height/6, 'banner_light').setVisible(false).setScale(0.5).setTint(0xb0b0b0)//Panel opcion
        this.upgradeSlotText3 = this.add.text(config.width/3, 4*config.height/6,'Mejora 3',{ font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto opcion

        
        
        this.upgradeDescriptionBanner = this.add.sprite(1.8*config.width/3, config.height/2,'banner_big').setScale(0.1).setVisible(false)//Panel descripcion
        this.upgradeTitleSlotText1 = this.add.text(1.8*config.width/3, config.height/3 , this.gameStrings.upgradesCoffeTime ,{ font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto descripcion
        this.upgradeDescriptionSlotText1 = this.add.text(1.8*config.width/3, config.height/2 , this.gameStrings.upgradesCoffeTimeDescription + this.playerSettings.upgrades.cofeeTime,{ font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto descripcion
        this.buySlot = this.add.sprite(1.8*config.width/3, 2*config.height/3, 'banner_light').setVisible(false).setScale(0.5).setTint(0x32a852)//Boton comprar
        this.buyUpgradeCoin = this.add.sprite(1.5*config.width/3, 2*config.height/3, 'spr_ui_icon_coin').setVisible(false).setScale(0.05)
        this.buySlotText = this.add.text(1.8*config.width/3, 2*config.height/3,500 + 500*this.playerSettings.upgrades.cofeeTime ,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        

        this.buySlot.setInteractive().on('pointerdown', () => {
            switch(this.UpgradeSelected){
                case 1:
                    //code
                    if(this.playerSettings.upgrades.cofeeTime < 3 && this.playerSettings.coins >= (500 + 500*this.playerSettings.upgrades.cofeeTime) ){
                        this.playerSettings.coins -= 500 + 500*this.playerSettings.upgrades.cofeeTime
                        this.numCoins.setText(this.playerSettings.coins)
                        this.playerSettings.upgrades.cofeeTime += 1
                        this.savePlayerSettings()
                        this.upgradesPanelDescription(1);
                        //this.upgradeDescriptionSlotText1.setText("-2 sec coffee time\nLevel: "+this.playerSettings.upgrades.cofeeTime)
                        //this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.cofeeTime)
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
                default:
                    //code
                    console.log("default")
            }

        })



        this.upgradeSlot1.setInteractive().on('pointerdown', () => {
            this.upgradeSlot1.setTint(0xffffff)
            this.upgradeSlot2.setTint(0xb0b0b0)
            this.upgradeSlot3.setTint(0xb0b0b0)
            this.UpgradeSelected = 1;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        this.upgradeSlot2.setInteractive().on('pointerdown', () => {
            this.upgradeSlot1.setTint(0xb0b0b0)
            this.upgradeSlot2.setTint(0xffffff)
            this.upgradeSlot3.setTint(0xb0b0b0)
            this.UpgradeSelected = 2;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })


        this.upgradeSlot3.setInteractive().on('pointerdown', () => {
            this.upgradeSlot1.setTint(0xb0b0b0)
            this.upgradeSlot2.setTint(0xb0b0b0)
            this.upgradeSlot3.setTint(0xffffff)
            this.UpgradeSelected = 3;
            this.upgradesPanelDescription(this.UpgradeSelected);
        })

        //LEVEL UP PANEL
        this.levelUpPanelTitle = this.add.text(config.width/2, config.height/4 , this.gameStrings.LevelUpTitle ,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto titulo
        this.levelUpPanelDesc = this.add.text(config.width/2, 1.15*config.height/3 , this.gameStrings.LevelUpDesc ,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)//Texto descripcion
        this.levelUpPanelRewardTitle = this.add.text(1.3*config.width/5, config.height/2 , this.gameStrings.LevelUpReward ,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setVisible(false)//Texto descripcion
        this.levelUpCoinReward = this.add.sprite(1.6*config.width/5, 2*config.height/3,'spr_ui_icon_coin').setScale(0.05).setOrigin(1,0.5).setVisible(false)
        this.levelUpCoinRewardText = this.add.text(1.6*config.width/5, 2*config.height/3, 200 ,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setVisible(false)//Texto titulo
        this.levelUpDiamondReward = this.add.sprite(2.6*config.width/5, 2*config.height/3,'spr_ui_icon_gem').setScale(0.05).setOrigin(0,0.5).setVisible(false)
        this.levelUpDiamondRewardText = this.add.text(3*config.width/5, 2*config.height/3, 200 ,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5).setVisible(false)//Texto titulo
    }


    freeDiamondsPanel(){
        this.disableAllButtons()
        this.ViweAdButton.setVisible(true)
        this.textAd.setVisible(true)
        this.titleAd.setVisible(true)
        this.textPreAd.setVisible(true)

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

    upgradesPanel(){
        this.disableAllButtons()
        this.upgradeSlot1.setVisible(true)
        this.upgradeSlotText1.setVisible(true)
        this.upgradeDescriptionBanner.setVisible(true)
        this.upgradeTitleSlotText1.setVisible(true)
        this.upgradeDescriptionSlotText1.setVisible(true)
        this.upgradeSlot2.setVisible(true)
        this.upgradeSlotText2.setVisible(true)
        this.upgradeSlot3.setVisible(true)
        this.upgradeSlotText3.setVisible(true)
        this.buySlot.setVisible(true)
        this.buyUpgradeCoin.setVisible(true)
        this.buySlotText.setVisible(true)
    }

    upgradesPanelDescription(number){
        if(number==1){
            
            this.upgradeTitleSlotText1.setText(this.gameStrings.upgradesCoffeTime)
            this.upgradeDescriptionSlotText1.setText(this.gameStrings.upgradesCoffeTimeDescription + this.playerSettings.upgrades.cofeeTime)
            if(this.playerSettings.upgrades.cofeeTime != 3){
                this.buySlot.setInteractive()
                this.buySlotText.setText(500 + 500*this.playerSettings.upgrades.cofeeTime)
                this.buySlot.setTint(0x32a852);
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
                this.buySlot.setTint(0x32a852);
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
                this.buySlot.setTint(0x32a852);
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
        
        
        if(this.playerSettings.language){
            this.language_empty_Selection.setVisible(false)
            this.language_tick_Selection.setVisible(true)
        }else{
            this.language_empty_Selection.setVisible(true)
            this.language_tick_Selection.setVisible(false)
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
            this.savePlayerSettings()
            this.tick_Selection.setVisible(true)
            
        })

        this.tick_Selection.setInteractive().on('pointerdown', () => {
            this.empty_Selection.setVisible(true)
            this.playerSettings.audioMuted = false;
            this.savePlayerSettings()
            this.tick_Selection.setVisible(false)
        })

        this.language_empty_Selection.setInteractive().on('pointerdown', () => {
            this.language_empty_Selection.setVisible(false)
            //this.currentLanguage = true;
            this.playerSettings.language = true;
            this.savePlayerSettings()
            this.language_tick_Selection.setVisible(true)
            this.gameStrings.convertToSpanish()
            this.changeAllText()
            //this.titleOptions.text = OptionMenu_title
        })

        this.language_tick_Selection.setInteractive().on('pointerdown', () => {
            this.language_tick_Selection.setVisible(false)
            //this.currentLanguage = false;
            this.playerSettings.language = false;
            this.savePlayerSettings()
            this.language_empty_Selection.setVisible(true)
            this.gameStrings.convertToEnglish()
            //this.titleOptions.text = OptionMenu_title
            this.changeAllText()
            
        })
    }


    disableAllButtons(){
        this.blackScreen.setVisible(true)//Oscurecer la pantalla de fondo
        this.freeDiamondsButton.disableInteractive()
        this.rouletteButton.disableInteractive()
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
        this.rouletteButton.setInteractive()
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

        //Options
        this.titleOptions.setVisible(false)
        this.volumeOptions.setVisible(false)
        this.empty_Selection.setVisible(false)
        this.tick_Selection.setVisible(false)
        this.language_empty_Selection.setVisible(false)
        this.language_tick_Selection.setVisible(false)
        this.languageOptions.setVisible(false)

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

    changeAllText(){
        //Menu
        this.freeGemsTextButton.text = this.gameStrings.freeGemsText
        this.rouletteTextButton.text = this.gameStrings.spinButtonText
        this.shopTextButton.text = this.gameStrings.shopButton
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
        localStorage.setItem('playerSettings', JSON.stringify(this.playerSettings))
    }

    uploadPlayerLevel(number){
        var expPerLevel = [0,10,50,100,200,500]
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