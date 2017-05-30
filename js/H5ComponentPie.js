/* 饼图组件对象 */

var H5ComponentPie = function(name, cfg){
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;

	// 加入画布 ——底图层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',1);
	component.append(cns);

	var r = w/2;
	
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();


	// 加入画布 ——数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',2);
	component.append(cns);

	var colors = ['red', 'green', 'blue', 'orange', 'purple'];
	var sAngel = 1.5*Math.PI;  // 起始角度
	var eAngel = 0; // 结束角度
	var aAngel = Math.PI*2;  // 100%的圆结束的角度

	var step = cfg.data.length;
	for (var i = 0; i < step; i++) {
		var item = cfg.data[i];
		var color = item[2] || (item[2] = colors.pop());
		eAngel = sAngel + aAngel * item[1];


		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fill();
		ctx.stroke();

		sAngel = eAngel;

		// 加入项目文本
		var text = $('<div class="text">');
		var per = $('<div class="per">');
		text.text(cfg.data[i][0]);
		per.text(cfg.data[i][1]*100+'%');
		text.append(per);

		var x = r + Math.sin(0.5*Math.PI - sAngel) * r;
		var y = r + Math.cos(0.5*Math.PI - sAngel) * r;

		if(x>w/2){
			text.css('left',x/2);
		}else{
			text.css('right',(w-x)/2);
		}
		if(y>h/2){
			text.css('top',y/2);
		}else{
			text.css('bottom',(h-y)/2);
		}
		if(cfg.data[i][2]){
			text.css('color',cfg.data[i][2]);
		}
		text.css('opacity',0);
		component.append(text);

	}


	// 加入画布 ——遮罩层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex',3);
	component.append(cns);

	var r = w/2;
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;

	var draw = function(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per <= 0){
			ctx.arc(r,r,r,0,2*Math.PI);
			component.find('.text').css('opacity',0);
		}else{
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		}
		ctx.fill();
		ctx.stroke();

		if(per >= 1){
			component.find('.text').css('opacity',1);
		}
	}

	draw(0);
	component.on('onLoad',function(){
		// 饼图生长动画
		var s = 0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500);
		}
	});
	component.on('onLeave',function(){
		// 饼图退场动画
		var s = 1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=.01;
				draw(s);
			},i*10);
		}
	});

	return component;
}








