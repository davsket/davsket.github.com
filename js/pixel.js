var PIXEL_SIZE = 20;
var grow = false;
var index = 0;
var TOP = 255;
 TOP = 155;
var BOTTOM = 0;
 BOTTOM = 100;
var magnitude = TOP;
var style = document.createElement('style');
style.id='mystyle';
document.body.appendChild(style);
window.addEvent('resize', function(){
});

setInterval(changeBackground, 30);

function changeBackground(){
	var todate = new Date();
	/*
	$$('html')[0].style.background=
	'#'+decimalToHexString(parseInt(todate.getMilliseconds()/999*255))
	+decimalToHexString(parseInt(todate.getMinutes()/59*255))
	+decimalToHexString(parseInt(todate.getSeconds()/59*255));
	*/
	magnitude += (grow?1:-1);
	
	var r = index==0?magnitude:((index==1&&grow)||(index==2&&!grow)?TOP:BOTTOM);
	var g = index==1?magnitude:((index==2&&grow)||(index==0&&!grow)?TOP:BOTTOM);
	var b = index==2?magnitude:((index==0&&grow)||(index==1&&!grow)?TOP:BOTTOM);
	$$('html')[0].style.background='#'+dTh(r)+''+dTh(g)+''+dTh(b);	
	var r2 = 255-r;
	var g2 = 255-g;
	var b2 = 255-b;
	document.getElementById('mystyle').textContent='.pixel:hover,.pixel.dark{background:#'+dTh(r2)+''+dTh(g2)+''+dTh(b2)+'}';
	if(magnitude>=TOP){
		grow=false;
		index = (index+2)%3;
		magnitude=TOP;
	}
	else if(magnitude<=BOTTOM){
		grow=true;
		index = (index+2)%3;
		magnitude=BOTTOM;
	}	
}

function drawPixels(){
	var width = window.getSize().x,
	height = window.getSize().y;
	/*
	for(var i=0; i<2500; i++){
		var pixel = new Element('div',{'class':'pixel',
		'style':'left:'+(i%50*2)+'%;top:'+Math.floor(i/50)*2+'%'
		});
		pixel.addEvent('mouseenter',mouseEnter);
		pixel.addEvent('mouseleave',mouseLeave);
		document.body.appendChild(pixel);
	}
	*/
	for(var i=0; i<height; i+=PIXEL_SIZE){
		for(var j=0; j<width; j+=PIXEL_SIZE){
			var pixel = new Element('div',{'class':'pixel',
			'style':'left:'+j+'px;top:'+i+'px;width:'+PIXEL_SIZE+'px;height:'+PIXEL_SIZE+'px;'
			});
			if(j+PIXEL_SIZE>width){
				pixel.style.width=(width-j)+'px';
			}
			if(i+PIXEL_SIZE>height){
				pixel.style.height=(height-i)+'px';
			}
			if(isPacman(i/PIXEL_SIZE,j/PIXEL_SIZE)){
				pixel.addClass('dark');
			}
			//pixel.addEvent('mouseenter',mouseEnter);
			//pixel.addEvent('mouseleave',mouseLeave);
			document.body.appendChild(pixel);
		}
	}
		
}
drawPixels();

function mouseEnter(){
	this.style.background='#222';
}
function mouseLeave(){
	this.style.background='';
}
function dTh(number)
{
    if (number < 0)
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return (number==0?'00':number.toString(16).toUpperCase());
}

function isInvader(r, c){
	var invader = [
		[0,0,1,0,0,0,0,0,1,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0,0],
		[0,0,1,1,1,1,1,1,1,0,0,0],
		[0,1,1,0,1,1,1,0,1,1,0,0],
		[1,1,1,1,1,1,1,1,1,1,1,0],
		[1,0,1,1,1,1,1,1,1,0,1,0],
		[1,0,1,0,0,0,0,0,1,0,1,0],
		[0,0,0,1,1,0,1,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0]];
	//if(invader.length<=r||invader[0].length<=c)
	//	return 0;
	return invader[r%9][c%12];
}

function isPacman(r, c){
	var invader = [
		[0,0,0,0,1,1,1,1,1,0,0,0,0],
		[0,0,1,1,1,1,1,1,1,1,1,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,0],
		[1,1,1,1,1,1,1,1,1,1,0,0,0],
		[1,1,1,1,1,1,1,0,0,0,0,0,0],
		[1,1,1,1,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,1,1,1,1,1,1,1,1,1,0,0],
		[0,0,0,0,1,1,1,1,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]];
	//if(invader.length<=r||invader[0].length<=c)
	//	return 0;
	return invader[r%14][c%14];
}

function cleanAll(){
	$$('div').setStyle('background', '');
}
