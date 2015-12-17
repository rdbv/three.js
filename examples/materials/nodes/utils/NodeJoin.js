/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.NodeJoin = function( x, y, z, w ) {
	
	THREE.NodeGL.call( this, 'fv1' );
	
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
	
};

THREE.NodeJoin.prototype = Object.create( THREE.NodeGL.prototype );
THREE.NodeJoin.prototype.constructor = THREE.NodeJoin;

THREE.NodeJoin.inputs = ['x','y','z','w'];

THREE.NodeJoin.prototype.getNumElements = function() {
	
	var inputs = THREE.NodeJoin.inputs;
	var i = inputs.length;
	
	while (i--) {
		if ( this[ inputs[i] ] !== undefined ) {
			++i;
			break;
		}
	}
	
	return Math.max(i, 2);
	
};

THREE.NodeJoin.prototype.getType = function( builder ) {
	
	return builder.getFormatByLength( this.getNumElements() );
	
};

THREE.NodeJoin.prototype.generate = function( builder, output ) {
	
	var material = builder.material;
	
	var type = this.getType( builder );
	var length = this.getNumElements();
	
	var inputs = THREE.NodeJoin.inputs;
	var outputs = [];
	
	for(var i = 0; i < length; i++) {
	
		var elm = this[inputs[i]];
		
		outputs.push( elm ? elm.build( builder, 'fv1' ) : '0.' );
	
	}
	
	var code = builder.getFormatConstructor(length) + '(' + outputs.join(',') + ')';
	
	return builder.format( code, type, output );

};