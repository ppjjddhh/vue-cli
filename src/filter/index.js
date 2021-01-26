/**
 * 
 * @param {string | number} ID 身份证
 * 身份证脱敏 
 */
let readID = function(ID){
	if(!ID){
		return ID;
	}
	ID = ID.toString();
	return ID.replace(/(\d{3})\d*([0-9a-zA-Z]{4})/,"$1*********$2")
}

/**
 * 
 * @param {string | number} Phone  手机号码
 * 手机号脱敏 
 */
let readPhone = function(Phone){
	if(!Phone){
		return '';
	}
	Phone = Phone.toString();
	return Phone.replace(/(\d{3})\d*([0-9a-zA-Z]{4})/,"$1****$2")
}

/**
 * 
 * @param {data} dataTime  时间
 * 日期格式化
 */
let time1=(dataTime)=>{
	if(!dataTime){
		return '';
	}
	let split = dataTime.split(' ');
	let time = split[0]('-');
	return `${time[0]}年${time[1]}月${time[2]}日 ${split[1]}`
}

/**
 * 
 * @param { string } values // data
 *  字段去空
 */
let trim = (value)=>{
	if(!value){
		return '';
	}

	return value.replace(/^\s+|\s+$/g,"")
}

export default{readID,readPhone,time1,trim}