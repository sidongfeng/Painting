
var drags = "";
function insert(){
	let html = "";
	$.getJSON('./data/compo.json',function(result){
		for (let i = 0; i < result["compos"].length; i++) {
			let c = result["compos"][i]["class"]
			let id = result["compos"][i]["id"]
			let height = result["compos"][i]["height"]
			let width = result["compos"][i]["width"]
			// if (c=="bg"){
			// 	html += ''
			// }
			html += '<div class="draggable_'+c+'_'+id+'" class="ui-widget-content">'
			html += '	<p><img src="images/clip/'+c+'/'+id+'.png"/></p>'
			html += '</div>'
		}
		$(".box").append(html)
	})
	return drags
}

