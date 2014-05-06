'use strict';


var Pisang = {};


(function(){
	//Init Pisang
	function _getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	
	Pisang = {
		version : '0.1',
		defaultFill : null,
		shapes : [],
		fn : {},
		getMousePos : _getMousePos,
		events : {
			click: function(context, evt){
				var mousePos = Pisang.getMousePos(context, evt);
				  console.log('Detecting...');
				  Pisang.fn.colide(mousePos, 'onclick');
			}
		}
	};
	
})();



(function(){
	function _add(shape){
		Pisang.shapes.push(shape);
	};
	
	function _colide(position, eventType){
	console.log('check colission');
		var shapes = Pisang.shapes;
		for(var s in shapes){
			if(shapes[s].colide(position)){
				//alert('hit on item ' + s);
				console.log('hit on item ' + s);
				shapes[s].event[eventType](); 
			}
		}
		console.log('done');
	};
	
	function _draw(context){
	context.fillStyle = 'black';
	var s = Pisang.shapes;
		for(var i in s){
		console.log('drawing element ' + i);
		console.log('Drawing color: ' + s[i].fill);
			s[i].draw(context);
		}
	}
	Pisang.fn.add = _add;
	Pisang.fn.colide = _colide;
	Pisang.fn.draw = _draw;
})();

(function(){
	function _shape(config){
		var obj = {
			 position : config.position,
			 width : config.width,
			 height : config.height,
			 colide : function(position){
			  	return (position.x >= this.position.x && position.x <= (this.position.x + this.width)) && (position.x >= this.position.y && position.y <= (this.position.y + this.height));
			  }
		 }
		return obj;
	};
	
	function _init(x, y, width, height){
		var config = {
			position : {
				'x' : x,
				'y' : y
			},
			'width' : width,
			'height' : height,
			event : {}
			
			};
			return Pisang.shape(config);
	};
	
	function _newShape(x, y, width, height){
		var s = _init(x, y, width, height);
			
		Pisang.fn.add(s);
		}
	
	Pisang.shape = _shape;
	Pisang.newShape = _newShape;
	Pisang.fn.init = _init;
	
	function _rect(x, y, width, height, fill){
		var obj = {};
		obj = Pisang.fn.init(x,y,width,height);
		obj.fill = fill;
		
		obj.draw = function(context){
			var oldFill = context.fillStyle;
			context.beginPath();
			context.fillStyle = this.fill;
			context.rect(this.position.x, this.position.y, this.width, this.height);
			context.fill();
			context.stroke();
			context.closePath();
			context.fillStyle = oldFill;
		}
		
		obj.event = {
			onclick : function(){
				
			}
		}
		
		Pisang.fn.add(obj);
	};
	
	function _button(x, y, width, height, fill){
		var obj = {};
		obj = Pisang.fn.init(x,y,width,height);
		obj.fill = fill;
		
		obj.draw = function(context){
			var oldFill = context.fillStyle;
			context.beginPath();
			context.fillStyle = this.fill;
			context.rect(this.position.x, this.position.y, this.width, this.height);
			context.fill();
			context.stroke();
			context.closePath();
			context.fillStyle = oldFill;
		}
		
		obj.event = {
			onclick : function(){
				alert('You clicked on the ' + obj.fill + ' shape');
			}
		}
		Pisang.fn.add(obj);
	}
	
	Pisang.rect = _rect;
	Pisang.button = _button;
})();