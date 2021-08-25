// Objeto
GamePlayManager = {
    // phaser llama a init una vez que declaremos el estado start
    init: function() {
        
    },
    // se cargan todos los recursos que necesitamos para el proyecto, una vez cargados se llama al método create
    preload: function () {
        // cargamos el fondo con load.image(nombreDeInstancia, rutaDeImagen);
        game.load.image('background', 'assets/images/background.png')
    },

    create: function () {
        //                                              En la esquina izquierda superior
        // ponemos la imagen en pantalla con add.sprite(coordenadas, coordenadas, imagen )
        game.add.sprite(0, 0,'background');
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

var game = new Phaser.Game(1136, 640, Phaser.CANVAS);

// agremamos un estado llamado 'gameplay' y le asignamos un objeto llamado GamePlayManager
game.state.add('gameplay', GamePlayManager);
// Iniciamos
game.state.start("gameplay")