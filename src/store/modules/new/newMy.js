import axios from 'axios';
const qs = require('qs');
import axio from 'axio';
axios.defaults.baseUrl = 'newApi'
const state= {

};
const getters = {

};
const mutations = {


};
const actions = {
  /* 获取图文资讯列表 */
  getGraphicInformationList({commit},Payload){
    return axios.get('https://api-tlc.rongxiangjiankang.com/online_advice/tlc-advice-info/getAdviceInfoList',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 图文咨询详情 */
  getGraphicInformationDetail({commit},Payload){
    return axios.get('https://api-tlc.rongxiangjiankang.com/tlc-advice-info/getAdviceInfo',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 评价图文详情 */
  evaluate({commit},Payload){
    return axios.post('https://api-tlc.rongxiangjiankang.com/tlc-advice-info/evalAdviceInfo',qs.stringify(Payload)).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 提交咨询内容 */
  putGraphicInformation({commit},Payload){
    return axios.post('https://api-tlc.rongxiangjiankang.com/tlc-advice-info/saveAdviceInfo',Payload).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 添加图片上传地址 */
  upDateImg({commit},Payload){
    return axios.post('https://api-tlc.rongxiangjiankang.com/tlc-advice-info/files/uploadFile',Payload).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },

  /* 名护专栏列表 */
  escortList({commit},Payload){
    return axios.get('http://47.100.58.107:38081/tlc-advice-info/tlc-famous-doctor-info/getFamousDoctorInfoList',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 名护专栏获取详情 */
  getEscortList({commit},Payload){
    return axios.get('http://47.100.58.107:38081/tlc-advice-info/tlc-famous-doctor-info/getFamousDoctorInfoDetail',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 名护专栏点赞 */
  giveLike({commit},Payload){
    return axios.post('http://47.100.58.107:38081/tlc-advice-info/tlc-famous-dz-info/saveTlcFamousDzInfo',Payload).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 名护专栏点赞查询 */
  checkLike({commit},Payload){
    return axios.get('http://47.100.58.107:38081/tlc-advice-info/tlc-famous-dz-info/getTlcFamousDzInfo',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 名护专栏短视频点播量埋点 */
  videoNum({commit},Payload){
    return axios.get('http://47.100.58.107:38081/tlc-advice-info/tlc-famous-doctor-info/updateDspCount',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 直播视频点击量埋点 */
  lineVideoNum({commit},Payload){
    return axios.get('http://47.100.58.107:38081/tlc-advice-info/tlc-famous-doctor-info/updateZbCount',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 谣言粉碎机列表 */
  rumorList({commit},Payload){
    return axios.get('http://47.100.58.107:38081/tlc-advice-info/tlc-rumors-question/getRumorsQuestionList',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 核算检测结果 */
  accountingConsult({commit},Payload){
    return axios.get('http://139.196.31.127:18080/getHsjcResults',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
  /* 获取微信调用参数 */
  getWxConfig({commit},Payload){
    return axios.post('http://47.100.58.107:38081//tlc-advice-info/wechat/default/getSignature',Payload).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
};

export default {state ,getters,mutations,actions}
