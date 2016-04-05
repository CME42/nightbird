Nightbird.Link = function( _nightbird, _connector ){

	var it = this;

	it.nightbird = _nightbird;

	it.grabStart = false;
	it.grabEnd = false;
	it.grabX = 0;
	it.grabY = 0;
	it.start = null;
	it.end = null;

	if( _connector.isOutput ){
		it.start = _connector;
		it.grabX = _connector.posX;
		it.grabY = _connector.posY;
		it.grabEnd = true;
	}else{
		it.end = _connector;
		it.grabX = _connector.posX;
		it.grabY = _connector.posY;
		it.grabStart = true;
	}

	it.type = _connector.type;

};

Nightbird.Link.prototype.move = function( _x, _y ){

	var it = this;

	it.grabX = _x;
	it.grabY = _y;

};

Nightbird.Link.prototype.remove = function(){

	var it = this;

	if( it.type == 'number' ){
		it.end.onTransfer( Nightbird.black1x1 );
	}else if( it.type == 'number' ){
		it.end.onTransfer( 0 );
	}else if( it.type == 'string' ){
		it.end.onTransfer( '' );
	}else if( it.type == 'color' ){
		it.end.onTransfer( '' );
	}

	if( it.start ){
		it.start.removeLink( it );
	}
	if( it.end ){
		it.end.removeLink( it );
	}

};

Nightbird.Link.prototype.transfer = function(){

	var it = this;

	it.end.onTransfer( it.start.onTransfer() );

};

Nightbird.Link.prototype.draw = function(){

	var it = this;

	if( it.start && it.end ){
		it.transfer();
	}

	var sx = it.grabStart ? it.grabX : it.start.posX;
	var sy = it.grabStart ? it.grabY : it.start.posY;
	var ex = it.grabEnd ? it.grabX : it.end.posX;
	var ey = it.grabEnd ? it.grabY : it.end.posY;
	it.nightbird.modularContext.beginPath();
	it.nightbird.modularContext.moveTo( sx, sy );
	if( sx<ex ){
		it.nightbird.modularContext.bezierCurveTo( sx+(ex-sx)*.3, sy, ex-(ex-sx)*.3, ey, ex, ey );
	}else{
		it.nightbird.modularContext.bezierCurveTo( sx, sy+(ey-sy)*.3, ex, ey-(ey-sy)*.3, ex, ey );
	}
	it.nightbird.modularContext.lineWidth = 2;
	var col;
	switch( it.type ){
		case 'canvas' : col = '#06f'; break;
		case 'number' : col = '#f06'; break;
		case 'string' : col = '#fa0'; break;
		case 'color'  : col = '#a0f'; break;
	}
	if( it.grabStart || it.grabEnd ){
		col = col.replace( 'f', '8' );
		col = col.replace( 'a', '5' );
		col = col.replace( '6', '3' );
	}
	it.nightbird.modularContext.strokeStyle = col;
	it.nightbird.modularContext.stroke();
	it.nightbird.modularContext.globalAlpha = 1;

};

Nightbird.Link.prototype.drawMoving = function(){

	var it = this;

	var sx = it.start.posX;
	var sy = it.start.posY;
	var ex = it.end.posX;
	var ey = it.end.posY;
	it.nightbird.modularContext.beginPath();
	it.nightbird.modularContext.moveTo( sx, sy );
	if( sx<ex ){
		it.nightbird.modularContext.bezierCurveTo( sx+(ex-sx)*.3, sy, ex-(ex-sx)*.3, ey, ex, ey );
	}else{
		it.nightbird.modularContext.bezierCurveTo( sx, sy+(ey-sy)*.3, ex, ey-(ey-sy)*.3, ex, ey );
	}
	it.nightbird.modularContext.lineWidth = 5;
	it.nightbird.modularContext.strokeStyle = '#eac';
	it.nightbird.modularContext.globalAlpha = .4;
	it.nightbird.modularContext.stroke();
	it.nightbird.modularContext.globalAlpha = 1;

};
