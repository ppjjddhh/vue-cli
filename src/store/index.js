import axio from 'axio'
import Vue from 'vue';
import Vuex from 'vuex';
import newMy from "./modules/new/newMy";
import evaluation from "./modules/evaluation/index.js";
import datetimePicker from "./modules/datetimePicker/index.js";
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		datetimePicker,
		evaluation,
    	newMy
	},
	state: {
	},
	actions: {
		setSetting(store, obj){
			if (obj) {
				sessionStorage.setItem('setting', JSON.stringify(obj));
			} else {
				let setting = sessionStorage.getItem('setting')

				obj = setting ? JSON.parse(setting) : []
			}
			store.commit('setSetting', obj)
		},
		inc(state) {

		},
		addRedis(store, key) {
			return axio(store).post('/tlc_physical/common/popFromRedis', {
				key: key
			}, {
				loadIf: true
			})
		},
		setUser(state, obj) {
			if (obj) {
				sessionStorage.setItem('user', JSON.stringify(obj));
			} else {
				let user = sessionStorage.getItem('user')
				obj = user ? JSON.parse(user) : {
					userInfo: {}
				};
			}
			state.commit('setUser', obj)
		},
		removeUser(state) {
			sessionStorage.removeItem('user');
			state.commit('setUser', {})
		},
		authUser(store, o) {
			return new Promise((resolve,reject) => {
				axio(store).post('/tlc_upms/login/authUser',o,{loadIf:true,tokenIf:true,keepUrl:true}).then((obj)=>{
					resolve(obj)
				}).catch(error => {
					reject(error)
				})
			})
		},

	},
	mutations: {
		goBackIf(state, obj) {
			state.BackIf = obj;
		},
		setReplaceIf(state, obj) {
			state.replaceIf = obj;
		},
		setPushIf(state, obj) {
			state.pushIf = obj;
		},
		setPathArray(state, obj) {
			state.pathArray = obj;
		},
		setCity(state, obj) {

			Vue.set(state, 'city', obj)
		},
		setPromptClose(state, obj) {
			Vue.set(state, 'promptTip', obj)
			if (obj.promptTipIf) {
				setTimeout(() => {
					Vue.set(state, 'promptTip', {
						promptTipIf: false,
						promptTip: ''
					})
				}, 2000)
			}

		},
		setLoaderIf(state, obj) {

			state.loaderIf = obj;
		},
		setUserInfo(state, obj) {
			var user = state.user;
			user.userInfo = obj
			sessionStorage.setItem('user', JSON.stringify(user));
			Vue.set(state, 'user', user)
		},
		setUser(state, obj) {

			Vue.set(state, 'user', obj)
		},
		setToken(state, obj) {
			Vue.set(state, 'token', obj)
		},
		setErrorClose(state, obj) {
			Vue.set(state, 'errorTipIf', obj.result);
			Vue.set(state, 'error_content', obj.tip);
		},
		setCode(state, o) {
			state.code = o
			setTimeout(function () {
				state.code = ""
			},2000)
		},
		setSetting(state, obj){
			state.setting = obj
		},
	}
})
