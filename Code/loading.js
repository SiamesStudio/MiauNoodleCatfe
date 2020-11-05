class Loading extends Phaser.Scene {
    constructor(){
        super("Carga")
        
    }

    init(){
        this.defaultPlayer = {
            coins: 0,
            diamonds: 0,
            level: 1,
            experience: 0,
            language: false,
            audioMuted: false,
            moneySpent: 0,
            upgrades : {
                cofeeTime : 0,
                coffeeMachineLevel : 0,
                pancakeTime : 0,
                pancakeBurnTime : 0,
                pancakePanLevel : 0,
                noodleTime : 0,
                noodleBurnTime : 0,
                noodleLevel :0,
                tableClothPancakeLevel :0,
                tableClothNoodleLevel :0, 
            }
        }
    }

    preload(){
        //this.load.image('loading','assets/UI/loading.jpg');
        var sceneRef = this;
        var loading_Text = this.add.text(config.width/2 ,config.height/3, 'Loading... 0%', { font: "30px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        var lastAssetLoaded = this.add.text(config.width/2 ,2*config.height/3, 'Asset: ', { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        var progressBox = this.add.rectangle(config.width/2, config.height/2, 3.7*config.width/7, 25, 0xa4b0af).setOrigin(0.5);
        var progressBar = this.add.rectangle(config.width/4, config.height/2, 0, 20, 0xff6699);

        this.load.on('progress', function (value) {
            console.log(value);
            loading_Text.setText("Loading... "+ parseInt(value * 100) +"%")
            progressBar.destroy();
            sceneRef.add.rectangle(config.width/4, config.height/2, config.width/2 * value, 20, 0xff6699).setOrigin(0,0.5);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
            lastAssetLoaded.setText("Asset: "+file.key);
        });
         
        this.load.on('complete', function () {
            console.log('complete');
        });
        

        //Inicio assets
        this.load.image('spr_bck_titleMenu','assets/UI/spr_bck_titleMenu.jpg');
        this.load.image('logo','assets/UI/logo.png');
        this.load.image('logo2','assets/UI/logo2.png');
        this.load.image('playButton','assets/UI/playButton.png');
        this.load.image('contactButton','assets/UI/contactButton.png');
        this.load.image('spr_logoTeam_Inicio','assets/UI/spr_logoTeam_Inicio.png');

        
        //MENU assets
        this.load.image('spr_bck_mainMenu','assets/UI/spr_bck_mainMenu.png')//fondo
        this.load.image('spr_ui_icon_coin','assets/UI/spr_ui_icon_coin.png')//monedas
        this.load.image('spr_ui_icon_gem','assets/UI/spr_ui_icon_gem.png')//diamantes
        this.load.image('spr_ui_chefLvl','assets/UI/spr_ui_chefLvl.png')//experiencia
        //free_diamantes
        this.load.image('spr_ui_icon_spin','assets/UI/spr_ui_icon_spin.png')//ruleta
        this.load.image('spr_ui_icon_shop','assets/UI/spr_ui_icon_shop.png')//tienda
        this.load.image('spr_ui_icon_settings','assets/UI/spr_ui_icon_settings.png')//opciones
        this.load.image('banner_big','assets/UI/banner_big.png')//paneles
        this.load.image('banner_long','assets/UI/banner_long.png')//paneles
        //decorar_cocina
        //decorar_interior
        //tareas
        //lista niveles
        this.load.image('banner','assets/UI/selection_menu_banner.png')
        this.load.image('banner_light','assets/UI/selection_menu_banner_light.png')
        this.load.image('spr_back','assets/UI/spr_back.png')//Back
        this.load.image('blackScreen','assets/UI/blackScreen.png')
        this.load.image('spr_closeWindow','assets/UI/spr_closeWindow.png')
        this.load.image('advertising_image','assets/UI/anuncio.png')

        this.load.image('tick_button','assets/UI/tick_button.png')
        this.load.image('tick_empty_button','assets/UI/tick_empty_button.png')


        //SHOP assets
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
        
        this.score = parseInt(localStorage.getItem('score')) || 0
        localStorage.setItem('score', this.score + 1)
        this.add.text(config.width/2 ,3*config.height/4, this.score, { font: "20px Arial", fill: "#ffffff", align: "center" });

        localStorage.removeItem('playerSettings')
        if(localStorage.getItem('playerSettings') === null){ //Si no se ha creado el almacenamiento, lo crea
            console.log("if")
            localStorage.setItem('playerSettings', JSON.stringify(this.defaultPlayer))
            this.playerSettings = this.defaultPlayer;
        }
        else{                                                //Si ya existe, lo carga
            console.log("else")
            this.playerSettings = JSON.parse(localStorage.getItem('playerSettings'))
        }


        this.scene.start("Inicio",{playerInfo: this.playerSettings})
        
    }

}