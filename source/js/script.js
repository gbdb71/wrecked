﻿// ---------------------------------- CONST
av.c = {
	PI_2: Math.PI / 2, 
	PI_3_4: 3* Math.PI / 4 , 
	PI_4: Math.PI / 4,
	PI_8: Math.PI / 8,
	PIx2: Math.PI * 2,
	PI_180: Math.PI / 180,
	PI_18: Math.PI / 18,
	PIx0_75: Math.PI * 0.75,
	PIx1_5: Math.PI * 1.5
}

// ---------------------------------- UTIL
av.util = { 
    fixConsole: function(alertFallback) {    
        if (typeof console === "undefined") {
            console = {}; 
        }
        if (typeof console.log === "undefined") {
            if (alertFallback) { console.log = function(msg) { alert(msg); }; } 
            else { console.log = function() {}; }
        }
        if (typeof console.dir === "undefined") {
            if (alertFallback) { 
                console.dir = function(obj) { alert("DIR: "+obj); }; 
            }
            else { console.dir = function() {}; }
        }
    },
    addV: function(v1,v2) {
		var x =  v1.v*Math.cos(v1.a) + v2.v*Math.cos(v2.a) ;
		var y =  v1.v*Math.sin(v1.a) + v2.v*Math.sin(v2.a);
		var v = Math.sqrt(x*x+y*y) ;
		var ang = Math.atan2(y,x) ;
		return {v: v , a: ang}
	},
	subV: function(v1,v2) {
		var x =  v1.v*Math.cos(v1.a) - v2.v*Math.cos(v2.a) ;
		var y =  v1.v*Math.sin(v1.a) - v2.v*Math.sin(v2.a);
		var v = Math.sqrt(x*x+y*y) ;
		var ang = Math.atan2(y,x) ;
		return {v: v , a: ang}
	},
	roundRect: function(ctx, x, y, width, height, radius, fill, stroke) {
	  ctx.beginPath();
	  ctx.moveTo(x + radius, y);
	  ctx.lineTo(x + width - radius, y);
	  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	  ctx.lineTo(x + width, y + height - radius);
	  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	  ctx.lineTo(x + radius, y + height);
	  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	  ctx.lineTo(x, y + radius);
	  ctx.quadraticCurveTo(x, y, x + radius, y);
	  ctx.closePath();
	  if (stroke) {
		ctx.stroke();
	  }
	  if (fill) {
		ctx.fill();
	  }        
	},
	cAdd: function(elem,c) {
		if (elem && !elem.className.match(c)) {
			elem.className = elem.className + " " + c;
		}
	},
	cRem: function(elem,c) {
		var cl = " " + elem.className + " ";
		elem.className = cl.replace(new RegExp("\x20"+c+"\x20"),"").trim() ;
	},
	tmpl: function(elem,tmpl,data) {
		var tmpl = tmpl.innerHTML;
		var tags = tmpl.match(/(\{\{\w*\}\})/ig) ;
		if (tags && tags.length && data) {
			for (var i=0; i<tags.length; i++) {
				tmpl = tmpl.replace(tags[i],data[tags[i].replace(/(\{\{)|(\}\})/ig,"")]);
			}
		}
		elem.innerHTML= tmpl;
	}
}

// ---------------------------------- CANVAS
av.canvas = {
	init: function() {
		var canvas = document.getElementById('myCanvas');
		canvas.height = window.innerHeight ;
		var w = window.innerWidth ;
		if ( w < 1000 ) {
			this.scale = w / 998 ;
		}
		canvas.width = 998 ;
		this.elem = canvas ;
		this.ctx = canvas.getContext('2d');
		
		this.bgElem = document.getElementById('background');
		this.bgElem.height = window.innerHeight ;
		this.bgElem.width = 998 ;
		this.bgCtx = this.bgElem.getContext('2d');
		
		this.initPatt();
		
		this.ctx.scale(this.scale,this.scale);
		this.bgCtx.scale(this.scale,this.scale);
		
		return  { ctx: this.ctx, elem: canvas } ;
	},
	clr: function() {
		this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
	},
	clrBg: function() {
		this.bgCtx.clearRect(0, 0, this.elem.width, this.elem.height);
	},
	initPatt: function() {
		var canvas = document.createElement("canvas") ;
		canvas.height = 50;
		canvas.width = 50;
		var ctx = canvas.getContext('2d');
		var img = ctx.createImageData(50,50);
		for (var i=0; i<img.data.length; i+=4) {
			var rnd = (30 * Math.random()|0);
			img.data[i] = 114+rnd; // 144, 166, 107
			img.data[i+1] = 136 + rnd;
			img.data[i+2] = 77+rnd ;
			img.data[i+3] = 255;
		}
		ctx.putImageData(img,0,0);
		this.pattGrass = this.ctx.createPattern(canvas,"repeat");

		for (var y=0; y<50; y+=2) {
			for (var x=0; x<50; x+=2) {
				var i = (x + y*50)*4;
				var rnd = (60 * Math.random()|0)-30;
				img.data[i] = 114+rnd; 
				img.data[i+1] = 136 + rnd;
				img.data[i+2] = 77+rnd ;
				img.data[i+3] = 255;
				img.data[i+4] = 114+rnd; 
				img.data[i+5] = 136 + rnd;
				img.data[i+6] = 77+rnd ;
				img.data[i+7] = 255;
				
				img.data[i+200] = 114+rnd; 
				img.data[i+200+1] = 136 + rnd;
				img.data[i+200+2] = 77+rnd ;
				img.data[i+200+3] = 255;
				img.data[i+200+4] = 114+rnd; 
				img.data[i+200+5] = 136 + rnd;
				img.data[i+200+6] = 77+rnd ;
				img.data[i+200+7] = 255;
			}
		}
		
		ctx.putImageData(img,0,0);
		this.pattTree = this.ctx.createPattern(canvas,"repeat");
		
		for (var y=0; y<50; y+=2) {
			for (var x=0; x<50; x+=2) {
				var i = (x + y*50)*4;
				var rnd = (60 * Math.random()|0)-70;
				img.data[i] = 114+rnd; 
				img.data[i+1] = 136 + rnd;
				img.data[i+2] = 77+rnd ;
				img.data[i+3] = 255;
				img.data[i+4] = 114+rnd; 
				img.data[i+5] = 136 + rnd;
				img.data[i+6] = 77+rnd ;
				img.data[i+7] = 255;
				
				img.data[i+200] = 114+rnd; 
				img.data[i+200+1] = 136 + rnd;
				img.data[i+200+2] = 77+rnd ;
				img.data[i+200+3] = 255;
				img.data[i+200+4] = 114+rnd; 
				img.data[i+200+5] = 136 + rnd;
				img.data[i+200+6] = 77+rnd ;
				img.data[i+200+7] = 255;
			}
		}
		
		ctx.putImageData(img,0,0);
		this.pattTreeDark = this.ctx.createPattern(canvas,"repeat");
	}
}

// ---------------------------------- ANIM
av.anim = {
	T1: 0,
	T2: 0,
	dT: 0,
	cnt: 0,
	fps:0,
	fpsAvg: 0,
	calcDT: function() {
		this.T1 = this.T2 ;
		this.T2 = Date.now() ;
		this.dT = this.T2 - this.T1 ;
		this.calcFps();
		return this.dT ;
	},
	calcFps: function() {
		this.fps+= (1000 / this.dT) ;
		this.cnt++;
		if (this.cnt == 100)  { 
			this.cnt = 0;
			this.fpsAvg = Math.round(this.fps / 100);
			av.cockpit.values[6] = this.fps * 0.0078 + av.c.PIx0_75;
			this.fps = 0;
		}
	}
}

// ---------------------------------- INPUT
av.input = {
	x1: [],
	y1: [],
	v: 0,
	a: 0,
	maxV: 0.2,
	minV: -0.03,
	mouse: false,
	btn: [{x:120,y:120,r:45}],
	init: function(elem) {
		var $this = this ;
		this.elem = elem ;
		document.addEventListener('keydown', function(evt) {
			
			switch (evt.keyCode) {
				case 38:   // 83
					$this.v+=0.01;
					if ($this.v > $this.maxV ) { $this.v = $this.maxV } 
				break;
				case 40:    // 88
					$this.v-=0.01;
					if ($this.v < $this.minV ) { $this.v = $this.minV } 
				break;
				case 37: 
					$this.a-=0.01;
					if ($this.a < -av.c.PI_8 ) { $this.a = -av.c.PI_8 } 
				break;
				case 39: 
					$this.a+=0.01;
					if ($this.a > av.c.PI_8 ) { $this.a = av.c.PI_8 } 
				break;
				case 32: 
					if (av.app.paused) {
						av.app.ctrl("CONTINUE") ;
					}
					else {
						av.app.ctrl("PAUSE") ;
					}
				break;
			}
			$this.setMeter();
		});
		
		elem.addEventListener("touchstart", function(event){
			event.preventDefault();
			var touches = [];
			for(var i=0; i< event.targetTouches.length; i++) {
				touches[i] = {} ;
				touches[i].x = event.targetTouches[i].pageX ;
				touches[i].y = event.targetTouches[i].pageY  ;
			}
			$this.procStart(touches) ;
		});
		
		elem.addEventListener("touchmove", function(event){
			event.preventDefault();
			var touches = [];
			for(var i=0; i< event.targetTouches.length; i++) {
				touches[i] = {} ;
				touches[i].x = event.targetTouches[i].pageX ;
				touches[i].y = event.targetTouches[i].pageY  ;
			}
			$this.procMove(touches) ;
		},false);
		
		elem.addEventListener("touchend", function(event){
			event.preventDefault();
			$this.procEnd() ;
		});
		
		elem.addEventListener("mousedown", function(event){
			event.preventDefault();
			$this.mouse = true;			
		});
		
		elem.addEventListener("mouseup", function(event){
			$this.mouse = false;
			$this.procEnd();
		});
		
		elem.addEventListener("mousemove", function(event){
			event.preventDefault();
			if (!$this.mouse) return false;
			var touches = [ { x: event.clientX, y: event.clientY }];
			$this.procMove(touches) ;
		},false);
		
		
		document.addEventListener('click', function(e) { 
			var val = e.target.attributes.getNamedItem("data-btn") ;
			val = val && val.value ;
			console.log(val) ;
			switch(val) {
				case "start":
					av.app.level = parseInt(e.target.attributes.getNamedItem("data-level").value) ;
					if (av.app.level >=0 && av.app.level <=2) {
						av.app.ctrl("START");
					}
					else {
						av.util.tmpl(document.getElementById("alert-content"),document.getElementById("tmpl-alert-soon")) ;
						av.util.cAdd(document.getElementById("alert"),"alert-show") ;
					}
				break;
				case "tut":
					av.util.tmpl(document.getElementById("alert-content"),document.getElementById("tmpl-tut")) ;
					av.util.cAdd(document.getElementById("alert"),"alert-show") ;	
				break;
				case "continue":
					av.app.ctrl("CONTINUE");
				break;
				case "restart":
					av.app.ctrl("START");
				break;
				case "menu":
					av.app.ctrl("MENU");
				break;
			}
		});
		
		
	},
	procStart: function(touches) {
		var $this = this ;
		var rect = this.elem.getBoundingClientRect();
		for(var i=0; i< touches.length; i++) {
				$this.x1[i] = touches[i].x - rect.left;
				$this.y1[i] = touches[i].y - rect.top ;
			}
	},
	procEnd: function() {
		var $this = this ;
		for(var i=0; i< $this.x1.length; i++) {
				var x = $this.x1[i];
				var y = $this.y1[i]  ;
				var cp = av.cockpit ;
				var r2 = (cp.r-12)*(cp.r-12) ;
				if (Math.pow(x-(cp.start+cp.meters.length*cp.space),2) + Math.pow(y-cp.y,2) < r2) {
					if (av.app.paused) {
						av.app.ctrl("CONTINUE") ;
					}
					else {
						av.app.ctrl("PAUSE") ;
					}
				}
			}
	},
	procMove: function(touches) {
		var $this = this ;
		var rect = this.elem.getBoundingClientRect();
	
		for(var i=0; i< touches.length; i++) {
			var dx = (touches[i].x - rect.left) - $this.x1[i];
			var dy = $this.y1[i] - (touches[i].y - rect.top)   ;
			
			if ( (touches[i].y - rect.top) > 100 ) { 
				if (Math.abs(dy) > Math.abs(dx+dx)) {
					var yVal = $this.v ; 
					yVal+= dy / 500 ;
					if (yVal > $this.maxV ) { yVal = $this.maxV } 
					if (yVal < $this.minV ) { yVal = $this.minV } 
					$this.v= yVal ;
				}
				
				if (Math.abs(dx) > Math.abs(dy+dy)) {
					var xVal = $this.a ;
					xVal+= dx / 500;
					if (xVal < -av.c.PI_8 ) { xVal = -av.c.PI_8 } 
					if (xVal > av.c.PI_8 ) { xVal = av.c.PI_8 } 
					$this.a= xVal ;
				}
			}
			$this.x1[i] = touches[i].x - rect.left;
			$this.y1[i] = touches[i].y - rect.top ;
			$this.setMeter();
		}	
	},
	setMeter: function() {
		av.cockpit.values[0] = this.v * 11.7 + av.c.PIx0_75;
		av.cockpit.values[1] = this.a * 4 + av.c.PIx1_5   ;
	}
}

// ---------------------------------- BASE OBJ
av.obj = function(arg) {
	this.evt = "";
	this.evtT = 2500;
	this.blocked = false;
	this.vit = (arg && arg.vit) || 100;
	this.m = 1;
	this.p1 = { v: 200, a: av.c.PI_4 };
	this.p = (arg && arg.p) || { v: 200, a: av.c.PI_4 };
	this.dir = (arg && arg.dir) || 0;
	this.acc = { v: 0, a: 0 };
	this.sp = (arg && arg.sp) || { v: 0, a: 0 }  ;
	this.move = function(arg) {
		var fTot = { v:0, a:0 };
		if (arg && arg.drv) {
			fTot = { v: arg.drv.v , a: this.dir };
			//var rev = 1;
			var diff = this.sp.a - this.dir - av.c.PI_2 ;
			var drv = this.sp.v ;
			if ( this instanceof av.ship && this.sp.v < av.input.v / 6 ) { 
				drv = av.input.v / 4; 
				//console.log("*");
			}
				
			this.dir+= Math.sin(diff) * drv * arg.drv.a / -2  ;
			if (this.dir > Math.PI  ) this.dir= this.dir - av.c.PIx2;
			if (this.dir < -Math.PI ) this.dir= this.dir + av.c.PIx2;
		}
		var dT = arg.dT; 
		this.dT = dT;
		var res = arg.res;
		var f = arg.f;
		
		f.push ( { v: this.sp.v * res, a: this.sp.a - Math.PI });	
		
		for ( var i=0; i < f.length; i++ ) {
			fTot = av.util.addV(fTot,f[i]) ;
		}
		this.acc = 	{ v: fTot.v / this.m, a: fTot.a };	
		if (!this.blocked) {
			this.sp	= av.util.addV( this.sp , { v: this.acc.v * dT, a: this.acc.a } )  ;	
		}
		else {
			this.sp.v = 0;
		}
		this.p1 = { v: this.p.v, a: this.p.a } ;
		
		this.p = av.util.addV( this.p, { v: this.sp.v * dT, a: this.sp.a } );	
		
		this.x = this.p.v * Math.cos(this.p.a)  ;
		this.y = this.p.v * Math.sin(this.p.a)  ;
		this.custMove();
	};
	this.custMove = function() { };
	
	this.draw = function(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.dir + av.c.PI_2);		
		this.drawShape(ctx);
		ctx.restore();
	};
	this.drawShape = function() { } ;
	this.chkSand = function(x,y) {
		var result = false;
		var dest = ( (x | 0) + (y | 0) * av.background.img.width)*4 ;
		if ( av.background.img.data[dest] == av.app.sandVal[0] && av.background.img.data[dest+1] == av.app.sandVal[1] && av.background.img.data[dest+2] == av.app.sandVal[2] ) {
			result = true;
		}
		return result;
	}
}

// ---------------------------------- SHIP OBJ
av.ship = function(arg) {
	av.obj.call(this,arg);
	this.m = 3000;
	this.newWave = 0;
	this.xOff = 0;
	this.yOff = -10;
	this.drawShape = function(ctx) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#eee' ;
		ctx.fillStyle = "#ccc" ;
		ctx.lineJoin = 'round';
						
		ctx.shadowColor = '#023';
		ctx.shadowBlur = 3;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.beginPath();

		ctx.arc(this.xOff+75,this.yOff+15,90,2.8797932657906435,3.695,false); 
		ctx.arc(this.xOff-75,this.yOff+15,90,5.73,0.2617993877991494,false);
		ctx.closePath();
		ctx.fill();
					
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.beginPath();
			ctx.moveTo(-5,-5);
			ctx.lineTo(+5,+5);
			ctx.moveTo(-5,+5);
			ctx.lineTo(+5,-5);
			
			ctx.moveTo(-2,-2-30);
			ctx.lineTo(+2,+2-30);
			ctx.moveTo(-2,+2-30);
			ctx.lineTo(+2,-2-30);
			
			ctx.moveTo(-2,-2+25);
			ctx.lineTo(+2,+2+25);
			ctx.moveTo(-2,+2+25);
			ctx.lineTo(+2,-2+25);
			ctx.stroke();
						
			this.msg(ctx);
	}	
	this.custMove = function() {
		av.cockpit.values[2] = this.sp.v * 40 + av.c.PIx0_75;
		var d = 10 + 15*Math.abs(Math.cos(av.app.boat.sp.a - av.app.boat.dir)) ;
		if (!this.blocked 
			&& this.chkSand(this.x + d*Math.cos( av.app.boat.sp.a  ),this.y + d*Math.sin( av.app.boat.sp.a  ))) {
			this.blocked = true ;
			av.app.ctrl("WRECKED");
		}
		if (  this.sp.a < (this.dir + av.c.PI_4) && this.sp.a > (this.dir - av.c.PI_4) ) {
			this.newWave+=this.dT;	
			if (this.newWave > 100) {
				this.newWave = 0;
				av.app.obj.unshift( new av.wave( { sp: { v: this.sp.v / 2, a: this.sp.a + av.c.PI_2 },
												p:	av.util.addV({ v: this.p.v, a: this.p.a	},{ v:25,a:this.dir + .4 }),
												vit: 100 } ) ) ;
				av.app.obj.unshift( new av.wave( { sp: { v: this.sp.v / 2, a: this.sp.a - av.c.PI_2 },
												p:	av.util.addV({ v: this.p.v, a: this.p.a	},{ v:25,a:this.dir - .4 }),
												vit: 100 } ) ) ;
				av.app.obj.unshift( new av.wave( { sp: { v: this.sp.v / 8, a: this.sp.a + av.c.PI_2 },
												p:	av.util.addV({ v: this.p.v, a: this.p.a	},{ v:23,a:this.dir + 2.7 }),
												vit: 100 } ) ) ;
				av.app.obj.unshift( new av.wave( { sp: { v: this.sp.v / 8, a: this.sp.a - av.c.PI_2 },
												p:	av.util.addV({ v: this.p.v, a: this.p.a	},{ v:23,a:this.dir - 2.7 }),
												vit: 100 } ) ) ;	
			}														
		}
		if (this.evt.length) {
			this.evtT-=this.dT;
			if (this.evtT < 0) {
				this.evt = "";
				this.evtT = 2500;
			}
		}
	},
	this.msg = function(ctx) {
		var text = "";
		if (this.evt == "RSC") {
			text = "Rescured!" ;
		}
		if (this.evt == "HIT") {
			text = "Hit by boat!" ;
		}
		ctx.font = 'bold 14pt Comic Sans MS';
		ctx.lineWidth = 4;	
		ctx.rotate(-this.dir - av.c.PI_2);
		ctx.fillStyle = "#a20";
		ctx.strokeStyle = "#ddf";
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.strokeText(text,0,-40);
		ctx.fillText(text,0,-40);
	}
}

// ---------------------------------- WAVE OBJ
av.wave = function(arg) {
	av.obj.call(this,arg);
	this.custMove = function() { 
		this.vit-= Math.abs(this.dT/20) ;
		if (this.vit < 0) this.vit = 0 ;
		if (this.vit > 80) this.vit = 80 ;
		if (this.chkSand(this.x,this.y)) {
			this.vit = 0 ;
		}
	};
	this.drawShape = function(ctx) { 
		ctx.strokeStyle = 'lightblue' ;
		ctx.lineWidth = 3;	
		ctx.globalAlpha = 0.2 + this.vit / 100 ;
		ctx.beginPath();
		ctx.moveTo(-1,+1);
		ctx.lineTo(+1,-1);
		ctx.stroke();
	} ;
}

// ---------------------------------- WRECKED OBJ
av.wrc = function(arg) {
	av.obj.call(this,arg);
	this.health = 999;
	this.saveT = 3000;
	this.m = 100;
	this.custMove = function() { 
		if (this.chkSand(this.x,this.y)) {
			this.blocked = true ;
		}
		if (this.coll ) {
			if (av.app.boat.sp.v > 0.008 ) {
				this.health = 0;
				this.vit = 0;
				av.app.boat.evt = "HIT";
				av.app.wrcLeft--;
				this.evtT = 2500;
			}
			else {
				this.health-=this.dT;
				if (this.health < 0 ) { 
					this.health = 0;
					this.vit = 0;
					av.app.boat.evt = "HIT";
					av.app.wrcLeft--;
					this.evtT = 2500;
				}
			}
		}
		if (this.rescure)  {
			this.saveT-=this.dT;
			if (this.saveT < 0 )  { 
				this.saveT = 0;
				this.vit = 0;
				av.app.boat.evt = "RSC";
				av.app.wrcLeft--;
				this.isRescured = true;
				this.evtT = 2500;
			}
		}
		else {
			this.saveT = 3000;
		}
		if (!av.app.wrcLeft) {
			av.app.ctrl("WRC0");
		}
		var diff = av.util.subV(this.p,av.app.boat.p);
		this.textDir = diff.a;
		this.dist = diff.v;
		if (this.dist < 100) {
			this.dir = diff.a;
		}
	};
	this.drawShape = function(ctx) { 
		ctx.shadowColor = '#023';
		ctx.shadowBlur = 3;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		
		ctx.lineJoin = 'round';		
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#FFDDAA' ;		
		ctx.moveTo(-4,0);
		ctx.lineTo(-9,3);
		ctx.lineTo(-10,8);
		ctx.moveTo(4,0);
		ctx.lineTo(9,3);
		ctx.lineTo(10,8);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.fillStyle = "yellow" ;
		av.util.roundRect(ctx, -6, -4, 12, 8, 2, true , false);
		ctx.fillStyle = "orange" ;
		av.util.roundRect(ctx, -8, -5, 16, 7, 2, true , false);
		
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.beginPath();
		ctx.arc(0,0,3,0,av.c.PIx2) ;
		ctx.fillStyle = "brown" ;
		ctx.fill();
		
		if (this.dist < 100 ) {
			var x = 50*Math.cos(this.textDir) ;
			var y = 50*Math.sin(this.textDir) ;
			ctx.font = '8pt Comic Sans MS';
			ctx.rotate(-this.dir - av.c.PI_2);
			ctx.fillStyle = "#000";
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillText("health",x,y-15);
			
			ctx.beginPath();
			ctx.fillStyle = "#ccc";
			ctx.rect(x-25,y-5,50,5);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.rect(x-25,y-4,45*this.health/999,3);
			ctx.fill();
			
			ctx.fillStyle = "#000";
			ctx.fillText("save time",x,y+7);
			ctx.beginPath();
			ctx.fillStyle = "#ccc";
			ctx.rect(x-25,y+17,50,5);
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.rect(x-25,y+18,45*this.saveT/3000,3);
			ctx.fill();
		}
	} 
}

// ---------------------------------- COLLOSION DETECT
av.coll = {
	items: [],
	detect: function() {
		var ctrl1 = av.util.addV(av.app.boat.p, { v: 40, a: av.app.boat.dir }  ) ; 
		var ctrl2 = av.util.addV(av.app.boat.p, { v: -30, a: av.app.boat.dir }  ) ; 
		for (i=0; i<this.items.length; i++) {
			var dist1 = av.util.subV(ctrl1 , this.items[i].p ).v ;
			var dist2 = av.util.subV(ctrl2 , this.items[i].p ).v ;
			if ( (dist1 + dist2) < 75 ) {
				this.items[i].coll = true;
			}
			else {
				this.items[i].coll = false;
			}
		}
		var ctrl1 = av.util.addV(av.app.boat.p, { v: 45, a: av.app.boat.dir }  ) ; 
		var ctrl2 = av.util.addV(av.app.boat.p, { v: -35, a: av.app.boat.dir }  ) ; 
		for (i=0; i<this.items.length; i++) {
			var dist1 = av.util.subV(ctrl1 , this.items[i].p ).v ;
			var dist2 = av.util.subV(ctrl2 , this.items[i].p ).v ;
			if ( (dist1 + dist2) < 101 ) {
				this.items[i].rescure = true;
			}
			else {
				this.items[i].rescure = false;
			}
		}
	}
}

// ---------------------------------- DRAW COCKPIT
av.cockpit = {
	r: 32,
	space: 100,
	start: 150,
	y: 45,
	meters: [1,0,1,1,0,1],
	title: ["Throttle","Steering","Speed","Wind speed","Wind direction","Time left"],
	values: [av.c.PIx0_75,av.c.PIx1_5] ,
	draw: function(arg) {
		var ctx = arg.ctx ;
		var elem = arg.elem ;
		ctx.save();
		ctx.lineCap = 'round';
		ctx.strokeStyle = "#76a698" ;
		ctx.lineWidth = 4;		
		
		for (var i=0; i< this.meters.length; i++) {
			if (this.meters[i]) {
				ctx.beginPath();
				ctx.moveTo( this.start+i*this.space,this.y );
				ctx.lineTo( this.start+i*this.space+(this.r-5)*Math.cos(this.values[i]),this.y+(this.r+-5)*Math.sin(this.values[i]));
				ctx.stroke();
			}
			else {
				ctx.beginPath();
				ctx.moveTo(this.start+i*this.space+(this.r-8)*Math.cos(this.values[i]-av.c.PI_18),this.y+(this.r-8)*Math.sin(this.values[i]-av.c.PI_18)) ;
				ctx.lineTo(this.start+i*this.space+(this.r-4)*Math.cos(this.values[i]),this.y+(this.r-4)*Math.sin(this.values[i])) ;
				ctx.lineTo(this.start+i*this.space+(this.r-8)*Math.cos(this.values[i]+av.c.PI_18),this.y+(this.r-8)*Math.sin(this.values[i]+av.c.PI_18)) ;
				ctx.stroke();
			}
		}
		if (this.values[0] < av.c.PIx0_75-0.01) {
			ctx.font = 'bold 8pt Comic Sans MS';
			ctx.fillStyle = "#a20";
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillText("Rev",this.start,this.y+22);
		}
		ctx.restore();
	}
}

// ---------------------------------- DRAW BACKGROUND
av.background = {
	trees: {
		0: [{x:151,y:141},
			{x:122,y:122},
			{x:133,y:133}],
		2: [{x:105,y:75}],
		1: [{x:105,y:75},
			{x:105,y:75}]
	},
	chkSpace: function(xp,yp,w,h) {
		var result = 0;
		xp = xp | 0;
		yp = yp | 0;
		for (var y=0; y < h ; y++) {
			for (var x=0; x < w ; x++) {
				var idx = (xp+x  + (y+yp) * av.background.img.width)*4 ;
				result+=av.background.img.data[idx] + av.background.img.data[idx+1] + av.background.img.data[idx+2] ;
			}
		}
		return result;
	},
	draw: function(level) {
		// background
		var ctx = av.canvas.bgCtx ;
		ctx.save();
		ctx.fillStyle = "#99cccc";
		ctx.beginPath();
		ctx.rect(0,0,998,100);
		ctx.fill();
		// METERS
		var cp = av.cockpit ;
		
		ctx.strokeStyle = "#336666" ;
		ctx.lineWidth = 3;		
		ctx.fillStyle = "#76a698";
		ctx.font = '10pt Comic Sans MS';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		
		for (var i=0; i< cp.meters.length; i++) {
			ctx.beginPath();
			ctx.arc(cp.start+i*cp.space,cp.y,cp.r,0,av.c.PIx2,false);
			ctx.stroke();
			if (cp.meters[i]) {
				ctx.beginPath();
				ctx.moveTo(cp.start+i*cp.space+(cp.r-5)*Math.cos(0.75*Math.PI),cp.y+(cp.r-5)*Math.sin(0.75*Math.PI));
				ctx.lineTo(cp.start+i*cp.space+(cp.r+5)*Math.cos(0.75*Math.PI),cp.y+(cp.r+5)*Math.sin(0.75*Math.PI));
				ctx.moveTo(cp.start+i*cp.space+(cp.r-5)*Math.cos(0.25*Math.PI),cp.y+(cp.r-5)*Math.sin(0.25*Math.PI));
				ctx.lineTo(cp.start+i*cp.space+(cp.r+5)*Math.cos(0.25*Math.PI),cp.y+(cp.r+5)*Math.sin(0.25*Math.PI));
				ctx.stroke();
			}	
			else {
				ctx.beginPath();
				ctx.arc(cp.start+i*cp.space,cp.y,cp.r-12,0,av.c.PIx2,false);
				ctx.fill();
			}
			ctx.fillText(cp.title[i] , cp.start+i*cp.space, cp.y+cp.r + 10 );
		}
		ctx.beginPath();
		ctx.arc(cp.start+cp.meters.length*cp.space,cp.y,cp.r-12,0,av.c.PIx2,false);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(cp.start+cp.meters.length*cp.space,cp.y,cp.r,0,av.c.PIx2,false);
		ctx.moveTo( cp.start+cp.meters.length*cp.space -10,cp.y -5);
		ctx.lineTo( cp.start+cp.meters.length*cp.space -10,cp.y +5);
		ctx.moveTo( cp.start+cp.meters.length*cp.space -5,cp.y -5);
		ctx.lineTo( cp.start+cp.meters.length*cp.space -5,cp.y +5);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth = 2;		
		ctx.moveTo( cp.start+cp.meters.length*cp.space -2,cp.y +6);
		ctx.lineTo( cp.start+cp.meters.length*cp.space +3,cp.y -6);
		ctx.stroke();
		ctx.lineWidth = 3;		
		
		ctx.beginPath();
		ctx.fillStyle = "#336666";
		ctx.moveTo( cp.start+cp.meters.length*cp.space +5,cp.y -5);
		ctx.lineTo( cp.start+cp.meters.length*cp.space +5,cp.y +5);
		ctx.lineTo( cp.start+cp.meters.length*cp.space +12,cp.y +0);
		ctx.closePath();
		ctx.fill();		
						
		// #path2993
		ctx.translate(0,-400);
		
		if (av.app.levels[level].island[0]) {	
			// 1. sziget	
			ctx.fillStyle = 'rgb(153, 204, 204)';
			ctx.beginPath();
			ctx.moveTo(365, 843);
			ctx.bezierCurveTo(365, 876, 341, 902, 313, 917);
			ctx.bezierCurveTo(267, 941, 220, 914, 171, 897);
			ctx.bezierCurveTo(140, 886, 98, 894, 89, 860);
			ctx.bezierCurveTo(77, 770, 189, 762, 251, 770);
			ctx.bezierCurveTo(303, 784, 365, 788, 365, 843);
			ctx.closePath();
			ctx.fill();
			
			// #path4488
			ctx.fillStyle = av.app.sandColor;
			ctx.beginPath();
			ctx.moveTo(341, 848);
			ctx.bezierCurveTo(322, 868, 276, 858, 237, 879);
			ctx.bezierCurveTo(198, 900, 147, 878, 133, 860);
			ctx.bezierCurveTo(115, 812, 152, 793, 179, 788);
			ctx.bezierCurveTo(212, 783, 370, 799, 341, 848);
			ctx.closePath();
			ctx.fill();
			
			// #path4490
			ctx.fillStyle = av.canvas.pattGrass;
			ctx.beginPath();
			ctx.moveTo(173, 863);
			ctx.bezierCurveTo(140, 841, 163, 814, 172, 809);
			ctx.bezierCurveTo(192, 796, 268, 806, 274, 807);
			ctx.bezierCurveTo(285, 811, 315, 823, 317, 834);
			ctx.bezierCurveTo(319, 844, 281, 855, 264, 859);
			ctx.bezierCurveTo(249, 862, 195, 869, 173, 863);
			ctx.closePath();
			ctx.fill();
			
			this.tree({x:180,y:820,d:0});
			this.tree({x:199,y:824,d:2});
			this.tree({x:215,y:840,d:1});
			this.tree({x:240,y:830,d:-2});
			this.tree({x:255,y:845,d:1});
			this.tree({x:265,y:820,d:-1});
			this.tree({x:285,y:830,d:0});
		}
		
		if (av.app.levels[level].island[1]) {	
		// #path4462  2.sziget
			ctx.fillStyle = 'rgb(153, 204, 204)';
			ctx.beginPath();
			ctx.moveTo(862, 920);
			ctx.bezierCurveTo(862, 948, 780, 941, 753, 953);
			ctx.bezierCurveTo(706, 973, 705, 1004, 655, 989);
			ctx.bezierCurveTo(624, 979, 593, 960, 585, 932);
			ctx.bezierCurveTo(578, 906, 617, 887, 641, 873);
			ctx.bezierCurveTo(682, 848, 718, 846, 766, 854);
			ctx.bezierCurveTo(808, 867, 862, 872, 862, 920);
			ctx.closePath();
			ctx.fill();
			
			// #path4484
			ctx.fillStyle = av.app.sandColor;
			ctx.beginPath();
			ctx.moveTo(804, 900);
			ctx.bezierCurveTo(792, 927, 663, 971, 625, 931);
			ctx.bezierCurveTo(612, 923, 656, 882, 718, 865);
			ctx.bezierCurveTo(766, 858, 805, 879, 804, 900);
			ctx.closePath();
			ctx.fill();
			
			ctx.fillStyle = av.canvas.pattGrass;
			ctx.beginPath();
			ctx.moveTo(713, 931);
			ctx.bezierCurveTo(698, 936, 666, 929, 661, 924);
			ctx.bezierCurveTo(655, 917, 666, 901, 675, 896);
			ctx.bezierCurveTo(681, 891, 738, 858, 769, 883);
			ctx.bezierCurveTo(800, 909, 728, 926, 713, 931);
			ctx.closePath();
			ctx.fill();
			
			this.tree({x:700,y:890,d:0});
			this.tree({x:700,y:910,d:2});
			this.tree({x:725,y:890,d:-1});
			this.tree({x:745,y:890,d:-2});
			this.tree({x:735,y:910,d:0});
		}
	
		if (av.app.levels[level].island[2]) {	
		// #path4464  3.sziget
			ctx.fillStyle = 'rgb(153, 204, 204)';
			ctx.beginPath();
			ctx.moveTo(854, 780);
			ctx.bezierCurveTo(849, 812, 835, 798, 817, 790);
			ctx.bezierCurveTo(788, 773, 776, 712, 724, 697);
			ctx.bezierCurveTo(695, 680, 543, 726, 540, 691);
			ctx.bezierCurveTo(537, 661, 590, 622, 615, 609);
			ctx.bezierCurveTo(658, 586, 728, 579, 773, 594);
			ctx.bezierCurveTo(809, 606, 828, 637, 843, 673);
			ctx.bezierCurveTo(848, 685, 856, 767, 854, 780);
			ctx.closePath();
			ctx.fill();
			
		// #path4469
			ctx.fillStyle = av.app.sandColor;
			ctx.beginPath();
			ctx.moveTo(681, 666);
			ctx.bezierCurveTo(665, 683, 599, 686, 584, 675);
			ctx.bezierCurveTo(572, 665, 614, 631, 626, 630);
			ctx.bezierCurveTo(637, 625, 685, 645, 681, 666);
			ctx.closePath();
			ctx.fill();
			
		// #path4471
			ctx.fillStyle = av.app.sandColor;
			ctx.beginPath();
			ctx.moveTo(748, 657);
			ctx.bezierCurveTo(734, 656, 715, 650, 709, 635);
			ctx.bezierCurveTo(706, 623, 731, 602, 742, 601);
			ctx.bezierCurveTo(759, 598, 792, 614, 801, 633);
			ctx.bezierCurveTo(801, 648, 762, 657, 748, 657);
			ctx.closePath();
			ctx.fill();
			
		// #path4473
			ctx.fillStyle = av.app.sandColor;
			ctx.beginPath();
			ctx.moveTo(839, 730);
			ctx.bezierCurveTo(842, 743, 842, 766, 835, 777);
			ctx.bezierCurveTo(826, 786, 820, 761, 809, 751);
			ctx.bezierCurveTo(805, 744, 775, 728, 780, 710);
			ctx.bezierCurveTo(784, 697, 823, 694, 828, 703);
			ctx.bezierCurveTo(832, 710, 837, 722, 839, 730);
			ctx.closePath();
			ctx.fill();
			
		// #path4478
			ctx.fillStyle = av.canvas.pattGrass;
			ctx.beginPath();
			ctx.moveTo(832, 729);
			ctx.bezierCurveTo(839, 784, 789, 728, 792, 715);
			ctx.bezierCurveTo(795, 706, 822, 704, 825, 710);
			ctx.bezierCurveTo(828, 715, 831, 724, 832, 729);
			ctx.closePath();
			ctx.fill();
			
			this.tree({x:810,y:710,d:0});
			this.tree({x:815,y:730,d:-1});
			
			
		// #path4480
			ctx.fillStyle = av.canvas.pattGrass;
			ctx.beginPath();
			ctx.moveTo(768, 617);
			ctx.bezierCurveTo(814, 649, 732, 647, 725, 637);
			ctx.bezierCurveTo(720, 629, 735, 611, 742, 612);
			ctx.bezierCurveTo(748, 613, 763, 615, 768, 617);
			ctx.closePath();
			ctx.fill();
			
			this.tree({x:740,y:620,d:0});
			this.tree({x:750,y:630,d:2});
			this.tree({x:765,y:630,d:-1});
				
		// #path4482
			ctx.fillStyle = av.canvas.pattGrass;
			ctx.beginPath();
			ctx.moveTo(599, 666);
			ctx.bezierCurveTo(594, 658, 608, 646, 618, 643);
			ctx.bezierCurveTo(639, 634, 654, 643, 659, 646);
			ctx.bezierCurveTo(677, 671, 615, 675, 599, 666);
			ctx.closePath();
			ctx.fill();
			
			this.tree({x:610,y:650,d:0});
			this.tree({x:625,y:660,d:2});
			this.tree({x:645,y:650,d:-1});
		}
									
		ctx.restore();
		this.img = ctx.getImageData(0,0,av.canvas.bgElem.width,av.canvas.bgElem.height) ;
	},
	tree: function(pos) {
		var x=pos.x;
		var y=pos.y;
		var d=pos.d || 0;
		var ctx = av.canvas.bgCtx ;
		ctx.save();
		ctx.shadowColor = '#023';
		ctx.shadowBlur = 3;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.translate(x,y);
		ctx.beginPath();
		ctx.fillStyle = av.canvas.pattTreeDark;
		
		ctx.arc(-2,-2,5+d,0,av.c.PIx2);
		ctx.arc(3,-0,6+d,0,av.c.PIx2);
		ctx.arc(-3,3,5+d,0,av.c.PIx2);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = av.canvas.pattTree;
		ctx.arc(1,1,4,0+d,av.c.PIx2);
		ctx.fill();
		
		
		ctx.restore();
	}
	
}

// ---------------------------------- MAIN APP
av.app =  {
	sandColor: "#efdab5",
	sandVal: [239,218,181],
	startT: null,
	runT: true,
	paused: true,
	firstRun: 30,
	obj: [],
	wind: { v: 0.015, a: Math.PI },  // max 0.05
	levels: [
		{ title: "Level 1", wrc: 2, island: [1,0,0], wind: { v: 0.002, a: Math.PI } },
		{ title: "Level 2", wrc: 4, island: [1,1,0], wind: { v: 0.007, a: 1.76 } },
		{ title: "Level 3", wrc: 6, island: [1,1,1], wind: { v: 0.015, a: -1.3 } }
	],
	level: 0,
	start: function() {
		av.util.fixConsole(false);
		
		var detect = av.detect() ;
		if (!detect.canvas) {
			document.getElementById("notSupp").className="" ;
			return false;
		}
		if (window.innerHeight > window.innerWidth) {
			av.util.cRem(document.getElementById("rotScr"),"hide") ;	
			return false;
		}
		av.util.cRem(document.getElementById("container"),"hide") ;	
		
		console.log("ready");
		
		av.startPage(document.getElementById("start-canvas").getContext("2d"));
		
		var $this = this ;
		
		window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
			function(callback) {
			  window.setTimeout(callback, 1000 / 60);
			};
		  })();
								
		var ctx = av.canvas.init();
		av.background.draw(this.level);
		
		
		
		av.input.init(ctx.elem);
		this.boat = new av.ship ;
		
		(function animloop(){ 
			if (!$this.paused) {
				var dT = av.anim.calcDT();
				if ($this.firstRun) {
					$this.firstRun--;
				}	
				else {
					if ($this.runT) {
						$this.timer-= dT / 1000 ;
						if ($this.timer < 0) {
							$this.timer = 0;
							$this.runT = false ;
							$this.ctrl("END-TIME");
						}
						av.cockpit.values[5] = $this.timer * 0.039 + av.c.PIx0_75;
					}
				
					av.canvas.clr();
					av.cockpit.draw(ctx) ;
					
					ctx.ctx.save();
					ctx.ctx.beginPath() ;
					ctx.ctx.rect(0,100,ctx.elem.width,ctx.elem.height-100);
					ctx.ctx.clip();
										
					for (var i=0; i < $this.obj.length; i++) {
						var arg = { dT: dT,
									res: 0,
									f:[],
									drv: { v: 0 , a: 0 }
							};
						if ($this.obj[i] instanceof av.wrc) {
							arg = { dT: dT,
									res: 5,
									f:[{v:av.app.wind.v/2, a:av.app.wind.a}],
									drv: { v: 0 , a: 0 }
							};
						}
						$this.obj[i].move(arg);
						$this.obj[i].draw(ctx.ctx);
					}
					
					var arg = { dT: dT,
								res: 3,
								f:[av.app.wind],
								drv: { v: av.input.v , a: av.input.a }
					};
					$this.boat.move(arg);
					$this.boat.draw(ctx.ctx);
				}
				
				ctx.ctx.restore();
				
				av.coll.detect() ;
				var i= $this.obj.length - 1 ;  
				do { 
					if( $this.obj[i] && $this.obj[i].vit<1 ) { 
						var o = $this.obj[i] ;
						$this.obj.splice(i,1) ; 
						delete o;
					} 
					else { 
						i--; 
					}  
				} while(i>=0) ;
				
				av.cockpit.values[3] = $this.wind.v * 33 + av.c.PIx0_75;
				av.cockpit.values[4] = $this.wind.a    ;
			}
			window.requestAnimFrame(animloop) ; 
			})();
	},
	ctrl: function(op) {
		switch (op) {
			case "MENU":
				av.util.cRem(document.getElementById("game"),"opa") ;	
				av.util.cRem(document.getElementById("alert"),"alert-show") ;	
				av.util.cAdd(document.getElementById("game"),"hide") ;  
				av.util.cRem(document.getElementById("start"),"hide") ;	
				av.util.cRem(document.getElementById("ftr"),"hide") ;	
			break;
			case "START":
				av.canvas.clr();
				av.canvas.clrBg();
				av.background.draw(this.level);
				av.input.v = 0;
				av.input.a = 0;
				av.cockpit.values = [av.c.PIx0_75,av.c.PIx1_5] ;
				this.timer = 120;
				this.runT = true;
				this.boat.p = { v: 200, a: av.c.PI_4 } ;
				this.boat.sp = { v: 0, a: 0 } ;
				this.boat.dir = 0;
				this.boat.blocked = false;
				this.boat.evt = "";
				this.paused = false;
				this.firstRun = 30;
				
				av.util.cRem(document.getElementById("game"),"opa") ;	
				av.util.cRem(document.getElementById("alert"),"alert-show") ;	
				av.util.cRem(document.getElementById("game"),"hide") ; 
				av.util.cAdd(document.getElementById("start"),"hide") ;			
				av.util.cAdd(document.getElementById("tut"),"hide") ;
				av.util.cAdd(document.getElementById("ftr"),"hide") ;	
				
				this.wind = this.levels[this.level].wind ;
				
				av.coll.items = [] ;
				this.objCleanUp();
				
				for(var i=0; i< this.levels[this.level].wrc ; i++) {
					var o;
					o = new av.wrc( { 	p:	this.getWrcPos(),	vit: 100 , dir: av.c.PIx2*Math.random() } ) ;
					av.app.obj.push( o ) ;
					av.coll.items.push( o );
				}
				
				this.wrcLeft = av.coll.items.length ;
				break;
			case "CONTINUE":
				av.util.cRem(document.getElementById("game"),"opa") ;	
				av.util.cRem(document.getElementById("alert"),"alert-show") ;	
				av.anim.T1 = Date.now() ;
				av.anim.T2 = Date.now() ;
				this.paused = false ;
				break;
			case "PAUSE":
				av.util.cAdd(document.getElementById("game"),"opa") ;	
				av.util.tmpl(document.getElementById("alert-content"),document.getElementById("tmpl-alert-pause")) ;
				av.util.cAdd(document.getElementById("alert"),"alert-show") ;	
				this.paused = true ;
				break;
			case "WRECKED":
				this.runT = false;
				av.util.cAdd(document.getElementById("game"),"opa") ;	
				av.util.tmpl(document.getElementById("alert-content"),document.getElementById("tmpl-alert-wrecked"),this.chkResult()) ;
				av.util.cAdd(document.getElementById("alert"),"alert-show") ;
				this.paused = true ;
				break;
			case "END-TIME":
				this.runT = false;
				av.util.cAdd(document.getElementById("game"),"opa") ;	
				av.util.tmpl(document.getElementById("alert-content"),document.getElementById("tmpl-alert-end-time"),this.chkResult()) ;
				av.util.cAdd(document.getElementById("alert"),"alert-show") ;
				this.paused = true ;
				break;
			case "WRC0":
				this.runT = false;
				av.util.cAdd(document.getElementById("game"),"opa") ;	
				av.util.tmpl(document.getElementById("alert-content"),document.getElementById("tmpl-alert-end"),this.chkResult()) ;
				av.util.cAdd(document.getElementById("alert"),"alert-show") ;
				this.paused = true ;
				break;
		}
	},
	objCleanUp: function() {
		for (var i=0; i < this.obj.length; i++) {
			delete this.obj[i];
		}
		this.obj = [];
	},
	chkResult: function() {
		var all= 0; 
		var rsc = 0; 
		var health = 0;
		 
		for (var i=0; i<av.coll.items.length; i++) {   
			if (av.coll.items[i] instanceof av.wrc) {
				all++;
				health+=av.coll.items[i].health ;
				if (av.coll.items[i].isRescured) {
					rsc++;
				}
			}
		}
		var refHealth = 999 * all ;
		console.log(all,rsc,health,refHealth);
		return { all: all, rsc: rsc }
	},
	getWrcPos: function() {
		var result = {};
		var done = 0;
		var xOff = av.canvas.elem.width * 0.05 ;
		var yOff = av.canvas.elem.height * 0.05 + 100 ;
		var w = av.canvas.elem.width * 0.9;
		var h =  av.canvas.elem.height * 0.9 - 100 ;
		do {
			var x = xOff + Math.random() * w ;
			var y = yOff + Math.random() * h ;
			done = !av.background.chkSpace(x,y,32,32);
			result = { v: Math.sqrt(x*x+y*y), a: Math.atan2(y,x) } ;
			if (av.util.subV(av.app.boat.p,result).v < 250) {
				done = 0;
			}
			for (var i=0; i<av.coll.items.length; i++) {
				if (av.util.subV(av.coll.items[i].p,result).v < 100) {
					done = 0;
				}
			}
			console.log(done) ;
		} while (!done);
		
		return result;
	}
}

// ---------------------------------- FEATURES
av.detect = function() {
	var result = { canvas : false } ;
	var e = document.getElementById("myCanvas") ;
	if (e) {
		result.canvas = !!(e.getContext && e.getContext('2d') && e.getContext('2d').fillText) ;
	}
	
	return result;
}

// ---------------------------------- START
setTimeout(function(){ 
	av.app.start();
	},100);
	
	
