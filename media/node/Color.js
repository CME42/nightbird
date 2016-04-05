Node = function( _nightbird ){

	var it = this;

	Nightbird.Node.call( it, _nightbird );
	it.name = 'Color';
	it.width = 160;
	it.height = 30;

	it.color = '1,1,1';

	var outputValue = new Nightbird.Connector( it, true, 'color' );
	outputValue.setName( 'color' );
	outputValue.onTransfer = function(){
		return String( it.color).split(',');
	};
	it.outputs.push( outputValue );
	it.move();

};

Node.prototype = Object.create( Nightbird.Node.prototype );
Node.prototype.constructor = Node;

Node.prototype.operateDown = function( _x, _y ){

	var it = this;

	if( Math.abs( 80-_x ) < 60 && Math.abs( 20-_y ) < 6 ){
		if( it.lastClick && it.nightbird.time-it.lastClick < .3 ){
			it.nightbird.textbox = new Nightbird.Textbox( it.nightbird, it.color, function( _value ){
				it.color = String( _value );
			} );
		}else{
			it.lastClick = it.nightbird.time;
			it.operate = true;
		}
		return true;
	}else{
		return false;
	}

};

Node.prototype.operateUp = function(){

	var it = this;

	it.operate = false;

};

Node.prototype.save = function( _hashed ){

	var it = this;

	var obj = Nightbird.Node.prototype.save.call( it, _hashed );
	obj.color = it.color;
	return obj;

};

Node.prototype.draw = function(){

	var it = this;

	it.nightbird.modularContext.fillStyle = '#333';
	it.nightbird.modularContext.fillRect( it.posX, it.posY, it.width, it.height );
	it.nightbird.modularContext.fillStyle = it.operate ? '#777' : '#555';
	it.nightbird.modularContext.fillRect( it.posX+20, it.posY+14, 120, 12 );
	it.nightbird.modularContext.fillStyle = '#ddd';
	it.nightbird.modularContext.textAlign = 'center';
	it.nightbird.modularContext.textBaseline = 'middle';
	it.nightbird.modularContext.fillText( it.color, it.posX+80, it.posY+20 );

	Nightbird.Node.prototype.draw.call( it );

};
