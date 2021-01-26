  let qs = JSON;
  export default class axiosType {
	constructor(config){
		this.config = config;
		if(config.path&&config.path.length){
            config.url+='/'+config.path.join('/');
		}
		this.init()
	}
	init(){
    let type = this.config.type||'formData';
		switch(type){
            case 'file':
            this.config.data = this.file();
            this.config.headers['Content-Type'] = 'multipart/form-data';
            break;
            case 'formData':
            this.config.data = this.getFormData();
            this.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            break;
            case 'json':
            this.config.data = qs.stringify(this.config.data);
            this.config.headers['Content-Type'] = 'application/json; charset=utf-8';
            break;
        }
	}
    file(){
       let data = this.config.data,formData = new FormData();
       Object.keys(data).forEach((key)=>{
            formData.append(key,data[key])
        });
       return formData
    }
	getFormData(){
        let data = this.config.data,formData='',params = new URLSearchParams();
        Object.keys(data).forEach((key)=>{
        	params.append(key,data[key])
        
        });
        return params
	}
}
