import Toast from './index.vue';
import Vue from 'vue';
function getTostInstance(properties){
       const _props = properties || {};
       const Instance = new Vue({
	       	render (h) {
	       		return h(Toast,{
	       			props:_props
	       		})
	       	}
       })
       const component = Instance.$mount();
       document.querySelector('.app').appendChild(component.$el);
       const toast = Instance.$children[0];
       return {
       	 show(option){
                  toast.title = option.title;
                  toast.title2 = option.title2;
       	 	toast.show = true;
       	 },
       	 hide(){
       	 	toast.show = false;
       	 },
       	 component: toast,
       	 destroy (element){
            setTimeout(function() {
                document.querySelector('.app').removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
       	 }

       }
}
export default getTostInstance