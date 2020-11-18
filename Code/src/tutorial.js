class tutorial extends Phaser.Scene {
	constructor() {
		super("tutorial");
	}

	preload()
	{
		this.load.plugin('rexglowfilterpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilterpipelineplugin.min.js', true);
		this.load.image('spr_tutorial','assets/spr_tutorial.png');
	}

	create(){
		var gm = new GameManager(this);
		GameManager.tutorial=true;
		this.interfaceSettings();
		this.clientsSettings();	
        this.coffeeSetting();
        this.pancakesSetting();
        //this.noodlesSetting();
        this.tutStuff();
        this.cursors = this.input.keyboard.createCursorKeys();
	}


	clientsSettings(){
    	//index, salsa, nº toppings, toppings
    	//index, sirope, nº plantas,nºtoppings, toppings
    	
    	
    	TutorialManager.tutorialPancakeClient = new Client(0, 1,[2,0,1,0], [1,1,1,1,2]);
    	TutorialManager.tutorialPancakeClient.tutorial = true;
    	callClient(1);

    	/*
    	TutorialManager.tutorialNoodlesClient = new Client(1, 2,[2,0,1,0], [1,1,1,1,2]);
    	TutorialManager.tutorialNoodlesClient.tutorial = true;
    	callClient(2); */
    	/*
    	new Client(0, 0,[2,0,1,0], [1,-1,1,1,2]);
    	new Client(1, 1,[2,2,0], [1,-1,1,2,2,3]);
    	new Client(2, 0, [2,2,1,0], [1,1,1,0]);
    	new Client(3, 2, [2,3,1,3], [1,2,1,1,0]);
		new Client(4, 2, [2,2,1,1], [1,0,2,0]);
		new Client(5,1,[2,0,2,1,2],[1,0,2,0]) */
    	//console.log(Client.clientList)
    	//añadir clientes a mano
  	}
  	interfaceSettings(){
		this.add.sprite(config.width*0.5,config.height/13,'assets_atlas','spr_ui_slider')
        this.add.sprite(config.width*0.4,config.height/11,'assets_atlas','spr_ui_icon_coin')
        this.numCoins = this.add.text(config.width*0.5,config.height/13, GameManager.levelEarnedCoins, { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
		
		this.slider=this.add.sprite(3*config.width/4 ,config.height/13,'assets_atlas','spr_ui_slider')
        this.add.sprite(config.width*0.65,config.height/11,'assets_atlas','spr_ui_chefLvl')
        this.numPlayerLevel = this.add.text(config.width*0.65,config.height/11, 0, { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0.5);
        this.numChefPoints = this.add.text(this.slider.x+6,config.height/13, "", { font: "10px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5,0.5);
		GameManager.scene.uploadPlayerLevel(0)
		
		this.slider=this.add.sprite(config.width/4 ,config.height/13,'assets_atlas','spr_ui_slider')
		this.slider=this.add.sprite(config.width/4+5 ,config.height/13,'assets_atlas','spr_ui_volumen')
		this.add.sprite(config.width*0.145,config.height/11,'assets_atlas','spr_ui_icon_happy')
		
		this.options = this.add.sprite(config.width*0.05,config.height/11-1,'assets_atlas','spr_ui_settings')
	}

	coffeeSetting()
	{
		this.cameras.main.on('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(100);
        });
		var cam = this.cameras.main;	
		var goToNoodlesButton = this.add.image(config.width*0.95,config.height*0.08, 'spr_ui_arrow');
		goToNoodlesButton.setInteractive().on('pointerdown', function(pointer){
			cam.centerOnX(config.width + config.width/2);
    	    GameManager.scene.cameras.main.fadeOut(25);
		})

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

		var spr_radio = this.add.image(config.width*0.83,config.height*0.24,'assets_atlas','spr_radio');
		var coffeeSpawnerImg = this.add.image(config.width*0.95, config.height*0.915, 'assets_atlas', 'spr_glasses');

		var coffeeMachine = new CoffeeMachine(coffeeMachineImg, coffeeMachineLvl, true);
		GameManager.coffeeMachine = coffeeMachine;
		TutorialManager.glassesImg = coffeeSpawnerImg;
		
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
	
	
	/*
	noodlesSetting()
	{
		var noodleSpawnerImg = this.add.image(config.width*0.935 + config.width, config.height*0.8,'assets_atlas','spr_bowl'); 

		var strainerLvl = 0;
        var strainerImg;
		switch(strainerLvl)
		{
			case 0:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_0'); 
			break;
			case 1:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_1'); 
			break;
			case 2:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_2'); 
			break;
			case 3:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_3'); 
			break;
		}
        var strainer = new Strainer(strainerImg, strainerLvl);
        GameManager.strainer = strainer;
       	var trashCanImgNoodles = this.physics.add.sprite(config.width*0.9 + config.width, config.height*0.12,'assets_atlas','spr_trashCan');
       	
       	GameManager.trashCanImgNoodles = trashCanImgNoodles;
        noodleSpawnerImg.setInteractive();
        noodleSpawnerImg.on('pointerdown', function(pointer){
        	if(strainer.occupiedSlots < strainerLvl +1)
        	{	
        		var slotId = findFreeSlot(strainer, Strainer.slots);
        		var pos = Strainer.slots.getAt(slotId);
        		var cookingSound = GameManager.scene.sound.add('snd_noodles_cooking');
        		var trashSound = GameManager.scene.sound.add('snd_trash');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var noodles = new TutorialNoodles(slotId, trashSound, cookingSound, readySound);
      			changePosition(noodles, pos.x,pos.y);
        	} 
        })

        var numTablecloth = 1;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(config.width*0.075 + config.width + (i*42), config.height*0.65, 'spr_tablecloth'); tableclothImg.setScale(0.047);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothNoodle = new TableclothsNoodle(tableclothImgList, 0);
        GameManager.tableclothsNoodle = tableclothNoodle;
        var dishPileImg = this.add.image(config.width*0.95 + config.width, config.height*0.6,'spr_dishes');
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothNoodle, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.04);
        		var dishImgContainer = new TutorialDishContainer(dishImg, slotId);
        		GameManager.dishImgContainerNoodles.add(dishImgContainer);
        	} 
        })

        for(var i = 0; i<4; i++)
		{
			//var toppingSound = GameManager.scene.sound.add('snd_toppingSound');
			var topping = new Topping(i, false, null);
		}

		for(var i=0; i<4; i++)
		{
			var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
			var sauce = new TutorialSauce(i, fillingSound);
		}   
	}
	*/
	tutStuff()
	{
		
		var cm = this.plugins.get('rexglowfilterpipelineplugin').add(this,'GlowFilter');
		//var platicos = this.add.image(config.width*0.5,config.height*0.2,'assets_atlas','spr_radio').setPipeline('GlowFilter');
		this.tweens.add({
            targets: cm,
            intensity: 0.019,
            ease: 'Linear',
            duration: 500,
            repeat: -1,
            yoyo: true
        }); 
        
        //callClient(1);
		new TutorialManager(this);
		TutorialManager.customPipeline = cm;
		var numSteps = 29;
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
	
}

class TutorialManager
{
	static scene;
	static tipDataContainer = new Phaser.Structs.List();
	static tipLogicContainer = new Phaser.Structs.List();
	static currentTip = 0;

	// Images for the tutorial
	static toppingImg;
	static orderImg;
	static dishPileImg;
	static pancakeBottleImg;
	static glassesImg;
	static radioImg;
	static coffeeImg;
	static pancakeImg;
	static syrupImg;
	static clientImg;

	static coffee;
	static pancake;
	static noodle;
	static syrup;
	static sauce;
	static topping;

	static tutorialPancakeClient;
	static tutorialNoodlesClient;

	constructor(_scene)
	{
		TutorialManager.scene = _scene;
	}

	static showNext()
	{
		if(TutorialManager.currentTip >= TutorialManager.tipLogicContainer.length) return; //end tutorial

		TutorialManager.tipLogicContainer.getAt(TutorialManager.currentTip).display();
		TutorialManager.currentTip++;
	}
}

class TipData
{
	static types = {WATCH: 0, TOUCH: 1, DRAG: 2};
	static touchTypes = {GLASSES: 0, DISHES: 1, PANCAKEBOTTLE: 2,
	PANCAKE: 3, COIN: 4, RADIO: 5, RADIOSONG: 6, SWAPVIEWTRASH: 7,
	CLEAN: 8, SWAPTONOODLES: 9, BOWL: 10, NOODLEBOX: 11};
	static dragTypes = {PANCAKETODISH: 0, COFFEETOCLIENT: 1, CHOCSYRUP: 2, STRAWBERRYTOP: 3,
	 DISHTOCLIENT: 4, FAVSAUCE: 5, NOODLEDISHTOCLIENT: 6, FAVTOPPING: 7}; 
	constructor(_i)
	{
		this.numTexts = 1;
		this.currentText = 0;
		this.readCount = 0;
		this.text = new Phaser.Structs.List();
		this.type;
		this.touchType;
		this.dragType;
		this.srcImg;
		this.dstImg;

		// TEXT SETTING
		switch(_i)
		{
			case 0:
				this.numTexts = 3;
				this.text.add("¡Bienvenido a Miau Noodle Catfé! Aquí preparamos de todo! Bueno, sólo tortitas y noodles y y y catfé! Pero está todo buenísimo");
				this.text.add("Bueno, lo importante es: este catfé funciona con felicidad. Tu trabajo se basa en que la felicidad no haya decaído para cuando amiaunezca.");
				this.text.add("Para ello, debes conocer a tus comiaunsales. Cada uno tiene unos gustos particulares. Mira, ahí llega uno.");
				this.type = TipData.types.WATCH;
			break;

			case 1:
				this.text.add("La barra indica el tiempo de espera. Si se agota, el cliente se marchará triste.");
				this.type = TipData.types.WATCH;
			break;

			case 2:
				this.text.add("Toca la pila de vasos y el catfé se irá haciendo.");
				this.srcImg = TutorialManager.glassesImg;
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.GLASSES;
			break;

			case 3:
				this.text.add("Toca la pila de platos para colocar uno sobre el mantel.");
				this.srcImg = TutorialManager.dishPileImg;
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.DISHES;
			break;

			case 4:
				this.text.add("Toca la masa para vertirla sobre la plancha.");
				this.type = TipData.types.TOUCH;
				this.srcImg = TutorialManager.pancakeBottleImg;
				this.touchType = TipData.touchTypes.PANCAKEBOTTLE;
			break;

			case 5:
				this.text.add("Toca la plancha para dar la vuelta a la tortita.");
				this.type = TipData.types.TOUCH;
				this.srcImg = TutorialManager.pancakeImg;
				this.touchType = TipData.touchTypes.PANCAKE;
			break;

			case 6:
				this.text.add("Arrastra la tortita hasta el plato.");
				this.type = TipData.types.DRAG;
				this.srcImg = TutorialManager.pancakeImg;
				this.dragType = TipData.dragTypes.PANCAKETODISH;
			break;

			case 7:
				this.text.add("Mira, el catfé ya está hecho. Arrástralo al cliente.");
				this.type = TipData.types.DRAG;
				this.srcImg = TutorialManager.coffeeImg;
				this.dragType = TipData.dragTypes.COFFEETOCLIENT;
			break;

			case 8:
				this.text.add("El tiempo de espera del cliente aumenta al entregarle algo. Todo es miaus fácil con catfé en pata jeje");
				this.type = TipData.types.WATCH;
			break;

			case 9:
				this.text.add("A este cliente le gustan las fresas. Arrastra las fresas a las tortitas.");
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.STRAWBERRYTOP;
				this.srcImg = TutorialManager.toppingImg;
			break;

			case 10:
				this.text.add("También le gusta el chocolate. Arrastra el sirope a la tortita.");
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.CHOCSYRUP;
				this.srcImg = TutorialManager.syrupImg;
			break;

			case 11:
				this.text.add("Ya está hecha. Arrastra el plato al cliente.");
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.DISHTOCLIENT;
			break;

			case 12:
				this.numTexts = 2;
				this.text.add("La velocidad con la que has realizado el pedido y cuánto le ha gustado, determina cuántos puntos de chef ganas.");
				this.text.add("También influyen en la felicidad global del restaurante. No dejes que decaiga por debajo del límite indicado o tendremos que cerrar.");
				this.type = TipData.types.WATCH;
			break;

			case 13:
				this.text.add("Recoge las monedas dejadas por el cliente.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.COIN;
			break;

			case 14:
				this.text.add("Cambiemos la música, que esta canción ya la he escuchado.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.RADIO;
			break;

			case 15:
				this.text.add("Puedes cambiar el volumen y la canción. Cambia la canción.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.RADIOSONG;
			break;

			case 16:
				this.text.add("Parece ser que hay basura en el local. Toca el botón para ir a ver las mesas.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.SWAPVIEWTRASH;
			break;

			case 17:
				this.text.add("Los clientes podrán dar información sobre sus gustos... o sobre cosas no tan interesantes.");
				this.type = TipData.types.WATCH;
			break;

			case 18:
				this.text.add("Recoge la basura o la felicidad global irá bajando.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.CLEAN;
			break;

			case 19:
				this.text.add("Parece ser que un cliente ha llegado. Veamos si es para pedir noodles");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.SWAPTONOODLES;
			break;

			case 20:
				this.text.add("¡Pero si es el mismo cliente! Seguro que es atleta de élite, cuida bien de clientela de tal embergadura.");
				this.type = TipData.types.WATCH;
			break;

			case 21:
				this.text.add("Menos mal que antes hemos escuchado cómo le gustan los noodles.");
				this.type = TipData.types.WATCH;
			break;

			case 22:
				this.text.add("Toca la pila de boles para colocar uno sobre el mantel.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.BOWL;
			break;

			case 23:
				this.text.add("Toca la caja de noodles para comiaunzar a hacer un rico ramen.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.NOODLEBOX;
			break;

			case 24:
				this.text.add("Mientras se hacen los noodles,podemos adelantar trabajo. Arrastra su salsa favorita al bol");
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.FAVSAUCE;
			break;

			case 25:
				this.text.add("Mira, ya están hechos. Arrastralos al bol antes de que se quemen.");
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.NOODLEDISHTOCLIENT;
			break;

			case 26:
				this.text.add("Por último, arrastra su topping favorito al bol");
				this.type = TipData.types.DRAG;
				this.dragType = TipData.dragTypes.FAVTOPPING;
			break;

			case 27:
				this.text.add("Recoge las monedas dejadas por el cliente.");
				this.type = TipData.types.TOUCH;
				this.touchType = TipData.touchTypes.COIN;
			break;

			case 28:
				this.numTexts = 4;
				this.text.add("Y eso es todo. Ya sabes todo lo que debes para que la felicidad del local no decaiga.");
				this.text.add("Ya conoces los gustos de este cliente, pero recuerda que deberá descubrir el del resto de clientes.");
				this.text.add("Para ello, fíjate en sus reacciones, en su aporte a la felicidad global y en sus conversaciones.");
				this.text.add("Estoy seguro de que dejo el catfé en buenas patas. ¡MIAUCHA SUERTE!");
				this.type = TipData.types.WATCH;
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
		this.closeButton;
		this.dataContainer;
	}

	display()
	{
		TipLogic.currentInstance = this;
		this.textImg = TutorialManager.scene.add.image(config.width*0.1, config.height*0.1, 'spr_tutorial');
		
		var messageString;

		var tipDataContainer = TutorialManager.tipDataContainer.getAt(TutorialManager.currentTip);
		this.dataContainer=tipDataContainer;
		var textList = tipDataContainer.text;
		messageString = textList.getAt(tipDataContainer.readCount);
		tipDataContainer.readCount++;
		this.text = TutorialManager.scene.add.text(this.textImg.x-config.width*0.1, this.textImg.y, messageString);

		var selfRef = this;

		switch(tipDataContainer.type)
		{
			case TipData.types.WATCH:
				console.log("TYPE WATCH");
				this.textImg.setInteractive();
				this.textImg.on('pointerdown', function(pointer){
				var readCount = tipDataContainer.readCount;
					if(readCount < textList.length)
					{
						selfRef.text.destroy();
						messageString = textList.getAt(readCount);
						selfRef.text = TutorialManager.scene.add.text(this.x-config.width*0.1, this.y, messageString);
						tipDataContainer.readCount++;
					}
					else
					{
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
					break;

					case TipData.touchTypes.RADIO:
						//To do
						//Enable interactivity with radio
						//End if click on radio
					break;

					case TipData.touchTypes.RADIOSONG:
						//To do
						//Enable interactivity with radiobuttons
						//End if change on radio song
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
						//To do
						//Enable interactivity with noodlesViewButton
						//End if click on noodlesViewButton
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
						TutorialTopping.ref.makeToppingInteractive();
					break;

					case TipData.dragTypes.DISHTOCLIENT:
						TutorialManager.tutorialPancakeClient.clientImg.setPipeline('GlowFilter');
						TutorialSyrup.ref.dishContainer.dishContainer.iterate(function(child){
							child.setPipeline('GlowFilter');
						});
						makeDishInteractive(TutorialSyrup.ref.dishContainer,"pancakeDish");
					break;
				}
			break;

			default: console.log("no TipData.type");
		}
	}

	completeWatchTip()
	{
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
		TutorialTopping.ref.staticImg.resetPipeline();
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

	endCase13()
	{
		
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
