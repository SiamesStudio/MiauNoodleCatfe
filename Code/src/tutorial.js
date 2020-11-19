class tutorial extends Phaser.Scene {
	constructor() {
		super("tutorial");
	}

	preload()
	{
		this.load.plugin('rexglowfilterpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilterpipelineplugin.min.js', true);
	}

	create(){
		var gm = new GameManager(this);
		GameManager.resetVariables();
		GameManager.tutorial=true;
        this.coffeeSetting();
        this.pancakesSetting();
        this.noodlesSetting();
        this.interfaceSettings();
        this.clientsSettings();	
		this.radioSettings();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.tutStuff();
	}

	clientsSettings(){
    	//index, salsa, nº toppings, toppings
    	//index, sirope, nº plantas,nºtoppings, toppings 	
    	TutorialManager.tutorialPancakeClient = new Client(0, 1,[2,0,1,0], [1,1,1,1,2]);
    	TutorialManager.tutorialPancakeClient.tutorial = true;
    	callClient(1);
    	TutorialManager.tutorialPancakeClient.clientImg.x += config.width*0.4;
    	TutorialManager.tutorialPancakeClient.clientSecondImg.x += config.width*0.4;
  	}

	radioSettings(){
		this.interferenceSound = this.sound.add('snd_radio_interference')
        this.interferenceSound.play()
        this.interferenceVolume = 0.05
        this.interferenceSound.setVolume(this.interferenceVolume)
        this.interferenceSound.setLoop(true)

        this.songs = new Phaser.Structs.List();
        this.songs.add(this.sound.add('snd_music_pancake'));
        this.songs.add(this.sound.add('snd_music_chocolate'));
        this.songs.add(this.sound.add('snd_music_bread'));
        this.songs.add(this.sound.add('snd_music_cafe'));
        this.songs.add(this.sound.add('snd_music_alone'));
        /* 
        *
        Incluir el resto de canciones 
        *
        */
        this.titleSongs = new Phaser.Structs.List();
        this.titleSongs.add("LuKrembo - Pancake");
        this.titleSongs.add("LuKrembo - Chocolate");
        this.titleSongs.add("LuKrembo - Bread");
        this.titleSongs.add("LuKrembo - Cafe");
        this.titleSongs.add("LuKrembo - Alone");

        /* 
        *
        Incluir el resto de canciones 
        *
        */
        
        this.globalIndex = 0;
        this.volume = 0.9;


        this.radioSongPanel = this.add.image(1.55*config.width/4   +  2*config.width , 2.95*config.height/5,'assets_atlas','spr_pantalla_canciones').setOrigin(0,0.5)
        this.radioSongText = this.add.text(1.55*config.width/4   +  2*config.width, 2.95*config.height/5, this.titleSongs.getAt(this.globalIndex), { font: "8px PixelFont", fill: "#000000", align: "center" }).setOrigin(0,0.5).setResolution(10);
        //this.radioSongText = this.add.bitmapText(1.55*config.width/4, 2.95*config.height/5, 'BitPap' ,this.titleSongs.getAt(this.globalIndex),8).setOrigin(0,0.5);
        
        this.radioSongTitleStartPosition = 1.55*config.width/4 - this.radioSongText.width   +  2*config.width
        this.radioSongPanelCrystal = this.add.image(1.55*config.width/4   +  2*config.width, 2.95*config.height/5,'spr_cristal_canciones').setOrigin(0,0.5)
        this.add.image(config.width/2  +  2*config.width ,config.height/2,'bg_radio_zoomed').setOrigin(0.5)

        this.radioSongText.x = this.radioSongTitleStartPosition
        console.log(this.titleSongs.getAt(this.globalIndex))

//
        this.currentSong = this.songs.getAt(this.globalIndex)
        this.currentSong.play()
        this.currentSong.setVolume(this.volume * (1-this.interferenceVolume))
        this.currentSong.setLoop(true)

        this.radioFrecuencyBox_positionX = 2.16*config.width/4  +  2*config.width
        this.radioFrecuencyBox_positionY = 4.03*config.height/6
        
        this.radioFrecuencyBox = this.add.image(this.radioFrecuencyBox_positionX, this.radioFrecuencyBox_positionY, 'assets_atlas','spr_pantalla_volumen_cancion').setOrigin(0.5)
        this.radioFrecuencyBar = this.add.image((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.1), this.radioFrecuencyBox_positionY, 'assets_atlas','spr_indicador_cancion').setOrigin(0,0.5);

        this.radioFrecuencyBar0 = this.add.image((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.1), this.radioFrecuencyBox_positionY, 'assets_atlas','spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBar1 = this.add.image((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.3), this.radioFrecuencyBox_positionY, 'assets_atlas','spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBar2 = this.add.image((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.5), this.radioFrecuencyBox_positionY, 'assets_atlas','spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBar3 = this.add.image((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.7), this.radioFrecuencyBox_positionY, 'assets_atlas','spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBar4 = this.add.image((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.9), this.radioFrecuencyBox_positionY, 'assets_atlas','spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBoxCristal = this.add.image(this.radioFrecuencyBox_positionX, this.radioFrecuencyBox_positionY, 'assets_atlas','spr_cristal_volumen_cancion').setOrigin(0.5)
        this.radioFrecuencyBox_margin = this.add.image(this.radioFrecuencyBox_positionX, this.radioFrecuencyBox_positionY, 'assets_atlas','spr_borde_pantalla').setOrigin(0.5)
        
//
        this.radioVolumeBox_positionX = 2.16*config.width/4  +  2*config.width
        this.radioVolumeBox_positionY = 4.55*config.height/6
        this.radioVolumeBox2 = this.add.image(this.radioVolumeBox_positionX, this.radioVolumeBox_positionY,'assets_atlas','spr_pantalla_volumen_cancion').setOrigin(0.5);
        this.radioVolumeBar2 = this.add.rectangle((this.radioVolumeBox_positionX - this.radioVolumeBox2.width/2), this.radioVolumeBox_positionY + 1, (this.volume * this.radioVolumeBox2.width), 6, 0x9e616e).setOrigin(0,0.5);
        this.radioVolumeBox2 = this.add.image(this.radioVolumeBox_positionX, this.radioVolumeBox_positionY,'assets_atlas','spr_cristal_volumen_cancion').setOrigin(0.5);
        this.radioVolumeBox2 = this.add.image(this.radioVolumeBox_positionX, this.radioVolumeBox_positionY,'assets_atlas','spr_borde_pantalla').setOrigin(0.5);

        for(var i = 1; i<10; i++){
                this.add.image((this.radioVolumeBox_positionX - this.radioVolumeBox2.width/2) + (this.radioVolumeBox2.width * 0.1 * i ), this.radioVolumeBox_positionY, 'assets_atlas','spr_palito_cancion_volumen').setOrigin(0.5);
        }
   

//----------------------------------------------------------------------------------------------------
//FRECUENCIA

        this.vectorA = new Phaser.Math.Vector2(1,0)
        this.vectorB = new Phaser.Math.Vector2(1,0)
        this.radioFrecSpinPositionX = 3.58*config.width/10 +  2*config.width
        this.radioFrecSpinPositionY = 7.5*config.height/10
        this.radioFrecSpin = this.add.image(this.radioFrecSpinPositionX, this.radioFrecSpinPositionY,'assets_atlas','spr_radio_zoomed_vol_song').setOrigin(0.5)
        this.radioFrecSpin.setInteractive({ draggable: true })
        var currentScene = this;
        TutorialManager.radioFrecSpin = this.radioFrecSpin;

        this.radioFrecSpin.on('dragstart', function(pointer,dragX,dragY){
                this.modB = Math.sqrt(dragX*dragX + dragY*dragY)
                this.vectorB = new Phaser.Math.Vector2(dragX/this.modB , dragY/this.modB)
                this.currentAngle = 180 * (this.vectorB.angle()) / Math.PI

                currentScene.radioFrecSpin.angle = this.currentAngle
                currentScene.changeRadioFrecuency()
                
        })
        this.radioFrecSpin.on('drag', function(pointer,dragX,dragY){ 
                this.vectorB = new Phaser.Math.Vector2(pointer.worldX - currentScene.radioFrecSpinPositionX, pointer.worldY - currentScene.radioFrecSpinPositionY)
                this.vectorB.normalize()
                this.currentAngle = (180 * (this.vectorB.angle()) / Math.PI)// - 180

                currentScene.radioFrecSpin.angle = this.currentAngle
                currentScene.changeRadioFrecuency()
        })




//----------------------------------------------------------------------------------------------------
//VOLUMEN
        this.radioVolumeSpinPositionX = 7.2*config.width/10  +  2*config.width
        this.radioVolumeSpinPositionY = 7.5*config.height/10
        this.radioVolumeSpin = this.add.image(this.radioVolumeSpinPositionX, this.radioVolumeSpinPositionY,'assets_atlas','spr_radio_zoomed_vol_song').setOrigin(0.5)
        this.radioVolumeSpin.angle -=5
        this.radioVolumeSpin.setInteractive({ draggable: true })


        this.radioVolumeSpin.on('dragstart', function(pointer,dragX,dragY){
                //console.log("vecToPointer : "+ dragX, dragY)
                this.modB = Math.sqrt(dragX*dragX + dragY*dragY)
                this.vectorB = new Phaser.Math.Vector2(dragX/this.modB , dragY/this.modB)
                this.currentAngle = 180 * (this.vectorB.angle()) / Math.PI

                currentScene.radioVolumeSpin.angle = this.currentAngle
                currentScene.changeRadioVolume()
                
        })
        this.radioVolumeSpin.on('drag', function(pointer,dragX,dragY){                
                this.vectorB = new Phaser.Math.Vector2(pointer.worldX - currentScene.radioVolumeSpinPositionX, pointer.worldY - currentScene.radioVolumeSpinPositionY)
                this.vectorB.normalize()    
                this.currentAngle = (180 * (this.vectorB.angle()) / Math.PI)// - 180

                currentScene.radioVolumeSpin.angle = this.currentAngle
                currentScene.changeRadioVolume()
        })

        
        //BACK 
        this.backButton = this.add.image(config.width/12   +  2*config.width , 9*config.height/10,'assets_atlas','spr_back')
        this.backButton.setInteractive().on('pointerdown', () => {
				this.cameras.main.centerOnX(config.width/2)
		})
		TutorialManager.radioBackButton = this.backButton;
	}
	  
  	interfaceSettings(){
		this.coinSlider=this.add.sprite(config.width*0.5,config.height/13,'assets_atlas','spr_ui_slider')
        this.coinIcon=this.add.sprite(config.width*0.4,config.height/11,'assets_atlas','spr_ui_icon_coin')
        this.numCoins = this.add.text(config.width*0.5,config.height/13, GameManager.levelEarnedCoins, { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
		
		this.chefLevelSlider=this.add.sprite(3*config.width/4 ,config.height/13,'assets_atlas','spr_ui_slider')
        this.add.sprite(config.width*0.65,config.height/11,'assets_atlas','spr_ui_chefLvl')
        this.numPlayerLevel = this.add.text(config.width*0.65,config.height/11, 0, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
        this.numChefPoints = this.add.text(this.chefLevelSlider.x+6,config.height/13, "", { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5,0.5);
		
		this.progressBarPosX=(0.88*config.width/2)+1;
		this.slider=this.add.sprite(config.width/4 ,config.height/13,'assets_atlas','spr_ui_slider')
		this.progressBar=this.add.rectangle(this.progressBarPosX, config.height/8.5, 3.7*config.width/7, 25, 0xd1c0ff)
		this.falseProgressBar=this.add.rectangle(config.width/6+3, config.height/13-2, 2,2, 0xd1c0ff)
		this.littleSlider=this.add.sprite(config.width/4+5 ,config.height/13,'assets_atlas','spr_ui_volumen')
		this.progressBar.height=this.littleSlider.height;
		this.progressBar.width=(this.littleSlider.width-3)/2;
		this.falseProgressBar.height=this.progressBar.height-4
		this.add.sprite(config.width*0.145,config.height/11,'assets_atlas','spr_ui_icon_happy')
		
		this.options = this.add.sprite(config.width*0.05,config.height/11-1,'assets_atlas','spr_ui_settings')
		this.options.setScale(0.5);

		this.coinSlider=this.add.sprite(config.width*0.5+config.width,config.height/13,'assets_atlas','spr_ui_slider')
        this.coinIcon=this.add.sprite(config.width*0.4+config.width,config.height/11,'assets_atlas','spr_ui_icon_coin')
        this.noodlenumCoins = this.add.text(config.width*0.5+config.width,config.height/13, GameManager.levelEarnedCoins, { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
		
		this.chefLevelSlider=this.add.sprite(3*config.width/4 +config.width,config.height/13,'assets_atlas','spr_ui_slider')
        this.add.sprite(config.width*0.65+config.width,config.height/11,'assets_atlas','spr_ui_chefLvl')
        this.noodlenumPlayerLevel = this.add.text(config.width*0.65+config.width,config.height/11, 0, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
        this.noodlenumChefPoints = this.add.text(this.chefLevelSlider.x+6,config.height/13, "aaaaaaaaa", { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5,0.5);
		GameManager.scene.uploadPlayerLevel(0)
		
		this.progressBarPosX=(0.88*config.width/2)+1+config.width;
		this.slider=this.add.sprite(config.width/4 +config.width,config.height/13,'assets_atlas','spr_ui_slider')
		this.noodleprogressBar=this.add.rectangle(this.progressBarPosX, config.height/8.5, 3.7*config.width/7, 25, 0xd1c0ff)
		this.falseProgressBar=this.add.rectangle(config.width/6+3+config.width, config.height/13-2, 2,2, 0xd1c0ff)
		this.littleSlider=this.add.sprite(config.width/4+5 +config.width,config.height/13,'assets_atlas','spr_ui_volumen')
		this.noodleprogressBar.height=this.littleSlider.height;
		this.noodleprogressBar.width=(this.littleSlider.width-3)/2;
		this.falseProgressBar.height=this.progressBar.height-4
		this.add.sprite(config.width*0.145+config.width,config.height/11,'assets_atlas','spr_ui_icon_happy')
		
		this.options = this.add.sprite(config.width*0.05+config.width,config.height/11-1,'assets_atlas','spr_ui_settings'); 
		this.options.setScale(0.5);
	}


	coffeeSetting()
	{
		this.cameras.main.on('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(100);
        });
        var background_window = this.add.image(config.width*0.5, config.height*0.5, 'bg_interior_window');
        var background_interior_back= this.add.image(config.width*0.5, config.height*0.5, 'bg_interior_back');
        var background_interior_barra = this.add.image(config.width*0.5, config.height*0.715, 'bg_interior_barra');
        var background_interior_cristal = this.add.image(config.width*0.62, config.height*0.32, 'bg_interior_cristal');
        background_interior_cristal.setDepth(0.75); //ALL THE CATS GET DEPTH == 0.5
		var cam = this.cameras.main;	

		var coffeeMachineLvl = 0;
		var coffeeMachineImg;
		
		var posx= config.width*0.86;
		var posy= config.height*0.5;
		switch(coffeeMachineLvl)
		{
			case 0:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas', 'spr_coffeeMachine_0'); 
			break;
			case 1:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas','spr_coffeeMachine_1'); 
			break;
			case 2:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas', 'spr_coffeeMachine_2');
			break;
			case 3:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas', 'spr_coffeeMachine_3'); 
			break;
		}
        coffeeMachineImg.setDepth(0.9);
		var spr_radio = this.add.image(config.width*0.83,config.height*0.24,'assets_atlas','spr_radio');
		spr_radio.setDepth(1);
        TutorialManager.radioImg = spr_radio;
		var coffeeSpawnerImg = this.add.image(config.width*0.95, config.height*0.915, 'assets_atlas', 'spr_glasses');

		var coffeeMachine = new CoffeeMachine(coffeeMachineImg, coffeeMachineLvl, true);
		GameManager.coffeeMachine = coffeeMachine;
		TutorialManager.glassesImg = coffeeSpawnerImg;
		
		var _goToNoodlesButton = this.add.image(config.width*0.96,config.height*0.4,'assets_atlas', 'spr_ui_arrow');
		_goToNoodlesButton.setDepth(1);
        TutorialManager.goToNoodlesButton = _goToNoodlesButton;
        GameManager.tapSound = GameManager.scene.sound.add('snd_tap');
	}

	pancakesSetting()
	{
		var numTablecloth = 1;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<4; i++)
        {
        	var tableclothImg;
        	var tableclothKey = 'spr_tablecloth_'+i;
        	switch(i)
        	{
        		case 0:
        		    tableclothImg = this.add.image(config.width*0.194, config.height*0.575,'assets_atlas', tableclothKey);
        		break;

        		case 1:
        			tableclothImg = this.add.image(config.width*0.3405, config.height*0.575,'assets_atlas', tableclothKey);
        		break;

        		case 2:
        			tableclothImg = this.add.image(config.width*0.125, config.height*0.714,'assets_atlas', tableclothKey);	
        		break;

        		case 3:
        			tableclothImg = this.add.image(config.width*0.297, config.height*0.714,'assets_atlas', tableclothKey);
        		break;

        	}
        	if(numTablecloth-1 < i) tableclothImg.setAlpha(0.3);   	
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothsPancake = new TableclothsPancake(tableclothImgList, 0);
        var dishPileImg = this.add.image(config.width*0.7, config.height*0.92,'assets_atlas', 'spr_dishes');
        TutorialManager.dishPileImg = dishPileImg;  
        GameManager.tableclothsPancake = tableclothsPancake; 
       
		var pancakeSpawnerImg = this.add.image(config.width*0.85, config.height*0.91, 'spr_pancake_bottle');
        TutorialManager.pancakeBottleImg = pancakeSpawnerImg;
        var griddleImg = this.add.image(config.width*0.56, config.height*0.625,'assets_atlas', 'spr_griddle');
        var griddle = new Griddle(griddleImg, 0);
        GameManager.griddle = griddle;

        for(var i=0; i<4; i++)
        {
        	var slotGriddleImg;
        	switch(i)
        	{
        		case 0:
        		    slotGriddleImg = this.add.image(config.width*0.51, config.height*0.535,'assets_atlas', 'spr_griddle_0');
        		break;

        		case 1:
        			slotGriddleImg = this.add.image(config.width*0.615, config.height*0.535,'assets_atlas', 'spr_griddle_1');
        		break;

        		case 2:
        			slotGriddleImg = this.add.image(config.width*0.495, config.height*0.662,'assets_atlas', 'spr_griddle_2');	
        		break;

        		case 3:
        			slotGriddleImg = this.add.image(config.width*0.625, config.height*0.662,'assets_atlas', 'spr_griddle_3');
        		break;

        	}
        	if(0 < i) slotGriddleImg.setAlpha(0.3);
        }

       	var trashCanImg = this.physics.add.sprite(config.width*0.105, config.height*0.915,'assets_atlas', 'spr_trashCan');
       	GameManager.trashCanImgPancake = trashCanImg;
        
        this.add.image(config.width*0.42, config.height*0.895,'assets_atlas', 'spr_topping_posters');
        for(var i=0; i<4; i++)
		{
			var toppingSound = GameManager.scene.sound.add('snd_topping');
			var topping = new TutorialTopping(i, true, toppingSound);
		}
		
		for(var i=0; i<3; i++)
		{
			var syrupSound = GameManager.scene.sound.add('snd_topping');
			var syrup = new TutorialSyrup(i,syrupSound);
		}
	}
	
	noodlesSetting()
	{
		var backgroundStreet = this.add.image(config.width*0.5+config.width, config.height*0.5, 'bg_streetNoodles');
		var background = this.add.image(config.width*0.5+config.width, config.height*0.5, 'bg_kitchen');
		
		var noodleSpawnerImg = this.add.image(config.width*0.882 + config.width, config.height*0.91,'assets_atlas','spr_bg_noodles');
		var bigStrainerImg = this.add.image(config.width*0.84 + config.width, config.height*0.543,'assets_atlas','spr_bg_pot');
		GameManager.animatedStrainerImg = this.physics.add.sprite(config.width*0.825 + config.width, config.height*0.475,'anim_pot_bubbles');
		GameManager.animatedStrainerImg.setAlpha(0);
		var strainerLvl = 0;
		var cam = this.cameras.main;	
		var goToCoffeeButton = this.add.image(config.width*0.04+config.width,config.height*0.4,'assets_atlas', 'spr_ui_arrow');
        goToCoffeeButton.toggleFlipX();
 		goToCoffeeButton.setDepth(1);
        for(var i=0; i<4; i++)
        {
        	var strainerImg;
        	switch(i)
			{
				case 0:
					strainerImg = this.add.image(config.width*0.775 + config.width, config.height*0.365,'assets_atlas','spr_strainer_2'); 
				break;
				case 1:
					strainerImg = this.add.image(config.width*0.86 + config.width, config.height*0.38,'assets_atlas','spr_strainer_3'); 
				break;
				case 2:
					strainerImg = this.add.image(config.width*0.775 + config.width, config.height*0.42,'assets_atlas','spr_strainer_0'); 
				break;
				case 3:
					strainerImg = this.add.image(config.width*0.884 + config.width, config.height*0.422,'assets_atlas','spr_strainer_1'); 
				break;

			if(strainerLvl < i) strainerImg.setAlpha(0.3);
			}
        }
		
        this.anims.create({
    		key: 'potCooking',
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pot_bubbles', { start: 0, end: 4}),
    		frameRate: 7,
    		repeat: -1
		});

        var strainer = new Strainer(bigStrainerImg, strainerLvl);
        GameManager.strainer = strainer;
       	var trashCanImg = this.physics.add.sprite(config.width*0.09+config.width, config.height*0.92,'assets_atlas','spr_trashCan');
       	GameManager.trashCanImgNoodles = trashCanImg;
       	TutorialManager.noodleSpawner = noodleSpawnerImg;
        noodleSpawnerImg.setInteractive();
        noodleSpawnerImg.on('pointerdown', function(pointer){
        	if(strainer.occupiedSlots < strainerLvl +1)
        	{	
        		var slotId = findFreeSlot(strainer, Strainer.slots);
        		var pos = Strainer.slots.getAt(slotId);
        		var cookingSound = GameManager.scene.sound.add('snd_noodles_cooking');
        		var burntSound = GameManager.scene.sound.add('snd_burnt');
        		var trashSound = GameManager.scene.sound.add('snd_trash');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var noodles = new TutorialNoodles(slotId, trashSound, cookingSound, burntSound, readySound);
      			changePosition(noodles, pos.x+config.width*0.03,pos.y-config.height*0.03);
      			TipLogic.currentInstance.endCase21(noodleSpawnerImg);
        	} 
        })
        noodleSpawnerImg.disableInteractive();
        
        var numTablecloth = 1;

		var tableclothImgList = new Phaser.Structs.List();
		
        for(var i=0; i<4; i++)
        {
        	var tableclothImg;
        	switch(i)
        	{
        		case 0:
        		    tableclothImg = this.add.image(config.width*0.194+config.width, config.height*0.56,'assets_atlas', 'spr_tablecloth_0');
        		break;

        		case 1:
        			tableclothImg = this.add.image(config.width*0.341+config.width, config.height*0.56,'assets_atlas', 'spr_tablecloth_1');
        		break;

        		case 2:
        			tableclothImg = this.add.image(config.width*0.126+config.width, config.height*0.7,'assets_atlas', 'spr_tablecloth_2');	
        		break;

        		case 3:
        			tableclothImg = this.add.image(config.width*0.3+config.width, config.height*0.7,'assets_atlas', 'spr_tablecloth_3');
        		break;

        	}
        	if(numTablecloth-1 < i) tableclothImg.setAlpha(0.3);
        	
        	tableclothImgList.add(tableclothImg);
        }

        var tableclothsNoodle = new TableclothsNoodle(tableclothImgList, 0);
        
        GameManager.tableclothsNoodle = tableclothsNoodle;
        var dishPileImg = this.add.image(config.width*0.72 + config.width, config.height*0.92,'assets_atlas','spr_bowl');
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothsNoodle, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_bowl');
        		var dishImgContainer = new TutorialDishContainer(dishImg, slotId);
        		GameManager.dishImgContainerNoodles.add(dishImgContainer);
        		TipLogic.currentInstance.endCase20(dishPileImg);
        	} 
        })
        dishPileImg.disableInteractive();
        TutorialManager.bowl = dishPileImg;
        
        
        for(var i = 0; i<4; i++)
		{
			var toppingSound = GameManager.scene.sound.add('snd_topping');
			var topping = new TutorialTopping(i, false, toppingSound);
		}
		for(var i=0; i<4; i++)
		{
			var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
			var sauce = new TutorialSauce(i, fillingSound);
		}   
	}
	
	tutStuff()
	{
        new TutorialManager(this);
        if(TutorialManager.timesPlayed == 1)
        {
        	TutorialManager.customPipeline = this.plugins.get('rexglowfilterpipelineplugin').add(this,'GlowFilter');
        }
        else
        {
        	TutorialManager.tween.remove();
        }
        TutorialManager.tween = TutorialManager.scene.tweens.add({
            	targets: TutorialManager.customPipeline,
            	intensity: 0.019,
            	ease: 'Linear',
            	duration: 500,
            	repeat: -1,
            	yoyo: true
        	}); 
        
		var numSteps = 28;
		for(var i=0; i<numSteps; i++)
		{
			TutorialManager.tipDataContainer.add(new TipData(i));
		}

        for(var i=0; i<numSteps; i++)
        {
        	TutorialManager.tipLogicContainer.add(new TipLogic(i));
        }
        TutorialManager.showNext();
	}

	uploadPlayerLevel(number){
        var expPerLevel = [0,200,1200,6200,21200,46200,96200]
        //if(this.playerSettings.experience < expPerLevel[expPerLevel.length - 1]){//Comprobamos que 
            
        //}
        this.numChefPoints.setText((0 - expPerLevel[0]) +"/"+ expPerLevel[0+1]);
        return 1;
    }

	update(time, delta)
	{
		var cam = this.cameras.main;
	
    	if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
    	{
    	    cam.centerOnX(config.width/2);
            GameManager.scene.cameras.main.fadeOut(25);

    	}
    	else if (Phaser.Input.Keyboard.JustDown(this.cursors.right))
    	{
    	    cam.centerOnX(config.width + config.width/2);
    	    GameManager.scene.cameras.main.fadeOut(25);
    	}    	

		this.radioSongText.x +=0.5
        if(this.radioSongText.x > (1.55*config.width/4 + this.radioSongPanelCrystal.width +  2*config.width) ){//Posicion inicial + ancho del rectangulo
                this.radioSongText.x = this.radioSongTitleStartPosition //Se reinicia la posicion
		} 

		if(!GameManager.grabbedItemImg) return;
		
		/* Here check if the current grabbed item is colliding with something 
		Depending on the class of the grabbed item, there should be a different behaviour */
		switch(GameManager.grabbedItemClass)
		{
			case "pancake":
				//console.log("Pancake grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "noodles":
				//console.log("Noodles grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "topping":
				//console.log("Topping grabbed");
				checkToppingHoverWithDish();
			break;

			case "syrup":
				//console.log("Syrup grabbed");
				checkSauceAndSyrupHover();
			break;

			case "pancakeDish":
				//console.log("pancakeDish grabbed");
				checkHoverWithClient();
			break;

			case "noodleDish":
				//console.log("noodleDish grabbed");
				checkHoverWithClient();
			break;

			case "coffeeDish":
				//console.log("coffeeDish grabbed");
				checkHoverWithClient();
			break;

			case "sauce":
				//console.log("Sauce grabbed");
				checkSauceAndSyrupHover();
			break;

			default:
				console.log("Item grabbed with no class");
			break;
		}

		if(GameManager.shinningObject != null) makeImgShine();
	}

	changeRadioFrecuency(){
        this.angle = 0
        if(this.radioFrecSpin.angle < 0){
                this.angle = (this.radioFrecSpin.angle + 180) + 180
        }else{
            this.angle = this.radioFrecSpin.angle
        }
        this.frec = (this.angle - 0) / (360 - 0)
        //console.log(this.frec)
        this.radioFrecuencyBar.x = (this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.frec * (this.radioFrecuencyBox.width))

        this.changeSong(this.frec);
    }

    changeRadioVolume(){
        this.angle = 0
        if(this.radioVolumeSpin.angle < 0){
                this.angle = (this.radioVolumeSpin.angle + 180) + 180
        }else{
            this.angle = this.radioVolumeSpin.angle
        }
        this.vol = (this.angle - 0) / (360 - 0)
        //console.log(this.vol)
        //this.radioVolumeBar2.destroy()
        this.volume = this.vol
        this.radioVolumeBar2.width = this.volume * this.radioVolumeBox2.width
        //console.log("Volume: "+ this.volume * (1-this.interferenceVolume))
        this.currentSong.setVolume(this.volume * (1-this.interferenceVolume))
    }

    changeSong(number){

        if(number < 0.2 && this.globalIndex != 0){
                this.globalIndex = 0
                //console.log("cambio a frec 0")
                this.playNewSong()
        }
        if(number > 0.2 && number < 0.4 && this.globalIndex != 1){
                this.globalIndex = 1
                //console.log("cambio a frec 1")
                this.playNewSong()
        }
        if(number > 0.4 && number < 0.6 && this.globalIndex != 2){
                this.globalIndex = 2
                //console.log("cambio a frec 2")
                this.playNewSong()
        }
        if(number > 0.6 && number < 0.8 && this.globalIndex != 3){
                this.globalIndex = 3
                //console.log("cambio a frec 1")
                this.playNewSong()
        }
        if(number > 0.8 && this.globalIndex !=4){
                this.globalIndex = 4
                //console.log("cambio a frec 2")
                this.playNewSong()
        }

        if( (number < 0.05) || (number > 0.15 && number < 0.25) || (number > 0.35 && number < 0.45) || (number > 0.55 && number < 0.65) || (number > 0.75 && number < 0.85) || (number > 0.95 && number < 1) ){
                this.interferenceSound.setVolume(0.9)
                this.interferenceVolume = 0.9
                this.currentSong.setVolume(this.volume * (1-this.interferenceVolume))
        }else{
                this.interferenceSound.setVolume(0.05)
                this.interferenceVolume = 0.05
                this.currentSong.setVolume(this.volume * (1-this.interferenceVolume))
        }
    }

    playNewSong(){
        this.currentSong.stop()

        this.currentSong = this.songs.getAt(this.globalIndex)
        this.currentSong.play()
        this.currentSong.setVolume(this.volume)
        this.currentSong.setLoop(true)
//		//case15
        this.radioSongText.x = this.radioSongTitleStartPosition
        this.radioSongText.setText(this.titleSongs.getAt(this.globalIndex))
        if(TutorialManager.currentTip == 16)TipLogic.currentInstance.endCase15(this.radioFrecSpin);
	}
	
}

class TutorialManager
{
	static scene;
	static tween;
	static customPipeline;
	static tipDataContainer = new Phaser.Structs.List();
	static tipLogicContainer = new Phaser.Structs.List();
	static currentTip = 0;
	static toppingImg;
	static dishPileImg;
	static pancakeBottleImg;
	static glassesImg;
	static radioImg;
	static coffeeImg;
	static pancakeImg;
	static syrupImg;
	static radioFrecSpin;
	static coffee;
	static pancake;
	static noodle;
	static syrup;
	static sauce;
	static topping;
	static radioBackButton;
	static goToNoodlesButton;
	static noodleSpawner;
	static bowl;
	static tutorialPancakeClient;
	static timesPlayed = 0;

	constructor(_scene)
	{
		TutorialManager.scene = _scene;
		TutorialManager.timesPlayed++;
	}

	static showNext()
	{
		if(TutorialManager.currentTip >= TutorialManager.tipLogicContainer.length)
		{
			TutorialManager.endTutorial();
		} 
		else
		{
			TutorialManager.tipLogicContainer.getAt(TutorialManager.currentTip).display();
			TutorialManager.currentTip++;
		}
	}

	static endTutorial()
	{
		console.log("TUTORIAL ENDED");
		TutorialManager.resetVariables();
		GameManager.scene.scene.start("Menu");
	}

	static resetVariables()
	{
		TutorialManager.tipDataContainer = new Phaser.Structs.List();
		TutorialManager.tipLogicContainer = new Phaser.Structs.List();
		TutorialManager.currentTip = 0;
		TutorialManager.toppingImg.resetPipeline();
		TutorialManager.dishPileImg.resetPipeline();
		TutorialManager.pancakeBottleImg.resetPipeline();
		TutorialManager.glassesImg.resetPipeline();
		TutorialManager.radioImg.resetPipeline();
		TutorialManager.coffeeImg.resetPipeline();
		TutorialManager.pancakeImg.resetPipeline();
		TutorialManager.syrupImg.resetPipeline();
		TutorialManager.radioFrecSpin.resetPipeline();
		TutorialManager.radioBackButton.resetPipeline();
		TutorialManager.goToNoodlesButton.resetPipeline();
		TutorialManager.noodleSpawner.resetPipeline();
		TutorialManager.bowl.resetPipeline();
		TutorialManager.toppingImg = null;
		TutorialManager.dishPileImg = null;
		TutorialManager.pancakeBottleImg = null;
		TutorialManager.glassesImg = null;
		TutorialManager.radioImg = null;
		TutorialManager.coffeeImg = null;
		TutorialManager.pancakeImg = null;
		TutorialManager.syrupImg = null;
		TutorialManager.radioFrecSpin = null;
		TutorialManager.coffee = null;
		TutorialManager.pancake = null;
		TutorialManager.noodle = null;
		TutorialManager.syrup = null;
		TutorialManager.sauce = null;
		TutorialManager.topping = null;
		TutorialManager.radioBackButton = null;
		TutorialManager.goToNoodlesButton = null;
		TutorialManager.noodleSpawner = null;
		TutorialManager.bowl = null;
		TutorialManager.tutorialPancakeClient = null;

		Client.resetVariables();
		TutorialCoffee.ref = null;
		TutorialPancake.ref = null;
		TutorialNoodles.noodlesList = new Phaser.Structs.List();
		TutorialTopping.noodleTopRef = null;
		TutorialTopping.pancakeTopRef = null;
		TutorialSyrup.ref = null;
		TutorialSauce.ref = null;

		GameManager.resetVariables();
	}
}

class TipData
{
	static types = {WATCH: 0, TOUCH: 1, DRAG: 2};
	static touchTypes = {GLASSES: 0, DISHES: 1, PANCAKEBOTTLE: 2,
	PANCAKE: 3, COIN: 4, RADIO: 5, RADIOSONG: 6, SWAPVIEWTRASH: 7,
	CLEAN: 8, SWAPTONOODLES: 9, BOWL: 10, NOODLEBOX: 11};
	static dragTypes = {PANCAKETODISH: 0, COFFEETOCLIENT: 1, CHOCSYRUP: 2, STRAWBERRYTOP: 3,
	 DISHTOCLIENT: 4, FAVSAUCE: 5, NOODLETODISH: 6, FAVTOPPING: 7, NOODLEDISHTOCLIENT: 8}; 
	constructor(_i)
	{
		this.tutorialStrings = new TutorialStrings();
		this.numTexts = 1;
		this.currentText = 0;
		this.readCount = 0;
		this.text = new Phaser.Structs.List();
		this.type;
		this.touchType;
		this.dragType;
		this.srcImg;
		this.dstImg;
		this.window;

		// TEXT SETTING
		switch(_i)
		{
			case 0:
				this.numTexts = 6;
				this.text.add(this.tutorialStrings.case0_0);
				this.text.add(this.tutorialStrings.case0_1);
				this.text.add(this.tutorialStrings.case0_2);
				this.text.add(this.tutorialStrings.case0_3);
				this.text.add(this.tutorialStrings.case0_4);
				this.text.add(this.tutorialStrings.case0_5);
				this.type = TipData.types.WATCH;
				this.window=0;
			break;

			case 1:
				this.numTexts = 2;
				this.text.add(this.tutorialStrings.case1_0);
				this.text.add(this.tutorialStrings.case1_1);
				this.type = TipData.types.WATCH;
				this.window=0;
			break;

			case 2:
				this.text.add(this.tutorialStrings.case2);
				this.srcImg = TutorialManager.glassesImg;
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.GLASSES;
				this.window=0;
			break;

			case 3:
				this.text.add(this.tutorialStrings.case3);
				this.srcImg = TutorialManager.dishPileImg;
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.DISHES;
				this.window=0;
			break;

			case 4:
				this.text.add(this.tutorialStrings.case4);
				this.type = TipData.types.TOUCH;
				this.srcImg = TutorialManager.pancakeBottleImg;
				this.touchType = TipData.touchTypes.PANCAKEBOTTLE;
				this.window=0;
			break;

			case 5:
				this.text.add(this.tutorialStrings.case5);
				this.type = TipData.types.TOUCH;
				this.srcImg = TutorialManager.pancakeImg;
				this.touchType = TipData.touchTypes.PANCAKE;
				this.window=0;
			break;

			case 6:
				this.text.add(this.tutorialStrings.case6);
				this.type = TipData.types.DRAG;
				this.srcImg = TutorialManager.pancakeImg;
				this.dragType = TipData.dragTypes.PANCAKETODISH;
				this.window=0;
			break;

			case 7:
				this.text.add(this.tutorialStrings.case7);
				this.type = TipData.types.DRAG;
				this.srcImg = TutorialManager.coffeeImg;
				this.dragType = TipData.dragTypes.COFFEETOCLIENT;
				this.window=0;
			break;

			case 8:
				this.text.add(this.tutorialStrings.case8_0);
				this.text.add(this.tutorialStrings.case8_1);
				this.type = TipData.types.WATCH;
				this.window=0;
			break;

			case 9:
				this.text.add(this.tutorialStrings.case9);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.STRAWBERRYTOP;
				this.srcImg = TutorialManager.toppingImg;
				this.window=0;
			break;

			case 10:
				this.text.add(this.tutorialStrings.case10);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.CHOCSYRUP;
				this.srcImg = TutorialManager.syrupImg;
				this.window=0;
			break;

			case 11:
				this.text.add(this.tutorialStrings.case11);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.DISHTOCLIENT;
				this.window=0;
			break;

			case 12:
				this.numTexts = 4;
				this.text.add(this.tutorialStrings.case12_0);
				this.text.add(this.tutorialStrings.case12_1);
				this.text.add(this.tutorialStrings.case12_2);
				this.text.add(this.tutorialStrings.case12_3);
				this.type = TipData.types.WATCH;
				this.window=0;
			break;

			case 13:
				this.text.add(this.tutorialStrings.case13);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.COIN;
				this.window=0;
			break;

			case 14:
				this.srcImg = TutorialManager.radioImg;
				this.text.add(this.tutorialStrings.case14);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.RADIO;
				this.window=0;
			break;

			case 15:
				this.srcImg = TutorialManager.radioFrecSpin;
				this.text.add(this.tutorialStrings.case15);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.RADIOSONG;
				this.window=2;
			break;
			/*
			case 16:
				this.text.add("Parece ser que hay basura en el local. Toca el botón para ir a ver las mesas.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.SWAPVIEWTRASH;
			break;
			*/
			case 16:
				this.numTexts = 2;
				this.text.add(this.tutorialStrings.case16_0);
				this.text.add(this.tutorialStrings.case16_1);
				this.type = TipData.types.WATCH;
				this.window=2;
			break;
			/*
			case 18:
				this.text.add("Recoge la basura o la felicidad global irá bajando.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.CLEAN;
			break;
			*/
			case 17:
				this.srcImg =  TutorialManager.goToNoodlesButton;
				this.text.add(this.tutorialStrings.case17);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.SWAPTONOODLES;
				this.window=0;
			break;

			case 18:
				this.numTexts = 2;
				this.text.add(this.tutorialStrings.case18_0);
				this.text.add(this.tutorialStrings.case18_1);
				this.type = TipData.types.WATCH;
				this.window=1;
			break;

			case 19:
				this.text.add(this.tutorialStrings.case19);
				this.type = TipData.types.WATCH;
				this.window=1;
			break;

			case 20:
				this.srcImg = TutorialManager.bowl;
				this.text.add(this.tutorialStrings.case20);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.BOWL;
				this.window=1;
			break;

			case 21:
				this.srcImg = TutorialManager.noodleSpawner;
				this.text.add(this.tutorialStrings.case21);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.NOODLEBOX;
				this.window=1;
			break;

			case 22:
				this.numTexts = 2;
				this.text.add(this.tutorialStrings.case22_0);
				this.text.add(this.tutorialStrings.case22_1);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.FAVSAUCE;
				this.window=1;
			break;

			case 23:
				this.text.add(this.tutorialStrings.case23);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.NOODLETODISH;
				this.window=1;
			break;

			case 24:
				this.text.add(this.tutorialStrings.case24);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.FAVTOPPING;
				this.window=1;
			break;

			case 25:
				this.text.add(this.tutorialStrings.case25);
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.NOODLEDISHTOCLIENT;
				this.window=1;
			break;

			case 26:
				this.text.add(this.tutorialStrings.case26);
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.COIN;
				this.window=1;
			break;

			case 27:
				this.numTexts = 6;
				this.text.add(this.tutorialStrings.case27_0);
				this.text.add(this.tutorialStrings.case27_1);
				this.text.add(this.tutorialStrings.case27_2);
				this.text.add(this.tutorialStrings.case27_3);
				this.text.add(this.tutorialStrings.case27_4);
				this.text.add(this.tutorialStrings.case27_5);
				this.type = TipData.types.WATCH;
				this.window=1;
			break;
		}
	}
}

class TipLogic
{
	static currentInstance;
	constructor(i)
	{
		this.textImg;
		this.text;
		this.dataContainer;
	}

	display()
	{
		TipLogic.currentInstance = this;
		var messageString;

		var tipDataContainer = TutorialManager.tipDataContainer.getAt(TutorialManager.currentTip);
		this.dataContainer=tipDataContainer;
		var textList = tipDataContainer.text;
		messageString = textList.getAt(tipDataContainer.readCount);
		tipDataContainer.readCount++;
		var offset;
		if(tipDataContainer.window == 0)
		{
			offset = 0;
		}
		else if(tipDataContainer.window == 1)
		{
			offset = config.width;
		}
		else
		{
			offset = 2*config.width;
		}

		this.textImg = TutorialManager.scene.add.image(config.width*0.2+offset, config.height*0.2, 'spr_clue');
		this.textImg.setScale(1.2);
		var style = { font: "10px PixelFont", fill: "#000000", align: "left", wordWrap:{ width: this.textImg.displayWidth-2, useAdvancedWrap:true} };
		this.text = TutorialManager.scene.add.text(this.textImg.x-config.width*0.17, this.textImg.y-config.height*0.135, messageString, style).setResolution(10);

		var selfRef = this;

		switch(tipDataContainer.type)
		{
			case TipData.types.WATCH:
				console.log("TYPE WATCH");

				var textContainer = this.textImg;
				var nextButton = GameManager.scene.add.image(textContainer.x+config.width*0.205, textContainer.y+config.height*0.1,'assets_atlas', 'spr_ui_arrow');
				nextButton.setDepth(1);
                nextButton.setPipeline('GlowFilter');
				nextButton.setInteractive().on('pointerdown', function(pointer){
				var readCount = tipDataContainer.readCount;
					if(readCount < textList.length)
					{
						selfRef.text.destroy();
						messageString = textList.getAt(readCount);
						selfRef.text = TutorialManager.scene.add.text(textContainer.x-config.width*0.17, textContainer.y-config.height*0.135, messageString, style).setResolution(10);
						tipDataContainer.readCount++;
					}
					else
					{
						nextButton.destroy();
						selfRef.completeWatchTip();
					}
        		})
			break;

			case TipData.types.TOUCH:
				console.log("TYPE TOUCH");
				var img = tipDataContainer.srcImg;
				console.log("img: " + img + " - case: " + tipDataContainer.touchType);
				switch(tipDataContainer.touchType)
				{
					case TipData.touchTypes.GLASSES:
						 this.glassesInteractivity(selfRef, img);
					break;

					case TipData.touchTypes.DISHES:
						this.dishPileInteractivity(selfRef, img);
					break;

					case TipData.touchTypes.PANCAKEBOTTLE:
						this.pancakeSpawnerInteractivity(selfRef, img);
					break;

					case TipData.touchTypes.PANCAKE:
						this.pancakeInteractivity(selfRef, img);
					break;

					case TipData.touchTypes.COIN:
						//To do
						//Enable interactivity with coins
						//End if click on coins
						var coins = TutorialManager.coins;
                        coins.setDepth(5);
						coins.setPipeline('GlowFilter');
						coins.setInteractive().on('pointerdown', () => {
							coins.resetPipeline();
							if(offset==0) selfRef.endCase13(coins);
							else {selfRef.endCase26(coins);}
						})
						
					break;

					case TipData.touchTypes.RADIO:
						//To do
						TutorialManager.radioBackButton.disableInteractive();
						TutorialManager.radioFrecSpin.disableInteractive();
						img.setPipeline('GlowFilter');
						img.setInteractive().on('pointerdown', () =>{ 
							GameManager.scene.cameras.main.centerOnX(2*config.width + config.width/2);
							img.resetPipeline();
							selfRef.endCase14(img);
						})

					break;

					case TipData.touchTypes.RADIOSONG:
						img.setPipeline('GlowFilter'); //InterferenceRadioButton
						img.setInteractive();
					break;

					case TipData.touchTypes.SWAPVIEWTRASH:
						//To do
						//Enable interactivity with trashViewButton
						//End if click on trashViewButton
					break;

					case TipData.touchTypes.CLEAN:
						//To do
						//Enable interactivity with trash instances
						//End if click on trash instance
					break;

					case TipData.touchTypes.SWAPTONOODLES:
						TutorialManager.radioBackButton.setPipeline('GlowFilter');
						TutorialManager.radioBackButton.setInteractive();
						img.setPipeline('GlowFilter'); //goToNoodlesButton
						img.setInteractive().on('pointerdown', function(pointer){
							GameManager.scene.cameras.main.centerOnX(config.width + config.width/2);
    	    				GameManager.scene.cameras.main.fadeOut(25);
    	    				selfRef.endCase17(img);
    	    				callClient(2);
    	    				TutorialManager.tutorialPancakeClient.clientImg.x += config.width*0.45;
    	    				TutorialManager.tutorialPancakeClient.clientSecondImg.x += config.width*0.45;
						})
						//To do
						//Enable interactivity with noodlesViewButton
						//End if click on noodlesViewButton
					break;

					case TipData.touchTypes.BOWL:
						img.setPipeline('GlowFilter');
						img.setInteractive(); // Bowl -> spawn bowls
					break;

					case TipData.touchTypes.NOODLEBOX:
						img.setPipeline('GlowFilter');
						img.setInteractive(); // NoodleBox -> spawn noodles
					break;

				} 
			break;

			case TipData.types.DRAG:
				console.log("TYPE DRAG");
				var img = tipDataContainer.srcImg;
				switch(tipDataContainer.dragType)
				{
					case TipData.dragTypes.PANCAKETODISH:
						GameManager.dishImgContainerPancake.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						 this.pancakeDraggingInteractivity(img, TutorialPancake.ref);
					break;

					case TipData.dragTypes.COFFEETOCLIENT:
						TutorialManager.tutorialPancakeClient.clientImg.setPipeline('GlowFilter');
						TutorialCoffee.ref.coffeeDone();
						makeImgInteractive("coffeeDish", img, TutorialCoffee.ref)
					break;

					case TipData.dragTypes.CHOCSYRUP:
						//makeImgInteractive("syrup", img, TutorialSyrup.ref, null);
						TutorialSyrup.ref.staticImg.setPipeline('GlowFilter');
						GameManager.dishImgContainerPancake.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						makeImgInteractive("syrup", TutorialSyrup.ref.staticImg, TutorialSyrup.ref, null, false);
					break;

					case TipData.dragTypes.STRAWBERRYTOP:
						GameManager.dishImgContainerPancake.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						TutorialTopping.pancakeTopRef.makeToppingInteractive();
					break;

					case TipData.dragTypes.DISHTOCLIENT:
						TutorialManager.tutorialPancakeClient.clientImg.setPipeline('GlowFilter');
						TutorialSyrup.ref.dishContainer.dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						makeDishInteractive(TutorialSyrup.ref.dishContainer,"pancakeDish");
					break;

					case TipData.dragTypes.FAVSAUCE:
						GameManager.dishImgContainerNoodles.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						TutorialSauce.ref.makeSauceInteractive();
					break;

					case TipData.dragTypes.NOODLETODISH:
						GameManager.dishImgContainerNoodles.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						TutorialNoodles.noodlesList.getAt(0).noodlesDone();
					break;

					case TipData.dragTypes.FAVTOPPING:
						GameManager.dishImgContainerNoodles.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						TutorialTopping.noodleTopRef.makeToppingInteractive();
					break;

					case TipData.dragTypes.NOODLEDISHTOCLIENT:
						TutorialManager.tutorialPancakeClient.favDish=2;
						TutorialManager.tutorialPancakeClient.clientImg.setPipeline('GlowFilter');
						GameManager.dishImgContainerNoodles.getAt(0).dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						makeDishInteractive(GameManager.dishImgContainerNoodles.getAt(0),"noodleDish");
					break;
				}
			break;

			default: console.log("no TipData.type");
		}
	}

	completeWatchTip()
	{
		console.log("completeWatchTip called");
		this.textImg.destroy();
		this.textImg = null;
		this.text.destroy();
		this.text = null;
		TutorialManager.showNext();
	} 

	completeTouchTip(srcImg)
	{
		srcImg.removeInteractive();
	}

	glassesInteractivity(selfRef, img)
	{
		img.setPipeline('GlowFilter');
		img.setInteractive();
	    img.on('pointerdown', function(pointer){
	    	if(GameManager.coffeeMachine.occupiedSlots < 1)
	    	{	
	    		var slotId = findFreeSlot(GameManager.coffeeMachine, CoffeeMachine.slots);
	    		var pos = CoffeeMachine.slots.getAt(slotId);
	    		var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
	    		var readySound = GameManager.scene.sound.add('snd_ready');
	    		var coffee = new TutorialCoffee(slotId, fillingSound, readySound);
	    		img.resetPipeline();
	    		changePosition(coffee, pos.x, pos.y);
	    	} 
	    })
	}

	endGlassesInteractivity(img)
	{
		img.removeInteractive();
		this.completeWatchTip();
	}

	dishPileInteractivity(selfRef, img)
	{
		img.setPipeline('GlowFilter');
		img.setInteractive();
        img.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerPancake.length < 1)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(GameManager.tableclothsPancake, TableclothsPancake.slots);
        		var pos = TableclothsPancake.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_dish');
        		var dishImgContainer = new TutorialDishContainer(dishImg, slotId);
        		GameManager.dishImgContainerPancake.add(dishImgContainer);
        		img.resetPipeline();
        		selfRef.endDishPileInteractivity(img);
        	} 
        })
	}

	endDishPileInteractivity(img)
	{
		img.removeInteractive();
		this.completeWatchTip();
	}

	pancakeSpawnerInteractivity(selfRef, img)
	{
		img.setPipeline('GlowFilter');
		img.setInteractive();
        img.on('pointerdown', function(pointer){
        	if(GameManager.griddle.occupiedSlots < 1)
        	{	
        		var slotId = findFreeSlot(GameManager.griddle, Griddle.slots);
        		var pos = Griddle.slots.getAt(slotId);
        		var cookingSound = GameManager.scene.sound.add('snd_pancake_cooking');
        		var trashSound = GameManager.scene.sound.add('snd_trash');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		img.resetPipeline();
        		var pancake = new TutorialPancake(slotId, trashSound, cookingSound, readySound, pos.x, pos.y);
        	} 
        })
	}

	endPancakeSpawnerInteractivity(img)
	{
		img.removeInteractive();
		this.completeWatchTip();
	}

	pancakeInteractivity(selfRef, img)
	{
		img.setPipeline('GlowFilter');
		img.setInteractive();
        img.on('pointerdown', function(pointer){
        	img.resetPipeline();
        	TutorialPancake.ref.flipPancake();
        });
	}

	endPancakeInteractivity(img)
	{
		this.completeWatchTip();
	}

	pancakeDraggingInteractivity(img, pancake)
	{
		img.setPipeline('GlowFilter');
		TutorialManager.scene.input.setDraggable(img);
		img.on('dragstart', function(pointer,dragX,dragY){
			GameManager.tapSound.play();
			GameManager.tapSound.play();
			this.setDepth(5);
			pancake.animImg.setAlpha(0);
		})

        img.on('drag', function(pointer, dragX, dragY){
        	img.setPosition(dragX, dragY);
        	pancake.cookingSound.stop();
        	grabItem("pancake", img, pancake);
        })	
		
		img.on('dragend',() => {
			pancake.img.setDepth(2);
			pancake.animImg.setAlpha(1);
			pancake.cookingSound.play();	
			pancake.dragEndBehaviour();		
       	})
	}

	endPancakeDraggedToDish(img)
	{
		GameManager.dishImgContainerPancake.getAt(0).dishContainer.iterate(function(child){
			child.resetPipeline();
		});
		img.resetPipeline();
		this.completeWatchTip();
	}

	endCase8()
	{
		TutorialManager.tutorialPancakeClient.clientImg.resetPipeline();
		this.completeWatchTip();
	}

	endCase9()
	{
		GameManager.dishImgContainerPancake.getAt(0).dishContainer.iterate(function(child){
			child.resetPipeline();
		});
		TutorialManager.toppingImg.removeInteractive();
		TutorialTopping.pancakeTopRef.staticImg.resetPipeline();
		this.completeWatchTip();
	}

	endCase10()
	{
		GameManager.dishImgContainerPancake.getAt(0).dishContainer.iterate(function(child){
			child.resetPipeline();
		});
		TutorialSyrup.ref.staticImg.resetPipeline();
		TutorialManager.syrupImg.removeInteractive();
		this.completeWatchTip();
	}

	endCase11()
	{
		this.completeWatchTip();
	}

	endCase13(coinsImg)
	{
		coinsImg.destroy();
		this.completeWatchTip();
	}

	endCase14(radioImg)
	{
		radioImg.removeInteractive();
		this.completeWatchTip();
	}

	endCase15(radioFrecSpin)
	{
		radioFrecSpin.resetPipeline();
		this.completeWatchTip();
	}

	endCase17(buttonImg)
	{
		TutorialManager.radioBackButton.resetPipeline();
		TutorialManager.radioBackButton.removeInteractive();
		buttonImg.removeInteractive();
		buttonImg.resetPipeline();
		this.completeWatchTip();
	}

	endCase20(img) //Bowl created
	{
		img.resetPipeline();
		img.removeInteractive();
		this.completeWatchTip();
	}

	endCase21(img) //Noodles created
	{
		img.resetPipeline();
		img.removeInteractive();
		this.completeWatchTip();
	}

	endCase22(ladleImg) //Sauce served
	{
		ladleImg.resetPipeline();
		GameManager.dishImgContainerNoodles.getAt(0).dishContainer.iterate(function(child){
			child.resetPipeline();
		});
		this.completeWatchTip();
	}

	endCase23() //Noodles dragged to dish
	{
		this.completeWatchTip();
	}

	endCase24(img) //Topping dragged to dish
	{
		TutorialManager.toppingImg.removeInteractive();
		TutorialTopping.noodleTopRef.staticImg.resetPipeline();
		this.completeWatchTip();
	}

	endCase25() //Dish dragged to client
	{
		this.completeWatchTip();
	}

	endCase26(img) //Coins picked
	{
		img.destroy();
		this.completeWatchTip();
	}
}


function makeImgInteractive(itemClass, itemImg, item, cookingSound)
{
    itemImg.setInteractive({ draggable: true });

	itemImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		item.posx = this.x;
		item.posy = this.y;	
	})

    itemImg.on('drag', function(pointer, dragX, dragY){
    	this.setPosition(dragX, dragY);
    	if(cookingSound) cookingSound.stop();
    	grabItem(itemClass, this, item);
    })	
		
	itemImg.on('dragend',() => {
		if(cookingSound) cookingSound.play();
		item.dragEndBehaviour();
    })
}
