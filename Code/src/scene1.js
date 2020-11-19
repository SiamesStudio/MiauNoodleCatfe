class scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	init(gameData)
	{
		this.playerSettings;
		this.playerSettings = gameData.playerInfo;		
	}
	

	create(){
		var gm = new GameManager(this);
		GameManager.resetVariables();
		this.gameTimer = this.time.addEvent({ delay: 3 *  60 * 1000, callback: finishGame});
		this.resetVariables();
		this.clientsSettings();
        this.coffeeSetting();
        this.pancakesSetting();
		this.noodlesSetting();
		this.interfaceSettings();
		this.radioSettings();
        this.cursors = this.input.keyboard.createCursorKeys();
	}

	resetVariables(){
		GameManager.globalHappiness=50;
		GameManager.totalHappiness=50;
		GameManager.customerCounter=1;
		GameManager.gameOn=true;
		GameManager.levelEarnedCoins=0;
		Client.clientList.removeAll();
   		Client.clientsInRestaurant.removeAll();
   		Client.streetSlots.removeAll();
   		Client.restaurantSlots.removeAll();
        Noodles.noodlesList.removeAll();
        Pancake.pancakesList.removeAll();
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
	}

	interfaceSettings(){
		this.coinSlider=this.add.sprite(config.width*0.5,config.height/13,'assets_atlas','spr_ui_slider')
        this.coinIcon=this.add.sprite(config.width*0.4,config.height/11,'assets_atlas','spr_ui_icon_coin')
        this.numCoins = this.add.text(config.width*0.5,config.height/13, GameManager.levelEarnedCoins, { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
		
		this.chefLevelSlider=this.add.sprite(3*config.width/4 ,config.height/13,'assets_atlas','spr_ui_slider')
        this.add.sprite(config.width*0.65,config.height/11,'assets_atlas','spr_ui_chefLvl')
        this.numPlayerLevel = this.add.text(config.width*0.65,config.height/11, this.playerSettings.level, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
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
		
		this.options = this.add.sprite(config.width*0.05,config.height/11-1,'assets_atlas','spr_ui_settings').setScale(0.5)


		this.coinSlider=this.add.sprite(config.width*0.5+config.width,config.height/13,'assets_atlas','spr_ui_slider')
        this.coinIcon=this.add.sprite(config.width*0.4+config.width,config.height/11,'assets_atlas','spr_ui_icon_coin')
        this.noodlenumCoins = this.add.text(config.width*0.5+config.width,config.height/13, GameManager.levelEarnedCoins, { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
		
		this.chefLevelSlider=this.add.sprite(3*config.width/4 +config.width,config.height/13,'assets_atlas','spr_ui_slider')
        this.add.sprite(config.width*0.65+config.width,config.height/11,'assets_atlas','spr_ui_chefLvl')
        this.noodlenumPlayerLevel = this.add.text(config.width*0.65+config.width,config.height/11, this.playerSettings.level, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
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
		
		this.options = this.add.sprite(config.width*0.05+config.width,config.height/11-1,'assets_atlas','spr_ui_settings').setScale(0.5)

		this.blackScreen = this.add.image(config.width/2, config.height/2, 'blackScreen').setAlpha(0.5).setDepth(5);
        this.blackScreen.setVisible(false)
        this.extraBanner = this.add.sprite(config.width/2, config.height/2,'assets_atlas','spr_bck_improvementMenu').setDepth(5)
        this.extraBanner.setVisible(false)
        this.crossButton = this.add.sprite(4*config.width/5, 1*config.height/5,'spr_closeWindow').setDepth(5)
		this.crossButton.setVisible(false)

		this.victoryText=this.add.text(config.width/2, config.height/2, "Victory", { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false).setDepth(5);
		this.defeatText=this.add.text(config.width/2, config.height/2, "Defeat", { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false).setDepth(5);

		this.blackScreen.setInteractive().on('pointerdown', () => {
            
		})
		this.crossButton.setInteractive().on('pointerdown', () => {
            GameManager.scene.scene.start("Menu",{playerInfo: GameManager.scene.playerSettings})
		})
		
		this.blackScreenNoodles = this.add.image(config.width/2+config.width, config.height/2, 'blackScreen').setAlpha(0.5).setDepth(5);
        this.blackScreenNoodles.setVisible(false)
        this.extraBannerNoodles = this.add.sprite(config.width/2+config.width, config.height/2,'assets_atlas','spr_bck_improvementMenu').setDepth(5)
        this.extraBannerNoodles.setVisible(false)
        this.crossButtonNoodles = this.add.sprite(4*config.width/5+config.width, 1*config.height/5,'spr_closeWindow').setDepth(5)
		this.crossButtonNoodles.setVisible(false)

		this.victoryTextNoodles=this.add.text(config.width/2+config.width, config.height/2, "Victory", { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false).setDepth(5);
		this.defeatTextNoodles=this.add.text(config.width/2+config.width, config.height/2, "Defeat", { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false).setDepth(5);

		this.blackScreenNoodles.setInteractive().on('pointerdown', () => {
            
		})
		this.crossButtonNoodles.setInteractive().on('pointerdown', () => {
            GameManager.scene.scene.start("Menu",{playerInfo: GameManager.scene.playerSettings})
		})
		
		this.blackScreenRadio = this.add.image(config.width/2+2*config.width, config.height/2, 'blackScreen').setAlpha(0.5).setDepth(5);
        this.blackScreenRadio.setVisible(false)
        this.extraBannerRadio = this.add.sprite(config.width/2+2*config.width, config.height/2,'assets_atlas','spr_bck_improvementMenu').setDepth(5)
        this.extraBannerRadio.setVisible(false)
        this.crossButtonRadio = this.add.sprite(4*config.width/5+2*config.width, 1*config.height/5,'spr_closeWindow').setDepth(5)
		this.crossButtonRadio.setVisible(false)

		this.victoryTextRadio=this.add.text(config.width/2+2*config.width, config.height/2, "Victory", { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false).setDepth(5);
		this.defeatTextRadio=this.add.text(config.width/2+2*config.width, config.height/2, "Defeat", { font: "20px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10).setVisible(false).setDepth(5);

		this.blackScreenRadio.setInteractive().on('pointerdown', () => {
            
		})
		this.crossButtonRadio.setInteractive().on('pointerdown', () => {
            GameManager.scene.scene.start("Menu",{playerInfo: GameManager.scene.playerSettings})
        })
        
	}

	clientsSettings(){
    	//index, salsa, nº toppings, toppings
    	//index, salsa, nº plantas,nºtoppings, toppings
    	new Client(0, 0,[2,0,1,0], [1,-1,1,1,2]);
    	new Client(1, 1,[2,2,0], [1,-1,1,2,2,3]);
    	new Client(2, 0, [2,2,1,0], [1,1,1,0]);
    	new Client(3, 2, [2,3,1,3], [1,2,1,1,0]);
		new Client(4, 2, [2,2,1,1], [1,0,2,0]);
		new Client(5, 1, [2,0,2,1,2], [1,0,2,0]);
		new Client(6, 1, [2,1,2,2,3], [1,2,2,1,1]);
		new Client(7, 1, [2,3,2,0,2], [1,3,1,0]);
    	//añadir clientes a mano
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
		
		var coffeeMachineLvl = GameManager.scene.playerSettings.upgrades.coffeeMachineLevel;
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
		var radio = this.add.image(config.width*0.83,config.height*0.24,'assets_atlas','spr_radio');
		radio.setDepth(1);
        radio.setInteractive().on('pointerdown', () =>{ cam.centerOnX(2*config.width + config.width/2);})
		var coffeeSpawnerImg = this.add.image(config.width*0.95, config.height*0.92,'assets_atlas', 'spr_glasses');

		var coffeeMachine = new CoffeeMachine(coffeeMachineImg, coffeeMachineLvl, false);
		GameManager.coffeeMachine = coffeeMachine;
		coffeeSpawnerImg.setInteractive();
        coffeeMachineImg.setDepth(0.9);
        coffeeSpawnerImg.on('pointerdown', function(pointer){
        	if(coffeeMachine.occupiedSlots < coffeeMachineLvl+1)
        	{	
        		var slotId = findFreeSlot(coffeeMachine, CoffeeMachine.slots);
        		var pos = CoffeeMachine.slots.getAt(slotId);
        		var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var coffee = new Coffee(slotId, fillingSound, readySound);
        		changePosition(coffee, pos.x, pos.y);
        	} 
        })
        GameManager.tapSound = GameManager.scene.sound.add('snd_tap');
        var goToNoodlesButton = this.add.image(config.width*0.96,config.height*0.4,'assets_atlas', 'spr_ui_arrow');
        goToNoodlesButton.setDepth(1);
        goToNoodlesButton.setInteractive().on('pointerdown', function(pointer){
            cam.centerOnX(config.width + config.width/2);
            GameManager.scene.cameras.main.fadeOut(25);
        })
	}

	pancakesSetting()
	{
		var numTablecloth = this.playerSettings.upgrades.tableClothPancakeLevel + 1;

		var tableclothImgList = new Phaser.Structs.List();
		
        for(var i=0; i<4; i++)
        {
        	var tableclothImg;
        	switch(i)
        	{
        		case 0:
        		    tableclothImg = this.add.image(config.width*0.194, config.height*0.575,'assets_atlas', 'spr_tablecloth_0');
        		break;

        		case 1:
        			tableclothImg = this.add.image(config.width*0.3405, config.height*0.575,'assets_atlas', 'spr_tablecloth_1');
        		break;

        		case 2:
        			tableclothImg = this.add.image(config.width*0.125, config.height*0.714,'assets_atlas', 'spr_tablecloth_2');	
        		break;

        		case 3:
        			tableclothImg = this.add.image(config.width*0.297, config.height*0.714,'assets_atlas', 'spr_tablecloth_3');
        		break;

        	}
        	if(numTablecloth-1 < i) tableclothImg.setAlpha(0.3);
        	
        	tableclothImgList.add(tableclothImg);
        }

        var tableclothsPancake = new TableclothsPancake(tableclothImgList, this.playerSettings.upgrades.tableClothPancakeLevel);
        var dishPileImg = this.add.image(config.width*0.7, config.height*0.92,'assets_atlas','spr_dishes'); 
        GameManager.tableclothsPancake = tableclothsPancake; 
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerPancake.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothsPancake, TableclothsPancake.slots);
        		var pos = TableclothsPancake.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_dish');
        		var dishImgContainer = new DishImgContainer(dishImg, slotId);
        		GameManager.dishImgContainerPancake.add(dishImgContainer);
        	} 
        })

		var pancakeSpawnerImg = this.add.image(config.width*0.85, config.height*0.92,'spr_pancake_bottle');
        var griddleImg = this.add.image(config.width*0.562, config.height*0.625,'assets_atlas','spr_griddle');
        var griddleUpgradeLvl = this.playerSettings.upgrades.pancakePanLevel;
        var griddle = new Griddle(griddleImg, griddleUpgradeLvl);
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
        	if(griddleUpgradeLvl < i) slotGriddleImg.setAlpha(0.3);
        }

       	var trashCanImg = this.physics.add.sprite(config.width*0.105, config.height*0.915,'assets_atlas','spr_trashCan');
       	GameManager.trashCanImgPancake = trashCanImg;
        pancakeSpawnerImg.setInteractive();
        pancakeSpawnerImg.on('pointerdown', function(pointer){
        	if(griddle.occupiedSlots < GameManager.scene.playerSettings.upgrades.pancakePanLevel+1)
        	{	
        		var slotId = findFreeSlot(griddle, Griddle.slots);
        		var pos = Griddle.slots.getAt(slotId);
        		var cookingSound = GameManager.scene.sound.add('snd_pancake_cooking');
        		var burntSound = GameManager.scene.sound.add('snd_burnt');
        		var trashSound = GameManager.scene.sound.add('snd_trash');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var pancake = new Pancake(slotId, trashSound, cookingSound, burntSound, readySound, pos.x,pos.y);
        	} 
        })
        
        this.add.image(config.width*0.42, config.height*0.9,'assets_atlas', 'spr_topping_posters');
        for(var i=0; i<4; i++)
		{
			var toppingSound = GameManager.scene.sound.add('snd_topping');
			var topping = new Topping(i, true, toppingSound);
		}
		
		for(var i=0; i<3; i++)
		{
			var syrupSound = GameManager.scene.sound.add('snd_topping');
			var syrup = new Syrup(i,syrupSound);
		}
	}

	noodlesSetting()
	{
		var backgroundStreet = this.add.image(config.width*0.5+config.width, config.height*0.5, 'bg_streetNoodles');
		var background = this.add.image(config.width*0.5+config.width, config.height*0.5, 'bg_kitchen');
		background.setDepth(0.7);

		var noodleSpawnerImg = this.add.image(config.width*0.882 + config.width, config.height*0.91,'assets_atlas','spr_bg_noodles');
		noodleSpawnerImg.setDepth(0.8);
        var bigStrainerImg = this.add.image(config.width*0.84 + config.width, config.height*0.543,'assets_atlas','spr_bg_pot');
		bigStrainerImg.setDepth(0.8);
        GameManager.animatedStrainerImg = this.physics.add.sprite(config.width*0.825 + config.width, config.height*0.475,'anim_pot_bubbles');
		GameManager.animatedStrainerImg.setAlpha(0);
		var strainerLvl = GameManager.scene.playerSettings.upgrades.noodleLevel;
		var cam = this.cameras.main;	
		var goToCoffeeButton = this.add.image(config.width*0.04+config.width,config.height*0.4,'assets_atlas', 'spr_ui_arrow');
		goToCoffeeButton.setDepth(1);
        goToCoffeeButton.toggleFlipX();
        goToCoffeeButton.setInteractive().on('pointerdown', function(pointer){
			cam.centerOnX(config.width/2);
            GameManager.scene.cameras.main.fadeOut(25);
		})
 		
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

			}
			if(strainerLvl < i) strainerImg.setAlpha(0.3);
            strainerImg.setDepth(0.8);
        }
		
        this.anims.create({
    		key: 'potCooking',
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pot_bubbles', { start: 0, end: 4}),
    		frameRate: 7,
    		repeat: -1
		});

        var strainer = new Strainer(bigStrainerImg, strainerLvl);
        GameManager.strainer = strainer;
       	var trashCanImg = this.physics.add.sprite(config.width*0.095+config.width, config.height*0.92,'assets_atlas','spr_trashCan');
        trashCanImg.setDepth(0.8);
       	GameManager.trashCanImgNoodles = trashCanImg;
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
        		var noodles = new Noodles(slotId, trashSound, cookingSound, burntSound, readySound);
      			changePosition(noodles, pos.x,pos.y);
        	} 
        })
        
        var numTablecloth = this.playerSettings.upgrades.tableClothPancakeLevel + 1;

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
        	tableclothImg.setDepth(0.8);
        	tableclothImgList.add(tableclothImg);
        }

        var tableclothsNoodle = new TableclothsNoodle(tableclothImgList, this.playerSettings.upgrades.tableClothNoodleLevel);
        
        GameManager.tableclothsNoodle = tableclothsNoodle;
        var dishPileImg = this.add.image(config.width*0.72 + config.width, config.height*0.92,'assets_atlas','spr_bowl');
        dishPileImg.setDepth(0.8);
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothsNoodle, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_bowl');
                dishImg.setDepth(1);
                var dishImgContainer = new DishImgContainer(dishImg, slotId);
        		GameManager.dishImgContainerNoodles.add(dishImgContainer);
        	} 
        })
        
        for(var i = 0; i<4; i++)
		{
			var toppingSound = GameManager.scene.sound.add('snd_topping');
			var topping = new Topping(i, false, toppingSound);
		}
		for(var i=0; i<4; i++)
		{
			var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
			var sauce = new Sauce(i, fillingSound);
		}   
	}

	update(time, delta)
	{
    	var maxTime = 9;
    	var minTime = 2;
    	if(GameManager.gameOn){
			
			if(GameManager.waitingRestaurantClient==false && Client.restaurantOccupiedSlots < 3){
				  GameManager.waitingRestaurantClient=true;
				  var restaurantTime= Math.floor(Math.random()*(maxTime-minTime)+minTime)*1000;
				  setTimeout(function(){
						callClient(1);
					 }, restaurantTime);
			}
				
			if(GameManager.waitingStreetClient==false && Client.streetOccupiedSlots < 3){
				GameManager.waitingStreetClient=true;
				var streetTime= Math.floor(Math.random()*(maxTime-minTime)+minTime)*1000;
				setTimeout(function(){
					callClient(2);
				}, streetTime);
			}
		  
		}
    	
		if(!GameManager.gameOn && Client.clientsInRestaurant.length==0){ //condicion de victoria
			GameManager.scene.playerSettings.coins+=GameManager.levelEarnedCoins;
			this.savePlayerSettings();
			this.stopSounds();
			this.blackScreen.setVisible(true);
			this.extraBanner.setVisible(true);
			this.crossButton.setVisible(true);
			this.victoryText.setVisible(true);
			this.extraBannerNoodles.setVisible(true);
			this.crossButtonNoodles.setVisible(true);
			this.victoryTextNoodles.setVisible(true);
			this.extraBannerRadio.setVisible(true);
			this.crossButtonRadio.setVisible(true);
			this.victoryTextRadio.setVisible(true);
			//GameManager.scene.scene.start("Menu",{playerInfo: GameManager.scene.playerSettings})
		}

		if(GameManager.globalHappiness < 20){ //condicion de derrota
			GameManager.scene.playerSettings.coins+=GameManager.levelEarnedCoins;
			this.savePlayerSettings();
			this.stopSounds();
			this.blackScreen.setVisible(true);
			this.extraBanner.setVisible(true);
			this.crossButton.setVisible(true);
			this.defeatText.setVisible(true);
			this.extraBannerNoodles.setVisible(true);
			this.crossButtonNoodles.setVisible(true);
			this.defeatTextNoodles.setVisible(true);
			this.extraBannerRadio.setVisible(true);
			this.crossButtonRadio.setVisible(true);
			this.defeatTextRadio.setVisible(true);
			//GameManager.scene.scene.start("Menu",{playerInfo: GameManager.scene.playerSettings})
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
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "noodles":
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "topping":
				checkToppingHoverWithDish();
			break;

			case "syrup":
				checkSauceAndSyrupHover();
			break;

			case "pancakeDish":
				if(checkHoverWithTrashCan()) return;
				checkHoverWithClient();
			break;

			case "noodleDish":
				if(checkHoverWithTrashCan()) return;
				checkHoverWithClient();
			break;

			case "coffeeDish":
				checkHoverWithClient();
			break;

			case "sauce":
				checkSauceAndSyrupHover();
			break;

			default:
				console.log("Item grabbed with no class");
			break;
		}
	}

	savePlayerSettings(){
        localStorage.setItem('playerSettings_PreRelease', JSON.stringify(this.playerSettings))
	}

	changeRadioFrecuency(){
        this.angle = 0
        if(this.radioFrecSpin.angle < 0){
                this.angle = (this.radioFrecSpin.angle + 180) + 180
        }else{
            this.angle = this.radioFrecSpin.angle
        }
        this.frec = (this.angle - 0) / (360 - 0)
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
//
        this.radioSongText.x = this.radioSongTitleStartPosition
        this.radioSongText.setText(this.titleSongs.getAt(this.globalIndex))
	}
	

	stopSounds()
	{
		for(var i=0; i<Pancake.pancakesList.length; i++)
		{
			var pancake = Pancake.pancakesList.getAt(i);
			pancake.cookingSound.stop();
			pancake.burntSound.stop();
			pancake.readySound.stop();
		}

		for(var i=0; i<Noodles.noodlesList.length; i++)
		{
			var noodles = Noodles.noodlesList.getAt(i);
			noodles.cookingSound.stop();
			noodles.burntSound.stop();
			noodles.readySound.stop();
		}

		this.currentSong.stop()
        this.interferenceSound.stop()
	}
	
	uploadPlayerLevel(number){
        var expPerLevel = [0,200,1200,6200,21200,46200,96200]
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
			this.noodlenumChefPoints.setText( (this.playerSettings.experience - expPerLevel[currentLevel]) +"/"+ (expPerLevel[currentLevel+1] - expPerLevel[currentLevel]) )
        }
        else if(currentLevel == 0){
			this.numChefPoints.setText( (this.playerSettings.experience - expPerLevel[currentLevel]) +"/"+ expPerLevel[currentLevel+1] )
			this.noodlenumChefPoints.setText( (this.playerSettings.experience - expPerLevel[currentLevel]) +"/"+ expPerLevel[currentLevel+1] )
		}

        else{
			this.numChefPoints.setText( (expPerLevel[expPerLevel.length - 1] - expPerLevel[expPerLevel.length - 2]) +"/50000" )
			this.noodlenumChefPoints.setText( (expPerLevel[expPerLevel.length - 1] - expPerLevel[expPerLevel.length - 2]) +"/50000" )
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

class GameManager
{
	static scene;
	static coffeeMachine;
	static griddle;
	static strainer;
	static tableclothsNoodle;
	static tableclothsPancake;
	static coffeeDishes = new Phaser.Structs.List();
	static dishImgContainerPancake = new Phaser.Structs.List();
	static currentContainer;
	static dishImgContainerNoodles = new Phaser.Structs.List();
	static clients = new Phaser.Structs.List();
	static grabbedItemImg; //pancake
	static grabbedItem; //
	static grabbedItemClass;
	static trashCanImgPancake;
	static trashCanImgNoodles;
	static animatedStrainerImg;
	static collidingObjectImg;
	static collidingObject;
	static tapSound;
	static waitingRestaurantClient = false;
	static waitingStreetClient = false;
	static levelSeconds=[20,10,8,6,4,2,1];
	static gameMinutes=1;
	static gameOn=true;
	static levelEarnedCoins=0;
	static globalHappiness=50;
	static customerCounter=3;
	static totalHappiness=50;
	static tutorial = false;
	constructor(scene)
	{
		GameManager.scene = scene;
	}

	static resetVariables()
	{
		GameManager.dishImgContainerPancake.removeAll();
		GameManager.dishImgContainerNoodles.removeAll();
		GameManager.clients.removeAll();
		GameManager.coffeeDishes.removeAll();

        GameManager.coffeeMachine = null;
        GameManager.griddle = null;
        GameManager.strainer = null;
        GameManager.tableclothsNoodle = null;
        GameManager.tableclothsPancake = null;
        GameManager.currentContainer = null;
        GameManager.grabbedItemImg = null;
        GameManager.grabbedItem = null;
        GameManager.grabbedItemClass = null;
        GameManager.trashCanImgPancake = null;
        GameManager.trashCanImgNoodles = null;
        GameManager.animatedStrainerImg = null;
        GameManager.collidingObjectImg = null;
        GameManager.collidingObject = null;
        GameManager.tapSound = null;

        GameManager.waitingRestaurantClient = false;
        GameManager.waitingStreetClient = false;
        GameManager.levelSeconds = [10,8,6,4,2,1];
        GameManager.gameMinutes = 10;
        GameManager.gameOn = true;
        GameManager.levelEarnedCoins = 0;
        GameManager.globalHappiness = 50;
        GameManager.customerCounter = 1;
        GameManager.totalHappiness = 50;
        GameManager.tutorial = false;
	}
}

class Slot
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.occupied = false;
	}	
}

/* This class is needed so that there is a relation between the dishImg and the object from the eh represented in the dishImg. Otherwise we could not know 
what order is in the dish we are colliding with. */
class DishImgContainer
{
	constructor(dishImg, assignedSlot)
	{
		this.assignedSlot = assignedSlot;
		this.posx;
		this.posy;
		this.hovering = false;
		this.img = dishImg; //Img of the dish
		this.dish; //Object from the class Dish
		this.dishContainer = GameManager.scene.add.container(dishImg.x, dishImg.y);
		this.img.setPosition(0,0); //If this is not done, then the image would not appear in the scene
		this.dishContainer.add(this.img);
		this.clientCollider;
		this.toppings = new Phaser.Structs.List();
		this.sauce=-1;
        this.dishContainer.setDepth(1);
	}

	addToContainer(img, xOffset, yOffset)
	{
		img.setPosition(img.x + xOffset, img.y + yOffset);
		this.dishContainer.add(img);
	}

	dragEndBehaviour()
	{
		if(this.hovering == true)
		{
			var trashCanImg = GameManager.grabbedItemClass == "pancakeDish" ? GameManager.trashCanImgPancake : GameManager.trashCanImgNoodles;

			if(checkOverlap(this.img, trashCanImg)) this.dragToTrash(this.img,trashCanImg);
			else
			{
				if(checkOverlap(this.img,GameManager.collidingObjectImg)) this.dragToClient(this.img,GameManager.collidingObjectImg);
			}
			this.hovering = false;
		}
		else
		{
			grabItem("", null, null);
			this.dishContainer.setPosition(this.posx,this.posy);
		}
		
	}

	//IMPLEMENT ALL THE LOGIC, this works for the pancakes and the noodles
	dragToClient(dishImg, clientImg)
	{
		//GameManager.scene.physics.world.removeCollider(this.clientCollider);	
		this.freeTableCloth();		
		clientImg.setAlpha(1);
		var dish = this.dish; // aquí te dejo al objeto de la clase Dish
		var client = GameManager.collidingObject; //El cliente con el que ha colisionado, objeto de la clase Client
		client.compareOrderWithDish(dish);
		grabItem("", null, null);
	}

	dragToTrash(dishImg, trashImg)
	{
		this.freeTableCloth();
		trashImg.setAlpha(1);
	}

	freeTableCloth()
	{
		if(GameManager.grabbedItemClass == "pancakeDish"){
			GameManager.dishImgContainerPancake.remove(this);
			GameManager.tableclothsPancake.occupiedSlots--;
			TableclothsPancake.slots.getAt(this.assignedSlot).occupied = false;
		}
		else if(GameManager.grabbedItemClass == "noodleDish"){ //Free the tablecloth, remove the order img, remo
			GameManager.dishImgContainerNoodles.remove(this);
			GameManager.tableclothsNoodle.occupiedSlots--;
			TableclothsNoodle.slots.getAt(this.assignedSlot).occupied = false;
		}
		this.dishContainer.destroy();
	}

	addTopping(toppingType)
  	{
    	var originalSize = this.toppings.length;
    	this.toppings.add(toppingType);
	
	    if(originalSize != this.toppings.length){this.numToppings++; return true;}
    	else return false;
  	}
}


function findFreeSlot(machine, slots)
{
	var i=0;
	var slotId = -1;
	var slot;
	var found = false;
	while(i < machine.upgradeLVL+1 && !found)
	{
		slot = slots.getAt(i);
		if(!slot.occupied)
		{	
			machine.occupiedSlots++;
			slot.occupied = true;
			slotId = i;
			found = true;
		}
		i++;
	} 
	return slotId;
}

function changePosition(object, x, y)
{
	object.img.setPosition(x,y);
}

function grabItem(type, img, item)
{
	GameManager.grabbedItemClass = type;
	GameManager.grabbedItemImg = img;
	GameManager.grabbedItem = item;
}

function checkHoverWithTrashCan()
{
	var trashCanImg;
	if(GameManager.grabbedItemClass == "pancake" || GameManager.grabbedItemClass=="pancakeDish") trashCanImg = GameManager.trashCanImgPancake;
	else { trashCanImg = GameManager.trashCanImgNoodles ;}

	if(checkOverlap(GameManager.grabbedItemImg, trashCanImg))
	{
		GameManager.grabbedItem.hovering = true;
		GameManager.collidingObjectImg = trashCanImg;
		trashCanImg.setAlpha(0.5);
		return true;
	}
	else 
	{
		GameManager.grabbedItem.hovering = false;
		trashCanImg.setAlpha(1);
	}

	return false;
}

// This function works for pancakes and noodles
function checkHoverWithDishes()
{
	if(GameManager.grabbedItem.burnt) return;
	/* var collision is needed so that the food can only collide with one dish at a time */
	var container;
	if(GameManager.grabbedItemClass == "pancake") container = GameManager.dishImgContainerPancake;
	else{ container = GameManager.dishImgContainerNoodles;}

	var collision = false;
	var numCollisions = 0;
	for(var i=0; i<container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish != null)
		{
			if(GameManager.grabbedItemClass == "pancake")
			{
				// Can't add a pancake to the dish if there are already 3, or a topping or syrup has been added
				if(dish.numPancakes > 2 || !toppingsEmpty(dish) || dish.sauce != -1) continue;
			}
			else
			{ // If the dish has already been created, that means that there is noodles
				continue;
			}		
		}
		collision = overlappingLogic(dishContainer, numCollisions);
		if(collision == true) numCollisions++;
	}
	if(numCollisions==0) GameManager.grabbedItem.hovering = false;
}

function checkToppingHoverWithDish()
{
	var container;
	var pancakeTopping;
	if(GameManager.grabbedItemImg.x >= config.width){pancakeTopping = false; container = GameManager.dishImgContainerNoodles;}
	else{pancakeTopping = true; container = GameManager.dishImgContainerPancake;}

	var numCollisions=0;
	var collision = false;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(pancakeTopping)
		{
			if(dish)
			{
				if(containsTopping(GameManager.grabbedItem, dish) || dish.numToppings>=4) continue;
				collision = overlappingLogic(dishContainer, numCollisions);
				if(collision == true) numCollisions++;
			}
		}
		else //noodle topping
		{
			// por aqui te has quedado
			// crear objeto dish en class Topping y en class Sauce en el caso de que no haya nada
			// modificar la clase noodle para que si hay ya un objeto dish, añada su indice
			// No hay que tocar la clase Pancake
			if(dish)
			{
				if(containsTopping(GameManager.grabbedItem, dish) || dish.numToppings>=4) continue;
			}
			collision = overlappingLogic(dishContainer, numCollisions);
			if(collision == true) numCollisions++;
		}
	}
	if(numCollisions==0) GameManager.grabbedItem.hovering = false;
}

// This function checks if a dish contains the received topping
function containsTopping(topping,dish)
{
	for(var i=0; i<dish.toppings.length; i++)
	{
		if(dish.toppings.getAt(i) == topping.index) return true;
	}
	return false;
}

// This function checks if a dish has no toppings, if the index is 0 or greater there is a topping assigned, if it is negative then there is no topping
function toppingsEmpty(dish)
{
	if(dish.numToppings <= 0) return true;
	else return false;
	/*
	for(var i=0; i<dish.toppings.length; i++)
	{
		if(dish.toppings.getAt(i) >= 0) return false;
	}
	return true;
	*/
}


function checkHoverWithClient()
{
	var clients = getClientsInRestaurant();
	var collision = false;
	var numCollisions=0;
	for(var i=0; i<clients.length; i++)
	{

		var client = clients.getAt(i);
		var clientImg = client.clientImg;
		if(!clientImg || GameManager.grabbedItem.dish == null) continue;

		var clientHasMyItem = false;
		var order = client.order;
		var dishes = order.dishes;

		for(var j=0; j<order.dishes.length; j++)
		{
			if(dishes.getAt(j).index == GameManager.grabbedItem.dish.index) clientHasMyItem = true;
		}

		if(!clientHasMyItem) continue;

		
		if(checkOverlap(GameManager.grabbedItemImg, clientImg) && !collision)
		{
			GameManager.collidingObjectImg = clientImg;
			GameManager.collidingObject = client;
			GameManager.grabbedItem.hovering = true;
			clientImg.setAlpha(0.5);
			collision = true;
			numCollisions++;
		}
		else
		{
			clientImg.setAlpha(1);
		}
	}
	if(numCollisions==0)GameManager.grabbedItem.hovering = false;
}
// This is the way to get the items from the class Client that are inside the restaurant
function getClientsInRestaurant()
{
	var clients = new Phaser.Structs.List();
	for(var i=0; i<Client.clientList.length; i++)
	{
		for(var j=0; j<Client.clientsInRestaurant.length; j++)
		{
			if(Client.clientsInRestaurant.getAt(j) == Client.clientList.getAt(i).index) clients.add(Client.clientList.getAt(i));
		}
	}
	return clients;
}

function checkSauceAndSyrupHover()
{
	var container;
	if(GameManager.grabbedItemClass == "sauce"){ container = GameManager.dishImgContainerNoodles;}
	else{ container = GameManager.dishImgContainerPancake;}

	var collision = false;
	var numCollisions=0;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(GameManager.grabbedItemClass == "sauce") 
		{
			if(dish)
			{
				if(dish.sauce != -1) continue;
			}
			else
			{
				if(dishContainer.sauce != -1) continue;
			}
			collision = overlappingLogic(dishContainer, numCollisions);
			if(collision == true) numCollisions++;
		}
		else //SYRUP
		{
			if(dish)
			{
				if(dish.sauce != -1) continue;
				collision = overlappingLogic(dishContainer, numCollisions);
				if(collision == true) numCollisions++;
			}
		}
		
	}
	if(numCollisions == 0) GameManager.grabbedItem.hovering = false;
}

// function created to avoid the code repetition
function overlappingLogic(container, numCollisions)
{
	var dishImg = container.img;
	if(checkOverlap(GameManager.grabbedItemImg, dishImg) && numCollisions==0)
	{
		GameManager.collidingObjectImg = dishImg;
		GameManager.collidingObject = container;
		GameManager.grabbedItem.hovering = true;
		container.dishContainer.iterate(function(child){
			child.setAlpha(0.5);
		});
		return true;
	}
	else
	{
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		return false;
	}
}

function checkOverlap(spriteA, spriteB)
{
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	var recACenterX = boundsA.centerX;
	var recACenterY = boundsA.centerY;
	var recBCenterX = boundsB.centerX;
	var recBCenterY = boundsB.centerY;

	var decrease = 0.7;
	boundsA.height *= decrease;
	boundsB.height *= decrease;
	boundsA.width *= decrease;
	boundsB.width *= decrease;

	Phaser.Geom.Rectangle.CenterOn(boundsA, recACenterX, recACenterY);
	Phaser.Geom.Rectangle.CenterOn(boundsB, recBCenterX, recBCenterY);
	return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}

function makeDishInteractive(container, dishClass)
{
	var dishImg = container.img;
	//var dish = container.dish;
	var dishContainer = container.dishContainer;

	dishImg.setInteractive({ draggable: true });

	dishImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		dishContainer.setDepth(4);
		container.posx = dishContainer.x;
		container.posy = dishContainer.y;
	})

    dishImg.on('drag', function(pointer, dragX, dragY){
     	dishContainer.setPosition(dragX+container.posx , dragY+container.posy);
     	grabItem(dishClass, this, container);
    })	
		
	dishImg.on('dragend',() => {
		container.dragEndBehaviour();	
    })
}

function makeImgInteractive(itemClass, itemImg, item, cookingSound, _pixelPerfect)
{
    if(_pixelPerfect == true) itemImg.setInteractive({ draggable: true});

	itemImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		item.img.setDepth(5);
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
		itemImg.setDepth(2);
		item.dragEndBehaviour();
    })
}

function callClient(place){ 
    if(!GameManager.gameOn) return;

	var long=Client.clientsInRestaurant.length
  	var clientId= Math.floor(Math.random()*Client.clientList.length);
  	Client.clientsInRestaurant.add(clientId);

  	while(long==Client.clientsInRestaurant.length){
		var clientId= Math.floor(Math.random()*Client.clientList.length);
    	Client.clientsInRestaurant.add(clientId);
  	}
  	Client.clientList.getAt(clientId).goToRestaurant(place);
  	if(place==1){
    	GameManager.waitingRestaurantClient=false;
  	}
  	if(place==2){
    	GameManager.waitingStreetClient=false;
  	} 
}

function finishGame(){
	GameManager.gameOn=false;
}