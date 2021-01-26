import axio from 'axio'
export default {
  namespaced: true,
  state: () => ({}),
  getter: {},
  actions: {
    setCode(store, o) {
      return axio(store).post('/tlc/app/sms/sendMsg', o, {
        loadIf: true
      })
    },
    findGoodsOrder(store, o) { //获取订单
      return axio(store).post('/tlc_premier/goods/findGoodsOrder', o, {
        loadIf: true
      }).then((data) => {
        if (data) {
          // data.data.goods.goods_type = 1;
          store.commit('findGoodsOrder', data.data)
          return data.data
        }
      })
    },
    updateorder(store, o) { //更新订单
      return axio(store).post('/tlc_premier/goods/updateOrder', o, {
        loadIf: true
      })
    },
    cancelOrderv(store, o) { //取消下单
      return axio(store).post('/tlc_premier/goods/cancelOrder', o, {
        loadIf: true
      })
    },
    order(store, o) { //下单
      return axio(store).post('/tlc_premier/goods/order3', o, {
        loadIf: true,
        type: 'json'
      })
    },
    goods_dateList(store, o) { //
      return axio(store).post('/tlc_premier/goods/dateList', o, {
        loadIf: true
      }).then((obj) => {
        if (obj && obj.data === '') {
          store.commit('goods_dateList', '')
        } else {
          store.commit('goods_dateList', obj.data)
        }
      })
    },
    agencyList(store, o) { //
      return axio(store).post('/tlc_premier/goods/agencyList', o, {
        loadIf: true
      }).then((obj) => {
        if (obj) {
          store.commit('agencyList', obj.data)
        }
      })
    },
    packageList: (store, o) => {
      return axio(store).post('/tlc_premier/goods/packageList', o, {
        loadIf: true
      }).then((data) => {
        store.commit('setPackageList', data)
        return data
      })
    },
    cityList(store, o) { //
      return axio(store).post('/tlc_premier/goods/cityList', o, {
        loadIf: true
      }).then((obj) => {
        if (obj) {
          store.commit('cityList', obj.data)
          return obj.data
        }
      })
    },
    queryOrder: (store, o) => {
      return axio(store).post('/tlc_weixin/wx/pay/queryGSOrder', o, {
        loadIf: false
      })
    },
    unifiedorder: (store, o) => {
      return axio(store).post('/tlc_weixin/wx/wxPayment/GSorder', o, {
        loadIf: false
      }).then((obj) => {
        if (obj) {
          return obj.data
        }
      })
    },
    getOpenId: (store, o) => {
      return axio(store).post('/tlc_weixin/wx/wxPayment/getOpenId', o, {
        loadIf: false
      })
    },
    addCode: (store, o) => {
      return axio(store).post('/tlc_weixin/wx/wxPayment/url', o, {
        loadIf: false
      })
    },
  },
  mutations: {
    goods_dateList(state, obj) {
      state.goods_dateList = obj;
    },
    findGoodsOrder(state, obj) {
      if (!obj.goodsOrder) {
        obj.goodsOrder = {}
      }
      state.findGoodsOrder = obj;
    },
    agencyList(state, obj) {
      state.agencyList = obj;
    },
    setPackageList(state, obj) {
      state.packageList = obj
    },
    cityList(state, obj) {
      state.cityListData = obj;
    },
  }
}
