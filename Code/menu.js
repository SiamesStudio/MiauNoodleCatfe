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
        var background = this.add.image(config.width/2,config.height/2,'selection_menu_background')//fondo
        background.displayWidth = config.width;
        background.displayHeight = config.height;


        //COIN
        this.add.sprite(config.width/4,config.height/12,'banner').setScale(0.5)
        this.add.sprite(config.width/5,config.height/12,'coin').setScale(0.05)
        this.numCoins = this.add.text(2*config.width/7,config.height/12, this.playerSettings.coins, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5);

        //DIAMONDS
        this.add.sprite(config.width/2,config.height/12,'banner').setScale(0.5)
        this.add.sprite(2*config.width/5,config.height/12,'diamond').setScale(0.05)
        this.numDiamonds = this.add.text(3.5*config.width/7,config.height/12, this.playerSettings.diamonds, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5);

        //CHEF POINTS
        this.add.sprite(3*config.width/4 ,config.height/12,'banner').setScale(0.5)
        this.add.sprite(2*config.width/3,config.height/12,'chef_points').setScale(0.1)
        this.numPlayerLevel = this.add.text(2*config.width/3,config.height/12, this.playerSettings.level, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
        this.numChefPoints = this.add.text(5*config.width/7,config.height/12, this.playerSettings.experience +'/'+ 0, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0,0.5);

        //FREE DIAMONDS
        this.freeDiamondsButton = this.add.sprite(5.2*config.width/6, 2*config.height/7,'banner').setScale(0.5)
        this.add.sprite(5.5*config.width/7, 2*config.height/7,'diamond').setScale(0.05)
        this.freeGemsTextButton = this.add.text(5.3*config.width/6, 2*config.height/7, this.gameStrings.freeGemsText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.freeDiamondsButton.setInteractive().on('pointerdown', () => {console.log("Free diamonds"); this.freeDiamondsPanel();})

        //ROULETTE
        this.rouletteButton = this.add.sprite(5.2*config.width/6, 5*config.height/7,'banner').setScale(0.5)
        this.add.sprite(5.5*config.width/7, 5*config.height/7,'roulette').setScale(0.05)
        this.rouletteTextButton = this.add.text(5.3*config.width/6, 5*config.height/7, this.gameStrings.spinButtonText, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.rouletteButton.setInteractive().on('pointerdown', () => {this.roulettePanel();})

        //SHOP
        this.shopButton = this.add.sprite(6*config.width/7, 6*config.height/7,'banner').setScale(0.5)
        this.add.sprite(5.5*config.width/7, 6*config.height/7,'shop').setScale(0.02)
        this.shopTextButton = this.add.text(5.3*config.width/6, 6*config.height/7, this.gameStrings.shopButton, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.shopButton.setInteractive().on('pointerdown', () => {this.scene.start("Shop", { playerInfo: this.playerSettings });})

        //OPTIONS
        //this.add.sprite(config.width/14 - 200,config.height/10 - 10,'banner').setScale(4)
        this.options = this.add.sprite(config.width/14,config.height/10,'options').setScale(0.04).setTint(0xa3a3a3)
        this.options.setInteractive().on('pointerdown', () => {console.log("Options"); this.optionsPanel();})

        //LEVEL SELECTION
        this.add.sprite(2*config.width/5, 4*config.height/7,'banner_long').setScale(0.2)

        this.kitchenCustom = this.add.sprite(config.width/4, 2*config.height/5,'banner_light').setScale(0.5)
        this.add.text(config.width/4, 2*config.height/5, 'Kitchen', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.kitchenCustom.setInteractive().on('pointerdown', () => {console.log("Vamos a cambiar la cocina"); this.kitchenCustomPanel();})

        this.interiorCustom = this.add.sprite(config.width/4, 3*config.height/5,'banner_light').setScale(0.5)
        this.add.text(config.width/4, 3*config.height/5, 'Interior', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.interiorCustom.setInteractive().on('pointerdown', () => {console.log("Igual meto mas mesas"); this.interiorCustomPanel();})

        this.taskButton = this.add.sprite(config.width/4, 4*config.height/5,'banner_light').setScale(0.5)
        this.add.text(config.width/4, 4*config.height/5, 'Tasks', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.taskButton.setInteractive().on('pointerdown', () => {console.log("Vamos a hacer las tareaas"); this.taskPanel();})
        

        this.add.sprite(9*config.width/17, 4*config.height/7,'banner_big').setScale(0.1)

        //PLAY -> No aparecera en el juego final
        this.playButton = this.add.sprite(config.width/2,config.height/2,'playButton').setScale(0.3)
        this.playButton.setInteractive().on('pointerdown', () => {this.scene.start("bootGame");})

        //BACK
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'back').setScale(0.08)
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Inicio", { playerInfo: this.playerSettings });})


        //GIVE EXP
        this.expButton = this.add.sprite(config.width/12, config.height/2,'banner_light').setScale(0.5).setTint(0x123456)
        this.expButton.setInteractive().on('pointerdown', () => {
            this.playerSettings.experience += 5, 
            this.playerSettings.level = this.uploadPlayerLevel()
            this.numPlayerLevel.setText(this.playerSettings.level)
            this.savePlayerSettings()
        })
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------


        //EXTRAS (Free gems, roulette, options, kitchen custom, interior custom, tasks)
        this.blackScreen = this.add.image(config.width/2, config.height/2, 'blackScreen').setAlpha(0.5);
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'banner_long').setScale(0.2)
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'cross').setScale(0.03)
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        
        
        //UseRoulette
        this.rouletteSprite = this.add.sprite(config.width/2, 2*config.height/5,'roulette').setScale(0.2).setVisible(false)
        this.rouletteBuyButton = this.add.sprite(config.width/2, 2*config.height/3,'banner_light').setScale(0.8).setVisible(false)
        this.coinRoulette = this.add.sprite(config.width/3, 2*config.height/3,'coin').setScale(0.08).setVisible(false)
        this.textRoulette = this.add.text(config.width/2, 2*config.height/3,'500',{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        

        //View AD 
        this.ViweAdButton = this.add.sprite(config.width/2, 3*config.height/4,'banner_light').setScale(1).setVisible(false)
        this.textAd = this.add.text(config.width/2, 3*config.height/4,this.gameStrings.FreeGems_Button,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.textPreAd = this.add.text(config.width/2, config.height/2,this.gameStrings.FreeGems_Text,{ font: "20px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        this.titleAd = this.add.text(config.width/2, config.height/4,this.gameStrings.FreeGems_Title,{ font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5).setVisible(false)
        
        this.adSprite = this.add.sprite(config.width/2, config.height/2, 'advertising_image').setVisible(false)
        this.adSprite.displayWidth = config.width;
        this.adSprite.displayHeight = config.height;

        this.crossButtonAd = this.add.sprite(11*config.width/12, config.height/12,'cross').setScale(0.02)
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

    }


    freeDiamondsPanel(){
        this.disableAllButtons()
        this.ViweAdButton.setVisible(true)
        this.textAd.setVisible(true)
        this.titleAd.setVisible(true)
        this.textPreAd.setVisible(true)

        this.crossButtonAd.setInteractive().on('pointerdown', () => {//Cerrar anuncio
            //Add diamonds
            this.adSprite.setVisible(false); 
            this.crossButtonAd.setVisible(false); 
            this.ViweAdButton.setTint(0xb0b0b0)
            this.ViweAdButton.disableInteractive()
            this.textAd.setTint(0xb0b0b0)
            this.enableAllButtons(); 
            totalDiamonds += 3;
            this.numDiamonds.text = totalDiamonds;
        })

        
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

    kitchenCustomPanel(){
        this.disableAllButtons()
    }

    interiorCustomPanel(){
        this.disableAllButtons()
    }

    taskPanel(){
        this.disableAllButtons()
    }


    disableAllButtons(){
        this.blackScreen.setVisible(true)//Oscurecer la pantalla de fondo
        this.freeDiamondsButton.disableInteractive()
        this.rouletteButton.disableInteractive()
        this.shopButton.disableInteractive()
        this.options.disableInteractive()
        this.kitchenCustom.disableInteractive()
        this.interiorCustom.disableInteractive()
        this.taskButton.disableInteractive()
        this.backButton.disableInteractive()
        this.playButton.disableInteractive()
        this.extraBanner.setVisible(true)//Pintar panel -> Mismo para todas las acciones
        this.crossButton.setVisible(true)//Pintar boton de cerrar panel
    }

    enableAllButtons(){
        this.freeDiamondsButton.setInteractive()
        this.rouletteButton.setInteractive()
        this.shopButton.setInteractive()
        this.options.setInteractive()
        this.kitchenCustom.setInteractive()
        this.interiorCustom.setInteractive()
        this.taskButton.setInteractive()
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
    }

    savePlayerSettings(){
        localStorage.setItem('playerSettings', JSON.stringify(this.playerSettings))
    }

    uploadPlayerLevel(){
        var expPerLevel = [0,10,50,100,200,500]

        var currentLevel = this.getLevel(expPerLevel,0,expPerLevel.length, this.playerSettings.experience)

        this.numChefPoints.setText( (this.playerSettings.experience - expPerLevel[currentLevel]) +"/"+ (expPerLevel[currentLevel+1] - expPerLevel[currentLevel]) )

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