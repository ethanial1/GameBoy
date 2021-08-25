var cantidad_diamantes = 20;
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

        // Sprites: caballo (identificado, ruta, ancho, alto, númerDeImágenes)
        game.load.spritesheet('horse', 'assets/images/horse.png', 84,156,2);

        // Diamantes
        game.load.spritesheet('diamonds', 'assets/images/diamonds.png', 81, 84, 4);
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

        // Ponemos en pantalla los diamantes
        this.diamonds = [];
        for (var i = 0; i < cantidad_diamantes; i++){
            var diamond = game.add.sprite(100,100, 'diamonds');
            diamond.frame = game.rnd.integerInRange(0,3); // seleccionamos un frame al azar.
            diamond.scale.setTo(0.30 + game.rnd.frac()); // game.rnd.frac() regresa números de 0 -1
            diamond.anchor.setTo(0.5);
            diamond.x = game.rnd.integerInRange(50, 1050);
            diamond.y = game.rnd.integerInRange(50, 600);

            // evitar que los diamantes se sobrepongan
            this.diamonds[i] = diamond;
            var rectanguloCurrent = this.getBoundsDiamonds(diamond);
            var rectaHorse = this.getBoundsDiamonds(this.horse);

            while(this.isOverlapingOtherDiamond(i, rectanguloCurrent) || this.isRectangleOverlapping(rectaHorse, rectanguloCurrent)){
                diamond.x = game.rnd.integerInRange(50, 1050);
                diamond.y = game.rnd.integerInRange(50, 600);
                rectanguloCurrent = this.getBoundsDiamonds(diamond);
            }

        }
    },
    onTap: function () {
        this.flagFirstMouseDown = true;
    },
    getBoundsDiamonds: function (diamondSprit) {
        return new Phaser.Rectangle(diamondSprit.left, diamondSprit.top, diamondSprit.width, diamondSprit.height);
    },
    isRectangleOverlapping: function (recta1, recta2) {
        if (recta1.x > recta2.x + recta2.width || recta2.x > recta1.x + recta1.width){
            return false;
        }
        if(recta1.y > recta2.y + recta2.height || recta2.y > recta1.y + recta1.height) {
            return false;
        }
        return true;
    },
    // recibe el diamante creado y su rectángulo
    isOverlapingOtherDiamond: function (index, recta2) {
        // recorremos todos los diamantes anteriores ya creados 
        for (var i = 0; i < index; i++){
            var recta1 = this.getBoundsDiamonds(this.diamonds[i]);
            if(this.isRectangleOverlapping(recta1, recta2)){
                return true;
            }
        } 
        return false;
    },
    getBoundsHourse: function () {
        // utilizamos las coordenadas de nuestro sprite, nos aseguramos de que width no se negativo usando math.abs
        var x0 = this.horse.x - Math.abs(this.horse.width) / 4;
        var width = Math.abs(this.horse.width) / 2;
        var y0 = this.horse.y - this.horse.height / 2;
        var height = this.horse.height;

        return new Phaser.Rectangle(x0, y0, width, height);
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

            // colisiones
            // iteramos sobre todos los diamantes en pantalla
            for (var i = 0; i < cantidad_diamantes; i++){
                // recuperar el rectángulo del caballo y del diamante, verificar si están colisionando
                var rectHorse = this.getBoundsHourse();
                var rectDiamond = this.getBoundsDiamonds(this.diamonds[i]);

                if(this.diamonds[i].visible && this.isRectangleOverlapping(rectHorse, rectDiamond)){
                    this.diamonds[i].visible = false;
                }

            }
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