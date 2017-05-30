/* 散点图表组件对象 */

var H5ComponentPoint = function(name,cfg){
	var component = new H5ComponentBase(name,cfg);
	var base = cfg.data[0][1]; // 以第一个数据的比例为大小的 100%

	// 输出每个point
	$.each(cfg.data, function(idx, item){
		var point = $('<div class="point point_'+idx+'">');

		var name = $('<div class="name">'+item[0]+'</div>');
		var per = $('<div class="per">'+(item[1]*100)+'%</div>');

		name.append(per);
		point.append(name);

		var per = (item[1]/base*100) +'%';

		point.width(per).height(per);

		if(item[2]){
			point.css('background-color',item[2]);
		}
		// debugger
		if(item[3] !== undefined && item[4] !== undefined){
			point.css('left',item[3]).css('top',item[4]);
			point.data('left',item[3]).data('top',item[4]);  // 暂存left、top到元素上
		}

		point.css('zIndex',100-idx);
		point.css('left',0).css('top',0);
		point.css('transition','all 1s '+idx*.5+'s');
		component.append(point);
	});

    // onLoad之后取出暂存的left、top 并且附加到 CSS 中
	component.on('onLoad',function(){
		component.find('.point').each(function(idx,item){
			$(item).css('left',$(item).data('left')).css('top',$(item).data('top'));
		})
	});

	// onLeave之后，还原初始的位置
	component.on('onLeave',function(){
		component.find('.point').each(function(idx,item){
			$(item).css('left',0).css('top',0);
		})
	});

	component.find('.point').on('click',function(){
        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');
        return false;
    }).eq(0).addClass('point_focus');

	return component;
}