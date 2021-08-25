// Objeto
GamePlayManager = {
    // phaser llama a init una vez que declaremos el estado start
    init: function() {
        
    },
    // se cargan todos los recursos que necesitamos para el proyecto, una vez cargados se llama al método create
    preload: function () {
        
    },

    create: function () {

    },
    // Phaser llama frame a frame al método update
    update: function () {
        
    }
}


// Variable que guarda la instancia de phase.
// Game(width, height, render)
// RENDERS:
//  - Phase.WEBGL: Implementación gráfica que permite utilizar la tarjeta de video. (Render rápido)
//  - Phase.CANVAS: Utilizado en caso de no tener una tarjeta de video en el dispositivo. (Render lento)
//  - Phase.AUTO: Indicamos a phase que intente utilizar WEBGL y en caso de no tenerlo, utilizar canvas.

var game = new Phaser.Game(1136, 640, Phaser.AUTO);

// agremamos un estado
game.state.add('gameplay', GamePlayManager);
game.state.start("gameplay")