/**
 * @author Kaleb Murphy
 */

THREE.PhylogeneticGeometry = function ( particlecnt, groupcnt, particleMin, particleMax, data) {

	THREE.Object3D.call( this );
	this.particlecnt = particlecnt !== undefined ? particlecnt : 1000;
	this.groupcnt = groupcnt !== undefined ? groupcnt : 5;
	this.particleMin = particleMin !== undefined ? particleMin : 1000;
	this.particleMax = particleMax !== undefined ? particleMax :  3000;
	this.grouprange = [];
	this.data = data !== undefined ? data : this.generatedata();
	this.draw();
	// var material = new THREE.ShaderMaterial( 
	// {
	//     uniforms: 
	// 	{ 
	// 		"c":   { type: "f", value: 1.0 },
	// 		"p":   { type: "f", value: 1.4 },
	// 		glowColor: { type: "c", value: new THREE.Color(0xffff00) },
	// 		viewVector: { type: "v3", value: camera.position }
	// 	},
	// 	vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
	// 	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	// 	side: THREE.FrontSide,
	// 	blending: THREE.AdditiveBlending,
	// 	transparent: true
	// }   );
	var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.png" );
	// var attributes = {

	// 	size:        { type: 'f', value: null },
	// 	customColor: { type: 'c', value: null }

	// };

	// uniforms = {

	// 	color:     { type: "c", value: new THREE.Color( 0xffffff ) },
	// 	texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "textures/sprites/spark1.png" ) }

	// };

	// var shaderMaterial = new THREE.ShaderMaterial( {

	// 	uniforms:       uniforms,
	// 	attributes:     attributes,
	// 	vertexShader:   document.getElementById( 'vertexshader' ).textContent,
	// 	fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

	// 	blending:       THREE.AdditiveBlending,
	// 	depthTest:      false,
	// 	transparent:    true

	// });

	// this.materialsp = shaderMaterial;
}

THREE.PhylogeneticGeometry.prototype = Object.create( THREE.Object3D.prototype );

THREE.PhylogeneticGeometry.prototype.generatedata = function (){
	var tmpdata = [];

	//生成count个,总和为sumnum的随机数.
	function getRandom(count,sumnum){
		var randomArray = [],
			icount = 0,
			resultCount = 0;
		var	resultArray = [];

		for (var i = count ; i > 0; i--) {
			var randnum = Math.random();
			randomArray.push(randnum);
			icount += randnum;
		};

		for (var j = 0; j < randomArray.length; j++){
			var iresult = Math.ceil(sumnum * randomArray[j]/icount);
			resultCount += iresult;
			// console.log(iresult);
			resultArray.push(iresult);
			if (j == randomArray.length - 1 && sumnum != resultCount){
				resultArray[j] += (sumnum - resultCount);
			}
		} 
		// console.log(resultCount);

		return resultArray;
	}

	this.grouprange = getRandom(this.groupcnt,this.particlecnt).splice(0);

	for(var i = 0; i<this.groupcnt;i++){
		var grouparray = [];
		for(var j = 0; j<this.grouprange[i];j++){
			var vcolor = new THREE.Color();
			vcolor.setRGB(Math.random(),Math.random(),Math.random());
//			vcolor.setRGB(i/this.groupcnt,i/this.groupcnt + 0.5,i/this.groupcnt + 0.5);
			// grouparray.push({loc:THREE.Math.randInt(this.particleMin,this.particleMax),color: vcolor});
			grouparray.push(THREE.Math.randInt(this.particleMin,this.particleMax));
		}
		tmpdata.push(grouparray);
	}
	return tmpdata;

}

THREE.PhylogeneticGeometry.prototype.phaser = function (data,particlecnt, groupcnt){

}

THREE.PhylogeneticGeometry.prototype.draw = function (){
	this.rootdraw();
	var ringstart = 0, particlestart = 0;
	for(var i = 0; i < this.grouprange.length; i++){
		var ringlength = this.grouprange[i] / this.particlecnt * Math.PI * 2;
		this.ringdraw(1200, 1600, 8 ,3,ringstart * Math.PI * 2,ringlength);
		this.particledraw(this.data[i], this.grouprange[i], ringstart * Math.PI * 2, ringlength);
		// particlestart += this.grouprange[i] / this.particlecnt * Math.PI * 2;
		ringstart += this.grouprange[i] / this.particlecnt;
	}

}

THREE.PhylogeneticGeometry.prototype.particledraw = function (points, segments, thetaStart, thetaLength,clrindx){
	// var geometry = new THREE.Geometry();
	segments = segments;
	phiStart = thetaStart;
	phiLength = thetaLength;
	// var material = new THREE.PointCloudMaterial( { size: 3, vertexColors: THREE.VertexColors } );
	var particleSystem;

	var inverseSegments = 1.0 / segments;
	var geometry = new THREE.BufferGeometry();

	var positions = new Float32Array( segments * 3 );
	var colors = new Float32Array( segments * 3 );

	var color = new THREE.Color(0xff7744);

	// var n = 1000, n2 = n / 2; // particles spread in the cube

	for ( var i = 0; i < positions.length; i += 3 ) {

		// positions
		// var x = points[ i / 3 ].loc * Math.cos( inverseSegments  * thetaLength + thetaStart);
		// var y = points[ i / 3 ].loc * Math.sin( inverseSegments  * thetaLength + thetaStart);

		var x = points[ i / 3 ].loc * Math.cos( inverseSegments  * thetaLength + thetaStart);
		var y = points[ i / 3 ].loc * Math.sin( inverseSegments  * thetaLength + thetaStart);
		var z =  3;// Math.random() * points[ i / 3 ];

		positions[ i ]     = x;
		positions[ i + 1 ] = y;
		positions[ i + 2 ] = z;

		// colors

		// var vx = (inverseSegments  * thetaLength + thetaStart) / Math.PI * 2;
		// var vy = (inverseSegments  * thetaLength + thetaStart) / Math.PI * 2;
		// var vz = (inverseSegments  * thetaLength + thetaStart) / Math.PI * 2 + 0.5;

		// color.setRGB(Math.random(),Math.random(),Math.random());
		// color = points[ i / 3 ].color;

		colors[ i ]     = color.r;
		colors[ i + 1 ] = color.g;
		colors[ i + 2 ] = color.b;

		inverseSegments += inverseSegments;

	}

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	// geometry.addAttribute( 'size', new THREE.BufferAttribute( values_size, 1 ) );
	geometry.computeBoundingSphere();
	var attributes = {

		"size":        { type: 'f', value: 30.0 },
		customColor: { type: 'c', value: new THREE.Color( 0xffffff ) }

	};

	uniforms = {

		color:     { type: "c", value: new THREE.Color( 0xffffff ) },
		texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "textures/sprites/spark1.png" ) }

	};

	var shaderMaterial = new THREE.ShaderMaterial( {

		uniforms:       uniforms,
		attributes:     attributes,
		vertexShader:   document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

		blending:       THREE.AdditiveBlending,
		depthTest:      false,
		transparent:    true

	});

	var material = new THREE.PointCloudMaterial( { size: 30, color: 0xff7744, vertexColors: THREE.VertexColors } );
	// var material = new THREE.ShaderMaterial({ 
	//     uniforms: {
	//      	size:{type: "t", value: textureFlare0}
	//     }, 
	//     attributes: {
	//      	size:{type: "f", value: 20.0},
	//       	pcolor: { type: "c", value: new THREE.Color(0.3,0.5,0.8)}
	//     }, 
	//     vertexShader: document.getElementById('vertexshader').textContent, 
	//     fragmentShader: document.getElementById('fragmentshader').textContent 
	// });

 	particleSystem = new THREE.PointCloud( geometry, shaderMaterial )
	this.add(particleSystem);

	//

	// var material = new THREE.PointCloudMaterial( { size: 15, vertexColors: THREE.VertexColors } );

	// particleSystem = new THREE.PointCloud( geometry, material );

	// for ( var i = 0, il = segments; i <= il; i ++ ) {

	// 	var phi = phiStart + i * inverseSegments * phiLength;

	// 	// var c = Math.cos( phi ),
	// 	// 	s = Math.sin( phi );

	// 	for ( var j = 0, jl = points.length; j < jl; j ++ ) {

	// 		var vertex = new THREE.Vector3();

	// 		vertex.x = points[ j ] * Math.cos( phi );
	// 		vertex.y = points[ j ] * Math.sin( phi );
	// 		vertex.z = 0;

	// 		geometry.vertices.push( vertex );

	// 	}
	// }
	// particleSystem = new THREE.PointCloud( geometry, material )
	// this.add(particleSystem);

	// this.add(particle);
}

THREE.PhylogeneticGeometry.prototype.ringdraw = function (innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength){
	var ringgeometry = new THREE.RingGeometry( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength );
	var color = new THREE.Color();
	color.setRGB(Math.random(),Math.random(),Math.random());
	var material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.1, side: THREE.DoubleSide, depthTest: true } );
	ringmesh = new THREE.Mesh( ringgeometry, material );
	this.add( ringmesh );
}

THREE.PhylogeneticGeometry.prototype.rootdraw = function (){

	var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare_blue.png" );
	var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare2.png" );
	var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare3.png" );

	// addLight( 0.08, 0.8, 0.5,    0, 0, 10 );

	// function addLight( h, s, l, x, y, z ) {

	var light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
	light.color.setHSL(0.08, 0.8, 0.5 );
	light.position.set( 0, 0, 10 );
	this.add( light );

	var flareColor = new THREE.Color( 0xffffff );
	flareColor.setHSL( 0.08, 0.8, 0.5 + 0.5 );

	var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

	lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

	// lensFlare.customUpdateCallback = lensFlareUpdateCallback;
	lensFlare.position.copy( light.position );

	// scene.add( lensFlare );
	this.add(lensFlare);

	// }
}