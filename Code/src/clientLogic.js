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
    this.slot=-1;
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
	  var numDishes=Math.floor(Math.random()*2+1);
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
	//console.log(Client.restaurantOccupiedSlots)
	//console.log(Client.streetOccupiedSlots)
    if(place==1){
    var pos=Client.restaurantSlots.getAt(slotId);
    this.slot=slotId;
    }
    else if(place==2){
      var pos=Client.streetSlots.getAt(slotId);
      this.slot=slotId;
    }
    this.generateOrder();
    this.clientImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'client'); this.clientImg.setScale(0.05);
  }

  compareOrderWithDish(dish){
    console.log(this.order.dishes)
    this.order.compareDish(dish);
    console.log(this.order.dishes)
    if(this.order.dishes.length==0){
      this.exitRestaurant();
    }
  }

  exitRestaurant(){
    Client.clientsInRestaurant.remove(this.index);
    this.clientImg.disableBody(true,true);
    if(this.place==1){
      this.place=0;
      Client.restaurantSlots.getAt(this.slot).occupied=false;
      Client.restaurantOccupiedSlots--;
    }
    if(this.place==2){
      place=0;
      Client.streetSlots.getAt(this.slot).occupied=false;
      Client.streetOccupiedSlots--;
    }
  }
}

class Order{
  constructor(numDishes,nums,client){
    this.dishes = new Phaser.Structs.List();
    this.numDishes=numDishes;
    this.addDishesToOrder(numDishes,nums,client);
    this.receivedDishes=0;
  }

  addDishesToOrder(numDishes,nums,client){
    for (var i=0;i<numDishes;i++){
      if(nums.getAt(i)==0){
        this.dishes.add(new Dish([0]));
      }
      else if(nums.getAt(i)==1){
        this.dishes.add(new Dish(client.favPancake));
      }
      else if(nums.getAt(i)==2){
        this.dishes.add(new Dish(client.favNoodles));
      }
      
    }

  }

  printOrder()
  {
    console.log("printingOrder with " + this.numDishes + " numDishes");
    for(var i=0; i<this.numDishes; i++)
    {
      console.log("this.dishes.getAt(" + i + "): "+ this.dishes.getAt(i));
    }
  }

  compareDish(received){
    var minusPoints=0;
    received.toppings.sort();
    for (var i=0; i< this.numDishes;i++){
      var dish = this.dishes.getAt(i);
      if(received.index==dish.index){
        if(received.index==0){ //coffee
          this.dishes.removeAt(i);
          return 0;
        }
        else if(received.index==1){ //pancake
          console.log("quiero pancake y recibo pancake")
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
            var j=0;
            var different=false;
            while(j<this.numToppings && different==false){
              if(received.toppings.getAt(i)!=dish.getAt(i)){
                different=true;
                minusPoints+=20;
              }
              j++;
            }
            
          }
          console.log("borro pancake")
          this.dishes.removeAt(i);
          return 0;
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
            while(i<this.numToppings && different==false){
              if(received.toppings.getAt(i)!=dish.getAt(i)){
                different=true;
                minusPoints+=20;
              }
              i++;
            }
            
          }
          this.dishes.removeAt(i);
          return 0;
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
    	this.numPancakes=listSettings[2];
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

/*
  addTopping(toppingType)
  {
    for(var i=0; i<this.toppings.length; i++)
    {
      var topping = this.toppings.getAt(i);
      if(topping < 0)
      {
        this.numToppings++;
        this.toppings.replace(topping, toppingType);
        return true;
      }
    }
    return false;
  }
*/
  addTopping(toppingType)
  {
    var originalSize = this.toppings.length;
    this.toppings.add(toppingType);

    if(originalSize != this.toppings.length){this.numToppings++; return true;}
    else return false;
  }
}