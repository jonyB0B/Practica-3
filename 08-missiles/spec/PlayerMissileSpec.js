/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/
describe("Clase PlayerMissileSpec", function(){

    var canvas, ctx;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
	
		oldGame = Game;
		SpriteSheet.load (sprites,function(){});
	 });
	
	 afterEach(function(){
        Game = oldGame;
	 });
	
	it ("draw",function(){
		spyOn(SpriteSheet,"draw");
		var misil = new PlayerMissile(5,123);
		misil.draw()
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(misil.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(misil.y);
	});

	it ("step", function(){
		
		var misil = new PlayerMissile(5,123);//necesito un misil dentro
		var dt = 0.1;
		misil.step(dt);
		expect (misil.y).toBe(43)

		var misil2 = new PlayerMissile(5,5);//necesito un misil que salga de la pantalla
		misil2.board = {remove:function(){}};
		spyOn(misil2.board,"remove");
		misil2.step(dt);
		expect(misil2.board.remove).toHaveBeenCalled();

	});
});
