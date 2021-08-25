// Objeto
GamePlayManager = {
    // phaser llama a init una vez que declaremos el estado start
    init: function() {
        // Escalamos la pantalla
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // Alinear el juego de forma horizontal y vertical en el centro de la pantall
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        // Nos ayuda para que una vez iniciado el juego, el caballo no se mueva.
        this.flagFirstMouseDown = false;
    },
    // se cargan todos los recursos que necesitamos para el proyecto, una vez cargados se llama al método create
    preload: function () {
        // cargamos el fondo con load.image(nombreDeInstancia, rutaDeImagen);
        game.load.image('background', 'assets/images/background.png');

        // Sprites (identificado, ruta, ancho, alto, númerDeImágenes)
        game.load.spritesheet('horse', 'assets/images/horse.png', 84,156,2)
    },

    create: function () {
        //                                              En la esquina izquierda superior
        // ponemos la imagen en pantalla con add.sprite(coordenadas, coordenadas, imagen )
        game.add.sprite(0, 0,'background');

        // Sprites
        // añadimos propiedades
        this.horse = game.add.sprite(0,0, 'horse');
        this.horse.frame = 1; // ojo cerrado: 0, ojo abierto: 1, (Son solo dos frames)
        // cambiamos la posición de x,y
        this.horse.x = game.width / 2;
        this.horse.x = game.height / 2;

        // Cambiamos el anchor
        this.horse.anchor.setTo(0.5,0.5); // x,y

        // Rotar
        //this.horse.angle = 15; // en grados a partir de su anchor

        // Escalado
        //this.horse.scale.setTo(2); // puede escalarse en x,y o solo en uno y lo hace en proporción.

        // Opacidad / alpha
        //this.horse.alpha = 1; // de 0 - 1, 0: invisible 1: totalmente visible

        // Capturamos el primer click del mouse
        game.input.onDown.add(this.onTap, this);
    },
    onTap: function () {
        this.flagFirstMouseDown = true;
    },
    // Phaser llama frame a frame al método update
    update: function () {

        // Evaluamos si la bandera es verdad
        if(this.flagFirstMouseDown){
            // guardamos las coordenadas donde se encuentra nuestro mouse
            var pointX = game.input.x;
            var pointY = game.input.y;

            // calculamos la distancia que hay desde nuestro mouse y nuestro caballo y lo vamos a guardar
            var distaX = pointX - this.horse.x;
            var distaY = pointY - this.horse.y;

            // Orientamos a nuestro caballo en base a la dirección del mouse
            // lo podemos hacer sabiendo si la coordenada de nuestro mouse es mayor a la del caballo o es menor.
            if(distaX > 0) { // está a la derecha
                // invertimos la dirección con ayuda de la escala
                this.horse.scale.setTo(1,1);
            }else{ // está a la izquierdad
                //                      x,y
                this.horse.scale.setTo(-1,1);
            }

            // Movemos al caballo en base al mouse
            // le sumamos un porcentaje de la distancia.
            this.horse.x += distaX * 0.12; // podemos modificar el porcentaje y este altera la velocidad
            this.horse.y += distaY * 0.12;
        }

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