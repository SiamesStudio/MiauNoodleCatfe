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

        var background = this.add.image(config.width/2,config.height/2,'bg_contact')//fondo

        this.add.text(1.1*config.width/3, 3.25*config.height/12, this.gameStrings.ContactDesignRole, { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.add.text(1.1*config.width/3, 4*config.height/12, 'Álvaro Roger Zapata', { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        
        this.add.text(1.1*config.width/3, 5*config.height/12, this.gameStrings.ContactProgrammingRole, { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.add.text(1.1*config.width/3, 5.75*config.height/12, 'Jose Luis Murcia Gamez', { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.add.text(1.1*config.width/3, 6.5*config.height/12, 'Lucía Ortuño Guisado', { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.add.text(1.1*config.width/3, 7.25*config.height/12, 'Daniel Brenlla Gómez', { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        this.add.text(1.1*config.width/3, 8.25*config.height/12, this.gameStrings.ContactArtRole, { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.add.text(1.1*config.width/3, 9*config.height/12, 'Patricia Ruiz Bermejo', { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        this.add.text(1.1*config.width/3, 9.75*config.height/12, 'Mariam Baradi Del Álamo', { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        this.add.text(3*config.width/4, 5.75*config.height/12, this.gameStrings.ContactGameBy, { font: "10px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        var logo = this.add.image(3*config.width/4, 8*config.height/12,'spr_logoTeam_Inicio').setScale(0.15).setOrigin(0.5);

        //BACK 
        this.backButton = this.add.image(config.width/12, 9*config.height/10,'spr_back1')
        this.backButton.setInteractive().on('pointerdown', () => {
                this.scene.start("Inicio", { playerInfo: this.playerSettings });})

    }



}