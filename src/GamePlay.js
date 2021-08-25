// Variable que guarda la instancia de phase.
// Game(width, height, render)
// RENDERS:
//  - Phase.WEBGL: Implementación gráfica que permite utilizar la tarjeta de video. (Render rápido)
//  - Phase.CANVAS: Utilizado en caso de no tener una tarjeta de video en el dispositivo. (Render lento)
var game = new Phaser.Game(1136, 640, )