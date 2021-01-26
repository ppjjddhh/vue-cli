import axios from 'axios';
//import urls from 'config';
import axiosType from './axiosType.js';

let request, response;
let axio = (store) => {
    var instance = axios.create();
    request = instance.interceptors.request.use(config => {

        var method = config.method;
        if (method === 'post') {
            new axiosType(config);
        } else {
            config.url += store.rootState.user ? '&token=' + store.rootState.user.token : ''
        }
        // config.url = '/tlc'+config.url
        // if(!config.tokenIf){
        //   let token = store.state.token;
        //   (token)&&(document.cookie = `token=${token}`);
        // }
        config.headers.token = store.rootState.user.token
        if (config.loadIf) {
            store.commit("setLoaderIf", true, {
                root: true
            });
        }
        return config;
    }, error => {
        store.commit("setLoaderIf", false, {
            root: true
        });
        store.commit('setErrorClose', {
            result: true,
            tip: `网路异常，请联系工作人员！${err.message}`
        }, {
            root: true
        });
        return Promise.reject(error);
    });
    response = instance.interceptors.response.use(function(res) {
        //在这里对返回的数据进行处理
        store.commit("setLoaderIf", false, {
            root: true
        });
        var json;
        if (typeof res.data === 'string') {
            json = JSON.parse(res.data);
        } else {
            if(res.data.ret_code == null) {
                json = res.data.data;
                json['code'] = json.ret_code === '0000' ? 1 : 0;
            } else {
                json = res.data;
            }
        }
        if (json.ret_code !== '0000' && parseInt(json.code) !== 0) {
            store.commit('setErrorClose', {
                result: true,
                tip: json.ret_msg
            }, {
                root: true
            });
            return new Promise((resolve, reject) => {
                reject(json)
            });
        } else {
            return res.data.ret_code == null ? json :(json.data || {});
        }

    }, function(err) {
        //Do something with response error
        store.commit("setLoaderIf", false, {
            root: true
        });
        store.commit('setErrorClose', {
            result: true,
            tip: `网路异常，请联系工作人员！${err.message}`
        }, {
            root: true
        });
        return Promise.reject(err);
    })
    return instance
}
export default axio
