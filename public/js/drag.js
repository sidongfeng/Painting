$(function() {
	$(document).mousemove(function(e) {
		if (!!this.move) {
			var boheight = $(window).height()-$(".room").height();
			var roomtop = boheight/2;
			var bowidth = $(window).width()-$(".room").width();
			var roomleft = bowidth/2;
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
				callback = document.call_down || function() {
					$(this.move_target).css({
						'top': e.pageY - posix.y - roomtop,
						'left': e.pageX - posix.x - roomleft-330
					});
						var imgleft = parseInt($(this.move_target).css("left"));
						var imgwidth = $(".llll").width()-$("#box").width()-10;
						var imgtop = parseInt($(this.move_target).css("top"));
						var imgheight = $(".llll").height()-$("#box").height()-10;
						//alert(imgtop);
						if(imgleft<10){
							//alert(1);
							$(this.move_target).css({
								'left':10
							});
						}else if(imgleft>imgwidth){
							$(this.move_target).css({
								'left':imgwidth
							});
						}
						if(imgtop<10){
							$(this.move_target).css({
								'top':10
							});
						}else if(imgtop>imgheight){
							$(this.move_target).css({
								'top':imgheight
							});
						}

						//alert(maxw);
				};

			callback.call(this, e, posix);
		}
	}).mouseup(function(e) {
		if (!!this.move) {
			var callback = document.call_up || function(){};
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});

	var $box = $('#box').mousedown(function(e) {
	    var offset = $(this).offset(); 
	    this.posix = {
			'x': e.pageX - offset.left,
			'y': e.pageY - offset.top
		};
	    $.extend(document, {'move': true, 'move_target': this});
	}).on('mousedown', '#coor', function(e) {
	    var posix = {
	            'w': $box.width(), 
	            //'h': $box.height(),
				'h': 'auto',
	            'x': e.pageX, 
	            'y': e.pageY
	        };
		var imgleft1 = parseInt($("#box").css("left"));
		var maxw = $(".llll").width()-imgleft1-10;
		var imgtop1 = parseInt($("#box").css("top"));
		var maxh = $(".llll").height()-imgtop1-10;


		//alert(maxw);
	    $.extend(document, {'move': true, 'call_down': function(e) {
	        $box.css({
	            'width': Math.max(30, e.pageX - posix.x + posix.w),
	            'height': Math.max(30, e.pageY - posix.y + posix.h),
				'max-width':maxw,
				'max-height':maxh
	        });

			var poi = $(".llll").height() - imgtop1 - $("#box").height();//距底部的距离
			var bi = $("#box img").width()/$("#box img").height(); //计算宽高比
			if(poi == 10){
				$("#box").width(bi*$("#box").height());
			}
	    }});
	    return false;
	});
});



$(document).ready(function(){
	/*默认背景图片*/
	var mrli = $(".pic>ul").eq(0).children().first();
	var mrimg = mrli.children("img").attr('src');
	$(".llll").css({
		"background": "url("+mrimg+")",
		"background-size":"100% auto",
		"background-position":"center center ",
		"background-repeat":"no-repeat"
	});
	/*选择纯色*/
	$(".boxbg td").click(function() {
		$(".boxbg td").removeClass("active");
		var c = $(this).attr("bgcolor");
		$(".boxbg td[bgcolor='"+c+"']").addClass("active");;
		$(".llll").css({
			"background": c
		});
	});
	/*选择图片*/
	$(".pic li img").click(function(){
		var url = $(this).attr('src');
		//alert(url);
		$(".llll").css({
			"background": "url("+url+")",
			"background-size":"100% auto",
			"background-position":"center center ",
			"background-repeat":"no-repeat"
		});
	})
		//tab
		//:eq() 选择器选取带有指定 index 值的元素。
		//index 值从 0 开始，所有第一个元素的 index 值是 0（不是 1）
		//siblings() 获得匹配集合中每个元素的同胞，通过选择器进行筛选是可选的。
		$(".type li").click(function () {
			$(".type li").eq($(this).index()).addClass("active").siblings().removeClass('active');
			$(".pic>ul").removeClass('on').eq($(this).index()).addClass("on");
			var firstli = $(".pic>ul").eq($(this).index()).children().first();
			var firstimg = firstli.children("img").attr('src');
			$(".llll").css({
				"background": "url("+firstimg+")",
				"background-size":"100% auto",
				"background-position":"center center ",
				"background-repeat":"no-repeat"
			});
		});
});
/*自定义图片*/
function change() {
	var pic = document.getElementById("preview"),
		file = document.getElementById("f");

	var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();

	// gif在IE浏览器暂时无法显示
	if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
		alert("图片的格式必须为png或者jpg或者jpeg格式！");
		return;
	}
	var isIE = navigator.userAgent.match(/MSIE/)!= null,
		isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

	if(isIE) {
		file.select();
		var reallocalpath = document.selection.createRange().text;

		// IE6浏览器设置img的src为本地路径可以直接显示图片
		if (isIE6) {
			pic.src = reallocalpath;
		}else {
			// 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
			pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
			// 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
			pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		}
	}else {
		html5Reader(file);
	}
}

function html5Reader(file){
	var file = file.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		var pic = document.getElementById("preview");
		pic.src=this.result;
		$(".llll").css({
			"background": "url("+this.result+")",
			"background-size":"100% auto",
			"background-position":"center center ",
			"background-repeat":"no-repeat"
		});
	}
}
 /*弹出*/
$(function () {
	//弹出框关闭按钮单击事件
	$(".close").click(function () {
		$(".view").css({"display":"none"});
	});
	//单击空白处关闭
	$(".viewbg").click(function () {
		$(".view").css({"display":"none"});
	})
	//“指向弹出”按钮的触发事件
	$(".mouseoveropen").mouseover(function () {
		$(".view").css({"display":"block"});
	});
});