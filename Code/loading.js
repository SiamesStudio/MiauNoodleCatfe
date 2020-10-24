class Loading extends Phaser.Scene {
    constructor(){
        super("Carga")
    }

    preload(){
        this.load.image('loading','assets/UI/loading.jpg');
    }

    create(){
        this.scene.start("Inicio",{ language: false}) //laguage = false -> english. true-> spanish
    }

}