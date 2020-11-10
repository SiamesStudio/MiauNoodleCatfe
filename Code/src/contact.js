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
        
        
        //----------------------------------------------------------------------------
        //----------------------------------------------------------------------------

        //var ladle0 = this.add.sprite(50,50,'anim_ladle_0');
//
        //this.anims.create({
        //    key: 'ladle_0',
        //    frames: this.anims.generateFrameNumbers('anim_ladle_0', { start: 0, end: 11 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //ladle0.anims.play('ladle_0',true)
        //
        //var ladle1 = this.add.sprite(100,50,'anim_ladle_1');
//
        //this.anims.create({
        //    key: 'ladle_1',
        //    frames: this.anims.generateFrameNumbers('anim_ladle_1', { start: 0, end: 11 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //ladle1.anims.play('ladle_1',true)
//
        //var ladle2 = this.add.sprite(150,50,'anim_ladle_2');
//
        //this.anims.create({
        //    key: 'ladle_2',
        //    frames: this.anims.generateFrameNumbers('anim_ladle_2', { start: 0, end: 11 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //ladle2.anims.play('ladle_2',true)
//
        //var ladle3 = this.add.sprite(200,50,'anim_ladle_3');
        //this.anims.create({
        //    key: 'ladle_3',
        //    frames: this.anims.generateFrameNumbers('anim_ladle_3', { start: 0, end: 11 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //ladle3.anims.play('ladle_3',true)
//
        //var olla = this.add.sprite(200,120,'anim_olla_burbujas');
        //this.anims.create({
        //    key: 'olla_burbujas',
        //    frames: this.anims.generateFrameNumbers('anim_olla_burbujas', { start: 0, end: 4 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //olla.anims.play('olla_burbujas',true)
//
        //this.atlasPrueba = this.add.image(200,120,'strainer_atlas','strainer_0');
        //this.atlasPrueba = this.add.image(200,120,'strainer_atlas','strainer_1');
        //this.atlasPrueba = this.add.image(200,120,'strainer_atlas','strainer_2');
        //this.atlasPrueba = this.add.image(200,120,'strainer_atlas','strainer_3');
//
        //var olla_burnt = this.add.sprite(200,120,'anim_olla_noodles_burnt');
        //this.anims.create({
        //    key: 'olla_burnt',
        //    frames: this.anims.generateFrameNumbers('anim_olla_noodles_burnt', { start: 0, end: 4 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //olla_burnt.anims.play('olla_burnt',true)
//
//
        //var olla2 = this.add.sprite(50,120,'anim_olla_burbujas');
        //
        //
//
        //this.atlasPrueba = this.add.image(50,120,'strainer_atlas','strainer_0');
        //this.atlasPrueba = this.add.image(50,120,'strainer_atlas','strainer_1');
        //this.atlasPrueba = this.add.image(50,120,'strainer_atlas','strainer_2');
        //this.atlasPrueba = this.add.image(50,120,'strainer_atlas','strainer_3');
//
        //olla2.anims.play('olla_burbujas',true)
        //var olla_cooking = this.add.sprite(50,120,'anim_olla_noodles_cooking');
        //this.anims.create({
        //    key: 'olla_cooking',
        //    frames: this.anims.generateFrameNumbers('anim_olla_noodles_cooking', { start: 0, end: 4 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
        //olla_cooking.anims.play('olla_cooking',true)
//
        //this.atlasPrueba = this.add.image(250,120,'ladle_atlas','JWRRSS_ladle_animation_0-5.png');
        //----------------------------------------------------------------------------
        //----------------------------------------------------------------------------

        //BACK 
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'spr_back').setScale(0.08)
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Inicio", { playerInfo: this.playerSettings });})
    }

}