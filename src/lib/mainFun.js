const NAVIG = navigator.userAgent;
var mainFun = {
    
    isAndroid: NAVIG.indexOf('Android') > -1 || NAVIG.indexOf('Adr') > -1, //android终端
    isiOS: !!NAVIG.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	isWeiXin:NAVIG.toLowerCase().match(/MicroMessenger/i)=="micromessenger",
    addHash(){
        let url = location.hash.slice(location.hash.indexOf('?')),theRequest = new Object(),strs = []; //获取url中"?"符后的字串    
       if (url.indexOf("?") != -1) {   
          var str = url.substr(1);   
          strs = str.split("&");   
          for(var i = 0; i < strs.length; i ++) {   
             theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
          }   
       }   
       return theRequest;  
    },
    getIDSex(o){
        var sexNum = o.slice(17,18);
        if(sexNum){
            return sexNum%2?'女':'男';
        }
    },
    getIDAge(o){
        var ageNum = o.slice(6,10);
        if(ageNum){
            return new Date().getFullYear() - +new Date(ageNum,0,1).getFullYear();
        }
    },
    addTime:{
        setTime(o) {
            if (!o) {
                return;
            }
            if(typeof o == 'string'){
                var spl = o.split(' ');
                if(spl.length>1){
                    var y = spl[0].split('-');
                   var t = spl[1].split(':');
                    o = +new Date(y[0]||0,y[1]-1||0,y[2]||0,t[0]||0,t[1]||0,t[2]||0);
                }
            }
            o = (o + '').length < 13 ? o * 1000 : o;
            var time1 = new Date(o),
                time1Year = this.getYear(time1),
                time1Date = this.getDate(time1),
                time1Month = this.getMonth(time1),
                time1Time = this.getTime(time1);
            time1Month++;
            var times = (time1Year) + '-' + (time1Month < 10 ? ('0' + time1Month) : time1Month) + '-' + (time1Date < 10 ? ('0' + time1Date) : time1Date);
            return times;
        },
        addDate(){
          var date = new Date();
          return new Date(mainFun.getYear(date),mainFun.getMonth(date),mainFun.getDate(date)+1)
        },
        getYear(o) {
            return o.getFullYear();
        },
        getDate(o) {
            return o.getDate();
        },
        getMonth(o) {
            return o.getMonth();
        },
        getHour(o) {
            return o.getHours();
        },
        getMinute(o) {
            return o.getMinutes();
        },
        getTime(o) {
            return o.getTime();
        }
    },
    addMore(o) {
        var len = o.len,
            currentPage = o.currentPage,
            showCount = o.showCount,
            ifMore, mordeLoad, moreIf, emptyIf;
        if (len == 0 && currentPage == 0) {
            emptyIf = true;
            ifMore = 'n';
            moreIf = false;
            mordeLoad = false;
        } else if ((len == 0 && currentPage != 0) || (len != 0 && len < showCount)) {
            emptyIf = false;
            ifMore = 'n';
            moreIf = true;
            mordeLoad = true;
        } else {
            emptyIf = false;
            ifMore = 'y';
            moreIf = true;
            mordeLoad = false;
        }
        return {
            ifMore,
            mordeLoad,
            moreIf,
            emptyIf
        }
    },
}
export default mainFun