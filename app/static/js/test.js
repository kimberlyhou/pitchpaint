function test_getColumn1(){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var bgr = new Image();
	bgr.crossOrigin = "Anonymous";
	bgr.src = 'testpics/test1.png';
	bgr.onload = function(){
		canvas.height = bgr.height;
		canvas.width = bgr.width;
		ctx.drawImage(bgr,0,0);
		var clm = getColumn(canvas,0);
		if (clm.length != 1 || clm[0] != '#EB023C') throw "getColumn1 Failed" ;
	}

}

function test_getColumn2(){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var bgr = new Image();
	bgr.crossOrigin = "Anonymous";
	bgr.src = 'testpics/test2.png';
	bgr.onload = function(){
		canvas.height = bgr.height;
		canvas.width = bgr.width;
		ctx.drawImage(bgr,0,0);
		var clm = getColumn(canvas,0);
		if (clm.length != 2 || !clm.include('#EB023C') || !clm.include('#0292EB')) throw "getColumn2 Failed" ;
	}

}

function test_getColumn3(){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var bgr = new Image();
	bgr.crossOrigin = "Anonymous";
	bgr.src = 'testpics/test3.png';
	bgr.onload = function(){
		canvas.height = bgr.height;
		canvas.width = bgr.width;
		ctx.drawImage(bgr,0,0);
		var clm = getColumn(canvas,0);
		if (clm.length != 1 || clm[0] != '#EB023C') throw "getColumn3 Failed" ;
		clm = getColumn(canvas,1);
		if (clm.length != 1 || clm[0] != '#0292EB') throw "getColumn3 Failed" ;

	}

}


test_getColumn1();
test_getColumn2();
test_getColumn3();