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
        this.volume = 1;
//
        this.currentSong = this.songs.getAt(this.globalIndex)
        this.currentSong.play()
        this.currentSong.setVolume(this.volume / 100)
        this.currentSong.setLoop(true)
//
        this.radioNextButton = this.add.sprite(2*config.width/3, 2*config.height/3, 'banner_light').setScale(0.5).setTint(0xb0b0b0)
        this.radioPreviousButton = this.add.sprite(config.width/3, 2*config.height/3, 'banner_light').setScale(0.5)
        
        //this.radioVolumeUpButton = this.add.sprite(2*config.width/3, config.height/3, 'banner_light').setScale(0.5).setTint(0xb0b0b0)
        //this.radioVolumeDownButton = this.add.sprite(config.width/3, config.height/3, 'banner_light').setScale(0.5)
//
        this.radioFrecuencyBox = this.add.rectangle(0.925*config.width/4, config.height/4, 3.7*config.width/7, 25, 0xa4b0af).setOrigin(0,0.5);
        this.radioFrecuencyBar = this.add.rectangle(0.925*config.width/4, config.height/4, 3, 21, 0xff6699).setOrigin(0,0.5);
//
        this.radioVolumeBox2 = this.add.rectangle(7*config.width/8, config.height/3, 25, config.width/7, 0xa4b0af).setOrigin(0.5,1);
        this.radioVolumeBar2 = this.add.rectangle(7*config.width/8, config.height/3 - 3, 21, 3, 0xff6699).setOrigin(0.5,1);
        this.radioVolumeBar2.y = (config.height/3 - 3) - (this.volume / 100) * (0.8*config.width/7)
        
        this.radioSongPanel = this.add.rectangle(0.925*config.width/4, config.height/2, 3.7*config.width/7, 25, 0xa4b0af).setOrigin(0,0.5);
        this.radioSongText = this.add.text(0.925*config.width/4, config.height/2, this.titleSongs.getAt(this.globalIndex), { font: "15px Arial", fill: "#000000", align: "center" }).setOrigin(0,0.5);
        this.radioSongTitleStartPosition = 0.925*config.width/4 - this.radioSongText.width
        
//
        this.radioSongText.x = this.radioSongTitleStartPosition
        console.log(this.titleSongs.getAt(this.globalIndex))
//
        this.radioNextButton.setInteractive().on('pointerdown', () => {
                this.currentSong.stop()
                this.globalIndex = (this.globalIndex + 1) % this.songs.length;
                this.currentSong = this.songs.getAt(this.globalIndex)
                this.currentSong.play()
                this.currentSong.setVolume(this.volume)
                this.currentSong.setLoop(true)
//
                this.radioSongText.x = this.radioSongTitleStartPosition
                this.radioSongText.setText(this.titleSongs.getAt(this.globalIndex))
        })
//
        this.radioPreviousButton.setInteractive().on('pointerdown', () => {
                this.currentSong.stop()
                this.globalIndex = this.globalIndex - 1 
                if(this.globalIndex<0) this.globalIndex = this.songs.length -1
                this.currentSong = this.songs.getAt(this.globalIndex)
                this.currentSong.play()
                this.currentSong.setVolume(this.volume)
                this.currentSong.setLoop(true)
//
                this.radioSongText.x = this.radioSongTitleStartPosition
                this.radioSongText.setText(this.titleSongs.getAt(this.globalIndex))
        })
        
        //this.radioVolumeUpButton.setInteractive().on('pointerdown', () => {
        //        if(this.volume <100){
        //                this.volume += 10
        //        }
        //        this.currentSong.setVolume(this.volume / 100)
        //        this.radioVolumeBar.destroy()
        //        this.radioVolumeBar = this.add.rectangle(config.width/8, config.height/3 - 3, 21, 0.9*config.width/7 * this.volume / 100, 0xff6699).setOrigin(0.5,1);
        //        //this.radioVolumeBar2.y = (config.height/3 - 3) - (this.volume / 100) * (0.8*config.width/7) ; //punto de inicio - volume*altura final
        //})
////
        //this.radioVolumeDownButton.setInteractive().on('pointerdown', () => {
        //        if(this.volume > 0){
        //                this.volume -= 10
        //        }
        //        this.currentSong.setVolume(this.volume / 100)
        //        this.radioVolumeBar.destroy()
        //        this.radioVolumeBar = this.add.rectangle(config.width/8, config.height/3 - 3, 21, 0.9*config.width/7 * this.volume / 100, 0xff6699).setOrigin(0.5,1);
        //        //this.radioVolumeBar2.y = (config.height/3 - 3) - (this.volume / 100) * (0.8*config.width/7) ; //punto de inicio - volume*altura final
        //})
//



//FRECUENCIA

        this.vectorA = new Phaser.Math.Vector2(1,0)
        this.vectorB = new Phaser.Math.Vector2(1,0)
        this.radioFrecSpinPositionX = 8*config.width/10
        this.radioFrecSpinPositionY = 8*config.height/10
        this.radioFrecSpin = this.add.sprite(this.radioFrecSpinPositionX, this.radioFrecSpinPositionY,'spr_radioSpin').setOrigin(0.5)
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



        //VOLUMEN
        this.radioVolumeSpinPositionX = 4*config.width/10
        this.radioVolumeSpinPositionY = 8*config.height/10
        this.radioVolumeSpin = this.add.sprite(this.radioVolumeSpinPositionX, this.radioVolumeSpinPositionY,'spr_radioSpin').setOrigin(0.5).setTint(0xe9e01c)
        this.radioVolumeSpin.setInteractive({ draggable: true })


        this.radioVolumeSpin.on('dragstart', function(pointer,dragX,dragY){
                console.log("vecToPointer : "+ dragX, dragY)
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
        this.backButton.setInteractive().on('pointerdown', () => {this.scene.start("Inicio", { playerInfo: this.playerSettings });})

    }

    update(){
        this.radioSongText.x +=0.5
        if(this.radioSongText.x > (0.925*config.width/4 + 3.7*config.width/7) ){//Posicion inicial + ancho del rectangulo
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
        console.log(this.frec)
        this.radioFrecuencyBar.x = 0.925*config.width/4 + (this.frec * (3.7*config.width/7 - 3))
    }

    changeRadioVolume(){
        this.angle = 0
        if(this.radioVolumeSpin.angle < 0){
                this.angle = (this.radioVolumeSpin.angle + 180) + 180
        }else{
            this.angle = this.radioVolumeSpin.angle
        }
        this.vol = (this.angle - 0) / (360 - 0)
        console.log(this.vol)
        this.radioVolumeBar2.y = config.height/3 - (this.vol * (config.width/7 - 3))
        this.volume = this.vol
        this.currentSong.setVolume(this.volume)
    }

}