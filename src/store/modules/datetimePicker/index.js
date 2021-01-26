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
  postCommitDatetime({commit},Payload){
    return axios.post('http://47.100.58.107:38081/api/mentalseal/v1/order/updateDate',Payload).then(res =>{
      return res;
    }).catch(err =>{
      console.log(err);
      return err;
    })
  },
};

export default {state ,getters,mutations,actions}
