var game;


var config = {
        type: Phaser.AUTO,
        width: 320,
        height: 180,
        backgroundColor: 0x000000,
        pixelArt: true, //Prevent pixel art from becoming blurred when scaled.
        //antialias: true,
        scene: [Loading,Inicio,scene1,scene2,Menu,Shop,Contact],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scale: { 
        mode: Phaser.Scale.FIT,// para qeu al rescalar la pantalla se siga manteninedo igual
        autoCenter: Phaser.Scale.CENTER_BOTH, // centrar
        width: 320,
        height: 180
        }
}

window.onload = function()
{
    window.focus();
    game = new Phaser.Game(config);
}