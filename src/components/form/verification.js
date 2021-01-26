import {
  verifying
} from 'base';
const verification = {
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
  max(o) {
    var len = o.length;
    if (o.val) {
      len = o.val.length;
    }
    return len <= o.max;
  },
  regularNUM({
    val
  }) {
    return /^\d+$/.test(val);
  }
};
export default {
  methods: {

    // phone(o){//验证手机
    //   return /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(o)
    // },
    // ID(o){//身份证验证
    //   var result = verifying.isCardID(o)
    //   return result.result
    // },
    // email(o){//邮箱
    //    return verifying.email(o)
    // },
    // postcode(o){//邮编
    //   return verifying.postcode(o)
    // },
    // max(o){
    //   return o.val.length<=o.max;
    // },
    // regularNUM(o){
    //   return /^\d+$/.test(o);
    // },
    case (o) { //验证转发
      var result = '';
      if (o.type != 'custom' && verification[o.type]) {

        result = verification[o.type](o)
      } else {
        result = o.callBack(o.val);
      }
      // switch(o.type){

      //      case 'phone':
      //           result = _this.phone(o.val);
      //            break;
      //       case 'ID':
      //           result = _this.ID(o.val);
      //          break;
      //       case 'email':
      //           result = _this.email(o.val)
      //           break;
      //       case 'postcode':
      //           result = _this.postcode(o.val);
      //           break;
      //       case 'max':
      //           result = _this.max({val:o.val,max:o.query.max});
      //           break;
      //       case 'custom':
      //           result = o.callBack(o.val);
      //           break;
      //       case 'regularNUM':
      //           result = _this.regularNUM(o.val);
      //           break;

      //     }
      return result
    },


  },



}