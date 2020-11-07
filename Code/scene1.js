var joselu = true;

class scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	init(gameData)
	{
		this.playerSettings;
		if(joselu)
		{
			this.playerSettings = {
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
		else
		{
			this.playerSettings = gameData.playerInfo;
        	console.log(this.playerSettings);
		}

		
	}
	
	preload()
	{
		this.loadCoffeeScreen();
		this.loadNoodleScreen();
		this.loadAudio();
	}

	loadCoffeeScreen()
	{
		this.load.image('spr_trashCan','assets/spr_trashCan.jpg');
		this.load.image('spr_coffeeMachine_1','assets/spr_coffeeMachine_1.png');
		// this.load.image('spr_coffeeMachine_2','assets/spr_coffeeMachine_2.png');
		// this.load.image('spr_coffeeMachine_3','assets/spr_coffeeMachine_3.png');
		// this.load.image('spr_coffeeMachine_4','assets/spr_coffeeMachine_4.png');
		this.load.image('spr_glasses','assets/spr_glasses.jpg');
		this.load.image('spr_dishes','assets/spr_dishes.jpg');
		this.load.image('spr_glass_filled','assets/spr_glass_filled.png');
		this.load.image('spr_glass_empty','assets/spr_glass_empty.jpg');
		this.load.image('spr_dish','assets/spr_dish.jpg');
		this.load.image('spr_tablecloth','assets/spr_tablecloth.jpg');
		// Animación de la cafetera dispensando el café (individual por cada dispensador): nombrado dependiente de la implementación.
		this.load.image('spr_pancake_bottle','assets/spr_pancake_bottle.jpg');
		// Botes de siropes: spr_syrup_tipoDeSirope.
		this.load.image('spr_pancake_cooking','assets/spr_pancake_cooking.jpg');
		// Animación masa haciéndose por una cara: nombrado dependiente de la implementación.
		// Animación de masa haciéndose por la otra cara: nombrado dependiente de la implementación
		this.load.image('spr_griddle','assets/spr_griddle.jpg');
		this.load.image('spr_pancake_cooked','assets/spr_pancake_cooked.png');
		this.load.image('spr_pancake_burnt','assets/spr_pancake_burnt.png');
		// this.load.image('spr_topDown_pancake', 'assets/spr_topDown_pancake.png');
		// cada sirope visto desde arriba (pantalla de echar sirope) spr_topDown_syrup_tipoDeSirope.
		// Máscaras de sirope (tantas como personajes): spr_syrup_mask_idDeLaMascara
		this.load.image('spr_topping_lacasitos','assets/spr_topping_lacasitos.png');
		this.load.image('spr_topping_coconut','assets/spr_topping_coconut.png');
		this.load.image('spr_topping_strawberry','assets/spr_topping_strawberry.png');
		this.load.image('spr_topping_banana','assets/spr_topping_banana.png');
		this.load.image('spr_syrup_caramel','assets/spr_syrup_caramel.jpg');
		this.load.image('spr_syrup_chocolate','assets/spr_syrup_chocolate.jpg');
		this.load.image('spr_syrup_maple','assets/spr_syrup_maple.jpg');
		/* Todas las combinaciones de tortitas posibles teniendo en cuenta las máscaras (diferentes
			formas de sirope): spr_pancake_TipoDeSirope_idDeLaMascara_Topping1.. */
		// this.load.image('spr_Catfe_background','assets/spr_Catfe_background.png');
		// this.load.image('spr_radio','assets/spr_radio.png');
		// this.load.image('spr_radio_zoomed','spr_radio_zoomed.png');
		this.load.image('client','assets/client.jpg');
	}

	loadNoodleScreen()
	{
		this.load.image('spr_noodles','assets/spr_noodles.jpg');
		this.load.image('spr_noodles_cooking','assets/spr_noodles_cooking.png');
		this.load.image('spr_strainer','assets/spr_strainer.jpg');
		// Animación de hervir: nombrado dependiente de la implementación.
		this.load.image('spr_noodles_cooked','assets/spr_noodles_cooked.png');
		this.load.image('spr_noodles_burnt','assets/spr_noodles_burnt.png');
		// REPEATED?¿ this.load.image('spr_tableCloth','assets/spr_tableCloth.png');
		this.load.image('spr_bowl','assets/spr_bowl.jpg');
		this.load.image('spr_bowls','assets/spr_bowls.jpg');
		this.load.image('spr_sauce_bbq','assets/spr_sauce_bbq.jpg');
		this.load.image('spr_sauce_mustard','assets/spr_sauce_mustard.jpg');
		this.load.image('spr_sauce_algerienne','assets/spr_sauce_algerienne.jpg');
		this.load.image('spr_ladre','assets/spr_ladre.jpg');
		// Animación del cucharón echando cada salsa. (3 en total): nombrado dependiente de la implementación
		this.load.image('spr_topping_naruto','assets/spr_topping_naruto.png');
		this.load.image('spr_topping_mushroom','assets/spr_topping_mushroom.png');
		this.load.image('spr_topping_egg','assets/spr_topping_egg.png');
		this.load.image('spr_topping_celery','assets/spr_topping_celery.png');
		/* 
		Todas las combinaciones de noodles posibles ya cocinados: spr_noodles_Salsa_Topping1..
		Fondo animado de calle: animación de gente caminando por la calle: nombrado dependiente de la implementación.
		Fondo animado de calle: animación de la iluminación desde la mañana hasta la noche:
		nombrado dependiente de la implementación.
		Animación de parpadeo del cartel de open neón: nombrado dependiente de la implementación
		*/
	}

	loadAudio()
	{
		/* Estos no van en esta escena
		
		this.load.audio('snd_purchase', 'snd_purchase.wav');
		*/
		this.load.path = "../SFX/";
		this.load.audio('snd_burnt', 'snd_burnt.wav'); //Used
		this.load.audio('snd_coins_gain', 'snd_coins_gain.wav');
		this.load.audio('snd_dish', 'snd_dish.wav'); //Used
		this.load.audio('snd_filling_catfe', 'snd_filling_catfe.wav'); //Used
		this.load.audio('snd_gameOver', 'snd_gameOver.wav'); 
		this.load.audio('snd_levelUp', 'snd_levelUp.wav');
		/*
		this.load.audio('snd_music_alone', 'snd_music_alone.wav');
		this.load.audio('snd_music_biscuit', 'snd_music_biscuit.wav');
		this.load.audio('snd_music_bobaTea', 'snd_music_bobaTea.wav');
		this.load.audio('snd_music_bored', 'snd_music_bored.wav');
		this.load.audio('snd_music_branch', 'snd_music_branch.wav');
		this.load.audio('snd_music_bread', 'snd_music_bread.wav');
		this.load.audio('snd_music_breakUp', 'snd_music_breakUp.wav');
		this.load.audio('snd_music_cafe', 'snd_music_cafe.wav');
		this.load.audio('snd_music_cheese', 'snd_music_cheese.wav');
		this.load.audio('snd_music_chocolate', 'snd_music_chocolate.wav');
		this.load.audio('snd_music_cloud', 'snd_music_cloud.wav');
		this.load.audio('snd_music_everyDay', 'snd_music_everyDay.wav');
		this.load.audio('snd_music_kitchen', 'snd_music_kitchen.wav');
		this.load.audio('snd_music_pancake', 'snd_music_pancake.wav');
		this.load.audio('snd_music_rainyDay', 'snd_music_rainyDay.wav');
		this.load.audio('snd_music_kitchen', 'snd_music_kitchen.wav'); */
		this.load.audio('snd_noodles_cooking', 'snd_noodles_cooking.wav'); //Used
		this.load.audio('snd_pancake_cooking', 'snd_pancake_cooking.wav'); //Used
		this.load.audio('snd_ready', 'snd_ready.wav'); //Used
		this.load.audio('snd_tap', 'snd_tap.wav'); //Used
		this.load.audio('snd_trash', 'snd_trash.wav'); //Used
		this.load.audio('snd_ui_back', 'snd_ui_back.wav');
		this.load.audio('snd_ui_pop', 'snd_ui_pop.wav');
		this.load.audio('snd_victory', 'snd_victory.wav');
	}

	create(){
		this.clientsSettings();
		/* 
		Intento fallido de activar el audioContext sin interacción  :(

		var context = new AudioContext();
     	context.resume().then(() => {
        	console.log('Playback resumed successfully');
    	});
		game.sound.context.resume();
		*/
		
		var gm = new GameManager(this);
        this.coffeeSetting();
        this.pancakesSetting();
        this.noodlesSetting();

        this.cursors = this.input.keyboard.createCursorKeys();
	}

	clientsSettings(){
    	//index, salsa, nº toppings, toppings
    	//index, salsa, nº plantas,nºtoppings, toppings
    	new Client(0, 0,[2,0,1,0], [1,-1,1,1,2]);
    	new Client(1, 1,[2,2,0], [1,-1,1,2,2,3]);
    	new Client(2, 0, [2,2,1,0], [1,1,1,0]);
    	new Client(3, 2, [2,3,1,3], [1,2,1,1,0]);
    	new Client(4, 2, [2,2,1,1], [1,0,2,0]);
    	console.log(Client.clientList)
    	//añadir clientes a mano
  	}

	coffeeSetting()
	{
		this.cameras.main.on('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(100);
        });

		var coffeeMachineImg = this.add.image(config.width*0.05, config.height*0.92, 'spr_coffeeMachine_1'); coffeeMachineImg.setScale(0.05);
		var coffeeSpawnerImg = this.add.image(config.width*0.05, config.height*0.8, 'spr_glasses'); coffeeSpawnerImg.setScale(0.03);

		var coffeeMachineLvl = GameManager.scene.playerSettings.upgrades.coffeeMachineLevel;
		var coffeeMachine = new CoffeeMachine(coffeeMachineImg, coffeeMachineLvl);
		GameManager.coffeeMachine = coffeeMachine;
		coffeeSpawnerImg.setInteractive();
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
	}

	pancakesSetting()
	{
		var numTablecloth = this.playerSettings.upgrades.tableClothPancakeLevel + 1;

		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(config.width*0.075 + (i*42), config.height*0.65, 'spr_tablecloth'); tableclothImg.setScale(0.047);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothCoffee = new TableclothsCoffee(tableclothImgList, this.playerSettings.upgrades.tableClothPancakeLevel);
        var dishPileImg = this.add.image(config.width*0.95, config.height*0.6,'spr_dishes'); dishPileImg.setScale(0.03);

        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerPancake.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothCoffee, TableclothsCoffee.slots);
        		var pos = TableclothsCoffee.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.04);
        		GameManager.dishImgContainerPancake.add(new DishImgContainer(dishImg));
        	} 
        })

		var pancakeSpawnerImg = this.add.image(config.width*0.935, config.height*0.8, 'spr_pancake_bottle'); pancakeSpawnerImg.setScale(0.03);
        var griddleImg = this.add.image(config.width*0.65, config.height*0.6,'spr_griddle'); griddleImg.setScale(0.15);
        var griddle = new Griddle(griddleImg, this.playerSettings.upgrades.pancakePanLevel);
        GameManager.griddle = griddle;
       	var trashCanImg = this.physics.add.sprite(config.width*0.94, config.height*0.12,'spr_trashCan'); trashCanImg.setScale(0.043);
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
        		var pancake = new Pancake(slotId, trashSound, cookingSound, burntSound, readySound);
      			changePosition(pancake, pos.x,pos.y);
        	} 
        })
        
        for(var i=0; i<4; i++)
		{
			//var toppingSound = GameManager.scene.sound.add('snd_toppingSound');
			var topping = new Topping(i, true, null);
		}
		
		for(var i=0; i<3; i++)
		{
			//var syrupSound = GameManager.scene.sound.add('snd_syrup');
			var syrup = new Syrup(i,null);
		}
	}

	noodlesSetting()
	{
		var noodleSpawnerImg = this.add.image(config.width*0.935 + config.width, config.height*0.8, 'spr_noodles'); noodleSpawnerImg.setScale(0.02);
        var strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'spr_strainer'); strainerImg.setScale(0.2);
        var strainer = new Strainer(strainerImg, GameManager.scene.playerSettings.upgrades.noodleLevel);
        GameManager.strainer = strainer;
       	var trashCanImgNoodles = this.physics.add.sprite(config.width*0.94 + config.width, config.height*0.12,'spr_trashCan'); trashCanImgNoodles.setScale(0.043);
       	
       	GameManager.trashCanImgNoodles = trashCanImgNoodles;
        noodleSpawnerImg.setInteractive();
        noodleSpawnerImg.on('pointerdown', function(pointer){
        	if(strainer.occupiedSlots < GameManager.scene.playerSettings.upgrades.noodleLevel +1)
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

        var numTablecloth = this.playerSettings.upgrades.tableClothNoodleLevel + 1;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(config.width*0.075 + config.width + (i*42), config.height*0.65, 'spr_tablecloth'); tableclothImg.setScale(0.047);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothNoodle = new TableclothsNoodle(tableclothImgList, this.playerSettings.upgrades.tableClothNoodleLevel);
        var dishPileImg = this.add.image(config.width*0.95 + config.width, config.height*0.6,'spr_dishes'); dishPileImg.setScale(0.03);
        
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothNoodle, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.04);
        		GameManager.dishImgContainerNoodles.add(new DishImgContainer(dishImg));
        	} 
        })

        for(var i = 0; i<4; i++)
		{
			//var toppingSound = GameManager.scene.sound.add('snd_toppingSound');
			var topping = new Topping(i, false, null);
		}

		for(var i=0; i<3; i++)
		{
			var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
			var sauce = new Sauce(i, fillingSound);
		}   
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

    	var maxTime = 30;
    	var minTime = 15;
    	/*
    	if(Client.clientsInRestaurant.length==0){
      		callClient(-1);
    	}
    	else {
      		if(GameManager.waitingRestaurantClient==false && Client.restaurantOccupiedSlots < 3){
        		console.log("esperando a cliente en coffee")
        		GameManager.waitingRestaurantClient=true;
        		var restaurantTime= Math.floor(Math.random()*(maxTime-minTime)+minTime)*1000;
        		console.log("restaurantTime: " + restaurantTime);
        		setTimeout(function(){
          			callClient(1);
           		}, restaurantTime);
      		}
      
      		if(GameManager.waitingStreetClient==false && Client.streetOccupiedSlots < 3){
      		    console.log("esperando a cliente en calle")
      		    GameManager.waitingStreetClient=true;
      		    var streetTime= Math.floor(Math.random()*(maxTime-minTime)+minTime)*1000;
      		    console.log("streetTime: " + streetTime);
      		    setTimeout(function(){
      		    	callClient(2);
      		    }, streetTime);
      		}
    	}*/
    	

		if(!GameManager.grabbedItemImg) return;
		
		/* Here check if the current grabbed item is colliding with something 
		Depending on the class of the grabbed item, there should be a different behaviour */
		switch(GameManager.grabbedItemClass)
		{
			case "pancake":
				console.log("Pancake grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "noodles":
				console.log("Noodles grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "topping":
				console.log("Topping grabbed");
				checkToppingHoverWithDish();
			break;

			case "syrup":
				console.log("Syrup grabbed");
				checkSauceAndSyrupHover();
			break;

			case "pancakeDish":
				console.log("pancakeDish grabbed");
				checkHoverWithClient();
			break;

			case "noodleDish":
				console.log("noodleDish grabbed");
				checkHoverWithClient();
			break;

			case "coffeeDish":
				console.log("coffeeDish grabbed");
				checkHoverWithClient();
			break;

			case "sauce":
				console.log("Sauce grabbed");
				checkSauceAndSyrupHover();
			break;

			default:
				console.log("Item grabbed with no class");
			break;
		}
	}
	
}

class GameManager
{
	static scene;
	static coffeeMachine;
	static griddle;
	static strainer;
	static coffeeDishes = new Phaser.Structs.List();
	static dishImgContainerPancake = new Phaser.Structs.List();
	static dishImgContainerNoodles = new Phaser.Structs.List();
	static clients = new Phaser.Structs.List();

	static grabbedItemImg; //pancake
	static grabbedItem; //
	static grabbedItemClass;
	static trashCanImgPancake;
	static trashCanImgNoodles;

	static collidingObjectImg;
	static collidingObject;

	static tapSound;
	static waitingRestaurantClient = false;
	static waitingStreetClient = false;
	constructor(scene)
	{
		GameManager.scene = scene;
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

class Machine
{
	constructor(img, upgradeLVL)
	{
		this.img = img;
		this.occupiedSlots = 0;
		this.upgradeLVL = upgradeLVL;
	}	
}

class CoffeeMachine extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		for(var i=0; i<upgradeLVL+1; i++)
		{
			CoffeeMachine.slots.add(new Slot(img.x+(i*8),img.y));
		}
	}
}

class TableclothsCoffee extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		for(var i=0; i<upgradeLVL+1; i++)
		{

			var _img = this.img.getAt(i);	
			TableclothsCoffee.slots.add(new Slot(_img.x,_img.y));
		}
	}
}

class TableclothsNoodle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		for(var i=0; i<this.upgradeLVL+1; i++)
		{
			var _img = this.img.getAt(i);	
			TableclothsNoodle.slots.add(new Slot(_img.x,_img.y));
		}
	}
}

class Griddle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		var offset = 15;
		Griddle.slots.add(new Slot(img.x-offset,img.y-offset));
		Griddle.slots.add(new Slot(img.x+offset,img.y-offset));
		Griddle.slots.add(new Slot(img.x-offset,img.y+offset));
		Griddle.slots.add(new Slot(img.x+offset,img.y+offset));
	}
}

class Coffee
{
	static coffeeTime = 0.3; //8 
	constructor(assignedSlot, fillingSound, readySound)
	{
		this.index = 0;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_glass_empty');
		this.posx;
		this.posy;
		GameManager.coffeeContainer;
		this.imgContainer;
		this.img.setScale(0.015);
		this.assignedSlot = assignedSlot;
		this.hovering = false;
		this.done = false;
		this.doneTime = Math.abs(GameManager.scene.playerSettings.upgrades.cofeeTime - Coffee.coffeeTime);
		this.timer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.coffeeDone, callbackScope: this });
		this.clientCollider;
		this.dish;
		this.fillingSound = fillingSound;
		this.readySound = readySound;
		this.fillingSound.play();
	}

	coffeeDone()
	{
		this.readySound.play();
		this.fillingSound.stop();
		this.done = true;
		this.img.setTexture('spr_glass_filled'); 

		this.dish = new Dish([this.index]);
		GameManager.coffeeDishes.add(this);
		makeImgInteractive("coffeeDish", this.img, this)
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.clientCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.deliverCoffee, null, this);
		}
		else
		{
			this.img.setPosition(this.posx,this.posy);
		}
		grabItem("", null, null);
		
	}

	/* Here implement the dish comparison with the client */
	deliverCoffee(coffee, client)
	{
		//Lucia rellena esta parte?¿ o llamame
		var coffeeDish = this.dish; // aquí te dejo al plato del café para las comparaciones que tengas que hacer, objeto de la clase Dish
		var client = GameManager.collidingObject; //El cliente con el que ha colisionado, objeto de la clase Client

		//Esta no
		GameManager.scene.physics.world.removeCollider(this.clientCollider);
		coffee.disableBody(true,true);
		GameManager.coffeeDishes.remove(this);
		GameManager.coffeeMachine.occupiedSlots--;
		CoffeeMachine.slots.getAt(this.assignedSlot).occupied = false;
	}
}

class Pancake
{
	static time = 2;
	constructor(assignedSlot, trashSound, cookingSound, burntSound, readySound)
	{
		this.index = 1;
		this.side1Done = false;
		this.side2Done = false;
		this.flipped = false;
		this.burnt = false;
		this.hovering = false;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_pancake_cooking'); this.img.setScale(0.08);
		this.trashCollider;
		this.dishCollider;
		this.doneTime = Math.abs(GameManager.scene.playerSettings.upgrades.pancakeTime - Pancake.time);
		this.burnTime = Math.abs(GameManager.scene.playerSettings.upgrades.pancakeBurnTime - (Pancake.time*2));

		var pancake = this;

        this.img.setInteractive();
        this.img.on('pointerdown', function(pointer){
        	pancake.flipPancake();
        });

        this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.burnTime*1000, callback: this.burnPancake, callbackScope: this });
	
        this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.cookingSound.setLoop(true);
        this.burntSound = burntSound;
        this.readySound = readySound;
        this.cookingSound.play();
	}

	/* Called when the current side of the pancake is done */
	sideDone()
	{
		var pancake = this;
		if(!this.side1Done)
		{
			this.side1Done = true;
		} 
		else if(this.side1Done) // The pancake is finally done
		{
			this.readySound.play();
			this.side2Done = true;
			this.cookingSound.setMute(true);
			GameManager.scene.input.setDraggable(this.img);

			this.img.on('dragstart', function(pointer,dragX,dragY){
				GameManager.tapSound.play();
				pancake.sideTimer.paused = true;
        		pancake.burnTimer.paused = true;	
			})

        	this.img.on('drag', function(pointer, dragX, dragY){
        		this.setPosition(dragX, dragY);
        		pancake.cookingSound.stop();
        		grabItem("pancake", this, pancake);
        	})	
			
			this.img.on('dragend',() => {
				pancake.cookingSound.play();	
				pancake.dragEndBehaviour();		
       		})
       		
		}
		this.img.setTexture('spr_pancake_cooked');
	}

	/* Called when the user clicks on the pancake */
	flipPancake()
	{	
		if(!this.side1Done || this.flipped || this.burnt) return;
	
		this.flipped = true;
		this.img.setTexture('spr_pancake_cooking');
		// reset timers
		this.sideTimer.remove(false);
        this.burnTimer.remove(false);
		this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.burnTime*1000, callback: this.burnPancake, callbackScope: this });
	}

	/* Method called when the pancake has spent too much time in the griddle */
	burnPancake()
	{
		this.cookingSound.stop();
		this.cookingSound.setMute(true);
		this.burntSound.play();
		this.sideTimer.remove(false);
		this.burnTimer.remove(false);
		this.burnt = true;
		var pancake = this;
		this.img.setTexture('spr_pancake_burnt');

		/* Adding interactivity events again seems to cause problems */
		if(this.side2Done) return;

		GameManager.scene.input.setDraggable(this.img);

		this.img.on('dragstart', function(pointer,dragX,dragY){
			GameManager.tapSound.play();
		})

        this.img.on('drag', function(pointer, dragX, dragY){
        	this.setPosition(dragX, dragY);
        	grabItem("pancake", this, pancake);
        })	
		
		this.img.on('dragend',() => {
			pancake.dragEndBehaviour();	
       	})
	}

	/* Method called when the pancake img has been dropped by the user */
	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.trashCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.trashCanImgPancake, this.throwFood, null, this);
			this.hovering = false;
			if(!this.burnt)	this.dishCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
		}
		else
		{
			var pos = Griddle.slots.getAt(this.assignedSlot);
           	this.img.setPosition(pos.x, pos.y); 
           	if(!this.burnt)
           	{
           		this.sideTimer.paused = false;
				this.burnTimer.paused = false;
           	}
		}
		grabItem("", null, null);
	}

	dragToDish(food, dishImg)
	{
		GameManager.scene.physics.world.removeCollider(this.trashCollider);
		GameManager.scene.physics.world.removeCollider(this.dishCollider);
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		food.setPosition(0,0);
		food.removeInteractive();
		//food.disableBody(true,true);
		this.freeGriddle();
		// If the dish already is created the is no need to create another dish, just add the pancake and update the dish
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,1,0]);
			makeDishInteractive(container,"pancakeDish");	
		}
		else
		{
			dish.addPancake();
		}
		container.dishContainer.add(food);	
	}

	

	throwFood(food, trashCan)
	{
		this.trashSound.play();
		trashCan.setAlpha(1);
		food.disableBody(true,true);
		this.freeGriddle();		
	}

	freeGriddle()
	{
		this.sideTimer.remove(false);
        this.burnTimer.remove(false);
		GameManager.griddle.occupiedSlots--;
		Griddle.slots.getAt(this.assignedSlot).occupied = false;
	}
}

	// Type 0: Banana - Type 1: Oreo - Type 2: Strawberry - Type 3: Cookie
	// ●	0: Champiñones ●	1: Huevo ●	2: Naruto ●	3: Apio
class Topping
{
	constructor(index, pancake, toppingSound)
	{
		this.index = index;
		this.img;
		this.staticImg;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.toppingSound = toppingSound;
		var imgKey;
		var offset = pancake ? offset = config.width : offset = 0;
		switch(this.index)
		{
			case 0:
				if(pancake) { imgKey = 'spr_topping_strawberry'; }
				else { imgKey = 'spr_topping_mushroom' ;}
				this.img = GameManager.scene.physics.add.sprite(config.width*0.5 + offset,config.height*0.9,imgKey); this.img.setScale(0.04);
				this.staticImg = GameManager.scene.add.image(config.width*0.5 + offset,config.height*0.9,imgKey); this.staticImg.setScale(0.04);
			break;

			case 1:
				if(pancake) { imgKey = 'spr_topping_coconut'; }
				else { imgKey = 'spr_topping_egg' ; }
				this.img = GameManager.scene.physics.add.sprite(config.width*0.4 + offset,config.height*0.9,imgKey); this.img.setScale(0.1);
				this.staticImg = GameManager.scene.add.image(config.width*0.4 + offset,config.height*0.9,imgKey); this.staticImg.setScale(0.1);
			break;

			case 2:
				if(pancake) { imgKey = 'spr_topping_banana'; }
				else { imgKey = 'spr_topping_naruto' ; }
				this.img = GameManager.scene.physics.add.sprite(config.width*0.3 + offset,config.height*0.9,imgKey); this.img.setScale(0.03);
				this.staticImg = GameManager.scene.add.image(config.width*0.3 + offset,config.height*0.9,imgKey); this.staticImg.setScale(0.03);
			break;

			case 3:
				if(pancake) { imgKey = 'spr_topping_lacasitos'; }
				else { imgKey = 'spr_topping_celery' ; }
				this.img = GameManager.scene.physics.add.sprite(config.width*0.2 + offset,config.height*0.9,imgKey); this.img.setScale(0.015);
				this.staticImg = GameManager.scene.add.image(config.width*0.2 + offset,config.height*0.9,imgKey); this.staticImg.setScale(0.015);
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("topping", this.img, this, null);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.collider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
			this.hovering = false;
		}
		else
		{
			this.img.setPosition(this.posx, this.posy);
		}
		grabItem("", null, null);	
	}

	dragToDish(toppingImg, dishImg)
	{
		this.toppingSound.play();
		this.collider.destroy();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		toppingImg.setPosition(this.posx,this.posy);

		var dish = container.dish;

		if(dish.addTopping(this.index))
		{
			var clonedImg = GameManager.scene.add.sprite(0, 0, toppingImg.texture);
			clonedImg.setScale(0.009);
			container.dishContainer.add(clonedImg);
		}	
	}
}

class Syrup
{
	constructor(index, offset, syrupSound)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;
		this.syrupSound = syrupSound;
		this.dishContainer;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.7 + offset,config.height * 0.9,'spr_syrup_maple'); this.img.setScale(0.05);
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.75 + offset,config.height * 0.9,'spr_syrup_chocolate'); this.img.setScale(0.05);
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.8 + offset,config.height * 0.9,'spr_syrup_caramel'); this.img.setScale(0.08);
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("syrup", this.img, this, null);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.collider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.serveSauce, null, this);
		}
		else
		{
           	this.img.setPosition(this.posx, this.posy); 
		}
		grabItem("", null, null); 
	}

	serveSauce(sauceImg, dishImg)
	{
		this.syrupSound.play();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.sauceServed, callbackScope: this });
		this.img.removeInteractive();
		console.log("serving syrup");

		console.log("syrup: " + container.dish.sauce);
		container.dish.sauce = this.index;
		console.log("this.index: " + this.index);
		console.log("syrup: " + container.dish.sauce);
		this.dishContainer = container;
		container.img.removeInteractive();
		//container.dishContainer.add(food); add sauce sprite to noodle
	}

	sauceServed()
	{
		this.syrupSound.stop();
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("syrup", this.img, this, null);
		makeDishInteractive(this.dishContainer,"pancakeDish");
		console.log("syrup served");
	}
}

class Sauce
{
	static servingTime = 3; //4
	constructor(index, fillingSound)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;
		this.fillingSound = fillingSound;
		this.dishContainer;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.65,config.height*0.9,'spr_sauce_algerienne'); this.img.setScale(0.07);
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.72,config.height*0.9,'spr_sauce_mustard'); this.img.setScale(0.06);
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.8, config.height*0.9,'spr_sauce_bbq'); this.img.setScale(0.05);
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("sauce", this.img, this, null);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.collider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.serveSauce, null, this);
		}
		else
		{
           	this.img.setPosition(this.posx, this.posy); 
		}
		grabItem("", null, null); 
	}

	serveSauce(sauceImg, dishImg)
	{
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.sauceServed, callbackScope: this });
		this.img.removeInteractive();
		console.log("serving sauce");

		container.dish.sauce = this.index;
		this.dishContainer = container;
		container.img.removeInteractive();
		this.fillingSound.play();
		//container.dishContainer.add(food); add sauce sprite to noodle
	}

	sauceServed()
	{
		this.fillingSound.stop();
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("sauce", this.img, this, null);
		makeDishInteractive(this.dishContainer,"noodleDish");
		console.log("sauce served");
	}
}

class Strainer extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		var offset = 15;
		Strainer.slots.add(new Slot(img.x-offset,img.y-offset));
		Strainer.slots.add(new Slot(img.x+offset,img.y-offset));
		Strainer.slots.add(new Slot(img.x-offset,img.y+offset));
		Strainer.slots.add(new Slot(img.x+offset,img.y+offset));
	}
}

class Noodles
{
	static doneTime = 0.5; //10
	static burnTime = 3; //17
	constructor(assignedSlot, trashSound, cookingSound, burntSound, readySound)
	{
		this.index = 2;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_noodles_cooking'); this.img.setScale(0.055);
		this.burnt = false;
		this.trashCollider;
		this.dishCollider;

		this.noodleTime = Math.abs(GameManager.scene.playerSettings.upgrades.noodleTime - Noodles.doneTime);
		this.noodleBurnTime = Math.abs(GameManager.scene.playerSettings.upgrades.noodleBurnTime - Noodles.burnTime);

		this.doneTimer = GameManager.scene.time.addEvent({ delay: this.noodleTime*1000, callback: this.noodlesDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.noodleBurnTime*1000, callback: this.noodlesBurnt, callbackScope: this });
	
		this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.burntSound = burntSound;
        this.readySound = readySound;
        this.cookingSound.play();
	}

	noodlesDone()
	{
		this.readySound.play();
		this.cookingSound.setMute(true);
		var noodles = this;
		makeImgInteractive("noodles",this.img, this, this.cookingSound);

		this.img.on('dragstart', function(pointer,dragX,dragY){
			noodles.doneTimer.paused = true;
        	noodles.burnTimer.paused = true;	
		})    

		this.img.setTexture('spr_noodles_cooked');
	}

	noodlesBurnt()
	{
		this.cookingSound.stop();
		this.cookingSound.setMute(true);
		this.burntSound.play();
		this.img.setTexture('spr_noodles_burnt');
		this.img.setScale(0.05);
		this.burnt = true;
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.trashCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.trashCanImgNoodles, this.throwFood, null, this);
			this.hovering = false;
			if(!this.burnt) this.dishCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
		}
		else
		{
			var pos = Strainer.slots.getAt(this.assignedSlot);
           	this.img.setPosition(pos.x, pos.y); 
           	if(!this.burnt)
           	{
           		this.doneTimer.paused = false;
				this.burnTimer.paused = false;
           	}
		}
		grabItem("", null, null); 
	}

	throwFood(food, trashCan)
	{
		this.trashSound.play();
		console.log("noodle to trash");
		trashCan.setAlpha(1);
		food.disableBody(true,true);
		this.freeStrainer();		
	}

	freeStrainer()
	{
		this.doneTimer.remove(false);
        this.burnTimer.remove(false);
		GameManager.strainer.occupiedSlots--;
		Strainer.slots.getAt(this.assignedSlot).occupied = false;
	}

	dragToDish(food, dishImg)
	{
		GameManager.scene.physics.world.removeCollider(this.trashCollider);
		GameManager.scene.physics.world.removeCollider(this.dishCollider);

		console.log("NOODLE DRAGGED");
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		food.setPosition(dishImg.x,dishImg.y);
		food.removeInteractive();
		food.setScale(0.05);
		//food.disableBody(true,true);
		this.freeStrainer();
		/* Update dish and create sprite according to the dish */
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,0]);
			container.dishContainer.add(food);
			makeDishInteractive(container,"noodleDish");
		}	
	}
}

/* This class is needed so that there is a relation between the dishImg and the object from the class Dish represented in the dishImg. Otherwise we could not know 
what order is in the dish we are colliding with. */
class DishImgContainer
{
	constructor(dishImg, coffee)
	{
		this.posx;
		this.posy;
		this.hovering = false;
		this.img = dishImg; //Img of the dish
		this.dish; //Object from the class Dish
		if(coffee) this.dishContainer = GameManager.scene.add.container(0, 0); // Container of all the images that belong to the dish
		else{ this.dishContainer = GameManager.scene.add.container(dishImg.x, dishImg.y); }
		this.img.setPosition(0,0); //If this is not done, then the image would not appear in the scene
		this.dishContainer.add(this.img);
		this.clientCollider;
	}

	dragEndBehaviour()
	{
		if(this.hovering == true)
		{
			this.hovering = false;
			this.clientCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToClient, null, this);
		}
		else
		{
			this.dishContainer.setPosition(this.posx,this.posy);
		}
		grabItem("", null, null);
	}

	//IMPLEMENT ALL THE LOGIC, this works for the pancakes and the noodles
	dragToClient()
	{
		//Lucia rellena esta parte?¿ Solo faltaría hacer la lógica de compareDish
		var dish = this.dish; // aquí te dejo al objeto de la clase Dish
		var client = GameManager.collidingObject; //El cliente con el que ha colisionado, objeto de la clase Client

		//Esta no
		GameManager.scene.physics.world.removeCollider(this.clientCollider);
		coffee.disableBody(true,true);
		GameManager.coffeeDishes.remove(this);
		GameManager.coffeeMachine.occupiedSlots--;
		CoffeeMachine.slots.getAt(this.assignedSlot).occupied = false;
	}
}

class Client{
  static clientList = new Phaser.Structs.List();
  static clientsInRestaurant= new Phaser.Structs.List();
  static streetSlots = new Phaser.Structs.List();
  static streetOccupiedSlots=0;
  static restaurantSlots=new Phaser.Structs.List();
  static restaurantOccupiedSlots=0;
  static maxClients= 3;
  static maxSlots=3;
  constructor(index,favDish,noodles, pancake){
    if(index==0){
      for(var i=0; i<Client.maxSlots; i++)
      {
        Client.streetSlots.add(new Slot(config.width+config.width*0.2+(60*i),config.height*0.2));
      }
      for(var i=0; i<Client.maxSlots; i++)
      {
        Client.restaurantSlots.add(new Slot(config.width*0.2+(60*i),config.height*0.2));
      }
    }
    this.index=index;
    this.place=0;
    //this.clientImg = GameManager.scene.physics.add.sprite(100,100, 'client');
    this.clientImg;
    this.favDish=favDish;//index of the fav dish
    this.favNoodles=noodles;
    this.favPancake=pancake;
    this.order=0;
    this.happiness=90;
    Client.clientList.add(this);
  }

  findFreeSlot(id)
  {
    var i=0;
    var slot;
    var slotId = -1;
    var found = false;
    var maxSlots=3;
    if(id==1){//restaurant
      console.log(Client.restaurantSlots)
      while(i<maxSlots && !found)
      {
        slot = Client.restaurantSlots.getAt(i);
        if(!slot.occupied)
        {  
          Client.restaurantOccupiedSlots++;
          slot.occupied = true;
          slotId = i;
          found = true;
        }
        i++;
      } 
      return slotId;
    }
    if(id==2){//street
      console.log(Client.streetSlots)
      while(i<maxSlots && !found)
      {
        slot = Client.streetSlots.getAt(i);
        if(!slot.occupied)
        {  
          Client.streetOccupiedSlots++;
          slot.occupied = true;
          slotId = i;
          found = true;
        }
        i++;
      } 
      return slotId;
    }
    
  }


  changePosition(x, y)
  {
    this.clientImg.setPosition(x, y);
  }

  generateOrder(){
    //elegir si pide una dos o tres cosas y cuales pide
    //diferenciar entre gatos de fuera o dentro
    //CAMBIAR
    if(this.place==1){
      var numDishes=Math.floor(Math.random()*3+1);
      var nums=new Phaser.Structs.List();
      while(nums.length<numDishes){
        var num=Math.floor(Math.random()*2);
        nums.add(num);
      }
      this.order = new Order(numDishes, nums, this);
    }
    else if(this.place==2){
      var nums= new Phaser.Structs.List();
      nums.add(2);
      this.order = new Order(1,nums,this);
    }

  }

  goToRestaurant(place){
    this.place=place;
    var slotId=this.findFreeSlot(place);
    if(place==1){
      var pos=Client.restaurantSlots.getAt(slotId);
    }
    else if(place==2){
      var pos=Client.streetSlots.getAt(slotId);
    }
    this.generateOrder();
    this.clientImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'client'); this.clientImg.setScale(0.05);
  }
}

class Order{
  constructor(numDishes,nums,client){
    this.dishes = new Phaser.Structs.List();
    this.addDishesToOrder(numDishes,nums,client);
    this.receivedDishes=0;
    this.numDishes=numDishes;
  }

  addDishesToOrder(numDishes,nums,client){
    for (var i=0;i<numDishes;i++){
      if(nums[i]==0){
        this.dishes.add(new Dish([0]));
      }
      else if(nums[i]==1){
        this.dishes.add(new Dish(client.favPancake));
      }
      else if(nums[i]==2){
        this.dishes.add(new Dish(client.favNoodles));
      }
      
    }
  }

  compareDish(received){
    var minusPoints=0;
    received.toppings.sort();
    for (var i=0; i< this.numDishes;i++){
      var dish = this.dishes.getAt(i);
      if(received.index==dish.index){
        if(received.index==0){ //coffee
          this.receivedDishes++;
          this.dishes.removeAt(i);
          return 0;
        }
        else if(received.index==1){ //pancake
          if (received.sauce!=dish.sauce){
            minusPoints+=20;
          }
          if (received.numPancakes!=dish.numPancakes){
            minusPoints+=20;
          }
          if(!received.numToppings==dish.numToppings){
            minusPoints+=20;
          }
          else{
            var i=0;
            var different=false;
            while(i<numToppings && different==false){
              if(received.toppings.getAt(i)!=dish.getAt(i)){
                different=true;
                minusPoints+=20;
              }
              i++;
            }
            
          }
        }  
        else if(received.index==2){
          if (received.sauce!=dish.sauce){
            minusPoints+=20;
          }
          if(!received.numToppings==dish.numToppings){
            minusPoints+=20;
          }
          else{
            var i=0;
            var different=false;
            while(i<numToppings && different==false){
              if(received.toppings.getAt(i)!=dish.getAt(i)){
                different=true;
                minusPoints+=20;
              }
              i++;
            }
            
          }
        }
      }
      //comparar toppings
    }
  }
}

class Dish{
  constructor(listSettings){
    this.index=listSettings[0]; //0 coffee, 1 pancakes, 2 noodles
    this.toppings = new Phaser.Structs.List();
    this.sauce = -1;
    this.numToppings = 0;
  	this.numPancakes=-1;
  	if (this.index==1){
    	this.sauce=listSettings[1];
    	this.numPancakes==listSettings[2];
    	for (var i=0; i<listSettings[3]; i++)
    	{ 
          this.toppings.add(listSettings[4]+i);
    	}
  	}

    if(this.index==2){   
      this.sauce=listSettings[1];
      for (var i=0; i<listSettings[2]; i++)
      { 
      	this.toppings.add(listSettings[3]+i);
      }
    
    }
  }

  addTopping(toppingType)
  {
    for(var i=0; i<this.toppings.length; i++)
    {
      var topping = this.toppings.getAt(i);
      if(topping < 0)
      {
        this.toppings.replace(topping, toppingType);
        return true;
      }
    }
    return false;
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
	GameManager.grabbedItem = item;
	GameManager.grabbedItemImg = img;
	GameManager.grabbedItemClass = type;
}

function checkHoverWithTrashCan()
{
	var trashCanImg;
	if(GameManager.grabbedItemClass == "pancake") trashCanImg = GameManager.trashCanImgPancake;
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
	for(var i=0; i<container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(GameManager.grabbedItemClass == "pancake")
			{
				// Can't add a pancake to the dish if there are already 3, or a topping or syrup has been added
				if(dish.numPancakes >= 3 || !toppingsEmpty(dish) || dish.sauce != -1) continue;
			}
			else
			{ // If the dish has already been created, that means that there is noodles
				continue;
			}		
		}
		collision = overlappingLogic(dishContainer, collision);
	}
}

function checkToppingHoverWithDish()
{
	var container;
	/*
	if(GameManager.coffeeScreen == true)  container = GameManager.dishImgContainerPancake;
	else{ container = GameManager.dishImgContainerNoodles;}
	*/
	if(GameManager.grabbedItemImg.x >= 800){ container = GameManager.dishImgContainerNoodles;} // Esto es un apaño
	else{ container = GameManager.dishImgContainerPancake;}

	var collision = false;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(containsTopping(GameManager.grabbedItem, dish) || dish.sauce != -1) continue;
			collision = overlappingLogic(dishContainer, collision);
		}
	}
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
	for(var i=0; i<dish.toppings.length; i++)
	{
		if(dish.toppings.getAt(i) >= 0) return false;
	}
	return true;
}


function checkHoverWithClient()
{
	var clients = getClientsInRestaurant();
	var collision = false;
	for(var i=0; i<clients.length; i++)
	{
		var client = clients.getAt(i);
		var clientImg = client.clientImg;
		if(!clientImg) continue;

		var clientHasMyItem = false;
		//Check si el cliente tiene un pedido que coincide con lo que estoy agarrando.
		// Añadir check extra de si ya ha recibido un pedido, ese pedido no se debería comparar
		// Lucia necesito saber cómo comprobar que ya ha sido entregado un pedido a un cliente -> Ahora mismo podría entregar 2 veces un café por ejemplo
		for(var i=0; i<client.order.numDishes; i++)
		{
			if(client.order.dishes.getAt(i) == GameManager.grabbedItem.index) clientHasMyItem = true;
		}

		if(!clientHasMyItem) continue;

		if(checkOverlap(GameManager.grabbedItemImg, clientImg) && ! collision)
		{
			GameManager.collidingObjectImg = clientImg;
			GameManager.collidingObject = clients.getAt(i);
			GameManager.grabbedItem.hovering = true;
			clientImg.setAlpha(0.5);
			collision = true;
		}
		else
		{
			clientImg.setAlpha(1);
			collision = false;
		}
	}
}
// This is the way to get the items from the class Client that are inside the restaurant
function getClientsInRestaurant()
{
	var clients = new Phaser.Structs.List();;
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
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(dish.sauce != -1) continue;
			collision = overlappingLogic(dishContainer, collision);
		}
	}
}

// function created to avoid the code repetition
function overlappingLogic(container, collision)
{
	var dishImg = container.img;
	if(checkOverlap(GameManager.grabbedItemImg, dishImg) && !collision)
	{
		GameManager.collidingObjectImg = dishImg;
		GameManager.collidingObject = container;
		GameManager.grabbedItem.hovering = true;
		//apply the alpha to all the items in the container
		//dishImg.setAlpha(0.5);
		container.dishContainer.iterate(function(child){
			child.setAlpha(0.5);
		});
		return true;
	}
	else
	{
		//dishImg.setAlpha(1);
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
	dishImg = container.img;
	dish = container.dish;
	dishContainer = container.dishContainer;

	dishImg.setInteractive({ draggable: true });

	dishImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		container.posx = dishContainer.x;
		container.posy = dishContainer.y;
	})

    dishImg.on('drag', function(pointer, dragX, dragY){
     	dishContainer.setPosition(dragX+container.posx , dragY+container.posy);
     	grabItem(dishClass, this, dish);
    })	
		
	dishImg.on('dragend',() => {
		grabItem("", null, null);
		container.dragEndBehaviour();
    })
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

function callClient(place){  	
	if(place==-1){
    	var place= Math.floor(Math.random()*2+1);
  	}
  	var clientId= Math.floor(Math.random()*Client.clientList.length);
  	var bool=Client.clientsInRestaurant.add(clientId);

  	while(bool==false){
  		console.log("bool: " + bool); //Lucia cuidado porque el add a la lista de phaser no devuelve booleano como pensabamos, igual puedes mirar la longitud de la lista para ver si se ha añadido
    	var clientId= Math.floor(Math.random()*Client.clientList.length);
    	var bool=Client.clientsInRestaurant.add(clientId);
  	}
  	Client.clientList.getAt(clientId).goToRestaurant(place);
  	if(place==1){
    	GameManager.waitingRestaurantClient=false;
  	}
  	if(place==2){
    	GameManager.waitingStreetClient=false;
  	} 
}