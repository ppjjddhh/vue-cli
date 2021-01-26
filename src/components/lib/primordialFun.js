let primordialFun = {
	isAndroid: !process?navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1:false, //android终端
    isiOS: !process?!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/):false, //ios终端
    isWeiXin:!process?navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger":false,
	closeView() { //关闭视图
        if (this.isAndroid) {

            control.closeView(); 
        } else if (this.isiOS) {
            window.webkit.messageHandlers.closeView.postMessage(null);
        }
    },
    login() {
        if (this.isAndroid) {
            control.goLogin();
        } else if (this.isiOS) {
            window.webkit.messageHandlers.goLogin.postMessage(null);
        }
    },
    intent_queryuserinfo(){
    	if (this.isAndroid) {
        control.intent_queryuserinfo();
	    } else {  
	     window.webkit.messageHandlers.intent_queryuserinfo.postMessage('');
	    }
    },
    pushPlay(o) { //直播
        if (this.isAndroid) {
            control.livingnow(o);
        } else if (this.isiOS) {
            window.webkit.messageHandlers.livingnow.postMessage(o);
        }
    },
    pay({orderNo,orderprice,order_type=4}){
        if (this.isAndroid) {
            control.pay(orderNo,orderprice,order_type);
        } else {  
             window.webkit.messageHandlers.pay.postMessage(JSON.stringify({orderNo,orderprice,order_type}));
        }
        return new Promise((resolve, reject) => {
            window.paystatiu = (obj) => {
                resolve(obj);
                window.paystatiu = null;
            }
        })
    }
}
export default primordialFun