$(document).ready(function(){
	/* mode on index and upload */
	let html = "";
	if (document.URL.split('/')[document.URL.split('/').length-1] == "index"){
	    console.log(1)
	    // upload image
	    html += '<img src="images/semantic/bg.jpg"/>'
	    html += '<form action="/upload" method="POST" enctype="multipart/form-data" class="centered-element">'
	    html += '   <div class="file-field input-field">'
	    html += '       <div class="btn grey">'
	    html += '           <span>File</span>'
	    html += '           <input name="myImage" type="file">'
	    html += '       </div>'
	    html += '       <div class="file-path-wrapper">'
	    html += '           <input class="file-path validate" type="text">'
	    html += '       </div>'
	    html += '   </div>'
	    html += '   <button type="submit" class="btn">Submit</button>'
	    html += '</form>' 
	}else{
		console.log(file)
		// <img src="<%= typeof file != 'undefined' ? file : '' %>" class="responsive-img"></img>
	    // html += '<img src="<%= typeof file != '+"'undefined'"+' ? file : '+"''"+' %>" class="responsive-img">'
		
	}
	$(".box").append(html);



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
        let html = '';
        html += '<div id="draggable" class="ui-widget-content">';
        html += '<p>Drag me around</p>';
        html += '</div>'   ;                
        $(".box").append(html);
		// var url = $(this).attr('src');
		// //alert(url);
		// $(".llll").css({
		// 	"background": "url("+url+")",
		// 	"background-size":"100% auto",
		// 	"background-position":"center center ",
		// 	"background-repeat":"no-repeat"
		// });
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