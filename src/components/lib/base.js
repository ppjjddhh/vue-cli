import primordialFun from './primordialFun'
let verifying = {
	aCity: {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	},
	phone(o) {
		var type = {
			result: true
		}
		if (o == '') {
			type.result = false;
			type.message = '手机号不能为空'
		}
		else if(!/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(o)){
			type.result = false;
			type.message = '手机号格式不正确'
		}
		else if (o.length !== 11) {
			type.result = false;
			type.message = '手机号格式不正确'
		}
		return type
	},
	emptyValue(o) {
		var typeIf = true;
		if (typeof o === 'undefined' || o === null) {
			typeIf = false
		} else if (o instanceof Array) {
			typeIf = !!o.length
		} else if (o instanceof Object) {
			typeIf = !!Object.keys(o).length;
		}
		return typeIf && o !== ''
	},
	postcode(o) {
		return /^[1-9][0-9]{5}$/.test(o);
	},
	isCardID(Id) { //验证身份证号
		var iSum = 0;
		var info = "";
		var message = '',
			sBirthday = '',
			result = true;
		var taiwanreg = /^[A-Z][0-9]{9}$/;　　
		var xianggangreg = /^[A-Z][0-9]{6}\([0-9A]\)$/;　　
		var aomenreg = /^[157][0-9]{6}\([0-9]\)$/;
		if (taiwanreg.test(Id)) {
			return {
				message: "",
				result: true
			}
		}
		if (xianggangreg.test(Id)) {
			return {
				message: "",
				result: true
			}
		}
		if (aomenreg.test(Id)) {
			return {
				message: "",
				result: true
			}
		}
		if (!/^\d{17}(\d|x)$/i.test(Id)) {
			return {
				message: "你输入的身份证长度或格式错误",
				result: false
			}

		}

		var sId = Id.replace(/x$/i, "a");
		sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		for (var i = 17; i >= 0; i--) {
			iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
		}
		if (this.aCity[parseInt(sId.substr(0, 2))] == null) {
			message = "你的身份证地区非法";
			result = false;
		} else if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
			message = "身份证上的出生日期非法";
			result = false;
		} else if (iSum % 11 != 1) {
			message = "身份证上的出生日期非法";
			result = false;
		}
		//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
		return {
			message,
			result
		}
	},
	email(val) {
		var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		// var domains= ['126.com',"qq.com","163.com","vip.163.com","263.net","yeah.net","sohu.com","sina.cn","sina.com","eyou.com","gmail.com","hotmail.com","42du.cn"];
		// if(pattern.test(val)) {
		//   var domain = val.substring(val.indexOf("@")+1);
		//   for(var i = 0; i< domains.length; i++) {
		//     if(domain == domains[i]) {
		//       return true;
		//     }
		//   }
		// }
		if (pattern.test(val)) {
			return true
		}
		return false;
	}
}
let verifying2 = {
	phone(o) {
		var type = {
			verifying: true
		}
		if (o == '') {
			type.verifying = false;
			type.message = '手机号不能为空'
		} else if (!/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(o)) {
			type.verifying = false;
			type.message = '手机号格式不正确'
		}
		return type
	}
}
let addMore = (o) => {
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
}
let Time = {
	setTime(o) {
		if (!o) {
			return;
		}
		if (typeof o == 'string') {
			var spl = o.split(' ');
			if (spl.length > 1) {
				var y = spl[0].split('-');
				var t = spl[1].split(':');
				o = +new Date(y[0] || 0, y[1] - 1 || 0, y[2] || 0, t[0] || 0, t[1] || 0, t[2] || 0);
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
	addTime(o) {
		if (!o) {
			return;
		}
		if (typeof o == 'string') {
			var spl = o.split(' ');
			if (spl.length > 1) {
				var y = spl[0].split('-');
				var t = spl[1].split(':');
				o = +new Date(y[0] || 0, y[1] - 1 || 0, y[2] || 0, t[0] || 0, t[1] || 0, t[2] || 0);
			}
		}

		o = (o + '').length < 13 ? o * 1000 : o;
		var Millisecond = 24 * 60 * 60 * 1000;
		var time = new Date();
		var time1 = new Date(o);
		var timeYear = this.getYear(time),
			timeDate = this.getDate(time),
			timeMonth = this.getMonth(time),
			time1Year = this.getYear(time1),
			time1Date = this.getDate(time1),
			time1Month = this.getMonth(time1),
			time1Time = this.getTime(time1),
			time1H = this.getHour(time1),
			time1M = this.getMinute(time1);
		var dawn = new Date(timeYear, timeMonth, timeDate, 0, 0, 0);
		var time2 = +new Date(this.getTime(dawn) - Millisecond);
		var time3 = +new Date(this.getTime(dawn) - Millisecond * 2);
		if (timeYear === time1Year && timeDate === time1Date && timeMonth === time1Month) {
			return (time1H < 10 ? '0' + time1H : time1H) + ':' + (time1M < 10 ? '0' + time1M : time1M);
		} else if (time1Time < dawn && time1Time >= time2) {
			return '昨天';
		} else if (time1Time < time2 && time1Time >= time3) {
			return '前天';
		} else {
			time1Month++;

			var times = (time1Year) + '-' + (time1Month < 10 ? ('0' + time1Month) : time1Month) + '-' + (time1Date < 10 ? ('0' + time1Date) : time1Date);
			return times;
		}

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
}

let Num = {
	num(o) {

		var values = parseInt(o);
		if (!values) {
			return 0;
		}
		if (values > 10000) {
			values = o.slice(0, -4) + '万';
			var name = Math.ceil(parseInt(values) / 1000);
			if (name > o) {
				values += '+';
			}
			return values;
		}
		return o;
	},
}
let scoll = (o) => {

	var offsetTop = o.childNode.offsetTop - o.parent.offsetTop;

	//window.scrollTo(0,offsetTop);
	//this.transform = `translateY(-${offsetTop}px)`;

	var vals = o.parent,
		scroll = offsetTop - vals.scrollTop,
		tops = (offsetTop - vals.scrollTop) / 500 * 10,
		i = 1;

	var num = setInterval(() => {
		let scrollTop = vals.scrollTop;

		if (Math.abs(tops * i) < Math.abs(scroll)) {
			i++;
			vals.scrollTop = scrollTop + tops
		} else {
			vals.scrollTop = offsetTop;
			clearInterval(num);
		}

	}, 10)
}
let FoltCount = {
	accMul: (arg1, arg2) => { //乘法
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return parseFloat((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2));
	},
	accSub: (arg1, arg2) => { //减法
		if (isNaN(arg1)) {
			arg1 = 0;
		}
		if (isNaN(arg2)) {
			arg2 = 0;
		}
		arg1 = Number(arg1);
		arg2 = Number(arg2);

		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2)); //动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
	},
	accAdd: (arg1, arg2) => { //加法
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		return (arg1 * m + arg2 * m) / m;
	},
	accDiv(arg1, arg2) { //除法
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length
		} catch (e) {}
		try {
			t2 = arg2.toString().split(".")[1].length
		} catch (e) {}

		r1 = Number(arg1.toString().replace(".", ""));

		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * Math.pow(10, t2 - t1);
	}
}
export {
	FoltCount,
	verifying,
	addMore,
	Time,
	Num,
	scoll,
	primordialFun
}