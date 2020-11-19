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
            gameLevel:1,
            moneySpent: 0,
            upgrades : {
                coffeeTime : 0,
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
        var loading_Text = this.add.text(config.width/2 ,config.height/3, 'Loading... 0%', { font: "30px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        //var lastAssetLoaded = this.add.text(config.width/2 ,2*config.height/3, 'Asset: ', { font: "15px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        var progressBox = this.add.rectangle(config.width/2, 2*config.height/3, 3.7*config.width/7, 25, 0xa4b0af).setOrigin(0.5);
        var progressBar = this.add.rectangle(config.width/4, 2*config.height/3, 0, 20, 0x9e616e);
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
            sceneRef.add.rectangle(config.width/4, 2*config.height/3, config.width/2 * value, 20, 0x9e616e).setOrigin(0,0.5);
        });
                    
        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
            //lastAssetLoaded.setText("Asset: "+file.key);
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
        this.load.spritesheet('anim_ladle_kimuchi', 'assets/animaciones/anim_ladle_kimuchi.png',
        {frameWidth: 57,frameHeight: 91}
        );
        
        this.load.spritesheet('anim_ladle_miso', 'assets/animaciones/anim_ladle_miso.png',
        {frameWidth: 57,frameHeight: 91}
        );

        this.load.spritesheet('anim_ladle_shio', 'assets/animaciones/anim_ladle_shio.png',
        {frameWidth: 57,frameHeight: 91}
        );

        this.load.spritesheet('anim_ladle_shoyu', 'assets/animaciones/anim_ladle_shoyu.png',
        {frameWidth: 57,frameHeight: 91}
        );

        this.load.spritesheet('anim_pot_bubbles', 'assets/animaciones/anim_pot_bubbles.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_syrup_caramel', 'assets/animaciones/anim_syrup_caramel.png',
        {frameWidth: 26,frameHeight: 77}
        );

        this.load.spritesheet('anim_syrup_chocolate', 'assets/animaciones/anim_syrup_chocolate.png',
        {frameWidth: 26,frameHeight: 77}
        );

        this.load.spritesheet('anim_syrup_strawberry', 'assets/animaciones/anim_syrup_strawberry.png',
        {frameWidth: 26,frameHeight: 77}
        );

        this.load.spritesheet('anim_pancake', 'assets/animaciones/anim_pancake.png',
        {frameWidth: 20,frameHeight: 29}
        );

        this.load.spritesheet('anim_coffee', 'assets/animaciones/anim_coffee.png',
        {frameWidth: 13,frameHeight: 21}
        );
        
        this.load.spritesheet('anim_coffeeMachine', 'assets/animaciones/anim_coffeeMachine.png',
        {frameWidth: 1,frameHeight: 10}
        );

        this.load.spritesheet('anim_pot_noodles_cooking_0', 'assets/animaciones/anim_pot_noodles_cooking_0.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_cooking_1', 'assets/animaciones/anim_pot_noodles_cooking_1.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_cooking_2', 'assets/animaciones/anim_pot_noodles_cooking_2.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_cooking_3', 'assets/animaciones/anim_pot_noodles_cooking_3.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_burnt_0', 'assets/animaciones/anim_pot_noodles_burnt_0.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_burnt_1', 'assets/animaciones/anim_pot_noodles_burnt_1.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_burnt_2', 'assets/animaciones/anim_pot_noodles_burnt_2.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_burnt_3', 'assets/animaciones/anim_pot_noodles_burnt_3.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_done_0', 'assets/animaciones/anim_pot_noodles_done_0.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_done_1', 'assets/animaciones/anim_pot_noodles_done_1.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_done_2', 'assets/animaciones/anim_pot_noodles_done_2.png',
        {frameWidth: 84,frameHeight: 85}
        );

        this.load.spritesheet('anim_pot_noodles_done_3', 'assets/animaciones/anim_pot_noodles_done_3.png',
        {frameWidth: 84,frameHeight: 85}
        );
        
        this.load.multiatlas('assets_atlas', 'assets/assets.json', 'assets');
        this.load.image('spr_cristal_canciones','assets/UI/UI_temporal/spr_cristal_canciones.png');
        this.load.image('bg_radio_zoomed','assets/bg_radio_zoomed.png');
        this.load.image('bg_maintitle_on','assets/bg_maintitle_on.png');
        this.load.image('bg_maintitle_off','assets/bg_maintitle_off.png');
        this.load.image('bg_maintitle_light','assets/bg_maintitle_light.png');
        this.load.image('bg_maintitle_light2','assets/bg_maintitle_light2.png');
        this.load.image('bg_interior_empty','assets/bg_interior_empty.png');
        this.load.image('bg_contact','assets/bg_contact.png');
        
        this.load.image('bg_dawn','assets/backgrounds/bg_dawn.png');
        this.load.image('bg_night','assets/backgrounds/bg_night.png');
        this.load.image('bg_sunrise','assets/backgrounds/bg_sunrise.png');

        this.load.image('spr_clue','assets/UI/spr_clue.png');
        this.load.image('spr_back1','assets/spr_back.png');
        this.load.image('spr_ui_settings1','assets/spr_ui_settings.png');

        this.load.image('spr_coins','assets/SpritesPatri/spr_coins.png')
        this.load.image('spr_glass_filled','assets/spr_glass_filled.png')

        this.load.image('gato_1_noodles','assets/platosfav/gato_1_noodles.png')
        this.load.image('gato_1_pancake','assets/platosfav/gato_1_pancake.png')
        this.load.image('gato_2_noodles','assets/platosfav/gato_2_noodles.png')
        this.load.image('gato_2_pancake','assets/platosfav/gato_2_pancake.png')
        this.load.image('gato_3_noodles','assets/platosfav/gato_3_noodles.png')
        this.load.image('gato_3_pancake','assets/platosfav/gato_3_pancake.png')
        this.load.image('gato_4_noodles','assets/platosfav/gato_4_noodles.png')
        this.load.image('gato_4_pancake','assets/platosfav/gato_4_pancake.png')
        this.load.image('gato_5_noodles','assets/platosfav/gato_5_noodles.png')
        this.load.image('gato_5_pancake','assets/platosfav/gato_5_pancake.png')
        this.load.image('gato_6_noodles','assets/platosfav/gato_6_noodles.png')
        this.load.image('gato_6_pancake','assets/platosfav/gato_6_pancake.png')
        this.load.image('gato_7_noodles','assets/platosfav/gato_7_noodles.png')
        this.load.image('gato_7_pancake','assets/platosfav/gato_7_pancake.png')
        this.load.image('gato_8_noodles','assets/platosfav/gato_8_noodles.png')
        this.load.image('gato_8_pancake','assets/platosfav/gato_8_pancake.png')

        this.load.image('cat_1','assets/gatos/cat_1.png')
        this.load.image('cat_2','assets/gatos/cat_2.png')
        this.load.image('cat_3','assets/gatos/cat_3.png')
        this.load.image('cat_4','assets/gatos/cat_4.png')
        this.load.image('cat_5','assets/gatos/cat_5.png')
        this.load.image('cat_6','assets/gatos/cat_6.png')
        this.load.image('cat_7','assets/gatos/cat_7.png')
        this.load.image('cat_8','assets/gatos/cat_8.png')


        this.loadCoffeeScreen();
		this.loadNoodleScreen();
        this.loadAudio();
        
        this.load.bitmapFont('BitPap', 'assets/font/CafeFont.png', 'assets/font/CafeFont.xml')


    }

    loadCoffeeScreen()
	{
        this.load.image('client','assets/client.jpg');
        //this.load.image('bg_interior','assets/bg_interior.png');
        this.load.image('bg_interior_window','assets/bg_interior_window.png');
        this.load.image('bg_interior_back','assets/bg_interior_back.png');
        this.load.image('bg_interior_barra','assets/bg_interior_barra.png');
        this.load.image('bg_interior_cristal','assets/bg_interior_cristal.png');
        this.load.path = 'assets/SpritesPatri/';
        
        
		// Animación de la cafetera dispensando el café (individual por cada dispensador): nombrado dependiente de la implementación.
		this.load.image('spr_pancake_bottle','spr_pancake_bottle.png');
		// Botes de siropes: spr_syrup_tipoDeSirope.
		// Animación masa haciéndose por una cara: nombrado dependiente de la implementación.
		// Animación de masa haciéndose por la otra cara: nombrado dependiente de la implementación
		// this.load.image('spr_radio_zoomed','spr_radio_zoomed.png');
		
	}

    loadNoodleScreen()
    {
        this.load.path = '';
    	// Animación de hervir: nombrado dependiente de la implementación.
        this.load.image('bg_streetNoodles','assets/bg_streetNoodles.png');
        this.load.image('bg_kitchen','assets/bg_kitchen.png');
    	// Animación del cucharón echando cada salsa. (3 en total): nombrado dependiente de la implementación

    	/* 
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
        this.load.audio('snd_character_arrived', 'assets/sound/snd_character_arrived.wav');
		this.load.audio('snd_dish', 'assets/sound/snd_dish.wav'); //Used
		this.load.audio('snd_filling_catfe', 'assets/sound/snd_filling_catfe.wav'); //Used
		this.load.audio('snd_gameOver', 'assets/sound/snd_gameOver.wav'); 
		this.load.audio('snd_levelUp', 'assets/sound/snd_levelUp.wav');
        this.load.audio('snd_topping', 'assets/sound/snd_topping.wav');
        
		this.load.audio('snd_music_alone', 'assets/music/snd_music_alone.mp3');
		this.load.audio('snd_music_biscuit', 'assets/music/snd_music_biscuit.mp3');
		//this.load.audio('snd_music_bobaTea', 'assets/music/snd_music_bobaTea.mp3');
		//this.load.audio('snd_music_bored', 'assets/music/snd_music_bored.mp3');
		//this.load.audio('snd_music_branch', 'assets/music/snd_music_branch.mp3');
		this.load.audio('snd_music_bread', 'assets/music/snd_music_bread.mp3');
		//this.load.audio('snd_music_breakUp', 'assets/music/snd_music_breakUp.mp3');
		this.load.audio('snd_music_cafe', 'assets/music/snd_music_cafe.mp3');
		this.load.audio('snd_music_cheese', 'assets/music/snd_music_cheese.mp3');
		this.load.audio('snd_music_chocolate', 'assets/music/snd_music_chocolate.mp3');
		//this.load.audio('snd_music_cloud', 'assets/music/snd_music_cloud.mp3');
		//this.load.audio('snd_music_everyDay', 'assets/music/snd_music_everyDay.mp3');
		//this.load.audio('snd_music_kitchen', 'assets/music/snd_music_kitchen.mp3');
		this.load.audio('snd_music_pancake', 'assets/music/snd_music_pancake.mp3');
		//this.load.audio('snd_music_rainyDay', 'assets/music/snd_music_rainyDay.mp3');
        //this.load.audio('snd_music_kitchen', 'assets/music/snd_music_kitchen.mp3'); 
        
		this.load.audio('snd_noodles_cooking', 'assets/sound/snd_noodles_cooking.wav'); //Used
		this.load.audio('snd_pancake_cooking', 'assets/sound/snd_pancake_cooking.wav'); //Used
		this.load.audio('snd_ready', 'assets/sound/snd_ready.wav'); //Used
		this.load.audio('snd_tap', 'assets/sound/snd_tap.wav'); //Used
		this.load.audio('snd_trash', 'assets/sound/snd_trash.wav'); //Used
		this.load.audio('snd_ui_back', 'assets/sound/snd_ui_back.wav');
		this.load.audio('snd_ui_pop', 'assets/sound/snd_ui_pop.wav');
        this.load.audio('snd_victory', 'assets/sound/snd_victory.wav');
        this.load.audio('snd_radio_interference', 'assets/sound/snd_radio_interference.mp3');
        this.load.audio('snd_opening_door', 'assets/sound/snd_opening_door.mp3');
        this.load.audio('snd_purchase', 'assets/sound/snd_purchase.wav');
        
    }
    

    create(){
        
        this.score = parseInt(localStorage.getItem('score')) || 0
        localStorage.setItem('score', this.score + 1)
        this.add.text(config.width/2 ,3*config.height/4, this.score, { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setResolution(10);

        //localStorage.removeItem('playerSettings_PreRelease')
        
        if(localStorage.getItem('playerSettings_PreRelease') === null){ //Si no se ha creado el almacenamiento, lo crea
            //console.log("if")
            localStorage.setItem('playerSettings_PreRelease', JSON.stringify(this.defaultPlayer))
            this.playerSettings = this.defaultPlayer;
        }
        else{                                                //Si ya existe, lo carga
            //console.log("else")
            this.playerSettings = JSON.parse(localStorage.getItem('playerSettings_PreRelease'))
        }

        var logo_2_seconds = this.add.image(config.width/2,config.height/2,'spr_logoTeam_Inicio');
        var widthRatio = config.width / logo_2_seconds.displayWidth
        logo_2_seconds.displayWidth = config.width;
        logo_2_seconds.displayHeight = logo_2_seconds.displayHeight * widthRatio
        var currentScene = this;

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            //logo_2_seconds.destroy()
            camera.fadeIn(1000);
            //playButton.setInteractive()
            //contactButton.setInteractive()   
            currentScene.scene.start("Inicio",{playerInfo: currentScene.playerSettings})         
        });

        setTimeout(function(){
            currentScene.cameras.main.fadeOut(1000);
             }, 2000); 


        
        
    }

}