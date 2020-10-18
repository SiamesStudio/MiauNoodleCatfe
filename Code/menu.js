class Menu extends Phaser.Scene {
    constructor(){
        super("Menu")
    }

    preload(){
        this.load.image('selection_menu_background','assets/UI/fondo_menu.png')//fondo
        this.load.image('coin','assets/UI/coin.png')//monedas
        this.load.image('diamond','assets/UI/diamond.png')//diamantes
        this.load.image('chef_points','assets/UI/experience_icon.png')//experiencia
        //free_diamantes
        this.load.image('roulette','assets/UI/roulette.png')//ruleta
        this.load.image('shop','assets/UI/shop.png')//tienda
        this.load.image('options','assets/UI/options.png')//opciones
        this.load.image('banner_big','assets/UI/banner_big.png')//paneles
        this.load.image('banner_long','assets/UI/banner_long.png')//paneles
        //decorar_cocina
        //decorar_interior
        //tareas
        //lista niveles
        this.load.image('banner','assets/UI/selection_menu_banner.png')
        this.load.image('banner_light','assets/UI/selection_menu_banner_light.png')
        this.load.image('back','assets/UI/back.png')//Back
        this.load.image('blackScreen','assets/UI/blackScreen.png')
        this.load.image('cross','assets/UI/cross.png')
        this.load.image('advertising_image','assets/UI/anuncio.png')
    }

    create(){
        var scene = this;
        var background = this.add.image(config.width/2,config.height/2,'selection_menu_background').setScale(2)//fondo
        //paneles
        //lista niveles + slider

        //COIN
        this.add.sprite(config.width/4,config.height/12,'banner').setScale(1.25)
        this.add.sprite(config.width/4 - 50,config.height/12,'coin').setScale(0.1)
        var numCoins = this.add.text(config.width/4 - 25,config.height/12 - 15, '9999', { font: "30px Arial", fill: "#ffffff", align: "center" });

        //DIAMONDS
        this.add.sprite(config.width/2,config.height/12,'banner').setScale(1.25)
        this.add.sprite(config.width/2 - 50,config.height/12,'diamond').setScale(0.1)
        var numDiamonds = this.add.text(config.width/2 - 25,config.height/12 - 15, '9999', { font: "30px Arial", fill: "#ffffff", align: "center" });

        //CHEF POINTS
        this.add.sprite(3*config.width/4 ,config.height/12,'banner').setScale(1.25)
        this.add.sprite(3*config.width/4 - 75,config.height/12,'chef_points').setScale(0.25)
        var numPlayerLevel = this.add.text(3*config.width/4 - 70,config.height/12 - 15, '3', { font: "40px Arial", fill: "#000000", align: "center" });
        var numChefPoints = this.add.text(3*config.width/4 - 25,config.height/12 - 15, '10/200', { font: "30px Arial", fill: "#ffffff", align: "center" });

        //FREE DIAMONDS
        this.freeDiamondsButton = this.add.sprite(5.2*config.width/6, 2*config.height/7,'banner').setScale(1.25)
        this.add.sprite(5.2*config.width/6 - 50, 2*config.height/7,'diamond').setScale(0.1)
        this.add.text(5.2*config.width/6 - 20, 2*config.height/7 - 21, 'Free', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.freeDiamondsButton.setInteractive().on('pointerdown', () => {console.log("Free diamonds"); this.freeDiamondsPanel();})

        //ROULETTE
        this.rouletteButton = this.add.sprite(5.2*config.width/6, 5*config.height/7,'banner').setScale(1.25)
        this.add.sprite(5.2*config.width/6 - 50, 5*config.height/7,'roulette').setScale(0.125)
        this.add.text(5.2*config.width/6 - 20, 5*config.height/7 - 21, 'Spin', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.rouletteButton.setInteractive().on('pointerdown', () => {this.roulettePanel();})

        //SHOP
        this.shopButton = this.add.sprite(5.2*config.width/6, 6*config.height/7,'banner').setScale(1.25)
        this.add.sprite(5.2*config.width/6 - 50, 6*config.height/7,'shop').setScale(0.05)
        this.add.text(5.2*config.width/6 - 20, 6*config.height/7 - 21, 'Shop', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.shopButton.setInteractive().on('pointerdown', () => {this.scene.start("Shop");})

        //OPTIONS
        this.add.sprite(config.width/14 - 200,config.height/10 - 10,'banner').setScale(4)
        this.options = this.add.sprite(config.width/14,config.height/10,'options').setScale(0.08).setTint(0xa3a3a3)
        this.options.setInteractive().on('pointerdown', () => {console.log("Options"); this.optionsPanel();})

        //LEVEL SELECTION
        this.add.sprite(config.width/2 - 50, config.height/2,'banner_long').setScale(0.5)

        this.kitchenCustom = this.add.sprite(config.width/2 - 175,config.height/3,'banner_light').setScale(1.25)
        this.add.text(config.width/2 - 240,config.height/3 - 21, 'Kitchen', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.kitchenCustom.setInteractive().on('pointerdown', () => {console.log("Vamos a cambiar la cocina"); this.kitchenCustomPanel();})

        this.interiorCustom = this.add.sprite(config.width/2 - 175,config.height/2,'banner_light').setScale(1.25)
        this.add.text(config.width/2 - 240,config.height/2 - 21, 'Interior', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.interiorCustom.setInteractive().on('pointerdown', () => {console.log("Igual meto mas mesas"); this.interiorCustomPanel();})

        this.taskButton = this.add.sprite(config.width/2 - 175, 2*config.height/3,'banner_light').setScale(1.25)
        this.add.text(config.width/2 - 240, 2*config.height/3 - 21, 'Tasks', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.taskButton.setInteractive().on('pointerdown', () => {console.log("Vamos a hacer las tareaas"); this.taskPanel();})
        

        this.add.sprite(config.width/2 + 50, config.height/2,'banner_big').setScale(0.25)

        //PLAY -> No aparecera en el juego final
        this.playButton = this.add.sprite(4*config.width/7,config.height/2,'playButton').setScale(0.7)
        this.playButton.setInteractive().on('pointerdown', () => {this.scene.start("bootGame");})

        //BACK
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'back').setScale(0.2)
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Inicio");})


        //----------------------------------------------------------------------------------------------------------------------------------------------------------------


        //EXTRAS (Free gems, roulette, options, kitchen custom, interior custom, tasks)
        this.blackScreen = this.add.image(config.width/2, config.height/2, 'blackScreen').setScale(1.5).setAlpha(0.5);
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2 - 50, config.height/2,'banner_long').setScale(0.5)
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(config.width/2 + 180, config.height/2 - 150,'cross').setScale(0.06)
        this.crossButton.setVisible(false)
        this.crossButton.setInteractive().on('pointerdown', () => {this.enableAllButtons();})

        
        
        //UseRoulette
        this.rouletteSprite = this.add.sprite(config.width/2 - 50, config.height/2 - 40,'roulette').setScale(0.5).setVisible(false)
        this.rouletteBuyButton = this.add.sprite(config.width/2 - 50, config.height/2 + 100,'banner_light').setScale(2).setVisible(false)
        this.coinRoulette = this.add.sprite(config.width/2 - 120, config.height/2 + 100,'coin').setScale(0.2).setVisible(false)
        this.textRoulette = this.add.text(config.width/2 - 50, config.height/2 + 65,'500',{ font: "60px Arial", fill: "#ffffff", align: "center" }).setVisible(false)
        

        //View AD 
        this.ViweAdButton = this.add.sprite(config.width/2 - 50, config.height/2 + 100,'banner_light').setScale(2).setVisible(false)
        this.textAd = this.add.text(config.width/2 - 125, config.height/2 + 65,'FREE',{ font: "60px Arial", fill: "#ffffff", align: "center" }).setVisible(false)
        this.textPreAd = this.add.text(config.width/2 - 270, config.height/2 - 50,'Watch a video to recieve \n extra gems!',{ font: "40px Arial", fill: "#ffffff", align: "center" }).setVisible(false)
        this.titleAd = this.add.text(config.width/2 - 125, config.height/2 - 140,'GIFT',{ font: "60px Arial", fill: "#ffffff", align: "center" }).setVisible(false)
        
        this.adSprite = this.add.sprite(config.width/2, config.height/2, 'advertising_image').setVisible(false)
        this.adSprite.displayWidth = config.width;
        this.adSprite.scaleY = this.adSprite.scaleX

        this.crossButtonAd = this.add.sprite(9*config.width/10, config.height/8,'cross').setScale(0.05)
        this.crossButtonAd.setVisible(false)
        

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
            this.textAd.setTint(0xb0b0b0)
            this.enableAllButtons(); 
        })

        this.ViweAdButton.setInteractive().on('pointerdown', () => { //VER ANUNCIO
            this.adSprite.setVisible(true)
            this.ViweAdButton.disableInteractive()
            var button = this.crossButtonAd;
            setTimeout(function(){ 
                button.setVisible(true);
                 }, 5000);
            
        })
    }

    roulettePanel(){
        this.disableAllButtons()
        this.rouletteSprite.setVisible(true)
        this.rouletteBuyButton.setVisible(true)
        this.coinRoulette.setVisible(true)
        this.textRoulette.setVisible(true)

        this.rouletteBuyButton.setInteractive().on('pointerdown', () => {
            alert("Has tirado de la ruleta!!")
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
    }

}