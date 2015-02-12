
function CubeBezier (t, p0,p1, p2, p3) {
	return Math.pow((1-t),3) * p0 + 3 * p1 * t * Math.pow((1-t),2) + 3 * p2 * t * t * (1-t) + p3* Math.pow(t,3);
}

function PointOnCubicBezier(p0,p1,p2,p3,t){
	var ax,bx,cx;
	var ay,by,cy;
	var result = new THREE.Vector2();

	cx = 3.0 * (p1.x - p0.x);
	bx = 3.0 * (p2.x - p1.x) -cx;
	ax = p3.x - p0.x - cx - bx;

	cy = 3.0 * (p1.y - p0.y);
	by = 3.0 * (p2.y - p1.y) - cy;
	ay = p3.y - p0.y - cy - by;

	tSquared = t * t;
	tCubed = tSquared * t;

	result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + p0.x;
	result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + p0.y;

	return result;
}

function ComputeBezier(p0,p1,p2,p3,nubOfPoints){
	var dt,i;
	var vertices = [];
	dt = 1.0/(nubOfPoints - 1);
	for(i = 0; i< nubOfPoints; i++){
		vertices.push(PointOnCubicBezier(p0,p1,p2,p3, i * dt));

	}
	return vertices;
}

