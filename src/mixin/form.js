import {
  verifying
} from 'base';
import {
  mapState
} from 'vuex';
import form from '../components/form/form.js'
export default {
  inject: {
    group: {
      default: false
    }
  },
  data() {
    return {
      verificationIf: true
    }
  },
  methods: {
    addVerificationIf(o) {
      this.verificationIf = !(this.prop == o);
    },
    phone(o) { //验证手机
      return o.length === 11
    },
    ID(o) { //身份证验证
      var result = verifying.isCardID(o)
      return result.result
    },
    email(o) { //邮箱
      return verifying.email(o)
    },
    postcode(o) { //邮编
      return verifying.postcode(o)
    },
    max(o) {
      return o.val.length <= o.max;
    },
    regularNUM(o) {
      return /^\d+$/.test(o);
    },
    case (o) { //验证转发
      var result = '',
        _this = this;
      switch (o.type) {
        case 'phone':
          result = _this.phone(o.val);
          break;
        case 'ID':
          result = _this.ID(o.val);
          break;
        case 'email':
          result = _this.email(o.val)
          break;
        case 'postcode':
          result = _this.postcode(o.val);
          break;
        case 'max':
          result = _this.max({
            val: o.val,
            max: o.query.max
          });
          break;
        case 'custom':
          result = o.callBack(o.val);
          break;
        case 'regularNUM':
          result = _this.regularNUM(o.val);
          break;

      }
      return result
    },
    addRulesObject() {
      if (this.group) {
        return this.$parent.rulesObject()
      }
      return this.$parent.rulesObject;
    },
    addVerificationValue() {
      if (this.group) {
        return this.$parent.verificationValue()
      }
      return this.$parent.verificationValue;
    },
    verification(o) { //验证
      this.$parent.verification({
        key: this.prop,
        val: o
      })
      // var rules = this.addRulesObject()[this.prop],message = '',obj={result:true,message:''};

      //  if(!rules){
      //   return false;
      // }

      //  this.verificationIf = rules.every((i)=>{



      //      if(i.required){
      //          obj = {
      //          result: typeof o != "undefined"&&o!=='',
      //          message:i.message,
      //          required:true
      //         }
      //         return typeof o != "undefined"&&o!==''
      //      }else if(typeof o != "undefined"&&o!==''){

      //         let type = i.type; 

      //          let result = this.case({type,val:o,query:i,callBack:i.callBack})
      //          obj = {
      //                result: result,
      //                message:i.message,
      //                required:false
      //          }
      //          return result
      //      }

      //      return true
      // })
      //  obj.key = this.prop;
      // obj.val = o;
      // this.addVerificationValue()[this.prop] = obj;

      // this.$parent.verification(obj);
      // return this.verificationIf;
    }
  },
  mounted() {
    this.addVerificationIf(this.errName);
  },
  watch: {
    errName(o) {
      this.addVerificationIf(o);
      return o
    }
  },
  computed: {
    ...mapState('form', {
      errName: (state) => state.errName,
    })
  },
  props: {
    prop: {
      type: String,
      default: ''
    }
  },
}