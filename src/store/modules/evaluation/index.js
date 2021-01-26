import axios from 'axios';
const qs = require('qs');
axios.defaults.baseUrl = 'evaluation'
const state= {

};
const getters = {

};
const mutations = {


};
const actions = {
  /* 获取用户量表评估内容qs.stringify(Payload) */
  getUserScaleEvaluation({commit},Payload){
    return axios.get('https://api-tlc.rongxiangjiankang.com/api/mentalseal/v1/order/getActions',{params:Payload}).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
};

export default {state ,getters,mutations,actions}
