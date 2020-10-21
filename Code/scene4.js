class scene4 extends Phaser.Scene {
    constructor() {
		super("pruebas");
    }
    
    preload(){
        this.load.image('coffee_machine','assets/coffee_machine.png');
		this.load.image('coffee','assets/coffee.jpg');
		this.load.image('coffee_pile','assets/coffee_pile.jpg');
		this.load.image('client','assets/client.jpg');
    }

    create(){
        var scene = this; //esto es dios
		var coffeeMachineImg = this.add.image(400, 300, 'coffee_machine');
		var coffeeSpawnerImg = this.add.image(700, 500, 'coffee_pile');
		coffeeSpawnerImg.setScale(0.3);

		var coffeeMachine = new CoffeeMachine(1);

		for (var i = 0; i<Client.maxClients; i++) 
			{
				Client.clientSlots.add(new Slot(100+(i*200),100,false));
				var client = new Client(scene);
				var pos=Client.clientSlots.getAt(i);
				client.changePosition(pos.x,pos.y);
			}
		
		

        coffeeSpawnerImg.setInteractive();
        coffeeSpawnerImg.on('pointerdown', function(pointer){
			var num= coffeeMachine.freeSlot();
			if(num >= 0){
				var coffee = new Coffee(0,5, scene, null);
				coffee.slot=num;
				var pos = CoffeeMachine.slots.getAt(num);
                coffee.changePosition(pos.x, pos.y);
                CoffeeMachine.slots.getAt(num).occupied=true;
			}
        	
        })
        
    }

    update(time, delta){
        if(Coffee.coffeeList.length > 0) {
			for (var i = 0; i<Coffee.coffeeList.length; i++) 
			{
				var coffee = Coffee.coffeeList.getAt(i);
				if(coffee.countdown > 0)coffee.update(time, delta);
			}
		}
    }

    
    
}













class Slot
{
	constructor(x, y, occupied)
	{
		this.x = x;
		this.y = y;
		this.occupied = false;
	}	
}











class CoffeeMachine
{
	static slots = new Phaser.Structs.List();
	
	constructor(unlockedSlots, currentCoffees, slots)
	{
		this.maxCoffees = 4;
		this.unlockedSlots=unlockedSlots;
		this.currentCoffees = 0;
		for(var i=0; i<this.maxCoffees; i++)
		{
			CoffeeMachine.slots.add(new Slot(450+(i*50),325,false));
		}
	}

	/* Debido a un problema con el acceso a la instancia de la escena que hemos tenido previamente,
	se ha implementado la cuenta atrás para los cafés de otra manera. El no poder acceder a la instancia de la escena desde
	los eventos de onClick no nos permitía implementar los eventos de timers, así que hemos optado por almacenar una lista estática de
	todos los cafés que puede ser accedida desde todo el script, utilizando el update de la escena para actualizar el estado de la lista de cafés.
	Sin embargo, habiendo descubierto de donde venían los problemas de la implementación de los eventos de timers, ya se sabe cómo se haría con ellos.
	 */
	dragCoffee(coffee)
	{
		//var timer = this.time.addEvent({ delay: 2000, callback: makeCoffee, repeat: 3, callbackScope: this });
	}

	// La intención original era que el timer llamara a makeCoffee
	makeCoffee()
	{
		/*
		if(coffee.progress < 3)
		{
			coffee.progress ++;
			// Update sprite
		} */
    }
    freeSlot(){
		for (var i=0;i< this.unlockedSlots;i++){
			if(CoffeeMachine.slots.getAt(i).occupied==false){
				return i;
			}
		}
		return -1;
	}
}


















class Coffee
{
	static coffeeList = new Phaser.Structs.List();
	static coffeeTime = 5;
	constructor(progress, countdown, scene, coffeeImg)
	{
		this.index=1;
		this.scene = scene;
		this.coffeeImg = scene.physics.add.sprite(350,400,'coffee');
		//this.clientImg = clientImg;
		this.coffeeImg.setScale(0.3);
		this.countdown = Coffee.coffeeTime;
		this.progress = 0;
		this.slot=0
		Coffee.coffeeList.add(this);
	}

	update(time, delta)
	{
		delta = delta/1000;
		this.countdown -= delta;
		
		var cookingProgress = this.countdown/Coffee.coffeeTime;
		if(cookingProgress < 1 && cookingProgress > 0.66)
		{
			this.coffeeImg.angle += 1;
		}
		if(cookingProgress < 0.66 && cookingProgress > 0.33)
		{
			this.coffeeImg.angle += 3;
			this.progress = 1;
		}
		else if(cookingProgress < 0.33 && cookingProgress > 0)
		{
			this.coffeeImg.angle += 6;
			this.progress = 2;
		}
		else if(cookingProgress <= 0)
		{
			this.progress = 3;
			console.log("I'm ready");

			this.coffeeImg.setInteractive({ draggable: true })
        		.on('dragstart', function(pointer, dragX, dragY){
        	})

        	this.coffeeImg.on('drag', function(pointer, dragX, dragY){
        		//console.log('dragging');
        		this.setPosition(dragX, dragY);
        	})
			for (var i=0;i<Client.clientList.length;i++){
				var imgClient=Client.clientList.getAt(i).clientImg;
				this.scene.physics.add.overlap(this.coffeeImg, imgClient, this.deliverCoffee, this.sameOrder(Client.clientList.getAt(i)), this);
			}
        	
		}
	}

	changePosition(x, y)
	{
		this.coffeeImg.setPosition(x, y);
	}

	deliverCoffee(coffeeImg)
	{
			CoffeeMachine.slots.getAt(this.slot).occupied=false;
			coffeeImg.disableBody(true,true);
			Coffee.coffeeList.remove(this);
		
		
	}

	sameOrder(client){
		client.order.comparePlate(this);
	}
	
}












// Esta clase sería la pila de vasos que reaccionarían a un click para poner un café en la cafetera
class CoffeeSpawner
{
	constructor()
	{

	}
}










class Client{
	static clientList = new Phaser.Structs.List();
	static clientSlots = new Phaser.Structs.List();
	static maxClients= 3;
	constructor(scene){
		this.clientImg = scene.physics.add.sprite(100,100, 'client');
		this.clientImg.setScale(0.2);
		this.order=0;//this.generateOrder()
		this.happiness=90;
		Client.clientList.add(this);
	}
	changePosition(x, y)
	{
		this.clientImg.setPosition(x, y);
	}
	generateOrder(){
		//generar un pedido
	}

	

}







class Order{
	constructor(numPlates, scene){
		this.scene=scene;
		this.plates = new Phaser.Structs.List();
		this.recibedPlates=0;
		this.numPlates=numPlates;
	}

	addPlateToOrder(plate){
		this.plates.add(plate);
	}

	comparePlate(plate){
		for (var i=0; i< this.numPlates-this.recibedPlates;i++){
			if(plate.index==this.plates.getAt(i).index){
				return true;
			}
			//comparar toppins
		}
	}
}










class Plate{
	constructor(){
		this.index=0; //1 coffee, 2 pancakes, 3 noodles
		this.pancakeToppins;
		this.noodleToppins;
	}
}