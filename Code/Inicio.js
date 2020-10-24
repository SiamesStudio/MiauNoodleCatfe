class Inicio extends Phaser.Scene {
    constructor(){
        
        super("Inicio")
        
    }

    init(/*gameStrings*/gameData){
        this.language = gameData.language
        console.log(gameData.language)
    }

    preload(){

        //this.load.image('loading','assets/UI/loading.jpg');
        //this.add.image(config.width/2,config.height/2,'loading').setScale(0.2);
        
        this.load.image('background_menu','assets/UI/background_menu.jpg');
        this.load.image('logo','assets/UI/logo.png');
        this.load.image('logo2','assets/UI/logo2.png');
        this.load.image('playButton','assets/UI/playButton.png');
        this.load.image('contactButton','assets/UI/contactButton.png');
        this.load.image('logo_2_seconds','assets/UI/logo_2_seconds.png');

        

        //MENU assets
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

        this.load.image('tick_button','assets/UI/tick_button.png')
        this.load.image('tick_empty_button','assets/UI/tick_empty_button.png')

    }

    create(){
        //console.log(this.gameStrings.textData.freeGemsText)
        
        var scene = this;
        var backgroundMenu = this.add.image(config.width/2,config.height/2,'background_menu').setScale(0.3);
        var logo = this.add.image(config.width/2,config.height/4,'logo').setScale(0.4);
        var logo2 = this.add.image(4*config.width/5,4*config.height/5,'logo2').setScale(0.15);
        var contactButton = this.add.image(config.width/2,3*config.height/4,'contactButton').setScale(0.15)
        var playButton = this.add.image(config.width/2,config.height/2,'playButton').setScale(0.3)
        var text = this.add.text(config.width/4 ,config.height/4, 'Miau Noodle Catfe', { font: "20px Arial", fill: "#ffffff", align: "center" });
        var logo_2_seconds = this.add.image(config.width/2,config.height/2,'logo_2_seconds');
        logo_2_seconds.displayWidth = config.width;
        logo_2_seconds.displayHeight = config.height;

        playButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu", {language: this.language}); })
        playButton.disableInteractive();

        contactButton.setInteractive().on('pointerdown', () => {
            var url = 'https://siamesstudio.github.io/'
            var s = window.open(url, '_blank');
            window.location.href = url;
        })
        contactButton.disableInteractive();

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            logo_2_seconds.destroy()
            camera.fadeIn(1000);
            playButton.setInteractive()
            contactButton.setInteractive()
        });

        setTimeout(function(){
            scene.cameras.main.fadeOut(1000);
             }, 2000);
    }

}