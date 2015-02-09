THREE.HollowLatheGeometry = function ( pointsarg, segments, phiStart, phiLength, thicknessarg ) {

	THREE.Geometry.call( this );
	this.controlPoints = pointsarg;
	var points = this.controlPoints;

	this.segments = ( segments !== undefined ) ? segments : 12;
	this.phiStart = ( phiStart !== undefined ) ? phiStart : 0;
	this.phiLength = ( phiLength !== undefined ) ? phiLength : 2 * Math.PI;

	var inversePointLength = 1.0 / ( points.length - 1 );
	var inverseSegments = 1.0 / this.segments;

	for ( var i = 0, il = this.segments; i <= il; i ++ ) {

		var phi = this.phiStart + i * inverseSegments * this.phiLength;

		var c = Math.cos( phi ),
			s = Math.sin( phi );

		for ( var j = 0, jl = points.length; j < jl; j ++ ) {

			var pt = points[ j ];

			var vertex = new THREE.Vector3();

			vertex.x = c * pt.x - s * pt.z;
			vertex.y = pt.y;
			vertex.z = s * pt.x + c * pt.z;

			this.vertices.push( vertex );

		}

	}	


	for ( var k = 0, kl = this.segments; k <= kl; k ++ ) {

		var phi = this.phiStart + k * inverseSegments * this.phiLength;

		var c = Math.cos( phi ),
			s = Math.sin( phi );

		for ( var l = 0, ll = points.length; l < ll; l ++ ) {

			var pt = points[ l ];

			var vertex = new THREE.Vector3();

			vertex.x = c * (pt.x + thicknessarg) - s * pt.z;
			vertex.y = pt.y;
			vertex.z = s * (pt.x + thicknessarg) + c * pt.z;

			this.vertices.push( vertex );

		}

	}	

	this.np = points.length;

	for ( var i = 0, il = segments; i < il; i ++ ) {

		for ( var j = 0, jl = points.length - 1; j < jl; j ++ ) {

			var base = j + this.np * i;
			var a = base;
			var b = base + this.np;
			var c = base + 1 + this.np;
			var d = base + 1;

			var u0 = i * inverseSegments;
			var v0 = j * inversePointLength;
			var u1 = u0 + inverseSegments;
			var v1 = v0 + inversePointLength;

			this.faces.push( new THREE.Face3( a, b, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.Vector2( u0, v0 ),
				new THREE.Vector2( u1, v0 ),
				new THREE.Vector2( u0, v1 )

			] );

			this.faces.push( new THREE.Face3( b, c, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.Vector2( u1, v0 ),
				new THREE.Vector2( u1, v1 ),
				new THREE.Vector2( u0, v1 )

			] );


		}

	}

	this.mp = points.length;

	for ( var k = 0, kl = segments; k < kl; k ++ ) {

		for ( var l = 0 , ll = points.length - 1; l < ll; l ++ ) {

			var base = l + this.mp * k + this.vertices.length / 2;
			var a = base;
			var b = base + this.mp;
			var c = base + 1 + this.mp;
			var d = base + 1;

			var u0 = k * inverseSegments;
			var v0 = l * inversePointLength;
			var u1 = u0 + inverseSegments;
			var v1 = v0 + inversePointLength;

			this.faces.push( new THREE.Face3( a, b, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.Vector2( u0, v0 ),
				new THREE.Vector2( u1, v0 ),
				new THREE.Vector2( u0, v1 )

			] );

			this.faces.push( new THREE.Face3( b, c, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.Vector2( u1, v0 ),
				new THREE.Vector2( u1, v1 ),
				new THREE.Vector2( u0, v1 )

			] );


		}

	}

	this.mergeVertices();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.HollowLatheGeometry.prototype = Object.create( THREE.Geometry.prototype );

THREE.HollowLatheGeometry.prototype.update = function(pointsarg, segmentsarg, phiStartarg, phiLengtharg, thicknessarg){
	this.controlPoints = ( pointsarg !== undefined ) ? pointsarg : this.controlPoints;
	var points = this.controlPoints;

	this.segments = ( segmentsarg !== undefined ) ? segmentsarg : this.segments;
	this.phiStart = ( phiStartarg !== undefined ) ? phiStartarg : this.phiStart;
	this.phiLength = ( phiLengtharg !== undefined ) ? phiLengtharg : this.phiLength;

	var inversePointLength = 1.0 / ( points.length - 1 );
	var inverseSegments = 1.0 / this.segments;
	
	
	for ( var i = 0, il = this.segments; i <= il; i ++ ) {

		var phi = this.phiStart + i * inverseSegments * this.phiLength;

		var c = Math.cos( phi ),
			s = Math.sin( phi );

		for ( var j = 0, jl = points.length; j < jl; j ++ ) {

			var pt = points[ j ];

			var vertex = new THREE.Vector3();

			this.vertices.shift();

			vertex.x = c * pt.x - s * pt.z;
			vertex.y = pt.y;
			vertex.z = s * pt.x + c * pt.z;

			this.vertices.push(vertex);

		}

	}

	for ( var k = 0, kl = this.segments; k <= kl; k ++ ) {

		var phi = this.phiStart + k * inverseSegments * this.phiLength;

		var c = Math.cos( phi ),
			s = Math.sin( phi );

		for ( var l = 0, ll = points.length; l < ll; l ++ ) {

			var pt = points[ l ];

			var vertex = new THREE.Vector3();

			vertex.x = c * (pt.x + thicknessarg) - s * pt.z;
			vertex.y = pt.y;
			vertex.z = s * (pt.x + thicknessarg) + c * pt.z;

			this.vertices.push( vertex );

		}

	}	

}
