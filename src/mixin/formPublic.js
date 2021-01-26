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
		} else if (!/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(o)) {
			type.result = false;
			type.message = '手机号格式不正确'
		}
		return type
	},
	emptyValue(o) {
		var typeIf = true;
		if (typeof o === 'undefined') {
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
let verification = {
	phone({
		val
	}) { //验证手机
		return /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(val)
	},
	ID({
		val
	}) { //身份证验证
		var result = verifying.isCardID(val)
		return result.result
	},
	email({
		val
	}) { //邮箱
		return verifying.email(val)
	},
	postcode({
		val
	}) { //邮编
		return verifying.postcode(val)
	},
	max({
		val,
		max
	}) {
		var len = val.length;

		return len <= max;
	},
	regularNUM({
		val
	}) {
		return /^\d+$/.test(val);
	}
};
export default {
	data() {
		return {
			FormFun_buttonIf: false, //判断是否可以提交
			FormFun_verificationValue: {}, //判断对象
			FormFun_message: '',
			FormFun_rulesObject: {},
			FormFun_otherObject: {}, //其他验证方法
			FormFun_result: false, //是否可提交
			FormFun_requiredObj: {}, //必填值验证规则
			FormFun_buttonObj: {}, //没有通过必填验证的内容
			FormFun_resultObj: {}, //其他选项是否验证通过
		}
	},
	methods: {
		FormFun_case(o) { //验证转发
			var result = '';
			if (o.type != 'custom' && verification[o.type]) {
				result = verification[o.type](o)
			} else {
				result = o.callBack(o.val);
			}

			return result
		},
		FormFun_verification({
			key,
			val
		}) { //验证
			var valType = verifying.emptyValue(val)
			var _this = this,
				buttonArr = [];
			if (_this.FormFun_buttonObj[key] && valType) {
				delete _this.FormFun_buttonObj[key]
			} else if (_this.FormFun_requiredObj[key] && !valType) {
				_this.FormFun_buttonObj[key] = {};
				_this.FormFun_buttonObj[key].message = _this.FormFun_requiredObj[key].message;
			}
			_this.FormFun_judgeButtonIf();
			//                //  _this.result = Object.keys(_this.verificationValue).every((i)=>{
			//      if(!_this.verificationValue[i].result&&_this.verificationValue[i].required){
			//          buttonArr.push(false);
			//      }
			//      if(!_this.verificationValue[i].result){
			//        _this.errKey = i;
			//        _this.message = _this.verificationValue[i].message;
			//      }
			//    return _this.verificationValue[i].result;
			//  })
			//  _this.buttonIf = !buttonArr.length;

		},
		FormFun_submit(e) { //提交
			window.event.preventDefault();
			if (!this.FormFun_buttonIf) {
				return;
			}
			this.FormFun_judgeResultIf();
			if (!this.FormFun_result) {

				return this.FormFun_message
			}
			return true
		},
		FormFun_judgeButtonIf() {
			this.FormFun_buttonIf = !Object.keys(this.FormFun_buttonObj).length
		},
		FormFun_judgeResultIf() {
			var _this = this,
				keys = Object.keys(_this.FormFun_otherObject);
			if (!keys.length) {
				_this.FormFun_result = true;
				_this.FormFun_message = '';
				return;
			}

			keys.every((i) => {
				return _this.FormFun_otherObject[i].every((j) => {
					j.val = _this.FormFun_model[i];
					if (!verifying.emptyValue(j.val)) {
						return true;
					} else {
						_this.FormFun_result = _this.FormFun_case(j);
						_this.FormFun_message = j.message;
						return _this.FormFun_result;
					}
				});
			})
		},
		FormFun_init() {
			var _this = this;
			Object.keys(_this.FormFun_rules).forEach((i) => {
				_this.FormFun_rules[i].forEach((key) => {
					if (key.required) {
						_this.FormFun_requiredObj[i] = key;
					} else {
						_this.FormFun_otherObject[i] = _this.FormFun_otherObject[i] ? _this.FormFun_otherObject[i] : []
						_this.FormFun_otherObject[i].push(key)
					}
					if (key.required && !verifying.emptyValue(_this.FormFun_model[i])) {
						_this.FormFun_buttonObj[i] = {};
						_this.FormFun_buttonObj[i].message = key.message;
					}

				})

			})

			_this.FormFun_judgeButtonIf();

			// _this.rulesObject = _this.rules;
			// _this.verification();
		}
	}
}