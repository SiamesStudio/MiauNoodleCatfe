class Contact extends Phaser.Scene {

    constructor(){
        super("Contacto");
    }
    init(gameData){
        this.playerSettings = gameData.playerInfo
        this.gameStrings = new ContactStrings()

        if(this.playerSettings.language){
            this.gameStrings.convertToSpanish()
        }else{
            this.gameStrings.convertToEnglish()
        }
    }

    create(){

        this.add.text(config.width/2, 2*config.height/10, 'Álvaro Roger Zapata : '+this.gameStrings.ContactDesigner, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.add.text(config.width/2, 3*config.height/10, 'Jose Luis Murcia Gamez : '+this.gameStrings.ContactProgrammer, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.add.text(config.width/2, 4*config.height/10, 'Lucía Ortuño Guisado : '+this.gameStrings.ContactProgrammerF, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.add.text(config.width/2, 5*config.height/10, 'Patricia Ruiz Bermejo : '+this.gameStrings.ContactArtist, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.add.text(config.width/2, 6*config.height/10, 'Mariam Baradi Del Álamo : '+this.gameStrings.ContactArtist, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        this.add.text(config.width/2, 7*config.height/10, 'Daniel Brenlla Gómez : '+this.gameStrings.ContactProgrammer, { font: "15px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        
        //BACK 
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'spr_back').setScale(0.08)
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Inicio", { playerInfo: this.playerSettings });})
    }

}