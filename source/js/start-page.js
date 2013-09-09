av = {} ;
av.startPage = function(ctx) {
    	
// #layer1
	ctx.save();
	ctx.transform(1, 0, 0, 1, 0, -652);
	
// #rect2991
	ctx.fillStyle = 'rgb(125, 212, 255)';
	ctx.beginPath();
	ctx.rect(0, 652, 900, 200);
	ctx.save();
	//ctx.transform(1, 0, 0, 0, 0, 585);

	ctx.stroke();
	ctx.restore();
	ctx.fill();
	
// #text2987
	ctx.strokeStyle = 'rgb(255, 255, 255)';
	ctx.miterLimit = 4;
	ctx.lineWidth = 2;
	ctx.fillStyle = 'rgb(51, 102, 102)';
	ctx.font = "normal bold 40px Comic Sans MS";
	ctx.fillText("Wrecked", 210, 743);
	ctx.strokeText("Wrecked", 210, 743);
	ctx.fillText("Sailors", 518, 743);
	ctx.strokeText("Sailors", 518, 743);
	
// #rect3780
	ctx.miterLimit = 4;
	ctx.lineWidth = 3;
	ctx.fillStyle = 'rgb(140, 106, 56)';
	ctx.beginPath();
	ctx.rect(0, 852, 900, 200);
	ctx.fill();
	
// #path3782
	ctx.save();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(64, 48, 25)';
	ctx.lineCap = 'butt';
	ctx.miterLimit = 4;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.transform(1, 0, 0, 1, 0, 652);
	ctx.moveTo(0, 230);
	ctx.bezierCurveTo(312, 215, 600, 229, 900, 228);
	ctx.stroke();
	ctx.restore();
	
// #path3795
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(64, 48, 25)';
	ctx.lineCap = 'butt';
	ctx.miterLimit = 4;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, 920);
	ctx.bezierCurveTo(303, 910, 602, 912, 900, 919);
	ctx.stroke();
	
// #path3797
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(64, 48, 25)';
	ctx.lineCap = 'butt';
	ctx.miterLimit = 4;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, 953);
	ctx.bezierCurveTo(327, 945, 697, 959, 900, 952);
	ctx.stroke();
	
// #path3799
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(64, 48, 25)';
	ctx.lineCap = 'butt';
	ctx.miterLimit = 4;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, 988);
	ctx.bezierCurveTo(296, 976, 599, 987, 900, 986);
	ctx.stroke();
	
// #path3801
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(64, 48, 25)';
	ctx.lineCap = 'butt';
	ctx.miterLimit = 4;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, 1019);
	ctx.bezierCurveTo(303, 1021, 619, 1030, 900, 1018);
	ctx.stroke();
	
// #path3803
	ctx.save();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = 'rgb(64, 48, 25)';
	ctx.lineCap = 'butt';
	ctx.miterLimit = 4;
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.transform(1, 0, 0, 1, 0, 652);
	ctx.moveTo(0, 200);
	ctx.bezierCurveTo(294, 194, 605, 205, 900, 200);
	ctx.stroke();
	ctx.restore();
	
	var sX = 120;
	var sY = 950;
	var sp = 165;
	var txt = ["Tutorial","Level 1","Level 2","Level 3","Level 4"]
	
	for (var i=0; i< 5 ; i++) {
		ctx.strokeSyle = "#403019";
		ctx.fillStyle = '#eea522' ;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(sX+i*sp,sY,61,0,Math.PI*2);
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeSyle = "#403019";
		ctx.fillStyle = '#336666' ;
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(sX+i*sp,sY,40,0,Math.PI*2);
		ctx.stroke();
		ctx.fill();
		
		ctx.font = "bold 18px comic sans ms";
		ctx.textBaseline = "middle" ;
		ctx.textAlign = "center" ;
		ctx.lineWidth = 1;
		ctx.strokeSyle = "#403019";
		ctx.fillStyle = '#ffffff' ;
		ctx.fillText(txt[i],sX+i*sp,sY);
		ctx.strokeText(txt[i],sX+i*sp,sY);
		
		for (var t =0; t < 8 ; t++) {
			var tX = sX+i*sp + 51 * Math.cos(Math.PI*2/8*t) ;
			var tY = sY		 + 51 * Math.sin(Math.PI*2/8*t) ;
			ctx.strokeSyle = "#aa8800";
			ctx.fillStyle = '#c9b74b' ;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(tX,tY,4,0,Math.PI*2);
			ctx.stroke();
			ctx.fill();
		}
	}
	
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(235, 235, 235)';
	ctx.fillStyle = '#ffffff' ;
	ctx.lineWidth = 5;
	ctx.arc(450,730,49,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(235, 235, 235)';
	ctx.fillStyle = '#7dd4ff' ;
	ctx.lineWidth = 5;
	ctx.arc(450,730,32,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	ctx.translate(29,-40);
// #path5728
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.beginPath();
	ctx.moveTo(437, 795);
	ctx.bezierCurveTo(444, 791, 445, 787, 448, 782);
	ctx.lineTo(468, 791);
	ctx.bezierCurveTo(466, 799, 454, 811, 448, 814);
	ctx.closePath();
	ctx.fill();
	
// #path5787
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.beginPath();
	ctx.moveTo(407, 745);
	ctx.bezierCurveTo(400, 748, 398, 752, 395, 757);
	ctx.lineTo(376, 747);
	ctx.bezierCurveTo(378, 739, 391, 727, 397, 725);
	ctx.closePath();
	ctx.fill();
	
// #path5789
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.beginPath();
	ctx.moveTo(449, 760);
	ctx.bezierCurveTo(446, 752, 443, 750, 438, 746);
	ctx.lineTo(451, 729);
	ctx.bezierCurveTo(458, 732, 468, 747, 469, 753);
	ctx.closePath();
	ctx.fill();
	
// #path5791
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.beginPath();
	ctx.moveTo(394, 782);
	ctx.bezierCurveTo(397, 789, 400, 791, 405, 795);
	ctx.lineTo(393, 813);
	ctx.bezierCurveTo(385, 809, 375, 795, 374, 789);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
	ctx.restore();

}
