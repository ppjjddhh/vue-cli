const directives = {
	'fixed-height':{
		inserted(el){
			var rect = el.getBoundingClientRect(),clientHeight = document.documentElement.clientHeight;
		    el.style.height = clientHeight - rect.top +'px';
		}
	}
}
export default directives