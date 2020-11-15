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
        var loadingText = "Loading... ";

        if(localStorage.getItem('playerSettings') === null){
            loadingText = "Loading... "
        }else{
            this.playerSettings_previo = JSON.parse(localStorage.getItem('playerSettings'))
            if(this.playerSettings_previo.language){
                loadingText = "Cargando... "
            }else{
                loadingText = "Loading... "
            }
        }

        this.load.on('progress', function (value) {
            //console.log(value);
            loading_Text.setText(loadingText+ parseInt(value * 99) +"%")
            progressBar.destroy();
            sceneRef.add.rectangle(config.width/4, config.height/2, config.width/2 * value, 20, 0xff6699).setOrigin(0,0.5);
        });
                    
        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
            lastAssetLoaded.setText("Asset: "+file.key);
        });
         
        this.load.on('complete', function () {
            //console.log('complete');
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

        //RADIO
        this.load.image('spr_radioSpin','assets/UI/radio_spin.png');


        //ANIMATIONS
        this.load.spritesheet('anim_ladle_0', 'assets/animaciones/JWRRSS_ladle_animation_0.png',
        {frameWidth: 48,frameHeight: 75}
        );
        
        this.load.spritesheet('anim_ladle_1', 'assets/animaciones/JWRRSS_ladle_animation_1.png',
        {frameWidth: 48,frameHeight: 75}
        );

        this.load.spritesheet('anim_ladle_2', 'assets/animaciones/JWRRSS_ladle_animation_2.png',
        {frameWidth: 48,frameHeight: 75}
        );

        this.load.spritesheet('anim_ladle_3', 'assets/animaciones/JWRRSS_ladle_animation_3.png',
        {frameWidth: 48,frameHeight: 75}
        );

        this.load.spritesheet('anim_olla_burbujas', 'assets/animaciones/JWRRSS_olla_burbujas.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_olla_noodles_burnt', 'assets/animaciones/JWRRSS_olla_noodles_burnt.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_olla_noodles_cooking', 'assets/animaciones/JWRRSS_olla_noodles_cooking.png',
        {frameWidth: 84,frameHeight: 85}
        );
        
        this.load.multiatlas('assets_atlas', 'assets/assets.json', 'assets');

        this.loadCoffeeScreen();
		this.loadNoodleScreen();
        this.loadAudio();
        
        this.load.bitmapFont('BitPap', 'assets/font/CafeFont.png', 'assets/font/CafeFont.xml')
    }

    loadCoffeeScreen()
	{
        this.load.image('client','assets/client.jpg');
        this.load.path = 'assets/SpritesPatri/';
		this.load.image('spr_trashCan','spr_trashCan.png');
		this.load.image('spr_coffeeMachine_1','spr_coffeeMachine_1.png');
		this.load.image('spr_coffeeMachine_2','spr_coffeeMachine_2.png');
		this.load.image('spr_coffeeMachine_3','spr_coffeeMachine_3.png');
		this.load.image('spr_coffeeMachine_4','spr_coffeeMachine_4.png');
        this.load.image('spr_griddle','spr_griddle.png');
        this.load.image('spr_griddle_0','spr_griddle_0.png');
        this.load.image('spr_griddle_1','spr_griddle_1.png');
        this.load.image('spr_griddle_2','spr_griddle_2.png');
        this.load.image('spr_griddle_3','spr_griddle_3.png');
        this.load.image('spr_topping_posters','spr_topping_posters.png');
		this.load.image('spr_glasses','spr_glasses.png');
		this.load.image('spr_dishes','spr_dishes.png');
		this.load.image('spr_glass_filled','spr_glass_filled.png');
		this.load.image('spr_glass_empty','spr_glass_empty.png');
		this.load.image('spr_dish','spr_dish.png');
		this.load.image('spr_tablecloth_0','spr_tablecloth_0.png');
        this.load.image('spr_tablecloth_1','spr_tablecloth_1.png');
        this.load.image('spr_tablecloth_2','spr_tablecloth_2.png');
        this.load.image('spr_tablecloth_3','spr_tablecloth_3.png');
		// Animación de la cafetera dispensando el café (individual por cada dispensador): nombrado dependiente de la implementación.
		this.load.image('spr_pancake_bottle','spr_pancake_bottle.png');
		// Botes de siropes: spr_syrup_tipoDeSirope.
		this.load.image('spr_pancake_cooking','spr_pancake_cooking.png');
		// Animación masa haciéndose por una cara: nombrado dependiente de la implementación.
		// Animación de masa haciéndose por la otra cara: nombrado dependiente de la implementación
		
		this.load.image('spr_pancake_cooked','spr_pancake_cooked.png');
		this.load.image('spr_pancake_burnt','spr_pancake_burnt.png');
		// this.load.image('spr_topDown_pancake', 'spr_topDown_pancake.png');
		// cada sirope visto desde arriba (pantalla de echar sirope) spr_topDown_syrup_tipoDeSirope.
		// Máscaras de sirope (tantas como personajes): spr_syrup_mask_idDeLaMascara
		this.load.image('spr_topping_lacasitos','spr_topping_lacasitos.png');
		this.load.image('spr_topping_coconut','spr_topping_coconut.png');
		this.load.image('spr_topping_strawberry','spr_topping_strawberry.png');
		this.load.image('spr_topping_banana','spr_topping_banana.png');
		this.load.image('spr_syrup_caramel','spr_syrup_caramel.png');
		this.load.image('spr_syrup_chocolate','spr_syrup_chocolate.png');
		this.load.image('spr_syrup_strawberry','spr_syrup_strawberry.png');
		/* Todas las combinaciones de tortitas posibles teniendo en cuenta las máscaras (diferentes
			formas de sirope): spr_pancake_TipoDeSirope_idDeLaMascara_Topping1.. */
		// this.load.image('spr_Catfe_background','spr_Catfe_background.png');
		this.load.image('spr_radio','spr_radio.png');
		// this.load.image('spr_radio_zoomed','spr_radio_zoomed.png');
		
	}

    loadNoodleScreen()
    {
        this.load.path = '';
    	// Animación de hervir: nombrado dependiente de la implementación.
    	// REPEATED?¿ this.load.image('spr_tableCloth','assets/spr_tableCloth.png');
    	this.load.image('spr_bowls','assets/spr_bowls.jpg');
    	this.load.image('spr_ladre','assets/spr_ladre.jpg');
    	// Animación del cucharón echando cada salsa. (3 en total): nombrado dependiente de la implementación

    	/* 
    	Todas las combinaciones de noodles posibles ya cocinados: spr_noodles_Salsa_Topping1..
    	Fondo animado de calle: animación de gente caminando por la calle: nombrado dependiente de la implementación.
    	Fondo animado de calle: animación de la iluminación desde la mañana hasta la noche:
    	nombrado dependiente de la implementación.
    	Animación de parpadeo del cartel de open neón: nombrado dependiente de la implementación
    	*/
    }
//
	loadAudio()
	{
		/* Estos no van en esta escena
		
		this.load.audio('snd_purchase', 'snd_purchase.wav');
		*/
        //this.load.path = "../SFX/";
        
		this.load.audio('snd_burnt', 'assets/sound/snd_burnt.wav'); //Used
		this.load.audio('snd_coins_gain', 'assets/sound/snd_coins_gain.wav');
		this.load.audio('snd_dish', 'assets/sound/snd_dish.wav'); //Used
		this.load.audio('snd_filling_catfe', 'assets/sound/snd_filling_catfe.wav'); //Used
		this.load.audio('snd_gameOver', 'assets/sound/snd_gameOver.wav'); 
		this.load.audio('snd_levelUp', 'assets/sound/snd_levelUp.wav');
		this.load.audio('snd_topping', 'assets/sound/snd_topping.wav');
		this.load.audio('snd_music_alone', 'assets/music/snd_music_alone.mp3');
		this.load.audio('snd_music_biscuit', 'assets/music/snd_music_biscuit.mp3');
		this.load.audio('snd_music_bobaTea', 'assets/music/snd_music_bobaTea.mp3');
		this.load.audio('snd_music_bored', 'assets/music/snd_music_bored.mp3');
		this.load.audio('snd_music_branch', 'assets/music/snd_music_branch.mp3');
		this.load.audio('snd_music_bread', 'assets/music/snd_music_bread.mp3');
		this.load.audio('snd_music_breakUp', 'assets/music/snd_music_breakUp.mp3');
		this.load.audio('snd_music_cafe', 'assets/music/snd_music_cafe.mp3');
		this.load.audio('snd_music_cheese', 'assets/music/snd_music_cheese.mp3');
		this.load.audio('snd_music_chocolate', 'assets/music/snd_music_chocolate.mp3');
		this.load.audio('snd_music_cloud', 'assets/music/snd_music_cloud.mp3');
		this.load.audio('snd_music_everyDay', 'assets/music/snd_music_everyDay.mp3');
		this.load.audio('snd_music_kitchen', 'assets/music/snd_music_kitchen.mp3');
		this.load.audio('snd_music_pancake', 'assets/music/snd_music_pancake.mp3');
		this.load.audio('snd_music_rainyDay', 'assets/music/snd_music_rainyDay.mp3');
      this.load.audio('snd_music_kitchen', 'assets/music/snd_music_kitchen.mp3'); 
        
		this.load.audio('snd_noodles_cooking', 'assets/sound/snd_noodles_cooking.wav'); //Used
		this.load.audio('snd_pancake_cooking', 'assets/sound/snd_pancake_cooking.wav'); //Used
		this.load.audio('snd_ready', 'assets/sound/snd_ready.wav'); //Used
		this.load.audio('snd_tap', 'assets/sound/snd_tap.wav'); //Used
		this.load.audio('snd_trash', 'assets/sound/snd_trash.wav'); //Used
		this.load.audio('snd_ui_back', 'assets/sound/snd_ui_back.wav');
		this.load.audio('snd_ui_pop', 'assets/sound/snd_ui_pop.wav');
		this.load.audio('snd_victory', 'assets/sound/snd_victory.wav');
    }
    

    create(){
        
        this.score = parseInt(localStorage.getItem('score')) || 0
        localStorage.setItem('score', this.score + 1)
        this.add.text(config.width/2 ,3*config.height/4, this.score, { font: "20px Arial", fill: "#ffffff", align: "center" });

        //localStorage.removeItem('playerSettings')
        
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