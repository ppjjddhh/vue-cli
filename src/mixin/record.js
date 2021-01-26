
const record = {
	data(){
		return {
			min_scrollTop:0,
            minState_name:''
		}
	},
	created(){
        
		let _this = this;
           let obj = _this.$store.state[_this.minState_name];
  
            if(obj){
                 Object.keys(obj).forEach((key)=>{
                     if(typeof _this.$data[key]!=='undefined'){
                        _this.$set(_this.$data,key,obj[key]);
                     }
                 	 
                 })
            }

	},
	beforeRouteLeave(to, from, next){	
         let  req = /^min_/,keys = [],_this = this,obj = {},name = _this.minState_name,scroll=_this.$refs.scroll;
         keys = Object.keys(_this.$data);
         keys.forEach((key)=>{
         	if(req.test(key)&&key!== 'min_type'){
               obj[key] = _this[key];
         	}
         })
         if(scroll){
         	obj.min_scrollTop = typeof scroll.scrollTop != 'undefined'?scroll.scrollTop:scroll.$el.scrollTop
         }
         this.$store.commit('setRoutes',{name,val:obj})
         next();
    }
}
export {record}