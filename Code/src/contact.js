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

        //this.add.text(config.width/3, 1.5*config.height/12, this.gameStrings.ContactDesignRole, { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.add.text(config.width/3, 2.5*config.height/12, 'Álvaro Roger Zapata', { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //
        //this.add.text(config.width/3, 4*config.height/12, this.gameStrings.ContactProgrammingRole, { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.add.text(config.width/3, 5*config.height/12, 'Jose Luis Murcia Gamez', { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.add.text(config.width/3, 6*config.height/12, 'Lucía Ortuño Guisado', { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.add.text(config.width/3, 7*config.height/12, 'Daniel Brenlla Gómez', { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);

        //this.add.text(config.width/3, 8.5*config.height/12, this.gameStrings.ContactArtRole, { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.add.text(config.width/3, 9.5*config.height/12, 'Patricia Ruiz Bermejo', { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //this.add.text(config.width/3, 10.5*config.height/12, 'Mariam Baradi Del Álamo', { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);

        //this.add.text(3*config.width/4, 4*config.height/12, this.gameStrings.ContactGameBy, { font: "12px Arial", fill: "#ffffff", align: "center" }).setOrigin(0.5);
        //var logo = this.add.image(3*config.width/4, 7*config.height/12,'spr_logoTeam_Inicio').setScale(0.15).setOrigin(0.5);



        //this.add.bitmapText(config.width/3, 1.5*config.height/12, 'BitPap',this.gameStrings.ContactDesignRole).setOrigin(0.5);
        //this.add.bitmapText(config.width/3, 2.5*config.height/12, 'BitPap','Álvaro Roger Zapata', 12).setOrigin(0.5);
        //
        //this.add.bitmapText(config.width/3, 4*config.height/12, 'BitPap',this.gameStrings.ContactProgrammingRole, 12).setOrigin(0.5);
        //this.add.bitmapText(config.width/3, 5*config.height/12, 'BitPap','Jose Luis Murcia Gamez', 12).setOrigin(0.5);
        //this.add.bitmapText(config.width/3, 6*config.height/12, 'BitPap','Lucía Ortuño Guisado', 12).setOrigin(0.5);
        //this.add.bitmapText(config.width/3, 7*config.height/12, 'BitPap','Daniel Brenlla Gómez', 12).setOrigin(0.5);
//
        //this.add.bitmapText(config.width/3, 8.5*config.height/12, 'BitPap',this.gameStrings.ContactArtRole, 12).setOrigin(0.5);
        //this.add.bitmapText(config.width/3, 9.5*config.height/12, 'BitPap','Patricia Ruiz Bermejo', 12).setOrigin(0.5);
        //this.add.bitmapText(config.width/3, 10.5*config.height/12, 'BitPap','Mariam Baradi Del Álamo', 12).setOrigin(0.5);
//
        //this.add.bitmapText(3*config.width/4, 4*config.height/12, this.gameStrings.ContactGameBy, 12).setOrigin(0.5);
        


        this.add.image(config.width/2,config.height/2,'spr_radio_zoomed').setOrigin(0.5)
        this.interferenceSound = this.sound.add('snd_radio_interference')
        this.interferenceSound.play()
        this.interferenceVolume = 0.9
        this.interferenceSound.setVolume(this.interferenceVolume)
        this.interferenceSound.setLoop(true)

        

        this.songs = new Phaser.Structs.List();
        this.songs.add(this.sound.add('snd_music_biscuit'));
        this.songs.add(this.sound.add('snd_music_bobaTea'));
        this.songs.add(this.sound.add('snd_music_bread'));
        /* 
        *
        Incluir el resto de canciones 
        *
        */
        this.titleSongs = new Phaser.Structs.List();
        this.titleSongs.add("Biscuit - LuKrembo");
        this.titleSongs.add("BobaTea - LuKrembo");
        this.titleSongs.add("Bread - LuKrembo");
        /* 
        *
        Incluir el resto de canciones 
        *
        */
        this.globalIndex = 0;
        this.volume = 0.9;
//
        this.currentSong = this.songs.getAt(this.globalIndex)
        this.currentSong.play()
        this.currentSong.setVolume(this.volume * (1-this.interferenceVolume))
        this.currentSong.setLoop(true)

        this.radioFrecuencyBox_positionX = 2.16*config.width/4
        this.radioFrecuencyBox_positionY = 4.03*config.height/6
        this.radioFrecuencyBox = this.add.sprite(this.radioFrecuencyBox_positionX, this.radioFrecuencyBox_positionY, 'spr_pantalla_volumen_cancion').setOrigin(0.5)
        this.radioFrecuencyBox_margin = this.add.sprite(this.radioFrecuencyBox_positionX, this.radioFrecuencyBox_positionY, 'spr_borde_pantalla').setOrigin(0.5)

        this.radioFrecuencyBar = this.add.sprite((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2), this.radioFrecuencyBox_positionY, 'spr_indicador_cancion').setOrigin(0,0.5);

        this.radioFrecuencyBar0 = this.add.sprite((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.49), this.radioFrecuencyBox_positionY, 'spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBar1 = this.add.sprite((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.82), this.radioFrecuencyBox_positionY, 'spr_palito_cancion_volumen').setOrigin(0.5);
        this.radioFrecuencyBar2 = this.add.sprite((this.radioFrecuencyBox_positionX - this.radioFrecuencyBox.width/2) + (this.radioFrecuencyBox.width * 0.16), this.radioFrecuencyBox_positionY, 'spr_palito_cancion_volumen').setOrigin(0.5);
        
        
//
        this.radioVolumeBox_positionX = 2.16*config.width/4
        this.radioVolumeBox_positionY = 4.55*config.height/6
        this.radioVolumeBox2 = this.add.sprite(this.radioVolumeBox_positionX, this.radioVolumeBox_positionY,'spr_pantalla_volumen_cancion').setOrigin(0.5);
        this.radioVolumeBar2 = this.add.rectangle((this.radioVolumeBox_positionX - this.radioVolumeBox2.width/2), this.radioVolumeBox_positionY + 1, (this.volume * this.radioVolumeBox2.width), 6, 0x9e616e).setOrigin(0,0.5);
        
        for(var i = 1; i<10; i++){
                this.add.sprite((this.radioVolumeBox_positionX - this.radioVolumeBox2.width/2) + (this.radioVolumeBox2.width * 0.1 * i ), this.radioVolumeBox_positionY, 'spr_palito_cancion_volumen').setOrigin(0.5);
        }

        

        this.radioSongText = this.add.text(1.55*config.width/4, 2.95*config.height/5, this.titleSongs.getAt(this.globalIndex), { font: "8px Arial", fill: "#000000", align: "center" }).setOrigin(0,0.5);
        this.radioSongTitleStartPosition = 1.55*config.width/4 - this.radioSongText.width
        this.radioSongPanelCrystal = this.add.sprite(1.55*config.width/4, 2.95*config.height/5,'spr_cristal_canciones').setOrigin(0,0.5)
        
//
        this.radioSongText.x = this.radioSongTitleStartPosition
        console.log(this.titleSongs.getAt(this.globalIndex))


//----------------------------------------------------------------------------------------------------
//FRECUENCIA

        this.vectorA = new Phaser.Math.Vector2(1,0)
        this.vectorB = new Phaser.Math.Vector2(1,0)
        this.radioFrecSpinPositionX = 3.58*config.width/10
        this.radioFrecSpinPositionY = 7.5*config.height/10
        this.radioFrecSpin = this.add.sprite(this.radioFrecSpinPositionX, this.radioFrecSpinPositionY,'spr_radio_zoomed_vol_song').setOrigin(0.5)
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
        this.radioVolumeSpinPositionX = 7.2*config.width/10 
        this.radioVolumeSpinPositionY = 7.5*config.height/10
        this.radioVolumeSpin = this.add.sprite(this.radioVolumeSpinPositionX, this.radioVolumeSpinPositionY,'spr_radio_zoomed_vol_song').setOrigin(0.5)
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
        this.backButton = this.add.sprite(config.width/12, 9*config.height/10,'spr_back').setScale(0.08)
        this.backButton.setInteractive().on('pointerdown', () => {
                this.currentSong.stop()
                this.interferenceSound.stop()
                this.scene.start("Inicio", { playerInfo: this.playerSettings });})

    }

    update(){
        this.radioSongText.x +=0.5
        if(this.radioSongText.x > (1.55*config.width/4 + this.radioSongPanelCrystal.width) ){//Posicion inicial + ancho del rectangulo
                this.radioSongText.x = this.radioSongTitleStartPosition //Se reinicia la posicion
        } 
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

        if(number < 0.33 && this.globalIndex != 0){
                this.globalIndex = 0
                //console.log("cambio a frec 0")
                this.playNewSong()
        }
        if(number > 0.33 && number < 0.66 && this.globalIndex != 1){
                this.globalIndex = 1
                //console.log("cambio a frec 1")
                this.playNewSong()
        }
        if(number > 0.66 && this.globalIndex !=2){
                this.globalIndex = 2
                //console.log("cambio a frec 2")
                this.playNewSong()
        }

        if( (number < 0.1) || (number > 0.25 && number < 0.45) || (number > 0.55 && number < 0.75) || (number > 0.87 && number < 1)){
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

}