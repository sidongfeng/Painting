$(document).ready(function(){
	img_dict = {}
	/* load database images */
	$.ajaxSettings.async = false;
	$.getJSON('./data/compo.json',function(result){
		for (let i = 0; i < result["compos"].length; i++) {
			let idx = result["compos"][i]["id"];
			let c = result["compos"][i]["class"];
			let html = '<li><img src="images/clip/'+c+'/'+idx+'.png" /></li>';
			$("#"+c).append(html);
		}
	});


	/* load upload images */
	$.ajaxSettings.async = false;
	$.getJSON('./data/compo.json',function(result){
		// bg
		var node = document.createElement("DIV");
		node.setAttribute("id", 'bg');
		node.setAttribute("class", 'position-absolute');
		var img = document.createElement("IMG");
		img.src = "images/semantic/bg1.jpg";
		node.append(img)
		document.getElementsByClassName("box")[0].appendChild(node);
		
		for (let i = 0; i < result["compos"].length; i++) {
			let c = result["compos"][i]["class"]
			let idx = result["compos"][i]["id"]
			let height = result["compos"][i]["height"]
			let width = result["compos"][i]["width"]
			let x = result["compos"][i]["row_min"]
			let y = result["compos"][i]["column_min"]	
			// if (c=="bg"){
			// 	html += ''
			// }
			
			let id = 'draggable_'+c+'_'+idx;
			let html = "";
			html += '	<div id="'+id+'" class="position-absolute" style="top: '+x+'px; left: '+y+'px;">';
			html += '		<a class="objects" data-toggle="tooltip" data-placement="top" title="'+c+': '+width+'x'+height+'">'
			html += '			<img src="images/clip/'+c+'/'+idx+'.png" id="'+id+'header">'
			html += '		</a>'
			html += '</div>'
			$(".box").append(html)

			// draggable
			dragElement(document.getElementById(id));
			// add hover and click 
			click_hoverElement('#'+id+'header');
			// $('#'+id).draggable();
			// $('.image').resizable();

		} 
		
	})
		
	/* allow tooltip */
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});

	// /*默认背景图片*/
	// var mrli = $(".pic>ul").eq(0).children().first();
	// var mrimg = mrli.children("img").attr('src');
	// $(".llll").css({
	// 	"background": "url("+mrimg+")",
	// 	"background-size":"100% auto",
	// 	"background-position":"center center ",
	// 	"background-repeat":"no-repeat"
	// });
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
        // let html = '';
        // html += '<div id="draggable" class="ui-widget-content">';
        // html += '<p>Drag me around</p>';
        // html += '</div>'   ;                
		// $(".box").append(html);
		var node = document.createElement("DIV");
		node.setAttribute("id", 'draggable_'+url);
		node.setAttribute("class", 'position-absolute');
		var img = document.createElement("IMG");
		img.src = url;
		img.setAttribute("id", 'draggable_'+url+'header');
		node.append(img)
		document.getElementsByClassName("box")[0].appendChild(node);
		dragElement(document.getElementById('draggable_'+url));
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
/*custom image*/
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

// drag element function
function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
	  // if present, the header is where you move the DIV from:
	  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
	  // otherwise, move the DIV from anywhere inside the DIV: 
	  elmnt.onmousedown = dragMouseDown;
	}
	function dragMouseDown(e) {
	  e = e || window.event;
	  e.preventDefault();
	  // get the mouse cursor position at startup:
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  document.onmouseup = closeDragElement;
	  // call a function whenever the cursor moves:
	  document.onmousemove = elementDrag;
	}
	function elementDrag(e) {
	  e = e || window.event;
	  e.preventDefault();
	  // calculate the new cursor position:
	  pos1 = pos3 - e.clientX;
	  pos2 = pos4 - e.clientY;
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  // set the element's new position:
	  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
	function closeDragElement() {
	  // stop moving when mouse button is released:
	  document.onmouseup = null;
	  document.onmousemove = null;
	}
}

// click element in red
// hover element in blue
function click_hoverElement(id){
	$(id).hover(function(){
		$(this).css("border-style", "solid");
		// $(this).css("border-width", "5px");
		$(this).css("border-color", "lightblue");
		
		}, function(){
			if (!$(this).hasClass('active1')) {
				$(this).css("border-style", "none");
			}else{
				$(this).css("border-color", "red");
			}
	});
	$(id).click(function(){
		if ($(this).hasClass('active1')) {
			$(this).removeClass('active1');
		} else {
			$(this).addClass('active1');
			$(this).css("border-color", "red");
		}
	});
}